// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Importação das funcionalidades de roteamento do React Router
import Navbar from "./components/Navbar"; // Componente de navegação que será exibido quando o usuário estiver autenticado
import Login from "./pages/Login"; // Página de login
import Register from "./pages/Register"; // Página de registro
import Receivables from "./pages/Receivables"; // Página de contas a receber
import PrivateRoute from "./components/PrivateRoute"; // Componente de rota privada, que protege páginas do acesso não autorizado
import { useAuth } from "./contexts/AuthContext"; // Hook customizado para acessar o estado de autenticação

const App = () => {
  // Desestruturação do hook useAuth para obter o status de autenticação do usuário
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Se o usuário estiver autenticado, exibe a Navbar (barra de navegação) */}
      {isAuthenticated && <Navbar />}

      {/* Definição das rotas principais da aplicação */}
      <Routes>
        {/* Rota de login, redireciona para /receivables se o usuário já estiver autenticado */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/receivables" /> : <Login />}
        />

        {/* Rota de registro, redireciona para /receivables se o usuário já estiver autenticado */}
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/receivables" /> : <Register />
          }
        />

        {/* Rota protegida para a página de Receivables (contas a receber), 
            o componente PrivateRoute verifica se o usuário está autenticado */}
        <Route
          path="/receivables"
          element={
            <PrivateRoute>
              <Receivables />
            </PrivateRoute>
          }
        />

        {/* Rota padrão, redireciona para a página /receivables */}
        <Route path="/" element={<Navigate to="/receivables" />} />
      </Routes>
    </div>
  );
};

export default App; // Exporta o componente principal da aplicação
