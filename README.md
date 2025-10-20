# mini-projeto-intellux

## 🧠 Funcionamento da aplicação

O repositório é um **monorepo** com dois apps que trabalham juntos:

- **Backend — `search-comp`**: uma **API** em Node.js/TypeScript (NestJS). Recebe requisições do frontend (JSON), valida os dados (DTOs/pipes), integra com serviços externos (ex.: provedor de IA) usando variáveis de ambiente e retorna uma resposta estruturada ao cliente. (Estrutura em duas pastas visível no repositório; linguagens com predominância de TypeScript.) ([GitHub][1])
- **Frontend — `search-comp-front`**: uma aplicação **React/TypeScript (Next.js)**. Lê a **URL da API** de arquivo de ambiente e faz as requisições ao backend. ([GitHub][1])

---

## 🧰 Tecnologias utilizadas

- **TypeScript** (linguagem predominante do repositório). ([GitHub][1])
- **Node.js** (runtime do backend) e **NestJS** (arquitetura modular: Module/Controller/Service; configuração via `.env` com `@nestjs/config`).
- **React** + **Next.js** (frontend com App Router; leitura de variáveis de ambiente no cliente via `NEXT_PUBLIC_*`). ([GitHub][2])
- **Cliente HTTP** no frontend (por exemplo, `fetch`/Axios) para consumir a API.
- **Ferramentas de qualidade** usuais (ESLint/Prettier) e CSS utilitário (ex.: Tailwind), conforme necessidade do projeto.

> A página principal do repositório confirma a **organização em duas pastas** (`search-comp` e `search-comp-front`) e a **proporção de linguagens**. ([GitHub][1])

---

## ▶️ Como rodar o projeto localmente

### 0) Pré-requisitos

- **Node.js** (LTS 18+ ou 20+)
- **Git**

### 1) Clonar o repositório

```bash
git clone https://github.com/Zul1u/mini-projeto-intellux.git
cd mini-projeto-intellux
```

(As pastas `search-comp` e `search-comp-front` estão na raiz.) ([GitHub][1])

---

### 2) Backend — `search-comp` (API)

1. Instalar dependências:

```bash
cd search-comp
npm install
```

2. **Configurar variáveis de ambiente (obrigatório)**
   Se existir **`.env.example`**, copie/renomeie para **`.env`**; caso não exista, **crie** `.env` e preencha as chaves necessárias:

```ini
OPENAI_API_KEY=...        # chave do provedor de IA
OPENAI_MODEL=gpt-5-mini   # modelo desejado (exemplo)
PORT=8080                 # porta local da API
CORS_ORIGIN=http://localhost:3000  # ajuste se necessário
```

3. Subir em desenvolvimento:

```bash
npm run start:dev
```

---

### 3) Frontend — `search-comp-front`

1. Instalar dependências:

```bash
cd ../search-comp-front
npm install
```

2. **Configurar variáveis de ambiente**
   Se existir **`.env.example`**, copie/renomeie para **`.env.local`**; caso não exista, **crie** `.env.local`:

```ini
# URL pública do backend (adicione /api se o backend expuser esse prefixo)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

> Em Next.js, variáveis acessíveis no **cliente** precisam do prefixo **`NEXT_PUBLIC_`**. ([GitHub][2])

3. Rodar em desenvolvimento:

```bash
npm run dev
```

Acesse **[http://localhost:3000](http://localhost:3000)** no navegador (porta padrão do Next.js).

---

### 4) Checklist rápido

- [ ] Clonou o repositório e entrou na raiz
- [ ] **Backend**: `npm install` → configurar **`.env`** → `npm run start:dev`
- [ ] **Frontend**: `npm install` → configurar **`.env.local`** (com `NEXT_PUBLIC_API_BASE_URL`) → `npm run dev`
- [ ] Testou o fluxo: frontend chamando a API no endereço configurado

[1]: https://github.com/Zul1u/mini-projeto-intellux "GitHub - Zul1u/mini-projeto-intellux"
[2]: https://github.com/Zul1u/mini-projeto-intellux/blob/main/README.md "mini-projeto-intellux/README.md at main · Zul1u/mini-projeto-intellux · GitHub"
