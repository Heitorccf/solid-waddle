// src/pages/Login/index.tsx

import React from "react"; // Importa o React para criar o componente
import { useNavigate, Link } from "react-router-dom"; // useNavigate para navegação, Link para redirecionamento de rotas
import { useAuth } from "../../contexts/AuthContext"; // Acessa o contexto de autenticação
import { Formik, Form, Field } from "formik"; // Importa o Formik para gerenciar formulários
import * as Yup from "yup"; // Importa o Yup para validação de schema de formulários

// Definindo o esquema de validação para o formulário com Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"), // Validação para o campo de email
  password: Yup.string().required("Senha é obrigatória"), // Validação para o campo de senha
});

const Login = () => {
  const { login } = useAuth(); // Acessa a função login do contexto de autenticação
  const navigate = useNavigate(); // Função para navegação entre páginas

  return (
    <div className="auth-container">
      {" "}
      {/* Contêiner geral da tela de login */}
      <div className="auth-card bg-white rounded">
        {" "}
        {/* Cartão de autenticação */}
        <h2 className="text-center mb-4">Login</h2> {/* Título centralizado */}
        {/* Componente Formik gerenciando o estado do formulário */}
        <Formik
          initialValues={{ email: "", password: "" }} // Valores iniciais dos campos
          validationSchema={LoginSchema} // Validação do formulário usando o schema definido com Yup
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            // Função que é chamada ao submeter o formulário
            try {
              await login(values.email, values.password); // Tenta realizar o login
              navigate("/receivables"); // Se o login for bem-sucedido, redireciona para a página de contas a receber
            } catch (error) {
              setFieldError("password", "Email ou senha inválidos"); // Se houver erro, seta uma mensagem de erro no campo de senha
            } finally {
              setSubmitting(false); // Desabilita o estado de "submetendo" do Formik
            }
          }}
        >
          {/* Função que renderiza o formulário com Formik */}
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                {" "}
                {/* Espaçamento entre os campos */}
                {/* Campo de entrada de email */}
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${
                    errors.email && touched.email ? "is-invalid" : "" // Se o campo email tiver erro e foi tocado, adiciona a classe 'is-invalid'
                  }`}
                />
                {/* Exibe a mensagem de erro se o campo email for tocado e contiver erro */}
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                {" "}
                {/* Espaçamento entre os campos */}
                {/* Campo de entrada de senha */}
                <Field
                  type="password"
                  name="password"
                  placeholder="Senha"
                  className={`form-control ${
                    errors.password && touched.password ? "is-invalid" : "" // Se o campo senha tiver erro e foi tocado, adiciona a classe 'is-invalid'
                  }`}
                />
                {/* Exibe a mensagem de erro se o campo senha for tocado e contiver erro */}
                {errors.password && touched.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              {/* Botão de submit */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting} // Desabilita o botão enquanto o formulário está sendo enviado
              >
                {isSubmitting ? "Entrando..." : "Entrar"}{" "}
                {/* Texto do botão dependendo do estado de submissão */}
              </button>

              {/* Link para a página de registro */}
              <div className="text-center mt-3">
                {" "}
                {/* Alinha o link centralizado */}
                <Link to="/register" className="text-decoration-none">
                  {" "}
                  {/* Link para a página de registro */}
                  Ainda não tem conta? Registre-se
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
