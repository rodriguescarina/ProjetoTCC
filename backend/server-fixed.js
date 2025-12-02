const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - deve vir antes de outros middlewares de segurança
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Middleware de segurança
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());

// Servir arquivos estáticos (uploads)
app.use("/uploads", express.static("uploads"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requests por IP
  message: "Muitas requisições deste IP, tente novamente mais tarde.",
});
app.use("/api/", limiter);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Função para conectar ao MongoDB com timeout
const connectToMongoDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/voluntariado";

    // Configuração com timeout para evitar loop infinito
    const options = {
      serverSelectionTimeoutMS: 5000, // 5 segundos
      socketTimeoutMS: 45000, // 45 segundos
      connectTimeoutMS: 10000, // 10 segundos
    };

    await mongoose.connect(mongoURI, options);
    console.log("✅ Conectado ao MongoDB");
    return true;
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
    console.log(
      "⚠️  Servidor funcionando sem MongoDB - algumas funcionalidades podem não funcionar"
    );
    return false;
  }
};

// Conectar ao MongoDB de forma assíncrona
connectToMongoDB();

// Rotas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/ongs", require("./routes/ongs"));
app.use("/api/actions", require("./routes/actions"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/content", require("./routes/content"));
app.use("/api/stats", require("./routes/stats"));

// Rota de teste
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API de Voluntariado funcionando!",
    timestamp: new Date().toISOString(),
    mongodb:
      mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado",
  });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Rota 404
app.use("*", (req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Frontend: http://localhost:3000`);
  console.log(`🔧 API: http://localhost:${PORT}/api`);
});
