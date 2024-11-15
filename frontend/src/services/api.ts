// src/services/api.ts

// Importando a biblioteca axios para facilitar as requisições HTTP
import axios from "axios";
// Importa o tipo 'Receivable' que é utilizado em alguns pontos do código
import { Receivable } from "../types";

// Criação de uma instância do axios, configurando a URL base para as requisições
const api = axios.create({
  baseURL: "http://localhost:3000", // URL base para todas as requisições feitas com esta instância
});

// Interceptor para adicionar um token de autorização (caso exista) nas requisições
api.interceptors.request.use((config) => {
  // Recuperando o token do localStorage, se estiver disponível
  const token = localStorage.getItem("token");
  if (token) {
    // Adiciona o token no cabeçalho da requisição para autenticação
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // Retorna a configuração da requisição, agora com o token (se disponível)
});

// Objeto responsável pelas operações de autenticação (login e registro)
export const auth = {
  // Função para realizar o login, recebendo o e-mail e senha do usuário
  login: async (email: string, password: string) => {
    // Realiza a requisição POST para o endpoint de login com o email e a senha
    const response = await api.post("/auth/login", { email, password });
    // Retorna os dados da resposta da requisição (geralmente o token de autenticação)
    return response.data;
  },

  // Função para registrar um novo usuário, com parâmetros como nome, e-mail, senha e tipo de usuário
  register: async (
    name: string,
    email: string,
    password: string,
    isAdmin: boolean = false // Parâmetro opcional para definir se o usuário é administrador (false por padrão)
  ) => {
    // Realiza a requisição POST para o endpoint de registro
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      isAdmin,
    });
    // Retorna os dados da resposta da requisição (geralmente informações do novo usuário)
    return response.data;
  },
};

// Interface que descreve os dados necessários para criar um novo recebível
interface CreateReceivableData {
  description: string; // Descrição do recebível
  amount: number; // Valor do recebível
  dueDate: string; // Data de vencimento do recebível
}

// Objeto responsável pelas operações de recebíveis (listar, criar, atualizar e deletar)
export const receivables = {
  // Função para obter todos os recebíveis cadastrados
  getAll: async () => {
    // Realiza a requisição GET para obter todos os recebíveis
    const response = await api.get("/receivables");
    // Retorna os dados da resposta da requisição (lista de recebíveis)
    return response.data;
  },

  // Função para obter um recebível específico pelo ID
  getById: async (id: number) => {
    // Realiza a requisição GET para obter um recebível pelo seu ID
    const response = await api.get(`/receivables/${id}`);
    // Retorna os dados da resposta da requisição (informações do recebível específico)
    return response.data;
  },

  // Função para criar um novo recebível
  create: async (data: CreateReceivableData) => {
    // Realiza a requisição POST para criar um novo recebível
    const response = await api.post("/receivables", data);
    // Retorna os dados da resposta da requisição (informações do recebível criado)
    return response.data;
  },

  // Função para atualizar um recebível existente, fornecendo o ID e os dados a serem atualizados
  update: async (id: number, data: Partial<CreateReceivableData>) => {
    // Realiza a requisição PUT para atualizar os dados de um recebível específico
    const response = await api.put(`/receivables/${id}`, data);
    // Retorna os dados da resposta da requisição (informações do recebível atualizado)
    return response.data;
  },

  // Função para deletar um recebível pelo ID
  delete: async (id: number) => {
    // Realiza a requisição DELETE para excluir um recebível pelo seu ID
    const response = await api.delete(`/receivables/${id}`);
    // Retorna os dados da resposta da requisição (geralmente confirmação da exclusão)
    return response.data;
  },
};

// Exporta a instância do axios para ser utilizada em outras partes do projeto
export default api;
