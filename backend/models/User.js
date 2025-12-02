const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      maxlength: [100, "Nome não pode ter mais de 100 caracteres"],
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    whatsapp: {
      type: String,
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
    contact: {
      type: String,
      required: false,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Senha é obrigatória"],
      minlength: [6, "Senha deve ter pelo menos 6 caracteres"],
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    interests: [
      {
        type: String,
        trim: true,
      },
    ],
    availability: {
      weekdays: {
        type: Boolean,
        default: false,
      },
      weekends: {
        type: Boolean,
        default: false,
      },
      morning: {
        type: Boolean,
        default: false,
      },
      afternoon: {
        type: Boolean,
        default: false,
      },
      evening: {
        type: Boolean,
        default: false,
      },
    },
    profileImage: {
      type: String,
      default: null,
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
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });
userSchema.index({ city: 1, state: 1 });
userSchema.index({ skills: 1 });
userSchema.index({ interests: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toPublicJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

module.exports = mongoose.model("User", userSchema);
