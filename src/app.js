const express = require("express");
require("dotenv").config();

const tarefaRoutes = require("./routes/tarefaRoutes");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rotas da API
app.use("/tarefas", tarefaRoutes);

// Rota raiz (health check)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API de Tarefas está funcionando!",
    version: "1.0.0",
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

module.exports = app;
