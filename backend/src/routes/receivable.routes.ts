// Importação do roteador do Express, controlador de contas a receber, e os middlewares de autenticação e verificação de administrador
import { Router } from "express"; // Router do Express para definir rotas
import { ReceivableController } from "../controllers/ReceivableController"; // Controlador responsável pelas rotas de contas a receber
import { authMiddleware } from "../middlewares/auth"; // Middleware de autenticação (verifica se o usuário está autenticado)
import { checkAdminRole } from "../middlewares/checkRole"; // Middleware de verificação de papel de administrador (verifica se o usuário é administrador)

const router = Router();

// Aplica o middleware de autenticação a todas as rotas abaixo, garantindo que o usuário esteja autenticado
router.use(authMiddleware);

// Define a rota GET para obter todas as contas a receber
router.get("/", ReceivableController.getAll);

// Define a rota GET para obter uma conta a receber específica pelo seu ID
router.get("/:id", ReceivableController.getById);

// Define a rota POST para criar uma nova conta a receber
router.post("/", ReceivableController.create);

// Define a rota PUT para atualizar uma conta a receber específica (somente administradores podem atualizar)
router.put("/:id", checkAdminRole, ReceivableController.update);

// Define a rota DELETE para deletar uma conta a receber específica (somente administradores podem deletar)
router.delete("/:id", checkAdminRole, ReceivableController.delete);

// Exporta o roteador para ser usado em outras partes do aplicativo
export default router;
