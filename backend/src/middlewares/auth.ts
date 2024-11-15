// Importação dos tipos necessários do Express e a biblioteca 'jsonwebtoken'
import { Request, Response, NextFunction } from "express"; // Tipos para requisição, resposta e função 'next' do Express
import jwt from "jsonwebtoken"; // Biblioteca para manipulação e verificação de JWTs (JSON Web Tokens)

// Definindo a interface CustomRequest para estender a Request do Express e incluir o campo 'userId'
export interface CustomRequest extends Request {
  userId?: number; // O 'userId' será adicionado na requisição após a validação do token
}

// Middleware de autenticação
export const authMiddleware = (
  req: CustomRequest, // A requisição extendida com 'userId'
  res: Response, // A resposta do Express
  next: NextFunction // Função 'next' que chama o próximo middleware ou rota
) => {
  // Obtém o cabeçalho de autorização da requisição
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho de autorização não está presente
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" }); // Se não houver token, retorna erro 401
  }

  // Divide o cabeçalho de autorização em duas partes: [tipo de token, token]
  const parts = authHeader.split(" ");

  // Verifica se o cabeçalho não tem exatamente duas partes
  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token error" }); // Se houver erro na estrutura do cabeçalho, retorna erro 401
  }

  // Desestrutura o cabeçalho para obter o esquema e o token
  const [scheme, token] = parts;

  // Verifica se o esquema é "Bearer" (padrão para tokens JWT)
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token malformatted" }); // Se o esquema não for "Bearer", retorna erro 401
  }

  try {
    // Verifica e decodifica o token usando a chave secreta (se não houver variável de ambiente, usa a chave padrão)
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_super_secret_key_here"
    ) as { id: number }; // O token contém o ID do usuário no payload

    // Se o token for válido, adiciona o 'userId' à requisição
    req.userId = decoded.id;

    // Chama o próximo middleware ou a rota
    return next();
  } catch (err) {
    // Se o token for inválido ou expirado, retorna erro 401
    return res.status(401).json({ message: "Token invalid" });
  }
};
