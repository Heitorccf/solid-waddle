// src/pages/Register/index.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom"; // Importa os hooks de navegação do React Router
import { auth } from "../../services/api"; // Serviço de autenticação (provavelmente uma API para registrar o usuário)
import { Formik, Form, Field } from "formik"; // Importa o Formik e componentes para criar o formulário
import * as Yup from "yup"; // Importa o Yup para validação do esquema de dados

// Esquema de validação usando Yup
const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, "Nome muito curto").required("Nome é obrigatório"), // Valida o campo 'name'
  email: Yup.string().email("Email inválido").required("Email é obrigatório"), // Valida o campo 'email'
  password: Yup.string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"), // Valida o campo 'password'
});

const Register = () => {
  const navigate = useNavigate(); // Hook para navegação programática após o registro

  return (
    <div className="auth-container">
      {" "}
      {/* Contêiner principal da página de autenticação */}
      <div className="auth-card bg-white rounded">
        {" "}
        {/* Card para o formulário */}
        <h2 className="text-center mb-4">Registro</h2> {/* Título da página */}
        <Formik
          initialValues={{ name: "", email: "", password: "" }} // Valores iniciais do formulário
          validationSchema={RegisterSchema} // Aplica a validação utilizando o Yup
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            // Função chamada ao enviar o formulário
            try {
              await auth.register(values.name, values.email, values.password); // Chama o serviço de registro (auth.register)
              navigate("/login"); // Redireciona para a página de login após o registro
            } catch (error) {
              setFieldError("email", "Email já cadastrado"); // Em caso de erro, define um erro de email
            } finally {
              setSubmitting(false); // Finaliza o estado de submissão (habilita o botão)
            }
          }}
        >
          {(
            { errors, touched, isSubmitting } // Desestruturação dos valores e estados fornecidos pelo Formik
          ) => (
            <Form>
              {/* Campo de nome */}
              <div className="mb-3">
                <Field
                  type="text"
                  name="name"
                  placeholder="Nome"
                  className={`form-control ${
                    errors.name && touched.name ? "is-invalid" : ""
                  }`} // Validação visual
                />
                {errors.name && touched.name && (
                  <div className="invalid-feedback">{errors.name}</div> // Exibe a mensagem de erro
                )}
              </div>

              {/* Campo de email */}
              <div className="mb-3">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${
                    errors.email && touched.email ? "is-invalid" : ""
                  }`} // Validação visual
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div> // Exibe a mensagem de erro
                )}
              </div>

              {/* Campo de senha */}
              <div className="mb-3">
                <Field
                  type="password"
                  name="password"
                  placeholder="Senha"
                  className={`form-control ${
                    errors.password && touched.password ? "is-invalid" : ""
                  }`} // Validação visual
                />
                {errors.password && touched.password && (
                  <div className="invalid-feedback">{errors.password}</div> // Exibe a mensagem de erro
                )}
              </div>

              {/* Botão de submissão */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting} // Desabilita o botão enquanto o formulário está sendo enviado
              >
                {isSubmitting ? "Registrando..." : "Registrar"} // Exibe texto
                dinâmico enquanto submete
              </button>

              {/* Link para a página de login */}
              <div className="text-center mt-3">
                <Link to="/login" className="text-decoration-none">
                  Já tem uma conta? Faça login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
