const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Action = require("../models/Action");
const User = require("../models/User");
const ONG = require("../models/ONG");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const isVolunteer = (req, res, next) => {
  if (req.user.type !== "volunteer") {
    return res
      .status(403)
      .json({
        message:
          "Acesso negado. Apenas voluntários podem acessar esta funcionalidade.",
      });
  }
  next();
};

const isONG = (req, res, next) => {
  if (req.user.type !== "ong") {
    return res
      .status(403)
      .json({
        message:
          "Acesso negado. Apenas ONGs podem acessar esta funcionalidade.",
      });
  }
  next();
};

const canAccessApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Candidatura não encontrada" });
    }

    if (req.user.type === "ong" && application.ong.toString() === req.user.id) {
      req.application = application;
      return next();
    }

    if (
      req.user.type === "volunteer" &&
      application.volunteer.toString() === req.user.id
    ) {
      req.application = application;
      return next();
    }

    return res.status(403).json({ message: "Acesso negado" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

router.post(
  "/",
  [
    auth,
    isVolunteer,
    body("actionId").isMongoId().withMessage("ID da ação inválido"),
    body("message")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Mensagem muito longa"),
    body("skills")
      .optional()
      .isArray()
      .withMessage("Habilidades devem ser um array"),
    body("availability.startDate")
      .optional()
      .isISO8601()
      .withMessage("Data de início inválida"),
    body("availability.endDate")
      .optional()
      .isISO8601()
      .withMessage("Data de fim inválida"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { actionId, message, skills, availability } = req.body;

      const action = await Action.findById(actionId);
      if (!action) {
        return res.status(404).json({ message: "Ação não encontrada" });
      }

      if (action.status !== "active") {
        return res
          .status(400)
          .json({
            message: "Esta ação não está mais disponível para candidaturas",
          });
      }

      if (action.currentVolunteers >= action.maxVolunteers) {
        return res.status(400).json({ message: "Esta ação já está lotada" });
      }

      const existingApplication = await Application.findOne({
        volunteer: req.user.id,
        action: actionId,
      });

      if (existingApplication) {
        return res
          .status(400)
          .json({ message: "Você já se candidatou a esta ação" });
      }

      const volunteer = await User.findById(req.user.id);
      if (!volunteer) {
        return res.status(404).json({ message: "Voluntário não encontrado" });
      }

      const application = new Application({
        volunteer: req.user.id,
        action: actionId,
        ong: action.ong,
        message: message || "",
        skills: skills || volunteer.skills || [],
        availability: availability || { flexible: true },
        volunteerHistory: {
          totalHours: volunteer.totalVolunteerHours || 0,
          totalActions: volunteer.totalActions || 0,
          rating: volunteer.rating || 0,
        },
        metadata: {
          ipAddress: req.ip,
          userAgent: req.get("User-Agent"),
          source: "web",
        },
      });

      await application.save();

      application.addNotification(
        "status_change",
        `Nova candidatura recebida de ${volunteer.name}`
      );

      await Action.findByIdAndUpdate(actionId, {
        $inc: { currentVolunteers: 1 },
      });

      const populatedApplication = await Application.findById(application._id)
        .populate("action", "title area date time location")
        .populate("ong", "name logo area")
        .populate("volunteer", "name email avatar");

      res.status(201).json({
        message: "Candidatura enviada com sucesso!",
        application: populatedApplication,
      });
    } catch (error) {
      console.error("Erro ao criar candidatura:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.get("/volunteer", [auth, isVolunteer], async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const options = {};

    if (status) {
      options.status = status;
    }

    const applications = await Application.findByVolunteer(
      req.user.id,
      options
    );

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedApplications = applications.slice(startIndex, endIndex);

    res.json({
      applications: paginatedApplications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(applications.length / limit),
        totalApplications: applications.length,
        hasNextPage: endIndex < applications.length,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar candidaturas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/ong", [auth, isONG], async (req, res) => {
  try {
    const { status, actionId, page = 1, limit = 10 } = req.query;
    const options = { ong: req.user.id };

    if (status) {
      options.status = status;
    }

    if (actionId) {
      options.action = actionId;
    }

    const applications = await Application.findByONG(req.user.id, options);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedApplications = applications.slice(startIndex, endIndex);

    res.json({
      applications: paginatedApplications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(applications.length / limit),
        totalApplications: applications.length,
        hasNextPage: endIndex < applications.length,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar candidaturas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/:id", [auth, canAccessApplication], async (req, res) => {
  try {
    const populatedApplication = await Application.findById(req.params.id)
      .populate(
        "action",
        "title area date time location requirements skills tags"
      )
      .populate("ong", "name logo area description contactInfo")
      .populate(
        "volunteer",
        "name email avatar skills bio totalVolunteerHours totalActions rating"
      );

    res.json({ application: populatedApplication });
  } catch (error) {
    console.error("Erro ao buscar candidatura:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.put(
  "/:id/approve",
  [
    auth,
    isONG,
    canAccessApplication,
    body("ongResponse")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Resposta muito longa"),
  ],
  async (req, res) => {
    try {
      const { ongResponse } = req.body;
      const application = req.application;

      if (!application.canBeApproved()) {
        return res
          .status(400)
          .json({ message: "Esta candidatura não pode ser aprovada" });
      }

      application.status = "approved";
      if (ongResponse) {
        application.ongResponse = ongResponse;
      }

      await application.save();

      application.addNotification(
        "status_change",
        "Sua candidatura foi aprovada! A ONG entrará em contato em breve."
      );

      res.json({
        message: "Candidatura aprovada com sucesso",
        application,
      });
    } catch (error) {
      console.error("Erro ao aprovar candidatura:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.put(
  "/:id/reject",
  [
    auth,
    isONG,
    canAccessApplication,
    body("rejectionReason")
      .isLength({ min: 1, max: 500 })
      .withMessage(
        "Motivo da rejeição é obrigatório e deve ter no máximo 500 caracteres"
      ),
    body("ongResponse")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Resposta muito longa"),
  ],
  async (req, res) => {
    try {
      const { rejectionReason, ongResponse } = req.body;
      const application = req.application;

      if (!application.canBeRejected()) {
        return res
          .status(400)
          .json({ message: "Esta candidatura não pode ser rejeitada" });
      }

      application.status = "rejected";
      application.rejectionReason = rejectionReason;
      if (ongResponse) {
        application.ongResponse = ongResponse;
      }

      await application.save();

      application.addNotification(
        "status_change",
        `Sua candidatura foi rejeitada. Motivo: ${rejectionReason}`
      );

      await Action.findByIdAndUpdate(application.action, {
        $inc: { currentVolunteers: -1 },
      });

      res.json({
        message: "Candidatura rejeitada",
        application,
      });
    } catch (error) {
      console.error("Erro ao rejeitar candidatura:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.put(
  "/:id/withdraw",
  [auth, isVolunteer, canAccessApplication],
  async (req, res) => {
    try {
      const application = req.application;

      if (!application.canBeWithdrawn()) {
        return res
          .status(400)
          .json({ message: "Esta candidatura não pode ser cancelada" });
      }

      application.status = "withdrawn";
      await application.save();

      application.addNotification(
        "status_change",
        "Voluntário cancelou a candidatura"
      );

      await Action.findByIdAndUpdate(application.action, {
        $inc: { currentVolunteers: -1 },
      });

      res.json({
        message: "Candidatura cancelada com sucesso",
        application,
      });
    } catch (error) {
      console.error("Erro ao cancelar candidatura:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.put(
  "/:id/complete",
  [auth, isONG, canAccessApplication],
  async (req, res) => {
    try {
      const application = req.application;

      if (application.status !== "approved") {
        return res
          .status(400)
          .json({
            message:
              "Apenas candidaturas aprovadas podem ser marcadas como concluídas",
          });
      }

      application.status = "completed";
      await application.save();

      application.addNotification(
        "status_change",
        "Ação concluída! Obrigado pela sua participação."
      );

      res.json({
        message: "Candidatura marcada como concluída",
        application,
      });
    } catch (error) {
      console.error("Erro ao marcar candidatura como concluída:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.put(
  "/:id/notifications/read",
  [auth, canAccessApplication],
  async (req, res) => {
    try {
      const application = req.application;
      await application.markNotificationsAsRead();

      res.json({
        message: "Notificações marcadas como lidas",
        application,
      });
    } catch (error) {
      console.error("Erro ao marcar notificações:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.get("/stats/:ongId?", auth, async (req, res) => {
  try {
    let ongId = req.params.ongId;

    if (!ongId && req.user.type === "ong") {
      ongId = req.user.id;
    }

    const stats = await Application.getStats(ongId);

    res.json({ stats });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;
