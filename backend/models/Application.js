const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Action",
      required: true,
    },

    ong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ONG",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "withdrawn", "completed"],
      default: "pending",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    respondedAt: {
      type: Date,
    },

    rejectionReason: {
      type: String,
      maxlength: 500,
    },

    message: {
      type: String,
      maxlength: 1000,
    },

    ongResponse: {
      type: String,
      maxlength: 1000,
    },

    skills: [
      {
        type: String,
      },
    ],

    availability: {
      startDate: Date,
      endDate: Date,
      flexible: {
        type: Boolean,
        default: true,
      },
    },

    volunteerHistory: {
      totalHours: {
        type: Number,
        default: 0,
      },
      totalActions: {
        type: Number,
        default: 0,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
    },

    notifications: [
      {
        type: {
          type: String,
          enum: [
            "status_change",
            "reminder",
            "message",
            "reminder_24h",
            "reminder_1h",
          ],
        },
        message: String,
        read: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    metadata: {
      ipAddress: String,
      userAgent: String,
      source: {
        type: String,
        enum: ["web", "mobile", "api"],
        default: "web",
      },
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index({ volunteer: 1, action: 1 }, { unique: true });
applicationSchema.index({ action: 1, status: 1 });
applicationSchema.index({ ong: 1, status: 1 });
applicationSchema.index({ status: 1, appliedAt: 1 });
applicationSchema.index({ "notifications.read": 1, volunteer: 1 });

applicationSchema.pre("save", function (next) {
  if (this.isModified("status") && this.status !== "pending") {
    this.respondedAt = new Date();
  }
  next();
});

applicationSchema.methods.addNotification = function (type, message) {
  this.notifications.push({
    type,
    message,
    read: false,
  });
  return this.save();
};

applicationSchema.methods.markNotificationsAsRead = function () {
  this.notifications.forEach((notification) => {
    notification.read = true;
  });
  return this.save();
};

applicationSchema.methods.getTimeSinceApplication = function () {
  const now = new Date();
  const diff = now - this.appliedAt;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days} dia${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hora${hours > 1 ? "s" : ""}`;
  } else {
    return "Menos de 1 hora";
  }
};

applicationSchema.methods.canBeApproved = function () {
  return this.status === "pending";
};

applicationSchema.methods.canBeRejected = function () {
  return this.status === "pending";
};

applicationSchema.methods.canBeWithdrawn = function () {
  return ["pending", "approved"].includes(this.status);
};

applicationSchema.statics.findByVolunteer = function (
  volunteerId,
  options = {}
) {
  const query = { volunteer: volunteerId };

  if (options.status) {
    query.status = options.status;
  }

  return this.find(query)
    .populate("action", "title area date time location")
    .populate("ong", "name logo area")
    .sort({ appliedAt: -1 });
};

applicationSchema.statics.findByAction = function (actionId, options = {}) {
  const query = { action: actionId };

  if (options.status) {
    query.status = options.status;
  }

  return this.find(query)
    .populate("volunteer", "name email avatar skills")
    .sort({ appliedAt: 1 });
};

applicationSchema.statics.findByONG = function (ongId, options = {}) {
  const query = { ong: ongId };

  if (options.status) {
    query.status = options.status;
  }

  if (options.action) {
    query.action = options.action;
  }

  return this.find(query)
    .populate("action", "title area date time location")
    .populate("volunteer", "name email avatar skills")
    .sort({ appliedAt: -1 });
};

applicationSchema.statics.getStats = async function (ongId = null) {
  const match = ongId ? { ong: ongId } : {};

  const stats = await this.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const result = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    withdrawn: 0,
    completed: 0,
  };

  stats.forEach((stat) => {
    result[stat._id] = stat.count;
    result.total += stat.count;
  });

  return result;
};

module.exports = mongoose.model("Application", applicationSchema);
