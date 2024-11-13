import { Router } from "express";
import { ReceivableController } from "../controllers/ReceivableController";
import { authMiddleware } from "../middlewares/auth";
import { checkAdminRole } from "../middlewares/checkRole";

const router = Router();

router.use(authMiddleware); // Protege todas as rotas com autenticação

router.get("/", ReceivableController.getAll);
router.get("/:id", ReceivableController.getById);
router.post("/", ReceivableController.create);
router.put("/:id", checkAdminRole, ReceivableController.update); // Apenas admin pode atualizar
router.delete("/:id", checkAdminRole, ReceivableController.delete); // Apenas admin pode deletar

export default router;
