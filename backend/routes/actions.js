const express = require("express");
const { body, validationResult, query } = require("express-validator");
const Action = require("../models/Action");
const Application = require("../models/Application");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.get(
  "/",
  [
    query("area").optional().trim(),
    query("city").optional().trim(),
    query("state").optional().trim(),
    query("dateFrom").optional().isISO8601(),
    query("dateTo").optional().isISO8601(),
    query("tags").optional().isArray(),
    query("search").optional().trim(),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        area,
        city,
        state,
        dateFrom,
        dateTo,
        tags,
        search,
        page = 1,
        limit = 12,
      } = req.query;

      const filters = {};
      if (area) filters.area = area;
      if (city) filters.city = city;
      if (state) filters.state = state;
      if (dateFrom) filters.dateFrom = dateFrom;
      if (dateTo) filters.dateTo = dateTo;
      if (tags) filters.tags = tags;
      if (search) filters.search = search;

      const actions = await Action.findWithFilters(filters)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate("ong", "name logo area city state");

      const total = await Action.countDocuments({
        isActive: true,
        status: "active",
      });

      res.json({
        actions,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      console.error("Erro ao listar ações:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const action = await Action.findById(req.params.id)
      .populate("ong", "name logo area city state description")
      .populate("applications.volunteer", "name email city state");

    if (!action) {
      return res.status(404).json({ message: "Ação não encontrada" });
    }

    if (!action.isActive || action.status !== "active") {
      return res.status(404).json({ message: "Ação não está disponível" });
    }

    res.json({ action });
  } catch (error) {
    console.error("Erro ao buscar ação:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post(
  "/",
  [
    auth,
    body("title")
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage("Título deve ter entre 5 e 200 caracteres"),
    body("description")
      .trim()
      .isLength({ min: 20, max: 2000 })
      .withMessage("Descrição deve ter entre 20 e 2000 caracteres"),
    body("area")
      .trim()
      .isIn([
        "Assistência Social",
        "Educação",
        "Saúde",
        "Meio Ambiente",
        "Cultura",
        "Esporte",
        "Direitos Humanos",
        "Tecnologia",
        "Outros",
      ])
      .withMessage("Área inválida"),
    body("location.city")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Cidade é obrigatória"),
    body("location.state")
      .trim()
      .isLength({ min: 2, max: 2 })
      .withMessage("Estado deve ter 2 caracteres"),
    body("date").isISO8601().withMessage("Data inválida"),
    body("maxVolunteers")
      .isInt({ min: 1, max: 1000 })
      .withMessage("Número máximo de voluntários deve ser entre 1 e 1000"),
    body("requirements")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Requisitos não podem ter mais de 500 caracteres"),
    body("tags").optional().isArray().withMessage("Tags devem ser um array"),
    body("images")
      .optional()
      .isArray()
      .withMessage("Images deve ser um array de objetos { url, caption }"),
    body("images.*.url")
      .optional()
      .isURL()
      .withMessage("URL de imagem inválida"),
    body("images.*.caption").optional().isString(),
  ],
  async (req, res) => {
    try {
      if (req.user.type !== "ong") {
        return res
          .status(403)
          .json({ message: "Apenas ONGs podem criar ações" });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        description,
        area,
        location,
        date,
        time,
        duration,
        maxVolunteers,
        requirements,
        skills,
        tags,
        contactInfo,
        additionalInfo,
        images,
      } = req.body;

      if (new Date(date) <= new Date()) {
        return res.status(400).json({ message: "Data deve ser no futuro" });
      }

      const action = new Action({
        title,
        description,
        area,
        location,
        date,
        time,
        duration,
        maxVolunteers,
        requirements,
        skills: skills || [],
        tags: tags || [],
        ong: req.user.id,
        contactInfo,
        additionalInfo,
        images: Array.isArray(images) ? images : [],
        status: "active",
      });

      await action.save();

      await action.populate("ong", "name logo area city state");

      res.status(201).json({
        message: "Ação criada com sucesso!",
        action,
      });
    } catch (error) {
      console.error("Erro ao criar ação:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.put(
  "/:id",
  [
    auth,
    body("title")
      .optional()
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage("Título deve ter entre 5 e 200 caracteres"),
    body("description")
      .optional()
      .trim()
      .isLength({ min: 20, max: 2000 })
      .withMessage("Descrição deve ter entre 20 e 2000 caracteres"),
    body("area")
      .optional()
      .trim()
      .isIn([
        "Assistência Social",
        "Educação",
        "Saúde",
        "Meio Ambiente",
        "Cultura",
        "Esporte",
        "Direitos Humanos",
        "Tecnologia",
        "Outros",
      ])
      .withMessage("Área inválida"),
    body("maxVolunteers")
      .optional()
      .isInt({ min: 1, max: 1000 })
      .withMessage("Número máximo de voluntários deve ser entre 1 e 1000"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const action = await Action.findById(req.params.id);
      if (!action) {
        return res.status(404).json({ message: "Ação não encontrada" });
      }

      if (action.ong.toString() !== req.user.id) {
        return res.status(403).json({ message: "Não autorizado" });
      }

      if (action.status === "in_progress" || action.status === "completed") {
        return res.status(400).json({
          message: "Não é possível editar ações em andamento ou concluídas",
        });
      }

      const updatedAction = await Action.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      ).populate("ong", "name logo area city state");

      res.json({
        message: "Ação atualizada com sucesso!",
        action: updatedAction,
      });
    } catch (error) {
      console.error("Erro ao atualizar ação:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);
    if (!action) {
      return res.status(404).json({ message: "Ação não encontrada" });
    }

    if (action.ong.toString() !== req.user.id) {
      return res.status(403).json({ message: "Não autorizado" });
    }

    const approvedApplications = action.applications.filter(
      (app) => app.status === "approved"
    );
    if (approvedApplications.length > 0) {
      return res.status(400).json({
        message: "Não é possível deletar ações com voluntários aprovados",
      });
    }

    await Action.findByIdAndDelete(req.params.id);

    res.json({ message: "Ação deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar ação:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/:id/application-status", auth, async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);
    if (!action) {
      return res.status(404).json({ message: "Ação não encontrada" });
    }

    const existingApplication = await Application.findOne({
      volunteer: req.user.id,
      action: req.params.id,
    });

    if (existingApplication) {
      return res.json({
        hasApplied: true,
        application: existingApplication,
        status: existingApplication.status || "pending",
      });
    }

    res.json({
      hasApplied: false,
      application: null,
      status: null,
    });
  } catch (error) {
    console.error("Erro ao verificar status de candidatura:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post(
  "/:id/apply",
  [
    auth,
    body("notes")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Notas não podem ter mais de 500 caracteres"),
  ],
  async (req, res) => {
    try {
      if (req.user.type !== "volunteer") {
        return res
          .status(403)
          .json({ message: "Apenas voluntários podem se candidatar" });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const action = await Action.findById(req.params.id);
      if (!action) {
        return res.status(404).json({ message: "Ação não encontrada" });
      }

      if (!action.isActiveAction()) {
        return res
          .status(400)
          .json({ message: "Ação não está disponível para candidaturas" });
      }

      if (action.isFull()) {
        return res
          .status(400)
          .json({ message: "Ação está com vagas esgotadas" });
      }

      const existingApplication = await Application.findOne({
        volunteer: req.user.id,
        action: req.params.id,
      });

      if (existingApplication) {
        return res
          .status(400)
          .json({ message: "Você já se candidatou para esta ação" });
      }

      const volunteer = await User.findById(req.user.id);
      if (!volunteer) {
        return res.status(404).json({ message: "Voluntário não encontrado" });
      }

      const application = new Application({
        volunteer: req.user.id,
        action: req.params.id,
        ong: action.ong,
        message:
          req.body.notes || "Interessado em participar desta ação social.",
        skills: volunteer.skills || [],
        availability: { flexible: true },
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

      await Action.findByIdAndUpdate(req.params.id, {
        $inc: { currentVolunteers: 1 },
      });

      const populatedApplication = await Application.findById(application._id)
        .populate("action", "title area date time location")
        .populate("ong", "name logo area")
        .populate("volunteer", "name email avatar");

      res.json({
        message: "Candidatura enviada com sucesso!",
        application: populatedApplication,
      });
    } catch (error) {
      console.error("Erro ao candidatar-se:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.put(
  "/:id/applications/:applicationId",
  [
    auth,
    body("status")
      .isIn(["approved", "rejected", "withdrawn"])
      .withMessage("Status inválido"),
    body("notes")
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage("Notas não podem ter mais de 500 caracteres"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const action = await Action.findById(req.params.id);
      if (!action) {
        return res.status(404).json({ message: "Ação não encontrada" });
      }

      if (action.ong.toString() !== req.user.id) {
        return res.status(403).json({ message: "Não autorizado" });
      }

      const application = action.applications.id(req.params.applicationId);
      if (!application) {
        return res.status(404).json({ message: "Candidatura não encontrada" });
      }

      const { status, notes } = req.body;

      if (status === "approved" && action.isFull()) {
        return res
          .status(400)
          .json({ message: "Ação está com vagas esgotadas" });
      }

      application.status = status;
      if (notes) application.notes = notes;
      if (status === "approved") {
        application.approvedAt = new Date();
      }

      await action.save();

      res.json({
        message: "Status da candidatura atualizado com sucesso!",
        application,
      });
    } catch (error) {
      console.error("Erro ao atualizar candidatura:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

module.exports = router;
