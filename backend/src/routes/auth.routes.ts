// Importação do roteador do Express e do controlador de autenticação
import { Router } from "express"; // Router do Express para definir rotas
import { AuthController } from "../controllers/AuthController"; // Controlador de autenticação, onde estão as lógicas de registro e login

// Criação de um roteador para lidar com rotas de autenticação
const router = Router();

// Rota para registrar um novo usuário (chama o método 'register' do AuthController)
router.post("/register", AuthController.register);

// Rota para realizar o login (chama o método 'login' do AuthController)
router.post("/login", AuthController.login);

// Exporta o roteador para ser utilizado em outras partes do aplicativo
export default router;
