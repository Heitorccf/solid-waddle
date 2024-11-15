// Importação das classes necessárias do TypeORM
import { DataSource } from "typeorm"; // Responsável pela configuração da conexão com o banco de dados
import { User } from "../entities/User"; // Entidade User, provavelmente para armazenar dados de usuários
import { ReceivableAccount } from "../entities/ReceivableAccount"; // Entidade ReceivableAccount, usada para representar contas a receber

// Criação da instância de DataSource, que representa a configuração de conexão com o banco de dados
export const AppDataSource = new DataSource({
  type: "postgres", // Tipo de banco de dados (PostgreSQL)
  host: "localhost", // Host onde o banco de dados está rodando (localhost significa que está na mesma máquina)
  port: 5432, // Porta do banco de dados PostgreSQL (porta padrão do PostgreSQL)
  username: "admin", // Usuário para conectar ao banco de dados
  password: "admin123", // Senha do usuário para conexão com o banco de dados
  database: "financial_db", // Nome do banco de dados a ser utilizado
  synchronize: true, // Quando definido como true, o TypeORM automaticamente sincroniza o esquema do banco de dados com as entidades definidas (cuidado: pode alterar o banco de dados)
  logging: true, // Ativa o log das consultas SQL geradas pelo TypeORM
  entities: [User, ReceivableAccount], // Define as entidades que o TypeORM deve usar (User e ReceivableAccount são as entidades a serem mapeadas)
  subscribers: [], // Lista de subscribers (usados para eventos do TypeORM, mas está vazio por enquanto)
  migrations: [], // Lista de migrações a serem executadas (ainda não há migrações definidas)
});
