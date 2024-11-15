import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"; // Importações necessárias para o uso de Context, State, e efeitos no React
import { User, AuthResponse } from "../types"; // Tipos TypeScript para os dados de usuário e resposta de autenticação
import { auth } from "../services/api"; // Serviço de API para autenticação (responsável por enviar requisições de login)

interface AuthContextType {
  user: User | null; // O usuário pode ser um objeto User ou null (caso não autenticado)
  loading: boolean; // Indica se a autenticação está sendo carregada
  login: (email: string, password: string) => Promise<void>; // Função para realizar o login
  logout: () => void; // Função para realizar o logout
  isAuthenticated: boolean; // Indica se o usuário está autenticado (true se o usuário estiver presente)
}

// Criação do contexto para autenticação, com o tipo AuthContextType
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor de contexto de autenticação (AuthProvider), que envolve os componentes da aplicação que precisam acessar o contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // Estado para armazenar os dados do usuário
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento (se o usuário está sendo verificado)

  // Efeito colateral que verifica se há um usuário armazenado no localStorage ao carregar o componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Tenta pegar os dados do usuário do localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Se o usuário existir no localStorage, o coloca no estado
    }
    setLoading(false); // Depois que a verificação for feita, altera o estado de loading para false
  }, []);

  // Função para realizar o login, chamando o serviço de autenticação
  const login = async (email: string, password: string) => {
    try {
      const response: AuthResponse = await auth.login(email, password); // Chama o serviço de login
      setUser(response.user); // Atualiza o estado com o usuário retornado pela API
      localStorage.setItem("token", response.token); // Armazena o token JWT no localStorage
      localStorage.setItem("user", JSON.stringify(response.user)); // Armazena o usuário no localStorage
    } catch (error) {
      throw new Error("Invalid credentials"); // Se o login falhar, lança um erro
    }
  };

  // Função para realizar o logout
  const logout = () => {
    setUser(null); // Limpa o estado de usuário
    localStorage.removeItem("token"); // Remove o token do localStorage
    localStorage.removeItem("user"); // Remove os dados do usuário do localStorage
  };

  return (
    // O provedor do contexto fornece o estado atual de autenticação e as funções para outros componentes
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user, // Indica se o usuário está autenticado (true se "user" não for null)
      }}
    >
      {children} {/* Os filhos do AuthProvider são renderizados aqui */}
    </AuthContext.Provider>
  );
};

// Hook customizado para acessar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext); // Acessa o contexto de autenticação
  if (context === undefined) {
    // Se o hook for usado fora de um AuthProvider, lança um erro
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; // Retorna o valor do contexto
};
