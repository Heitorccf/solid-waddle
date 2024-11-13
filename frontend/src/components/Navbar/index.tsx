import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Sistema Financeiro
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/receivables">
                Contas a Receber
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <span className="text-light me-3">Olá, {user?.name}</span>
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
