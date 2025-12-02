const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Obter token do header
  const token =
    req.header("x-auth-token") ||
    req.header("Authorization")?.replace("Bearer ", "");

  // Verificar se não há token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "voluntariado_secret"
    );

    // Adicionar usuário ao request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    res.status(401).json({ message: "Token inválido" });
  }
};

// Middleware para verificar se é voluntário
module.exports.volunteer = (req, res, next) => {
  if (req.user.type !== "volunteer") {
    return res
      .status(403)
      .json({ message: "Acesso negado. Apenas voluntários." });
  }
  next();
};

// Middleware para verificar se é ONG
module.exports.ong = (req, res, next) => {
  if (req.user.type !== "ong") {
    return res.status(403).json({ message: "Acesso negado. Apenas ONGs." });
  }
  next();
};

// Middleware para verificar se é admin (futuro)
module.exports.admin = (req, res, next) => {
  if (req.user.type !== "admin") {
    return res
      .status(403)
      .json({ message: "Acesso negado. Apenas administradores." });
  }
  next();
};
