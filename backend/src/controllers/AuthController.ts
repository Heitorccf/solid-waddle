// Importação das dependências necessárias
import { Request, Response } from "express"; // Para tipos de requisição e resposta do Express
import { AppDataSource } from "../config/database"; // A fonte de dados do TypeORM para interagir com o banco
import { User } from "../entities/User"; // A entidade User para manipulação de dados de usuários
import bcrypt from "bcrypt"; // Biblioteca para criptografia de senhas
import jwt from "jsonwebtoken"; // Biblioteca para criação e verificação de tokens JWT

// Controlador de autenticação
export class AuthController {
  // Método de registro de um novo usuário
  static register = async (req: Request, res: Response) => {
    const { name, email, password, isAdmin } = req.body; // Desestruturação dos dados enviados na requisição

    try {
      const userRepository = AppDataSource.getRepository(User); // Obtenção do repositório da entidade User

      // Verificação se o usuário com o mesmo e-mail já existe
      const userExists = await userRepository.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" }); // Retorna erro caso o usuário já exista
      }

      // Criptografando a senha do usuário antes de salvar
      const hashedPassword = await bcrypt.hash(password, 10); // O '10' é o número de saltos de segurança para o bcrypt

      // Criação de um novo usuário com os dados fornecidos
      const user = userRepository.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false, // Se 'isAdmin' não for fornecido, o valor padrão será 'false'
      });

      // Salvando o novo usuário no banco de dados
      await userRepository.save(user);

      return res.status(201).json({ message: "User created successfully" }); // Sucesso na criação do usuário
    } catch (error) {
      return res.status(500).json({ message: "Error creating user" }); // Erro ao criar o usuário
    }
  };

  // Método de login para um usuário existente
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body; // Dados enviados para login

    try {
      const userRepository = AppDataSource.getRepository(User); // Repositório de usuários do TypeORM
      const user = await userRepository.findOne({ where: { email } }); // Busca o usuário pelo e-mail

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" }); // Retorna erro caso o usuário não exista
      }

      // Verificação se a senha fornecida corresponde à senha armazenada
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" }); // Retorna erro caso a senha seja inválida
      }

      // Geração de um token JWT para o usuário, válido por 1 dia
      const token = jwt.sign(
        { id: user.id }, // Inclui o ID do usuário no payload do token
        process.env.JWT_SECRET || "your_super_secret_key_here", // Chave secreta para assinar o token
        { expiresIn: "1d" } // O token expira em 1 dia
      );

      // Retorna os dados do usuário e o token JWT
      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error during login" }); // Erro ao tentar realizar login
    }
  };
}
