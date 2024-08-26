# Gerenciador de Empréstimo de Livros

Bem-vindo ao projeto **Gerenciador de Empréstimo de Livros**! Este é um sistema projetado para facilitar o gerenciamento de empréstimos de livros. O sistema permite autenticação de usuários, registro e operações CRUD (Criar, Ler, Atualizar, Excluir) em relação aos livros.

## Índice

- Tecnologias Utilizadas
- Dependências
- Instalação
- Uso
- Rotas da API
  - /api/login
  - /api/signup
  - /api/books
- Contribuição
- Licença

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework para construir a API.
- **JWT**: Para autenticação e autorização.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar informações de usuários e livros.
- **pgAdmin**: Ferramenta de gerenciamento para PostgreSQL.
- **Docker**: Para containerização e gerenciamento dos serviços.

## Dependências

Este projeto utiliza as seguintes dependências:

- **bcrypt**: "^5.1.1" - Para criptografia de senhas.
- **dotenv**: "^16.4.5" - Para carregar variáveis de ambiente a partir de um arquivo `.env`.
- **express**: "^4.19.2" - Framework web para Node.js.
- **jsonwebtoken**: "^9.0.2" - Para criar e verificar JSON Web Tokens.
- **nodemon**: "^3.1.4" - Para reiniciar automaticamente o servidor durante o desenvolvimento.
- **pg**: "^8.12.0" - Cliente PostgreSQL para Node.js.
- **rimraf**: "^6.0.1" - Para remover arquivos e diretórios.
- **typescript**: "^5.5.4" - Superset de JavaScript com tipagem estática.
- **validator**: "^13.12.0" - Para validação de strings e entradas.

## Instalação

Para instalar e executar o Gerenciador de Empréstimo de Livros, siga os passos abaixo:

1. **Certifique-se de que o Docker está instalado.**

   - Você pode baixar e instalar o Docker a partir do [site oficial](https://www.docker.com/products/docker-desktop).

2. **Clone o repositório:**

git clone https://github.com/danielfalcaovt/GerenciaBook-API.git

3. **Navegue até o diretório do projeto:**

cd GerenciaBook-API


4. **Execute o script para iniciar os containers do PostgreSQL e pgAdmin:**

No Windows, execute o arquivo `start-database.bat`. Este script configura e inicia o PostgreSQL e o pgAdmin em containers Docker.

start-database.bat


5. **Inicie a aplicação:**

Após iniciar os containers do banco de dados, você pode iniciar a aplicação. Execute o seguinte comando para construir a imagem Docker e iniciar o container da aplicação:

npm run up


Este comando irá construir e iniciar a aplicação em um container Docker, configurando automaticamente a conexão com o banco de dados e pgAdmin.

A aplicação estará disponível em `http://localhost:3000`.
## Uso

Após iniciar o servidor, a API estará disponível em `http://localhost:3000`. Você pode interagir com a API utilizando ferramentas como Postman ou CURL.

## Rotas da API

### `/api/login`

**Método:** POST

**Descrição:** Efetua o login de um usuário e retorna um JWT ou um erro.

**Corpo da Requisição:**

{ "email": "usuario@example.com", "senha": "sua_senha" }


**Resposta de Sucesso:**

{ "token": "seu_jwt_aqui" }


**Resposta de Erro:**

{ "error": "Credenciais inválidas" }


### `/api/signup`

**Método:** POST

**Descrição:** Registra um novo usuário e retorna o usuário criado com a senha hashada ou um erro.

**Corpo da Requisição:**

{ "name": "Nome Completo", "email": "usuario@example.com", "password": "sua_senha", "confirmPassword": "confirme_sua_senha" }


**Resposta de Sucesso:**

{ "id": "id_do_usuario", "name": "Nome Completo", "email": "usuario@example.com", "password": "senha_hashada_aqui" }


**Resposta de Erro:**

{ "error": "Erro ao registrar o usuário" }


### `/api/books`

**Método:** GET

**Descrição:** Retorna a lista de todos os livros emprestados.

**Resposta de Sucesso:**

[ { "id": "id_do_livro", "student_name": "Nome do Aluno", "book_name": "Título do Livro", "lend_day": 1714281600, // Unix timestamp "student_class": "Turma do Aluno" } ]


**Método:** POST

**Descrição:** Adiciona um novo livro emprestado.

**Corpo da Requisição:**

{ "student_name": "Nome do Aluno", "book_name": "Título do Livro", "lend_day": 1714281600, // Unix timestamp "student_class": "Turma do Aluno" }


**Resposta de Sucesso:**

[ { "id": "id_do_livro", "student_name": "Nome do Aluno", "book_name": "Título do Livro", "lend_day": 1714281600, // Unix timestamp "student_class": "Turma do Aluno" } ]


**Método:** PATCH

**Descrição:** Atualiza informações de um livro emprestado. É obrigatório passar o `id` do livro e ao menos um dos outros parâmetros.

**Corpo da Requisição:**

{ "id": "id_do_livro", "student_name": "Nome do Aluno", "book_name": "Título do Livro", "lend_day": 1714281600, // Unix timestamp "student_class": "Turma do Aluno" }


**Resposta de Sucesso:**

[ { "id": "id_do_livro", "student_name": "Nome do Aluno", "book_name": "Título do Livro", "lend_day": 1714281600, // Unix timestamp "student_class": "Turma do Aluno" } ]


**Método:** DELETE

**Descrição:** Remove um livro emprestado com base no `id` fornecido.

**Corpo da Requisição:**

{ "id": "id_do_livro" }


**Resposta de Sucesso:**

[ { "message": "Livro removido com sucesso" } ]


**Resposta de Erro:**

[ { "error": "Erro ao remover o livro" } ]

