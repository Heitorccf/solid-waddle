// Importação das dependências necessárias
import { Request, Response } from "express"; // Tipos para as requisições e respostas do Express
import { AppDataSource } from "../config/database"; // Fonte de dados do TypeORM para interagir com o banco
import { ReceivableAccount } from "../entities/ReceivableAccount"; // A entidade ReceivableAccount, que representa uma conta a receber
import { CustomRequest } from "../middlewares/auth"; // Middleware que provavelmente adiciona informações do usuário na requisição (como o ID)

export class ReceivableController {
  // Método para obter todas as contas a receber (não removidas)
  static getAll = async (req: Request, res: Response) => {
    try {
      // Obtém o repositório de ReceivableAccount
      const receivableRepository =
        AppDataSource.getRepository(ReceivableAccount);

      // Busca todas as contas a receber onde 'removed' é false, ou seja, não foram removidas
      // A opção 'relations' é usada para buscar dados relacionados, no caso, o usuário associado à conta
      const receivables = await receivableRepository.find({
        where: { removed: false },
        relations: ["user"],
      });

      return res.json(receivables); // Retorna a lista de contas a receber em formato JSON
    } catch (error) {
      return res.status(500).json({ message: "Error fetching receivables" }); // Retorna erro em caso de falha na busca
    }
  };

  // Método para obter uma conta a receber específica pelo ID
  static getById = async (req: Request, res: Response) => {
    const { id } = req.params; // Obtém o ID da conta a receber da URL

    try {
      // Obtém o repositório de ReceivableAccount
      const receivableRepository =
        AppDataSource.getRepository(ReceivableAccount);

      // Busca a conta a receber pelo ID, garantindo que 'removed' seja false
      const receivable = await receivableRepository.findOne({
        where: { id: parseInt(id), removed: false },
        relations: ["user"], // Inclui o usuário relacionado à conta a receber
      });

      if (!receivable) {
        return res.status(404).json({ message: "Receivable not found" }); // Se não encontrar a conta, retorna erro
      }

      return res.json(receivable); // Retorna os dados da conta a receber encontrada
    } catch (error) {
      return res.status(500).json({ message: "Error fetching receivable" }); // Erro ao tentar buscar a conta a receber
    }
  };

  // Método para criar uma nova conta a receber
  static create = async (req: CustomRequest, res: Response) => {
    const { description, amount, dueDate } = req.body; // Obtém os dados da conta a receber enviados no corpo da requisição
    const userId = req.userId; // Obtém o ID do usuário (presumivelmente obtido do token JWT)

    try {
      // Obtém o repositório de ReceivableAccount
      const receivableRepository =
        AppDataSource.getRepository(ReceivableAccount);

      // Cria uma nova conta a receber
      const receivable = receivableRepository.create({
        description, // Descrição da conta a receber
        amount, // Valor da conta a receber
        dueDate, // Data de vencimento da conta
        user: { id: userId }, // Associando a conta ao usuário que a criou
        removed: false, // Conta não está removida
      });

      // Salva a nova conta a receber no banco de dados
      await receivableRepository.save(receivable);

      return res.status(201).json(receivable); // Retorna a conta criada com status 201 (Criado)
    } catch (error) {
      return res.status(500).json({ message: "Error creating receivable" }); // Erro ao tentar criar a conta a receber
    }
  };

  // Método para atualizar os dados de uma conta a receber
  static update = async (req: Request, res: Response) => {
    const { id } = req.params; // Obtém o ID da conta a receber da URL
    const { description, amount, dueDate } = req.body; // Dados a serem atualizados na conta

    try {
      // Obtém o repositório de ReceivableAccount
      const receivableRepository =
        AppDataSource.getRepository(ReceivableAccount);

      // Busca a conta a receber pelo ID, garantindo que não tenha sido removida
      const receivable = await receivableRepository.findOne({
        where: { id: parseInt(id), removed: false },
      });

      if (!receivable) {
        return res.status(404).json({ message: "Receivable not found" }); // Se a conta não for encontrada, retorna erro
      }

      // Atualiza os campos da conta a receber com os novos valores
      receivable.description = description;
      receivable.amount = amount;
      receivable.dueDate = dueDate;

      // Salva as alterações no banco de dados
      await receivableRepository.save(receivable);

      return res.json(receivable); // Retorna a conta a receber atualizada
    } catch (error) {
      return res.status(500).json({ message: "Error updating receivable" }); // Erro ao tentar atualizar a conta
    }
  };

  // Método para deletar (remover) uma conta a receber
  static delete = async (req: Request, res: Response) => {
    const { id } = req.params; // Obtém o ID da conta a receber da URL

    try {
      // Obtém o repositório de ReceivableAccount
      const receivableRepository =
        AppDataSource.getRepository(ReceivableAccount);

      // Busca a conta a receber pelo ID, garantindo que não tenha sido removida
      const receivable = await receivableRepository.findOne({
        where: { id: parseInt(id), removed: false },
      });

      if (!receivable) {
        return res.status(404).json({ message: "Receivable not found" }); // Se não encontrar a conta, retorna erro
      }

      // Marca a conta como removida
      receivable.removed = true;
      // Salva a alteração no banco de dados
      await receivableRepository.save(receivable);

      return res.json({ message: "Receivable deleted successfully" }); // Retorna sucesso na remoção
    } catch (error) {
      return res.status(500).json({ message: "Error deleting receivable" }); // Erro ao tentar remover a conta a receber
    }
  };
}
