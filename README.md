# Sistema Financeiro - Contas a Receber

Um sistema web completo para gerenciamento de contas a receber, desenvolvido com TypeScript, Node.js, React e PostgreSQL. Este projeto foi realizado para o módulo financeiro de um ERP, conforme as instruções da disciplina de Desenvolvimento Web III.

## 📚 Sobre o Projeto

Este sistema permite a administração de contas a receber de maneira prática e segura, oferecendo um conjunto completo de operações de CRUD. O sistema foi desenvolvido em arquitetura Cliente-Servidor, utilizando uma API RESTful para o backend e uma interface amigável e responsiva para o frontend.

## 🚀 Tecnologias Utilizadas

### Backend

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT para autenticação
- Docker para o banco de dados

### Frontend

- React
- TypeScript
- Bootstrap
- Formik + Yup para validação de formulários
- Axios para requisições HTTP
- React Router para navegação

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Docker
- PostgreSQL (via Docker)

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
https://github.com/Heitorccf/solid-waddle.git
```

### 2. Configuração do Banco de Dados

```bash
# Inicie o container do PostgreSQL
docker run --name financial_db \
  -e POSTGRES_DB=financial_db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin123 \
  -p 5432:5432 \
  -d postgres:latest
```

### 3. Backend

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O backend estará rodando em http://localhost:3000

### 4. Frontend

```bash
# Em outro terminal, entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

O frontend estará rodando em http://localhost:3001

## 🌟 Funcionalidades

### Autenticação e Controle de Sessão

- Registro de usuários com campos personalizados
- Login com validação
- Proteção de rotas com verificação de autenticação via JWT
- Controle de acesso baseado em papéis (admin/usuário comum)

### Gerenciamento de Contas a Receber

- **Listagem de Contas**: Visualize todas as contas que não foram excluídas
- **Detalhes de Conta**: Exibe informações detalhadas de cada conta
- **Criação de Contas**: Adicione novas contas ao sistema
- **Edição de Contas** (apenas para admin): Atualize informações existentes
- **Exclusão de Contas** (apenas para admin): Realiza uma exclusão lógica das contas, marcando-as como removidas

### APIs e Regras de Negócio

O backend implementa um conjunto de APIs RESTful para gerenciamento de contas a receber, seguindo o padrão CRUD. Cada operação foi projetada de acordo com as instruções para o projeto:

- **GetAllAccounts**: Retorna todas as contas não removidas
- **GetAccountById**: Retorna uma conta específica pelo ID (desde que não esteja removida)
- **CreateAccount**: Insere uma nova conta
- **UpdateAccount**: Atualiza uma conta existente (requer ID)
- **DeleteAccount**: Realiza um soft delete, marcando a conta como removida

### No Frontend

Para cada API do backend, há uma função correspondente que realiza a comunicação necessária para consumir os dados, mantendo o frontend sempre atualizado com o backend.

## 👥 Papéis de Usuário

### Administrador

- Acesso total ao sistema
- Pode criar, editar e excluir contas
- Visualização completa de todas as informações do sistema

### Usuário Comum

- Visualização das contas
- Criação de novas contas
- Sem permissão para editar ou excluir contas

## 🔐 Variáveis de Ambiente

### Backend (.env)

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=admin123
DB_DATABASE=financial_db
JWT_SECRET=your_super_secret_key_here
```

## 📁 Estrutura do Projeto

```
financial-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── entities/
│   │   ├── middlewares/
│   │   └── routes/
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   ├── services/
    │   └── types/
    ├── package.json
    └── tsconfig.json
```

## 💻 Como Usar

1. Acesse http://localhost:3001
2. Faça login ou crie uma nova conta
3. Para criar uma conta admin, use a rota de registro com o campo `isAdmin: true`
4. Comece a gerenciar suas contas a receber!

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- Autenticação via JWT para proteção de rotas
- Proteção contra CSRF
- Validação de dados com Yup
- Controle de acesso baseado em papéis

## 📊 Avaliação e Entrega

Projeto desenvolvido para avaliação na disciplina de Desenvolvimento Web III, Bacharelado em Sistemas de Informação. A entrega foi realizada no Github com apresentação final em seminário, conforme orientações do curso.
