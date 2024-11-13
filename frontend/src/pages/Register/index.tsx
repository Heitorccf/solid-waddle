// src/pages/Register/index.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../services/api";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, "Nome muito curto").required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  password: Yup.string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
});

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-card bg-white rounded">
        <h2 className="text-center mb-4">Registro</h2>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              await auth.register(values.name, values.email, values.password);
              navigate("/login");
            } catch (error) {
              setFieldError("email", "Email já cadastrado");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <Field
                  type="text"
                  name="name"
                  placeholder="Nome"
                  className={`form-control ${
                    errors.name && touched.name ? "is-invalid" : ""
                  }`}
                />
                {errors.name && touched.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

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
                {isSubmitting ? "Registrando..." : "Registrar"}
              </button>

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
