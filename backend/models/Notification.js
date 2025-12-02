const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "recipientModel",
      required: true,
    },

    recipientModel: {
      type: String,
      required: true,
      enum: ["User", "ONG"],
    },

    type: {
      type: String,
      enum: [
        "application_status_change",
        "new_application",
        "application_approved",
        "application_rejected",
        "action_reminder",
        "action_cancelled",
        "action_updated",
        "new_message",
        "system_announcement",
        "welcome_message",
        "achievement_unlocked",
        "volunteer_hours_milestone",
        "ong_verification",
        "reminder_24h",
        "reminder_1h",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      maxlength: 100,
    },

    message: {
      type: String,
      required: true,
      maxlength: 500,
    },

    data: {
      applicationId: mongoose.Schema.Types.ObjectId,
      actionId: mongoose.Schema.Types.ObjectId,
      ongId: mongoose.Schema.Types.ObjectId,
      volunteerId: mongoose.Schema.Types.ObjectId,

      actionTitle: String,
      actionDate: Date,

      senderId: mongoose.Schema.Types.ObjectId,
      senderName: String,

      achievementType: String,
      achievementValue: mongoose.Schema.Types.Mixed,

      reminderTime: Date,

      customData: mongoose.Schema.Types.Mixed,
    },

    status: {
      type: String,
      enum: ["unread", "read", "archived"],
      default: "unread",
    },

    priority: {
      type: String,
      enum: ["low", "normal", "high", "urgent"],
      default: "normal",
    },

    emailSent: {
      type: Boolean,
      default: false,
    },

    pushSent: {
      type: Boolean,
      default: false,
    },

    smsSent: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
    },

    archivedAt: {
      type: Date,
    },

    metadata: {
      ipAddress: String,
      userAgent: String,
      source: {
        type: String,
        enum: ["web", "mobile", "api", "system"],
        default: "system",
      },
      category: {
        type: String,
        enum: ["action", "application", "message", "system", "achievement"],
        default: "system",
      },
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ recipient: 1, status: 1 });
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ type: 1, status: 1 });
notificationSchema.index({ priority: 1, status: 1 });
notificationSchema.index({ "data.actionDate": 1, type: 1 });
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // 90 dias

notificationSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    if (this.status === "read" && !this.readAt) {
      this.readAt = new Date();
    } else if (this.status === "archived" && !this.archivedAt) {
      this.archivedAt = new Date();
    }
  }
  next();
});

notificationSchema.methods.markAsRead = function () {
  this.status = "read";
  this.readAt = new Date();
  return this.save();
};

notificationSchema.methods.archive = function () {
  this.status = "archived";
  this.archivedAt = new Date();
  return this.save();
};

notificationSchema.methods.getTimeAgo = function () {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Agora mesmo";
  if (minutes < 60) return `${minutes} min atrás`;
  if (hours < 24) return `${hours}h atrás`;
  if (days < 7) return `${days} dias atrás`;

  return this.createdAt.toLocaleDateString("pt-BR");
};

notificationSchema.methods.getIcon = function () {
  const iconMap = {
    application_status_change: "📋",
    new_application: "👤",
    application_approved: "✅",
    application_rejected: "❌",
    action_reminder: "⏰",
    action_cancelled: "🚫",
    action_updated: "📝",
    new_message: "💬",
    system_announcement: "📢",
    welcome_message: "👋",
    achievement_unlocked: "🏆",
    volunteer_hours_milestone: "⭐",
    ong_verification: "🔍",
    reminder_24h: "⏰",
    reminder_1h: "⏰",
  };
  return iconMap[this.type] || "📌";
};

notificationSchema.methods.getPriorityColor = function () {
  const colorMap = {
    low: "text-gray-500",
    normal: "text-blue-500",
    high: "text-orange-500",
    urgent: "text-red-500",
  };
  return colorMap[this.priority] || "text-blue-500";
};

notificationSchema.statics.createNotification = async function (
  notificationData
) {
  try {
    const notification = new this(notificationData);
    await notification.save();
    return notification;
  } catch (error) {
    console.error("Erro ao criar notificação:", error);
    throw error;
  }
};

notificationSchema.statics.findByRecipient = function (
  recipientId,
  recipientModel,
  options = {}
) {
  const query = {
    recipient: recipientId,
    recipientModel: recipientModel,
  };

  if (options.status) {
    query.status = options.status;
  }

  if (options.type) {
    query.type = options.type;
  }

  if (options.priority) {
    query.priority = options.priority;
  }

  const limit = options.limit || 20;
  const skip = options.skip || 0;

  return this.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
};

notificationSchema.statics.countUnread = function (
  recipientId,
  recipientModel
) {
  return this.countDocuments({
    recipient: recipientId,
    recipientModel: recipientModel,
    status: "unread",
  });
};

notificationSchema.statics.markMultipleAsRead = function (
  recipientId,
  recipientModel,
  notificationIds = null
) {
  const query = {
    recipient: recipientId,
    recipientModel: recipientModel,
    status: "unread",
  };

  if (notificationIds) {
    query._id = { $in: notificationIds };
  }

  return this.updateMany(query, {
    status: "read",
    readAt: new Date(),
  });
};

notificationSchema.statics.cleanOldNotifications = function (daysOld = 90) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);

  return this.deleteMany({
    createdAt: { $lt: cutoffDate },
    status: { $in: ["read", "archived"] },
  });
};

notificationSchema.statics.getStats = async function (
  recipientId,
  recipientModel
) {
  try {
    const stats = await this.aggregate([
      {
        $match: {
          recipient: new mongoose.Types.ObjectId(recipientId),
          recipientModel: recipientModel,
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      total: 0,
      unread: 0,
      read: 0,
      archived: 0,
    };

    stats.forEach((stat) => {
      result[stat._id] = stat.count;
      result.total += stat.count;
    });

    return result;
  } catch (error) {
    console.error("Erro ao buscar estatísticas de notificações:", error);
    return {
      total: 0,
      unread: 0,
      read: 0,
      archived: 0,
    };
  }
};

module.exports = mongoose.model("Notification", notificationSchema);
