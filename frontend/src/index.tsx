import React from "react"; // Importa o React, necessário para criar componentes React
import ReactDOM from "react-dom/client"; // Importa a função para renderizar a aplicação na árvore DOM
import "./index.css"; // Importa o arquivo de estilos globais da aplicação
import App from "./App"; // Importa o componente principal da aplicação
import { AuthProvider } from "./contexts/AuthContext"; // Importa o provedor de contexto de autenticação
import { BrowserRouter } from "react-router-dom"; // Importa o BrowserRouter para permitir o roteamento da aplicação via URL

// Cria a referência ao elemento DOM onde a aplicação React será montada
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement // Obtém o elemento com id 'root' onde a aplicação será renderizada
);

// Renderiza a aplicação dentro do StrictMode (modo de desenvolvimento que ajuda a detectar problemas)
root.render(
  <React.StrictMode>
    {/* Envolvendo a aplicação com o BrowserRouter para permitir o uso do roteamento nas páginas */}
    <BrowserRouter>
      {/* Envolvendo a aplicação com o AuthProvider, que fornecerá o contexto de autenticação para todos os componentes */}
      <AuthProvider>
        {/* Componente principal da aplicação */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
