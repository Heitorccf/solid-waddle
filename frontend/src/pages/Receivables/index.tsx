// src/pages/Receivables/index.tsx
import React, { useEffect, useState } from "react";
import { receivables } from "../../services/api";
import { Receivable } from "../../types";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";

const ReceivableSchema = Yup.object().shape({
  description: Yup.string().required("Descrição é obrigatória"),
  amount: Yup.number()
    .required("Valor é obrigatório")
    .positive("Valor deve ser positivo"),
  dueDate: Yup.date().required("Data de vencimento é obrigatória"),
});

const Receivables = () => {
  const [receivablesList, setReceivablesList] = useState<Receivable[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { user } = useAuth();

  const loadReceivables = async () => {
    try {
      const data = await receivables.getAll();
      setReceivablesList(data);
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
    }
  };

  useEffect(() => {
    loadReceivables();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      try {
        await receivables.delete(id);
        await loadReceivables();
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contas a Receber</h2>
      </div>

      <div className="table-container">
        <Formik
          initialValues={{
            description: "",
            amount: "",
            dueDate: "",
          }}
          validationSchema={ReceivableSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await receivables.create({
                description: values.description,
                amount: Number(values.amount),
                dueDate: values.dueDate,
              });
              resetForm();
              await loadReceivables();
            } catch (error) {
              console.error("Erro ao criar conta:", error);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="row g-3 mb-4">
              <div className="col-md-4">
                <Field
                  name="description"
                  type="text"
                  className={`form-control ${
                    errors.description && touched.description
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder="Descrição"
                />
                {errors.description && touched.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <div className="col-md-3">
                <Field
                  name="amount"
                  type="number"
                  step="0.01"
                  className={`form-control ${
                    errors.amount && touched.amount ? "is-invalid" : ""
                  }`}
                  placeholder="Valor"
                />
                {errors.amount && touched.amount && (
                  <div className="invalid-feedback">{errors.amount}</div>
                )}
              </div>
              <div className="col-md-3">
                <Field
                  name="dueDate"
                  type="date"
                  className={`form-control ${
                    errors.dueDate && touched.dueDate ? "is-invalid" : ""
                  }`}
                />
                {errors.dueDate && touched.dueDate && (
                  <div className="invalid-feedback">{errors.dueDate}</div>
                )}
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100">
                  Adicionar
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Criado por</th>
                {user?.isAdmin && <th>Ações</th>}
              </tr>
            </thead>
            <tbody>
              {receivablesList.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{formatCurrency(item.amount)}</td>
                  <td>{formatDate(item.dueDate)}</td>
                  <td>{item.user.name}</td>
                  {user?.isAdmin && (
                    <td>
                      <button
                        className="btn btn-sm btn-danger btn-action"
                        onClick={() => handleDelete(item.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Receivables;
