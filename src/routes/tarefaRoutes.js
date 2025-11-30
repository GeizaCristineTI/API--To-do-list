const express = require("express");
const tarefaController = require("../controllers/tarefaController");

const router = express.Router();

// POST /tarefas - Criar uma nova tarefa
router.post("/", tarefaController.create);

// GET /tarefas - Listar todas as tarefas
router.get("/", tarefaController.list);

// GET /tarefas/:id - Buscar tarefa por ID
router.get("/:id", tarefaController.getById);

// PUT /tarefas/:id - Atualizar tarefa (completa)
router.put("/:id", tarefaController.update);

// PATCH /tarefas/:id/status - Atualizar apenas o status
router.patch("/:id/status", tarefaController.updateStatus);

// DELETE /tarefas/:id - Deletar tarefa
router.delete("/:id", tarefaController.delete);

module.exports = router;
