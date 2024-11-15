// Importação dos decoradores e tipos necessários do TypeORM
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"; // Decoradores do TypeORM para definir a estrutura da entidade e os campos
import { IsEmail, Length } from "class-validator"; // Decoradores para validação de dados (verificar e-mail e tamanho de texto)

@Entity() // Define a classe como uma entidade do TypeORM
export class User {
  // Chave primária da tabela, gerada automaticamente pelo banco de dados
  @PrimaryGeneratedColumn()
  id: number;

  // Nome do usuário, com validação de comprimento mínimo de 3 e máximo de 100 caracteres
  @Column()
  @Length(3, 100) // Valida o comprimento do nome do usuário (mínimo 3, máximo 100)
  name: string;

  // E-mail do usuário, com validação para garantir que o valor seja um e-mail válido
  @Column({ unique: true }) // Garante que o e-mail seja único na tabela
  @IsEmail() // Valida que o valor inserido é um e-mail válido
  email: string;

  // Senha do usuário
  @Column()
  password: string;

  // Campo que indica se o usuário é um administrador, com valor padrão 'false'
  @Column({ default: false })
  isAdmin: boolean;

  // Data de criação do usuário, gerada automaticamente pelo TypeORM
  @CreateDateColumn()
  createdAt: Date;

  // Data da última atualização do usuário, gerada automaticamente pelo TypeORM
  @UpdateDateColumn()
  updatedAt: Date;
}
