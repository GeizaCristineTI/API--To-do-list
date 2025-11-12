# API REST de Tarefas

Uma API REST em Node.js para gerenciar tarefas, desenvolvida com **Express**, **Sequelize ORM** e **SQLite**, seguindo as melhores práticas de desenvolvimento e convenções do mercado.

---

## 📋 Funcionalidades

- ✅ Criar tarefas com título, descrição e status
- ✅ Listar todas as tarefas
- ✅ Buscar uma tarefa por ID
- ✅ Atualizar tarefas (PUT - completo)
- ✅ Atualizar apenas o status (PATCH - parcial)
- ✅ Deletar tarefas
- ✅ Validação de dados de entrada
- ✅ Banco de dados com SQLite e ORM Sequelize

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web minimalista
- **Sequelize** - ORM para Node.js
- **SQLite** - Banco de dados relacional leve
- **dotenv** - Gerenciamento de variáveis de ambiente

---

## 📦 Pré-requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)

---

## 🚀 Instalação e Execução

### 1. Clonar ou abrir o projeto

```bash
cd projeto-m2
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

O arquivo `.env` já está criado com valores padrão. Você pode ajustá-lo conforme necessário:

```env
NODE_ENV=development
PORT=3000
DATABASE_PATH=./database.sqlite
```

### 4. Iniciar o servidor

**Modo de produção:**

```bash
npm start
```

**Modo desenvolvimento (com auto-reload):**

```bash
npm run dev
```

O servidor iniciará em: `http://localhost:3000`

---

## 📚 Endpoints da API

### 1. Criar uma Tarefa

**POST** `/tarefas`

**Corpo da requisição:**

```json
{
  "titulo": "Estudar Node.js",
  "descricao": "Aprender Express e Sequelize",
  "status": "a fazer"
}
```

**Resposta (201 Created):**

```json
{
  "success": true,
  "message": "Tarefa criada com sucesso",
  "data": {
    "id": 1,
    "titulo": "Estudar Node.js",
    "descricao": "Aprender Express e Sequelize",
    "status": "a fazer",
    "createdAt": "2025-11-11T10:30:00.000Z",
    "updatedAt": "2025-11-11T10:30:00.000Z"
  }
}
```

---

### 2. Listar Todas as Tarefas

**GET** `/tarefas`

**Resposta (200 OK):**

```json
{
  "success": true,
  "message": "Tarefas listadas com sucesso",
  "total": 2,
  "data": [
    {
      "id": 1,
      "titulo": "Estudar Node.js",
      "descricao": "Aprender Express e Sequelize",
      "status": "a fazer",
      "createdAt": "2025-11-11T10:30:00.000Z",
      "updatedAt": "2025-11-11T10:30:00.000Z"
    },
    {
      "id": 2,
      "titulo": "Fazer projeto",
      "descricao": null,
      "status": "em andamento",
      "createdAt": "2025-11-11T10:35:00.000Z",
      "updatedAt": "2025-11-11T10:35:00.000Z"
    }
  ]
}
```

---

### 3. Buscar Tarefa por ID

**GET** `/tarefas/:id`

**Exemplo:** `GET /tarefas/1`

**Resposta (200 OK):**

```json
{
  "success": true,
  "message": "Tarefa encontrada",
  "data": {
    "id": 1,
    "titulo": "Estudar Node.js",
    "descricao": "Aprender Express e Sequelize",
    "status": "a fazer",
    "createdAt": "2025-11-11T10:30:00.000Z",
    "updatedAt": "2025-11-11T10:30:00.000Z"
  }
}
```

**Resposta (404 Not Found):**

```json
{
  "success": false,
  "message": "Tarefa com ID 999 não encontrada"
}
```

---

### 4. Atualizar uma Tarefa (PUT)

**PUT** `/tarefas/:id`

**Exemplo:** `PUT /tarefas/1`

**Corpo da requisição:**

```json
{
  "titulo": "Estudar Node.js e Express",
  "descricao": "Aprender backend com Node.js",
  "status": "em andamento"
}
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "message": "Tarefa atualizada com sucesso",
  "data": {
    "id": 1,
    "titulo": "Estudar Node.js e Express",
    "descricao": "Aprender backend com Node.js",
    "status": "em andamento",
    "createdAt": "2025-11-11T10:30:00.000Z",
    "updatedAt": "2025-11-11T10:40:00.000Z"
  }
}
```

---

### 5. Atualizar Status (PATCH)

**PATCH** `/tarefas/:id/status`

**Exemplo:** `PATCH /tarefas/1/status`

**Corpo da requisição:**

```json
{
  "status": "concluída"
}
```

**Resposta (200 OK):**

```json
{
  "success": true,
  "message": "Status da tarefa atualizado com sucesso",
  "data": {
    "id": 1,
    "titulo": "Estudar Node.js",
    "descricao": "Aprender Express e Sequelize",
    "status": "concluída",
    "createdAt": "2025-11-11T10:30:00.000Z",
    "updatedAt": "2025-11-11T10:45:00.000Z"
  }
}
```

---

### 6. Deletar uma Tarefa

**DELETE** `/tarefas/:id`

**Exemplo:** `DELETE /tarefas/1`

**Resposta (200 OK):**

```json
{
  "success": true,
  "message": "Tarefa deletada com sucesso"
}
```

**Resposta (404 Not Found):**

```json
{
  "success": false,
  "message": "Tarefa com ID 999 não encontrada"
}
```

---

## 🔍 Status Disponíveis

A API aceita apenas os seguintes valores para o campo `status`:

- `"a fazer"` - Tarefa ainda não iniciada
- `"em andamento"` - Tarefa em progresso
- `"concluída"` - Tarefa finalizada

---

## ✔️ Validações

A API realiza as seguintes validações:

1. **Título obrigatório**: Não pode ser vazio ou nulo
2. **Título máximo**: Até 255 caracteres
3. **Status válido**: Deve ser um dos valores permitidos
4. **ID válido**: Deve existir no banco de dados

---

## 📁 Estrutura do Projeto

```
projeto-m2/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração Sequelize + SQLite
│   ├── models/
│   │   ├── index.js             # Índice dos modelos
│   │   └── Tarefa.js            # Modelo Tarefa
│   ├── controllers/
│   │   └── tarefaController.js  # Lógica dos endpoints
│   ├── routes/
│   │   └── tarefaRoutes.js      # Definição das rotas
│   ├── app.js                   # Configuração Express
│   └── server.js                # Inicialização do servidor
├── .env                          # Variáveis de ambiente
├── .gitignore                    # Arquivos ignorados pelo Git
├── package.json                  # Dependências do projeto
└── README.md                     # Este arquivo
```

---

## 🧪 Testando a API

### Com cURL

```bash
# Criar tarefa
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Minha tarefa","descricao":"Descrição","status":"a fazer"}'

# Listar tarefas
curl http://localhost:3000/tarefas

# Buscar por ID
curl http://localhost:3000/tarefas/1

# Atualizar tarefa
curl -X PUT http://localhost:3000/tarefas/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Tarefa atualizada","descricao":"Nova descrição","status":"em andamento"}'

# Atualizar status
curl -X PATCH http://localhost:3000/tarefas/1/status \
  -H "Content-Type: application/json" \
  -d '{"status":"concluída"}'

# Deletar tarefa
curl -X DELETE http://localhost:3000/tarefas/1
```

### Com Postman ou Insomnia

1. Importe as requisições baseado nos exemplos acima
2. Configure a URL base como `http://localhost:3000`
3. Use os corpos (bodies) em JSON fornecidos

---

## 🔧 Variáveis de Ambiente

| Variável        | Padrão              | Descrição                 |
| --------------- | ------------------- | ------------------------- |
| `NODE_ENV`      | `development`       | Ambiente de execução      |
| `PORT`          | `3000`              | Porta do servidor         |
| `DATABASE_PATH` | `./database.sqlite` | Caminho do banco de dados |

---

## 📝 Exemplo de Fluxo Completo

1. **Criar tarefa**

   ```bash
   POST /tarefas
   {"titulo":"Estudar API","status":"a fazer"}
   ```

2. **Listar tarefas**

   ```bash
   GET /tarefas
   ```

3. **Buscar tarefa específica**

   ```bash
   GET /tarefas/1
   ```

4. **Iniciar tarefa**

   ```bash
   PATCH /tarefas/1/status
   {"status":"em andamento"}
   ```

5. **Atualizar descrição**

   ```bash
   PUT /tarefas/1
   {"titulo":"Estudar API","descricao":"REST API","status":"em andamento"}
   ```

6. **Finalizar tarefa**

   ```bash
   PATCH /tarefas/1/status
   {"status":"concluída"}
   ```

7. **Deletar tarefa (opcional)**
   ```bash
   DELETE /tarefas/1
   ```

---

## 🎯 Boas Práticas Implementadas

✅ **Separação de responsabilidades**: Controllers, models e rotas em arquivos separados  
✅ **Validação de entrada**: Verificação de dados antes de processar  
✅ **Respostas consistentes**: Formato JSON padronizado  
✅ **Tratamento de erros**: Mensagens claras e códigos HTTP apropriados  
✅ **Nomenclatura clara**: Nomes descritivos de funções e variáveis  
✅ **Variáveis de ambiente**: Configuração via `.env`  
✅ **Organização do projeto**: Estrutura clara e escalável

---

## 📄 Licença

MIT

---

## 👨‍💻 Autor

Projeto desenvolvido como demonstração de uma API REST com Node.js, Express e Sequelize.

---

## 🤝 Suporte

Para dúvidas ou problemas, verifique:

1. Se as dependências estão instaladas (`npm install`)
2. Se o Node.js está na versão correta
3. Se a porta 3000 está disponível
4. Se o banco de dados foi sincronizado corretamente

Boa sorte! 🚀
