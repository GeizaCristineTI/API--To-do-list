const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Sincronizar banco de dados e iniciar servidor
async function startServer() {
  try {
    // Sincronizar Sequelize com o banco de dados
    await sequelize.sync({ alter: false });
    console.log("✓ Banco de dados sincronizado com sucesso");

    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`✓ Servidor rodando em http://localhost:${PORT}`);
      console.log(`✓ Documentação disponível em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("✗ Erro ao iniciar servidor:", error.message);
    process.exit(1);
  }
}

startServer();
