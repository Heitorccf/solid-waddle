import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { ReceivableAccount } from "../entities/ReceivableAccount";
import { CustomRequest } from "../middlewares/auth";

export class ReceivableController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const receivableRepository =
        AppDataSource.getRepository(ReceivableAccount);
      const receivables = await receivableRepository.find({
        where: { removed: false },
        relations: ["user"],
      });

      return res.json(receivables);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching receivables" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const receivableRepository =
        AppDataSource.getRepository(ReceivableAccount);
      const receivable = await receivableRepository.findOne({
        where: { id: parseInt(id), removed: false },
        relations: ["user"],
      });

      if (!receivable) {
        return res.status(404).json({ message: "Receivable not found" });
      }

      return res.json(receivable);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching receivable" });
    }
  };

  static create = async (req: CustomRequest, res: Response) => {
    const { description, amount, dueDate } = req.body;
    const userId = req.userId;

    try {
      const receivableRepository =
        AppDataSource.getRepository(ReceivableAccount);

      const receivable = receivableRepository.create({
        description,
        amount,
        dueDate,
        user: { id: userId },
        removed: false,
      });

      await receivableRepository.save(receivable);

      return res.status(201).json(receivable);
    } catch (error) {
      return res.status(500).json({ message: "Error creating receivable" });
    }
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { description, amount, dueDate } = req.body;

    try {
      const receivableRepository =
        AppDataSource.getRepository(ReceivableAccount);

      const receivable = await receivableRepository.findOne({
        where: { id: parseInt(id), removed: false },
      });

      if (!receivable) {
        return res.status(404).json({ message: "Receivable not found" });
      }

      receivable.description = description;
      receivable.amount = amount;
      receivable.dueDate = dueDate;

      await receivableRepository.save(receivable);

      return res.json(receivable);
    } catch (error) {
      return res.status(500).json({ message: "Error updating receivable" });
    }
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const receivableRepository =
        AppDataSource.getRepository(ReceivableAccount);

      const receivable = await receivableRepository.findOne({
        where: { id: parseInt(id), removed: false },
      });

      if (!receivable) {
        return res.status(404).json({ message: "Receivable not found" });
      }

      receivable.removed = true;
      await receivableRepository.save(receivable);

      return res.json({ message: "Receivable deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting receivable" });
    }
  };
}
