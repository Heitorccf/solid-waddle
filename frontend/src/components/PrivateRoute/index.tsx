import { Navigate, useLocation } from "react-router-dom"; // Importa o componente Navigate para redirecionamento e useLocation para pegar a localização atual
import { useAuth } from "../../contexts/AuthContext"; // Importa o hook customizado de autenticação para verificar o estado de login

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth(); // Obtém o estado de autenticação (se o usuário está autenticado) e o status de carregamento do contexto de autenticação
  const location = useLocation(); // Obtém a localização atual da URL para redirecionar o usuário após o login

  // Se o estado de carregamento estiver ativo (a autenticação está sendo verificada), exibe uma mensagem de carregamento
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se o usuário não estiver autenticado, redireciona para a página de login
  // O parâmetro "state" mantém a URL de origem para que o usuário possa ser redirecionado de volta após o login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Caso contrário, renderiza os componentes filhos, pois o usuário está autenticado
  return children;
};

export default PrivateRoute;
