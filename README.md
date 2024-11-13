# Sistema Financeiro - Contas a Receber

Um sistema web completo para gerenciamento de contas a receber, desenvolvido com TypeScript, Node.js, React e PostgreSQL.

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

### Autenticação

- Registro de usuários
- Login
- Proteção de rotas
- Controle de acesso baseado em papéis (admin/usuário comum)

### Contas a Receber

- Listagem de todas as contas
- Criação de novas contas
- Edição de contas existentes (apenas admin)
- Exclusão de contas (apenas admin)
- Visualização detalhada

## 👥 Papéis de Usuário

### Administrador

- Acesso total ao sistema
- Pode criar, editar e excluir contas
- Visualização de todas as informações

### Usuário Comum

- Pode visualizar todas as contas
- Pode criar novas contas
- Não pode editar ou excluir contas

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
3. Para criar uma conta admin, use a rota de registro com o campo isAdmin: true
4. Comece a gerenciar suas contas a receber!

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- Autenticação via JWT
- Proteção contra CSRF
- Validação de dados com Yup
- Controle de acesso baseado em papéis
