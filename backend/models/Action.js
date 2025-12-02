const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Título é obrigatório"],
      trim: true,
      maxlength: [200, "Título não pode ter mais de 200 caracteres"],
    },
    description: {
      type: String,
      required: [true, "Descrição é obrigatória"],
      trim: true,
      maxlength: [2000, "Descrição não pode ter mais de 2000 caracteres"],
    },
    area: {
      type: String,
      required: [true, "Área de atuação é obrigatória"],
      trim: true,
      enum: [
        "Assistência Social",
        "Educação",
        "Saúde",
        "Meio Ambiente",
        "Cultura",
        "Esporte",
        "Direitos Humanos",
        "Tecnologia",
        "Outros",
      ],
    },
    location: {
      city: {
        type: String,
        required: [true, "Cidade é obrigatória"],
        trim: true,
      },
      state: {
        type: String,
        required: [true, "Estado é obrigatório"],
        trim: true,
        maxlength: 2,
      },
      address: {
        type: String,
        trim: true,
      },
      neighborhood: {
        type: String,
        trim: true,
      },
    },
    date: {
      type: Date,
      required: [true, "Data é obrigatória"],
    },
    time: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
      min: [0.5, "Duração mínima é 0.5 horas"],
      max: [24, "Duração máxima é 24 horas"],
    },
    maxVolunteers: {
      type: Number,
      required: [true, "Número máximo de voluntários é obrigatório"],
      min: [1, "Mínimo de 1 voluntário"],
      max: [1000, "Máximo de 1000 voluntários"],
    },
    currentVolunteers: {
      type: Number,
      default: 0,
      min: 0,
    },
    requirements: {
      type: String,
      trim: true,
      maxlength: [500, "Requisitos não podem ter mais de 500 caracteres"],
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    ong: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ONG",
      required: [true, "ONG é obrigatória"],
    },
    status: {
      type: String,
      enum: ["draft", "active", "in_progress", "completed", "cancelled"],
      default: "draft",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    applications: [
      {
        volunteer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected", "withdrawn"],
          default: "pending",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
        approvedAt: {
          type: Date,
        },
        notes: {
          type: String,
          trim: true,
          maxlength: [500, "Notas não podem ter mais de 500 caracteres"],
        },
      },
    ],
    images: [
      {
        url: String,
        caption: String,
      },
    ],
    contactInfo: {
      phone: String,
      email: String,
      whatsapp: String,
    },
    additionalInfo: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        "Informações adicionais não podem ter mais de 1000 caracteres",
      ],
    },
  },
  {
    timestamps: true,
  }
);

actionSchema.index({ area: 1 });
actionSchema.index({ "location.city": 1, "location.state": 1 });
actionSchema.index({ date: 1 });
actionSchema.index({ status: 1, isActive: 1 });
actionSchema.index({ ong: 1 });
actionSchema.index({ tags: 1 });
actionSchema.index({ createdAt: -1 });

actionSchema.pre("save", function (next) {
  if (this.isModified("applications")) {
    this.currentVolunteers = this.applications.filter(
      (app) => app.status === "approved"
    ).length;
  }
  next();
});

actionSchema.methods.isFull = function () {
  return this.currentVolunteers >= this.maxVolunteers;
};

actionSchema.methods.isActiveAction = function () {
  return this.isActive && this.status === "active";
};

actionSchema.methods.toPublicJSON = function () {
  const action = this.toObject();
  delete action.__v;
  return action;
};

actionSchema.statics.findWithFilters = function (filters = {}) {
  const query = { isActive: true, status: "active" };

  if (filters.area) query.area = filters.area;
  if (filters.city) query["location.city"] = new RegExp(filters.city, "i");
  if (filters.state) query["location.state"] = filters.state;
  if (filters.dateFrom) query.date = { $gte: new Date(filters.dateFrom) };
  if (filters.dateTo)
    query.date = { ...query.date, $lte: new Date(filters.dateTo) };
  if (filters.tags && filters.tags.length > 0) {
    query.tags = { $in: filters.tags };
  }
  if (filters.search) {
    query.$or = [
      { title: new RegExp(filters.search, "i") },
      { description: new RegExp(filters.search, "i") },
    ];
  }

  return this.find(query)
    .populate("ong", "name logo area")
    .sort({ date: 1, createdAt: -1 });
};

module.exports = mongoose.model("Action", actionSchema);
