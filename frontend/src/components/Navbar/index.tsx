import React from "react"; // Importação do React
import { Link, useNavigate } from "react-router-dom"; // Importa o Link para navegação e useNavigate para redirecionar programaticamente
import { useAuth } from "../../contexts/AuthContext"; // Hook personalizado para acessar o contexto de autenticação

const Navbar = () => {
  const { user, logout } = useAuth(); // Obtém as informações do usuário e a função de logout do contexto de autenticação
  const navigate = useNavigate(); // Hook que permite navegação programática

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto, que provavelmente limpa o token e outras informações
    navigate("/login"); // Redireciona o usuário para a página de login após o logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        {/* Link que leva à página inicial do sistema */}
        <Link className="navbar-brand" to="/">
          Sistema Financeiro
        </Link>
        {/* Botão para mostrar/ocultar o menu em dispositivos móveis */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Menu de navegação que contém links e o botão de logout */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Link para a página de contas a receber */}
            <li className="nav-item">
              <Link className="nav-link" to="/receivables">
                Contas a Receber
              </Link>
            </li>
          </ul>
          {/* Área para exibir o nome do usuário e o botão de logout */}
          <div className="d-flex align-items-center">
            {/* Exibe o nome do usuário autenticado */}
            <span className="text-light me-3">Olá, {user?.name}</span>
            {/* Botão de logout */}
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
