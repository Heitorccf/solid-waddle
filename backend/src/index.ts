// src/index.ts
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/database";
import authRoutes from "./routes/auth.routes";
import receivableRoutes from "./routes/receivable.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/receivables", receivableRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.log(error));
