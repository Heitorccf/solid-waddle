// src/types/index.ts

// Interface que descreve a estrutura de um usuário do sistema
export interface User {
  id: number; // Identificador único do usuário
  name: string; // Nome do usuário
  email: string; // E-mail do usuário
  isAdmin: boolean; // Define se o usuário é um administrador
}

// Interface para a resposta de autenticação, incluindo o usuário e o token de autenticação
export interface AuthResponse {
  user: User; // Objeto do usuário retornado após a autenticação
  token: string; // Token de autenticação gerado após o login
}

// Interface que descreve a estrutura de um recebível
export interface Receivable {
  id: number; // Identificador único do recebível
  description: string; // Descrição do recebível (por exemplo, "Pagamento de fatura")
  amount: number; // Valor do recebível
  dueDate: string; // Data de vencimento do recebível (formato de string)
  removed: boolean; // Indica se o recebível foi removido (excluído ou marcado como removido)
  user: User; // Usuário relacionado ao recebível (quem criou ou está associado ao recebível)
}

// Interface que descreve os dados necessários para o login
export interface LoginData {
  email: string; // E-mail do usuário para login
  password: string; // Senha do usuário para login
}

// Interface para os dados necessários para o registro de um novo usuário, estendendo a interface LoginData
export interface RegisterData extends LoginData {
  name: string; // Nome completo do usuário a ser registrado
  isAdmin?: boolean; // Define se o usuário será um administrador, é opcional e por padrão é 'false'
}
