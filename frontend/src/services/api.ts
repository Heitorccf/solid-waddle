import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  register: async (
    name: string,
    email: string,
    password: string,
    isAdmin: boolean = false
  ) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      isAdmin,
    });
    return response.data;
  },
};

export const receivables = {
  getAll: async () => {
    const response = await api.get("/receivables");
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/receivables/${id}`);
    return response.data;
  },
  create: async (data: Omit<Receivable, "id" | "user" | "removed">) => {
    const response = await api.post("/receivables", data);
    return response.data;
  },
  update: async (id: number, data: Partial<Receivable>) => {
    const response = await api.put(`/receivables/${id}`, data);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/receivables/${id}`);
    return response.data;
  },
};

export default api;
