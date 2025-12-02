const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const auth = require("../middleware/auth");
const { body, validationResult, query } = require("express-validator");

const canAccessNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notificação não encontrada" });
    }

    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    req.notification = notification;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

router.get(
  "/",
  [
    auth,
    query("status").optional().isIn(["unread", "read", "archived"]),
    query("type").optional().isString(),
    query("priority").optional().isIn(["low", "normal", "high", "urgent"]),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { status, type, priority, page = 1, limit = 20 } = req.query;

      const recipientModel = req.user.type === "ong" ? "ONG" : "User";
      const recipientId = req.user.id;

      const options = {};
      if (status) options.status = status;
      if (type) options.type = type;
      if (priority) options.priority = priority;

      const skip = (page - 1) * limit;
      options.skip = skip;
      options.limit = parseInt(limit);

      const notifications = await Notification.findByRecipient(
        recipientId,
        recipientModel,
        options
      );

      const totalQuery = { recipient: recipientId, recipientModel };
      if (status) totalQuery.status = status;
      if (type) totalQuery.type = type;
      if (priority) totalQuery.priority = priority;

      const total = await Notification.countDocuments(totalQuery);
      const totalPages = Math.ceil(total / limit);

      res.json({
        notifications,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalNotifications: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.get("/unread/count", auth, async (req, res) => {
  try {
    const recipientModel = req.user.type === "ong" ? "ONG" : "User";
    const recipientId = req.user.id;

    const count = await Notification.countUnread(recipientId, recipientModel);

    res.json({ unreadCount: count });
  } catch (error) {
    console.error("Erro ao contar notificações não lidas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/:id", [auth, canAccessNotification], async (req, res) => {
  try {
    res.json({ notification: req.notification });
  } catch (error) {
    console.error("Erro ao buscar notificação:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.put("/:id/read", [auth, canAccessNotification], async (req, res) => {
  try {
    await req.notification.markAsRead();

    res.json({
      message: "Notificação marcada como lida",
      notification: req.notification,
    });
  } catch (error) {
    console.error("Erro ao marcar notificação como lida:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.put("/:id/archive", [auth, canAccessNotification], async (req, res) => {
  try {
    await req.notification.archive();

    res.json({
      message: "Notificação arquivada",
      notification: req.notification,
    });
  } catch (error) {
    console.error("Erro ao arquivar notificação:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.put(
  "/read-all",
  [auth, body("notificationIds").optional().isArray()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { notificationIds } = req.body;
      const recipientModel = req.user.userType === "ong" ? "ONG" : "User";
      const recipientId =
        req.user.userType === "ong" ? req.user.ongId : req.user.id;

      const result = await Notification.markMultipleAsRead(
        recipientId,
        recipientModel,
        notificationIds
      );

      res.json({
        message: `${result.modifiedCount} notificação(ões) marcada(s) como lida(s)`,
        modifiedCount: result.modifiedCount,
      });
    } catch (error) {
      console.error("Erro ao marcar notificações como lidas:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.put(
  "/archive-all",
  [auth, body("notificationIds").optional().isArray()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { notificationIds } = req.body;
      const recipientModel = req.user.userType === "ong" ? "ONG" : "User";
      const recipientId =
        req.user.userType === "ong" ? req.user.ongId : req.user.id;

      const query = {
        recipient: recipientId,
        recipientModel: recipientModel,
        status: { $in: ["unread", "read"] },
      };

      if (notificationIds) {
        query._id = { $in: notificationIds };
      }

      const result = await Notification.updateMany(query, {
        status: "archived",
        archivedAt: new Date(),
      });

      res.json({
        message: `${result.modifiedCount} notificação(ões) arquivada(s)`,
        modifiedCount: result.modifiedCount,
      });
    } catch (error) {
      console.error("Erro ao arquivar notificações:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.delete("/:id", [auth, canAccessNotification], async (req, res) => {
  try {
    await req.notification.remove();

    res.json({
      message: "Notificação deletada com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar notificação:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.delete(
  "/clear-old",
  [auth, body("daysOld").optional().isInt({ min: 1, max: 365 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { daysOld = 90 } = req.body;
      const recipientModel = req.user.userType === "ong" ? "ONG" : "User";
      const recipientId =
        req.user.userType === "ong" ? req.user.ongId : req.user.id;

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const result = await Notification.deleteMany({
        recipient: recipientId,
        recipientModel: recipientModel,
        createdAt: { $lt: cutoffDate },
        status: { $in: ["read", "archived"] },
      });

      res.json({
        message: `${result.deletedCount} notificação(ões) antiga(s) removida(s)`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      console.error("Erro ao limpar notificações antigas:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.get("/stats/summary", auth, async (req, res) => {
  try {
    const recipientModel = req.user.type === "ong" ? "ONG" : "User";
    const recipientId = req.user.id;

    const stats = await Notification.getStats(recipientId, recipientModel);

    res.json({ stats });
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

if (process.env.NODE_ENV === "development") {
  router.post(
    "/test",
    [
      auth,
      body("type").isIn([
        "application_status_change",
        "new_application",
        "action_reminder",
        "system_announcement",
      ]),
      body("title").isLength({ min: 1, max: 100 }),
      body("message").isLength({ min: 1, max: 500 }),
      body("priority").optional().isIn(["low", "normal", "high", "urgent"]),
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { type, title, message, priority = "normal" } = req.body;
        const recipientModel = req.user.type === "ong" ? "ONG" : "User";
        const recipientId = req.user.id;

        const notification = await Notification.createNotification({
          recipient: recipientId,
          recipientModel: recipientModel,
          type,
          title,
          message,
          priority,
          metadata: {
            source: "api",
            category: "system",
          },
        });

        res.status(201).json({
          message: "Notificação de teste criada",
          notification,
        });
      } catch (error) {
        console.error("Erro ao criar notificação de teste:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  );
}

module.exports = router;
