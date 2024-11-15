// Importação dos tipos necessários do Express, da configuração do banco de dados e da entidade User
import { Request, Response, NextFunction } from "express"; // Tipos do Express para manipulação de requisições e respostas
import { AppDataSource } from "../config/database"; // Fonte de dados configurada com o TypeORM
import { User } from "../entities/User"; // Entidade User para realizar consultas no banco de dados
import { CustomRequest } from "./auth"; // Interface CustomRequest que inclui o 'userId' na requisição

// Middleware que verifica se o usuário é um administrador
export const checkAdminRole = async (
  req: CustomRequest, // A requisição extendida com 'userId'
  res: Response, // A resposta do Express
  next: NextFunction // Função 'next' para passar para o próximo middleware ou rota
) => {
  try {
    const userId = req.userId; // Obtém o 'userId' da requisição, que foi preenchido no middleware de autenticação

    // Verifica se o 'userId' está presente na requisição (se o usuário está autenticado)
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" }); // Se não houver 'userId', retorna erro 401
    }

    // Recupera o repositório de usuários do banco de dados
    const userRepository = AppDataSource.getRepository(User);

    // Busca o usuário no banco de dados com o 'userId'
    const user = await userRepository.findOne({ where: { id: userId } });

    // Verifica se o usuário existe e se ele tem o privilégio de administrador (campo 'isAdmin' é verdadeiro)
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Access denied" }); // Se não for administrador, retorna erro 403 (acesso negado)
    }

    // Se o usuário for um administrador, chama o próximo middleware ou rota
    next();
  } catch (error) {
    // Em caso de erro no processo, retorna erro 500 (erro interno do servidor)
    return res.status(500).json({ message: "Internal server error" });
  }
};
