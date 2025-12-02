const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const ONG = require("../models/ONG");
const auth = require("../middleware/auth");

const router = express.Router();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "voluntariado_secret", {
    expiresIn: "7d",
  });
};

router.post(
  "/register/volunteer",
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("Nome deve ter entre 2 e 100 caracteres"),
    body("email").isEmail().normalizeEmail().withMessage("Email inválido"),
    body("phone")
      .trim()
      .optional({ nullable: true, checkFalsy: true })
      .isLength({ min: 10 })
      .withMessage("Telefone deve ter pelo menos 10 caracteres"),
    body("city")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Cidade é obrigatória"),
    body("state")
      .trim()
      .isLength({ min: 2, max: 2 })
      .withMessage("Estado deve ter exatamente 2 caracteres"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter pelo menos 6 caracteres"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Erros de validação:", errors.array());
        return res.status(400).json({
          message: "Erro de validação",
          errors: errors.array(),
        });
      }

      const {
        name,
        email,
        phone,
        whatsapp,
        city,
        state,
        password,
        skills,
        interests,
        availability,
      } = req.body;

      console.log("Dados processados:", {
        name,
        email,
        phone,
        city,
        state,
        skills,
        interests,
        availability,
      });

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const user = new User({
        name,
        email,
        phone,
        whatsapp,
        city,
        state,
        password,
        skills: skills || [],
        interests: interests || [],
        availability: availability || {},
      });

      await user.save();

      const token = generateToken({
        id: user._id,
        type: "volunteer",
        email: user.email,
      });

      res.status(201).json({
        message: "Voluntário cadastrado com sucesso!",
        token,
        user: user.toPublicJSON(),
      });
    } catch (error) {
      console.error("Erro ao cadastrar voluntário:", error);

      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (err) => err.message
        );
        return res.status(400).json({
          message: "Erro de validação",
          errors: validationErrors,
        });
      }

      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return res.status(400).json({
          message: `${field} já cadastrado`,
        });
      }

      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.post(
  "/register/ong",
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 200 })
      .withMessage("Nome deve ter entre 2 e 200 caracteres"),
    body("cnpj")
      .trim()
      .matches(/^\d{14}$/)
      .withMessage("CNPJ deve conter exatamente 14 dígitos"),
    body("area")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Área de atuação é obrigatória"),
    body("email").isEmail().normalizeEmail().withMessage("Email inválido"),
    body("city")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Cidade é obrigatória"),
    body("state")
      .trim()
      .isLength({ min: 2, max: 2 })
      .withMessage("Estado deve ter exatamente 2 caracteres"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter pelo menos 6 caracteres"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Erros de validação:", errors.array());
        return res.status(400).json({
          message: "Erro de validação",
          errors: errors.array(),
        });
      }

      const { name, cnpj, area, email, city, state, password } = req.body;

      const existingCNPJ = await ONG.findOne({ cnpj });
      if (existingCNPJ) {
        return res.status(400).json({ message: "CNPJ já cadastrado" });
      }

      const existingEmail = await ONG.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email já cadastrado" });
      }

      const ong = new ONG({
        name,
        cnpj,
        area,
        email,
        city,
        state,
        password,
      });

      await ong.save();

      const token = generateToken({
        id: ong._id,
        type: "ong",
        email: ong.email,
      });

      res.status(201).json({
        message: "ONG cadastrada com sucesso!",
        token,
        ong: ong.toPublicJSON(),
      });
    } catch (error) {
      console.error("Erro ao cadastrar ONG:", error);

      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (err) => err.message
        );
        return res.status(400).json({
          message: "Erro de validação",
          errors: validationErrors,
        });
      }

      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return res.status(400).json({
          message: `${field} já cadastrado`,
        });
      }

      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.post(
  "/login/volunteer",
  [
    body("email").isEmail().normalizeEmail().withMessage("Email inválido"),
    body("password").notEmpty().withMessage("Senha é obrigatória"),
  ],
  async (req, res) => {
    try {
      // Validar inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Erros de validação:", errors.array());
        return res.status(400).json({
          message: "Erro de validação",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      // Buscar usuário
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      if (!user.isActive) {
        return res.status(401).json({ message: "Conta desativada" });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = generateToken({
        id: user._id,
        type: "volunteer",
        email: user.email,
      });

      res.json({
        message: "Login realizado com sucesso!",
        token,
        user: user.toPublicJSON(),
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.post(
  "/login/ong",
  [
    body("email").isEmail().normalizeEmail().withMessage("Email inválido"),
    body("password").notEmpty().withMessage("Senha é obrigatória"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Erros de validação:", errors.array());
        return res.status(400).json({
          message: "Erro de validação",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const ong = await ONG.findOne({ email });
      if (!ong) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const isMatch = await ong.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      if (!ong.isActive) {
        return res.status(401).json({ message: "Conta desativada" });
      }

      ong.lastLogin = new Date();
      await ong.save();

      const token = generateToken({
        id: ong._id,
        type: "ong",
        email: ong.email,
      });

      res.json({
        message: "Login realizado com sucesso!",
        token,
        ong: ong.toPublicJSON(),
      });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.get("/me", auth, async (req, res) => {
  try {
    if (req.user.type === "volunteer") {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.json({ user });
    } else if (req.user.type === "ong") {
      const ong = await ONG.findById(req.user.id).select("-password");
      if (!ong) {
        return res.status(404).json({ message: "ONG não encontrada" });
      }
      res.json({ ong });
    }
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post("/logout", auth, (req, res) => {
  res.json({ message: "Logout realizado com sucesso" });
});

module.exports = router;
