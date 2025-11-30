const { Tarefa } = require("../models");

// Criar uma nova tarefa
exports.create = async (req, res) => {
  try {
    const { titulo, descricao, status } = req.body;

    // Validação básica
    if (!titulo || titulo.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Título é obrigatório e não pode ser vazio",
      });
    }

    // Se status foi enviado, validar
    const statusValidos = ["a fazer", "em andamento", "concluída"];
    if (status && !statusValidos.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status inválido. Valores permitidos: ${statusValidos.join(
          ", "
        )}`,
      });
    }

    const tarefa = await Tarefa.create({
      titulo: titulo.trim(),
      descricao: descricao || null,
      status: status || "a fazer",
    });

    return res.status(201).json({
      success: true,
      message: "Tarefa criada com sucesso",
      data: tarefa,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao criar tarefa",
      error: error.message,
    });
  }
};

// Listar todas as tarefas
exports.list = async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Tarefas listadas com sucesso",
      data: tarefas,
      total: tarefas.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao listar tarefas",
      error: error.message,
    });
  }
};

// Buscar tarefa por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json({
        success: false,
        message: `Tarefa com ID ${id} não encontrada`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tarefa encontrada",
      data: tarefa,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar tarefa",
      error: error.message,
    });
  }
};

// Atualizar tarefa (PUT - atualização completa)
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json({
        success: false,
        message: `Tarefa com ID ${id} não encontrada`,
      });
    }

    // Validar campos obrigatórios
    if (!titulo || titulo.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Título é obrigatório e não pode ser vazio",
      });
    }

    // Validar status se fornecido
    const statusValidos = ["a fazer", "em andamento", "concluída"];
    if (status && !statusValidos.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status inválido. Valores permitidos: ${statusValidos.join(
          ", "
        )}`,
      });
    }

    await tarefa.update({
      titulo: titulo.trim(),
      descricao: descricao || null,
      status: status || tarefa.status,
    });

    return res.status(200).json({
      success: true,
      message: "Tarefa atualizada com sucesso",
      data: tarefa,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar tarefa",
      error: error.message,
    });
  }
};

// Atualizar status (PATCH - atualização parcial)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status é obrigatório",
      });
    }

    const statusValidos = ["a fazer", "em andamento", "concluída"];
    if (!statusValidos.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status inválido. Valores permitidos: ${statusValidos.join(
          ", "
        )}`,
      });
    }

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json({
        success: false,
        message: `Tarefa com ID ${id} não encontrada`,
      });
    }

    await tarefa.update({ status });

    return res.status(200).json({
      success: true,
      message: "Status da tarefa atualizado com sucesso",
      data: tarefa,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar status",
      error: error.message,
    });
  }
};

// Deletar tarefa
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const tarefa = await Tarefa.findByPk(id);

    if (!tarefa) {
      return res.status(404).json({
        success: false,
        message: `Tarefa com ID ${id} não encontrada`,
      });
    }

    await tarefa.destroy();

    return res.status(200).json({
      success: true,
      message: "Tarefa deletada com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar tarefa",
      error: error.message,
    });
  }
};
