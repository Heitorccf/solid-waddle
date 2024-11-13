import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const { name, email, password, isAdmin } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);

      const userExists = await userRepository.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = userRepository.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: isAdmin || false,
      });

      await userRepository.save(user);

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error creating user" });
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "your_super_secret_key_here",
        { expiresIn: "1d" }
      );

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
      return res.status(500).json({ message: "Error during login" });
    }
  };
}
