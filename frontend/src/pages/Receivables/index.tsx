// src/pages/Receivables/index.tsx
import React, { useEffect, useState } from "react"; // Importa React, hooks useEffect e useState
import { receivables } from "../../services/api"; // Importa os serviços de API relacionados às contas a receber
import { Receivable } from "../../types"; // Tipos para as contas a receber
import { Formik, Form, Field } from "formik"; // Importa Formik para gerenciamento de formulários
import * as Yup from "yup"; // Importa o Yup para validação de esquema
import { useAuth } from "../../contexts/AuthContext"; // Importa o contexto de autenticação

// Esquema de validação do formulário utilizando o Yup
const ReceivableSchema = Yup.object().shape({
  description: Yup.string().required("Descrição é obrigatória"), // Valida que a descrição é obrigatória
  amount: Yup.number()
    .required("Valor é obrigatório")
    .positive("Valor deve ser positivo"), // Valida que o valor é obrigatório e positivo
  dueDate: Yup.date().required("Data de vencimento é obrigatória"), // Valida que a data de vencimento é obrigatória
});

const Receivables = () => {
  // Estado local para armazenar a lista de contas e o ID da conta que está sendo editada
  const [receivablesList, setReceivablesList] = useState<Receivable[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null); // Não utilizado no momento
  const { user } = useAuth(); // Acessa o usuário autenticado do contexto de autenticação

  // Função para carregar as contas a receber da API
  const loadReceivables = async () => {
    try {
      const data = await receivables.getAll(); // Chama o serviço para pegar todas as contas a receber
      setReceivablesList(data); // Atualiza o estado com a lista de contas
    } catch (error) {
      console.error("Erro ao carregar contas:", error); // Em caso de erro, exibe no console
    }
  };

  useEffect(() => {
    loadReceivables(); // Chama a função de carregar as contas quando o componente é montado
  }, []); // O array vazio faz com que a função seja chamada apenas uma vez, após o primeiro render

  // Função para excluir uma conta a receber
  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      // Confirmação de exclusão
      try {
        await receivables.delete(id); // Chama o serviço para deletar a conta
        await loadReceivables(); // Recarrega a lista de contas após a exclusão
      } catch (error) {
        console.error("Erro ao deletar:", error); // Em caso de erro, exibe no console
      }
    }
  };

  // Função para formatar a data para o formato pt-BR
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  // Função para formatar o valor para o formato de moeda brasileiro (BRL)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Contas a Receber</h2> {/* Título da página */}
      </div>

      {/* Formulário para adicionar uma nova conta a receber */}
      <div className="table-container">
        <Formik
          initialValues={{
            description: "", // Valor inicial do campo 'description'
            amount: "", // Valor inicial do campo 'amount'
            dueDate: "", // Valor inicial do campo 'dueDate'
          }}
          validationSchema={ReceivableSchema} // Aplica a validação definida acima
          onSubmit={async (values, { resetForm }) => {
            try {
              // Chama o serviço de criação de conta a receber
              await receivables.create({
                description: values.description,
                amount: Number(values.amount), // Converte o valor para número
                dueDate: values.dueDate,
              });
              resetForm(); // Reseta o formulário após o envio
              await loadReceivables(); // Recarrega a lista de contas após a criação
            } catch (error) {
              console.error("Erro ao criar conta:", error); // Exibe erro no console em caso de falha
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="row g-3 mb-4">
              {/* Campo de descrição */}
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
                  <div className="invalid-feedback">{errors.description}</div> // Exibe o erro se houver
                )}
              </div>

              {/* Campo de valor */}
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
                  <div className="invalid-feedback">{errors.amount}</div> // Exibe o erro se houver
                )}
              </div>

              {/* Campo de data de vencimento */}
              <div className="col-md-3">
                <Field
                  name="dueDate"
                  type="date"
                  className={`form-control ${
                    errors.dueDate && touched.dueDate ? "is-invalid" : ""
                  }`}
                />
                {errors.dueDate && touched.dueDate && (
                  <div className="invalid-feedback">{errors.dueDate}</div> // Exibe o erro se houver
                )}
              </div>

              {/* Botão de submit */}
              <div className="col-md-2">
                <button type="submit" className="btn btn-primary w-100">
                  Adicionar
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {/* Tabela para listar as contas a receber */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Vencimento</th>
                <th>Criado por</th>
                {user?.isAdmin && <th>Ações</th>}{" "}
                {/* Exibe a coluna de ações apenas se o usuário for admin */}
              </tr>
            </thead>
            <tbody>
              {/* Mapeia a lista de contas a receber */}
              {receivablesList.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{formatCurrency(item.amount)}</td>
                  <td>{formatDate(item.dueDate)}</td>
                  <td>{item.user.name}</td>
                  {user?.isAdmin && (
                    <td>
                      {/* Botão de excluir */}
                      <button
                        className="btn btn-sm btn-danger btn-action"
                        onClick={() => handleDelete(item.id)} // Chama a função de excluir ao clicar
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
