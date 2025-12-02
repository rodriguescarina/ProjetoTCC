const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ongSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome da instituição é obrigatório"],
      trim: true,
      maxlength: [200, "Nome não pode ter mais de 200 caracteres"],
    },
    cnpj: {
      type: String,
      required: [true, "CNPJ é obrigatório"],
      unique: true,
      trim: true,
      match: [/^\d{14}$/, "CNPJ deve conter exatamente 14 dígitos"],
    },
    area: {
      type: String,
      required: [true, "Área de atuação é obrigatória"],
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [1000, "Descrição não pode ter mais de 1000 caracteres"],
    },
    contactPerson: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email institucional é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
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
      street: String,
      neighborhood: String,
      number: String,
      complement: String,
      zipCode: String,
    },
    website: {
      type: String,
      trim: true,
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      linkedin: String,
      twitter: String,
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter pelo menos 6 caracteres"],
    },
    logo: {
      type: String,
      default: null,
    },
    banner: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    stats: {
      totalActions: {
        type: Number,
        default: 0,
      },
      totalVolunteers: {
        type: Number,
        default: 0,
      },
      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      reviews: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

ongSchema.index({ cnpj: 1 });
ongSchema.index({ email: 1 });
ongSchema.index({ city: 1, state: 1 });
ongSchema.index({ area: 1 });
ongSchema.index({ isVerified: 1, isActive: 1 });

ongSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

ongSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

ongSchema.methods.toPublicJSON = function () {
  const ong = this.toObject();
  delete ong.password;
  delete ong.__v;
  return ong;
};

ongSchema.methods.updateStats = function () {
  return this.model("Action")
    .countDocuments({ ong: this._id, isActive: true })
    .then((count) => {
      this.stats.totalActions = count;
      return this.save();
    });
};

module.exports = mongoose.model("ONG", ongSchema);
