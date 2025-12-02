const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Application = require("../models/Application");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/profile", [auth, auth.volunteer], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -__v");
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.put(
  "/profile",
  [
    auth,
    auth.volunteer,
    body("name").optional().trim().isLength({ min: 2, max: 100 }),
    body("phone").optional().trim().isLength({ min: 10 }),
    body("whatsapp").optional().trim(),
    body("city").optional().trim().isLength({ min: 2 }),
    body("state").optional().trim().isLength({ min: 2, max: 2 }),
    body("contact").optional().trim().isLength({ min: 5 }),
    body("skills").optional().isArray(),
    body("interests").optional().isArray(),
    body("availability").optional(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updateFields = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updateFields },
        { new: true, runValidators: true }
      ).select("-password -__v");

      res.json({
        message: "Perfil atualizado com sucesso!",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.put(
  "/profile/password",
  [
    auth,
    auth.volunteer,
    body("currentPassword").notEmpty().withMessage("Senha atual é obrigatória"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Nova senha deve ter pelo menos 6 caracteres"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Senha atual incorreta" });
      }

      user.password = newPassword;
      await user.save();

      res.json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.get("/profile/stats", [auth, auth.volunteer], async (req, res) => {
  try {
    const stats = await Application.aggregate([
      { $match: { volunteer: req.user.id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusMap = {
      pending: 0,
      accepted: 0,
      rejected: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
    };

    stats.forEach((item) => {
      statusMap[item._id] = item.count;
    });

    const totalHours = await Application.aggregate([
      { $match: { volunteer: req.user.id, status: "completed" } },
      {
        $group: {
          _id: null,
          totalHours: { $sum: "$participation.hours" },
        },
      },
    ]);

    const certificates = await Application.find({
      volunteer: req.user.id,
      "participation.certificate.issued": true,
    })
      .populate("action", "title dates")
      .populate("ong", "name")
      .select("participation.certificate action ong")
      .sort({ "participation.certificate.issuedDate": -1 });

    res.json({
      stats: {
        ...statusMap,
        totalApplications: Object.values(statusMap).reduce((a, b) => a + b, 0),
        totalHours: totalHours[0]?.totalHours || 0,
        totalCertificates: certificates.length,
      },
      certificates,
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post("/profile/avatar", [auth, auth.volunteer], async (req, res) => {
  try {
    res.json({
      message: "Funcionalidade de upload será implementada em breve",
    });
  } catch (error) {
    console.error("Erro no upload de avatar:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.delete("/profile", [auth, auth.volunteer], async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      isActive: false,
    });

    await Application.updateMany(
      { volunteer: req.user.id, status: "pending" },
      { status: "cancelled" }
    );

    res.json({ message: "Conta desativada com sucesso!" });
  } catch (error) {
    console.error("Erro ao desativar conta:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/recommendations", [auth, auth.volunteer], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "skills interests city state"
    );
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const filters = {
      isActive: true,
      status: "active",
      "dates.applicationDeadline": { $gt: new Date() },
      "vacancies.available": { $gt: 0 },
    };

    if (user.city && user.state) {
      filters.$or = [
        { "location.city": { $regex: user.city, $options: "i" } },
        { "location.state": user.state.toUpperCase() },
      ];
    }

    const recommendedActions = await require("../models/Action")
      .find(filters)
      .populate("ong", "name logo city state")
      .sort({ createdAt: -1 })
      .limit(6)
      .select("-__v");

    res.json({ recommendedActions });
  } catch (error) {
    console.error("Erro ao buscar recomendações:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;
