// src/pages/Login/index.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string().required("Senha é obrigatória"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card bg-white rounded">
        <h2 className="text-center mb-4">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              await login(values.email, values.password);
              navigate("/receivables");
            } catch (error) {
              setFieldError("password", "Email ou senha inválidos");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${
                    errors.email && touched.email ? "is-invalid" : ""
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <Field
                  type="password"
                  name="password"
                  placeholder="Senha"
                  className={`form-control ${
                    errors.password && touched.password ? "is-invalid" : ""
                  }`}
                />
                {errors.password && touched.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>

              <div className="text-center mt-3">
                <Link to="/register" className="text-decoration-none">
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
