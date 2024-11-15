// src/index.ts

// Importação das dependências necessárias
import "reflect-metadata"; // Necessário para o TypeORM (decorators)
import express from "express"; // Framework Express para criação do servidor
import cors from "cors"; // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
import { AppDataSource } from "./config/database"; // Conexão com o banco de dados usando TypeORM
import authRoutes from "./routes/auth.routes"; // Rotas de autenticação (login, registro)
import receivableRoutes from "./routes/receivable.routes"; // Rotas de contas a receber

// Criação da instância do aplicativo Express
const app = express();

// Habilita o CORS, permitindo que o servidor aceite requisições de diferentes origens
app.use(cors());

// Middleware para fazer o parsing de JSON nas requisições
app.use(express.json());

// Definição das rotas do aplicativo
// Rota para autenticação de usuários (login, registro)
app.use("/auth", authRoutes);
// Rota para manipulação de contas a receber (listagem, criação, atualização, remoção)
app.use("/receivables", receivableRoutes);

// Inicialização do banco de dados com TypeORM
AppDataSource.initialize()
  .then(() => {
    // Se a conexão com o banco for bem-sucedida, exibe uma mensagem de sucesso
    console.log("Database connected successfully");

    // Inicializa o servidor na porta 3000
    app.listen(3000, () => {
      console.log("Server is running on port 3000"); // Exibe mensagem informando que o servidor está rodando
    });
  })
  .catch((error) => console.log(error)); // Caso ocorra algum erro ao conectar com o banco, exibe o erro no console
