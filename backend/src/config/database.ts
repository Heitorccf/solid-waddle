import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { ReceivableAccount } from "../entities/ReceivableAccount";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin123",
  database: "financial_db",
  synchronize: true,
  logging: true,
  entities: [User, ReceivableAccount],
  subscribers: [],
  migrations: [],
});
