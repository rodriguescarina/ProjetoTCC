const express = require("express");
const { body, validationResult, query } = require("express-validator");
const ONG = require("../models/ONG");
const Action = require("../models/Action");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get(
  "/",
  [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Página deve ser um número positivo"),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage("Limite deve ser entre 1 e 50"),
    query("area").optional().trim().isLength({ min: 2 }),
    query("city").optional().trim().isLength({ min: 2 }),
    query("state").optional().trim().isLength({ min: 2, max: 2 }),
    query("search").optional().trim().isLength({ min: 2 }),
    query("verified")
      .optional()
      .isBoolean()
      .withMessage("Filtro de verificação deve ser booleano"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        page = 1,
        limit = 12,
        area,
        city,
        state,
        search,
        verified,
      } = req.query;

      const filters = {
        isActive: true,
      };

      if (area) {
        filters.area = { $regex: area, $options: "i" };
      }

      if (city) {
        filters.city = { $regex: city, $options: "i" };
      }

      if (state) {
        filters.state = state.toUpperCase();
      }

      if (search) {
        filters.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { area: { $regex: search, $options: "i" } },
        ];
      }

      if (verified !== undefined) {
        filters.isVerified = verified;
      }

      const skip = (page - 1) * limit;

      const ongs = await ONG.find(filters)
        .select("-password -__v")
        .sort({ name: 1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await ONG.countDocuments(filters);
      const totalPages = Math.ceil(total / limit);

      res.json({
        ongs,
        pagination: {
          current: parseInt(page),
          total: totalPages,
          totalItems: total,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar ONGs:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.get("/:id([0-9a-fA-F]{24})", async (req, res) => {
  try {
    const ong = await ONG.findById(req.params.id).select("-password -__v");

    if (!ong) {
      return res.status(404).json({ message: "ONG não encontrada" });
    }

    if (!ong.isActive) {
      return res.status(404).json({ message: "ONG não disponível" });
    }

    const actions = await Action.find({
      ong: req.params.id,
      isActive: true,
      status: "active",
    })
      .select("title shortDescription dates location area tags vacancies")
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      ong,
      recentActions: actions,
    });
  } catch (error) {
    console.error("Erro ao buscar ONG:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get(
  "/:id([0-9a-fA-F]{24})/actions",
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 20 }),
    query("status")
      .optional()
      .isIn(["active", "paused", "closed", "completed"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { page = 1, limit = 12, status } = req.query;
      const skip = (page - 1) * limit;

      const ong = await ONG.findById(req.params.id).select("isActive");
      if (!ong || !ong.isActive) {
        return res
          .status(404)
          .json({ message: "ONG não encontrada ou inativa" });
      }

      const filters = {
        ong: req.params.id,
        isActive: true,
      };

      if (status) {
        filters.status = status;
      }

      const actions = await Action.find(filters)
        .select("-__v")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Action.countDocuments(filters);
      const totalPages = Math.ceil(total / limit);

      res.json({
        actions,
        pagination: {
          current: parseInt(page),
          total: totalPages,
          totalItems: total,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar ações da ONG:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.put(
  "/profile",
  [
    auth,
    auth.ong,
    body("name").optional().trim().isLength({ min: 2, max: 200 }),
    body("area").optional().trim().isLength({ min: 2 }),
    body("description").optional().trim().isLength({ min: 10, max: 1000 }),
    body("contactPerson").optional().trim().isLength({ min: 2 }),
    body("phone").optional().trim().isLength({ min: 10 }),
    body("city").optional().trim().isLength({ min: 2 }),
    body("state").optional().trim().isLength({ min: 2, max: 2 }),
    body("address").optional(),
    body("website")
      .optional()
      .trim()
      .isURL()
      .withMessage("Website deve ser uma URL válida"),
    body("socialMedia").optional(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updateFields = req.body;

      const updatedOng = await ONG.findByIdAndUpdate(
        req.user.id,
        { $set: updateFields },
        { new: true, runValidators: true }
      ).select("-password -__v");

      res.json({
        message: "Perfil atualizado com sucesso!",
        ong: updatedOng,
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
    auth.ong,
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

      const ong = await ONG.findById(req.user.id);
      if (!ong) {
        return res.status(404).json({ message: "ONG não encontrada" });
      }

      const isMatch = await ong.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Senha atual incorreta" });
      }

      ong.password = newPassword;
      await ong.save();

      res.json({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.get("/profile", [auth, auth.ong], async (req, res) => {
  try {
    const ong = await ONG.findById(req.user.id).select("-password -__v");

    if (!ong) {
      return res.status(404).json({ message: "ONG não encontrada" });
    }

    res.json({ ong });
  } catch (error) {
    console.error("Erro ao buscar perfil da ONG:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/profile/actions", [auth, auth.ong], async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filters = {
      ong: req.user.id,
      isActive: true,
    };

    if (status) {
      filters.status = status;
    }

    const actions = await Action.find(filters)
      .populate("ong", "name logo area city state")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Action.countDocuments(filters);
    const totalPages = Math.ceil(total / limit);

    res.json({
      actions,
      pagination: {
        current: parseInt(page),
        total: totalPages,
        totalItems: total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar ações da ONG:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/profile/stats", [auth, auth.ong], async (req, res) => {
  try {
    const stats = await ONG.findById(req.user.id).select("stats").populate({
      path: "stats",
      select: "totalActions totalVolunteers rating reviews",
    });

    if (!stats) {
      return res.status(404).json({ message: "ONG não encontrada" });
    }

    const totalActions = await Action.countDocuments({
      ong: req.user.id,
      isActive: true,
    });

    const activeActions = await Action.countDocuments({
      ong: req.user.id,
      isActive: true,
      status: "active",
    });

    const pendingApplications =
      await require("../models/Application").countDocuments({
        ong: req.user.id,
        status: "pending",
      });

    res.json({
      stats: {
        ...stats.stats.toObject(),
        totalActions,
        activeActions,
        pendingApplications,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post(
  "/profile/logo",
  [auth, auth.ong, upload.single("logo")],
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado" });
      }

      const ong = await ONG.findById(req.user.id);
      if (!ong) {
        return res.status(404).json({ message: "ONG não encontrada" });
      }

      if (ong.logo) {
        const oldLogoPath = path.join(
          __dirname,
          "../uploads",
          path.basename(ong.logo)
        );
        if (fs.existsSync(oldLogoPath)) {
          fs.unlinkSync(oldLogoPath);
        }
      }

      ong.logo = `/uploads/${req.file.filename}`;
      await ong.save();

      res.json({
        message: "Logo atualizado com sucesso!",
        logo: ong.logo,
      });
    } catch (error) {
      console.error("Erro ao fazer upload do logo:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.post(
  "/profile/banner",
  [auth, auth.ong, upload.single("banner")],
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado" });
      }

      const ong = await ONG.findById(req.user.id);
      if (!ong) {
        return res.status(404).json({ message: "ONG não encontrada" });
      }

      if (ong.banner) {
        const oldBannerPath = path.join(
          __dirname,
          "../uploads",
          path.basename(ong.banner)
        );
        if (fs.existsSync(oldBannerPath)) {
          fs.unlinkSync(oldBannerPath);
        }
      }

      ong.banner = `/uploads/${req.file.filename}`;
      await ong.save();

      res.json({
        message: "Banner atualizado com sucesso!",
        banner: ong.banner,
      });
    } catch (error) {
      console.error("Erro ao fazer upload do banner:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.delete("/profile", [auth, auth.ong], async (req, res) => {
  try {
    await ONG.findByIdAndUpdate(req.user.id, {
      isActive: false,
    });

    await Action.updateMany(
      { ong: req.user.id, isActive: true },
      { isActive: false, status: "closed" }
    );

    res.json({ message: "Conta desativada com sucesso!" });
  } catch (error) {
    console.error("Erro ao desativar conta:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;
