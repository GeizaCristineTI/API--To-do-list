const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tarefa = sequelize.define(
  "Tarefa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Título não pode ser vazio",
        },
        len: {
          args: [1, 255],
          msg: "Título deve ter entre 1 e 255 caracteres",
        },
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("a fazer", "em andamento", "concluída"),
      defaultValue: "a fazer",
      validate: {
        isIn: {
          args: [["a fazer", "em andamento", "concluída"]],
          msg: 'Status deve ser: "a fazer", "em andamento" ou "concluída"',
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "tarefas",
    timestamps: true,
  }
);

module.exports = Tarefa;
