// src/types/index.ts
export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Receivable {
  id: number;
  description: string;
  amount: number;
  dueDate: string;
  removed: boolean;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  isAdmin?: boolean;
}
