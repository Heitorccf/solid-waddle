// Importação dos decoradores e tipos necessários do TypeORM
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"; // Decoradores do TypeORM para definir a estrutura da entidade e os relacionamentos
import { User } from "./User"; // Importa a entidade User, que será associada a ReceivableAccount

// Definição da entidade ReceivableAccount, que representa uma conta a receber
@Entity()
export class ReceivableAccount {
  // Chave primária da tabela, gerada automaticamente pelo banco de dados
  @PrimaryGeneratedColumn()
  id: number;

  // Descrição da conta a receber
  @Column()
  description: string;

  // Valor da conta a receber, utilizando tipo decimal para valores com precisão (10 dígitos no total, sendo 2 após a vírgula)
  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  // Data de vencimento da conta a receber
  @Column()
  dueDate: Date;

  // Indica se a conta foi removida (soft delete), valor padrão é 'false'
  @Column({ default: false })
  removed: boolean;

  // Relacionamento muitos-para-um com a entidade User. Cada conta a receber está associada a um único usuário.
  @ManyToOne(() => User)
  user: User;

  // Data de criação da conta a receber, automaticamente gerada pelo TypeORM
  @CreateDateColumn()
  createdAt: Date;

  // Data da última atualização da conta a receber, automaticamente gerada pelo TypeORM
  @UpdateDateColumn()
  updatedAt: Date;
}
