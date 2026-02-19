# Guia: criar um projeto parecido com este (`clone-tabnews`)

## 1) O que você precisa instalar

- **Git**
- **NVM** (Node Version Manager)
- **Node.js 18 LTS** (este projeto usa `lts/hydrogen`)
- **npm** (vem com o Node)
- **Docker + Docker Compose** (para subir o PostgreSQL)

---

## 2) Criar o projeto base

```bash
mkdir meu-clone-tabnews
cd meu-clone-tabnews
npm init -y
```

Instale as dependências do app:

```bash
npm install next@^15.5.9 react@^18.2.0 react-dom@^18.2.0 pg@^8.18.0
npm install -D jest@^29.6.2 prettier@^3.7.4
```

Crie a versão do Node esperada:

```bash
echo "lts/hydrogen" > .nvmrc
nvm use
```

---

## 3) Estrutura de pastas (similar a este projeto)

```txt
infra/
  compose.yml
pages/
  index.js
  api/
    v1/
      status/
        index.js
tests/
  integrations/
    api/
      v1/
        status/
          get.test.js
```

---

## 4) Scripts no `package.json`

Adicione estes scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "lint:check": "prettier --check .",
    "lint:fix": "prettier --write .",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

---

## 5) Configurar variáveis de ambiente

Crie o arquivo `.env.development` na raiz:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

> Os nomes acima seguem o que o projeto usa em `infra/database.js`.

---

## 6) Subir o banco PostgreSQL com Docker

Crie `infra/compose.yml`:

```yml
services:
  database:
    image: 'postgres:16.0-alpine3.18'
    env_file:
      - ../.env.development
    ports:
      - '5432:5432'
```

Suba o banco:

```bash
docker compose -f infra/compose.yml up -d
```

---

## 7) Rodar a aplicação

```bash
npm run dev
```

App local: `http://localhost:3000`

---

## 8) Rodar testes

Uma execução:

```bash
npm test
```

Modo observação:

```bash
npm run test:watch
```

---

## 9) Checklist rápido de problemas comuns

- Se `process.env.*` vier `undefined`, confirme se o arquivo `.env.development` existe e está com os nomes corretos.
- Se o banco não conecta, verifique se o container está no ar (`docker ps`) e se a porta `5432` está livre.
- Se der erro de versão do Node, rode `nvm use` na pasta do projeto.
