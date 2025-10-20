Aqui está o README com o item extra em **“Próximos passos sugeridos”** — já mantendo seu texto e o tom:

---

# search-comp-front — Mini Projeto Intellux (Frontend)

> Este diretório é o **frontend** do monorepo `mini-projeto-intellux`. No repositório raiz você verá as pastas **`search-comp`** (API) e **`search-comp-front`** (frontend). ([GitHub][1])

---

## 🧠 Funcionamento da aplicação

A interface apresenta um **formulário de busca** simples. Quando o usuário envia a pesquisa:

1. O app lê a **URL base da API** a partir do arquivo de ambiente (`.env.local`);
2. Faz uma **requisição HTTP** para o backend (`search-comp`);
3. E **renderiza** a resposta em componentes React (com estados de “carregando” quando necessário).

> Em projetos Next.js, variáveis de ambiente expostas no cliente usam o prefixo **`NEXT_PUBLIC_`** (ex.: `NEXT_PUBLIC_API_BASE_URL`). ([Next.js][2])

---

## 🧰 Principais tecnologias utilizadas

- **React** + **TypeScript** (base da UI).
- **Next.js** (estrutura moderna com **App Router**, páginas em `app/` como `page.tsx`, e layouts com `layout.tsx`). ([Next.js][3])
- **Cliente HTTP** (`axios`) para se comunicar com a API.
- **CSS utilitário** (Tailwind) e **ESLint/Prettier** para padronização.

---

## ▶️ Como rodar o projeto localmente

### 0) Pré-requisitos

- **Node.js** LTS (18+ ou 20+) e **Git** instalados.

### 1) Clonar o monorepo e entrar no frontend

```bash
git clone https://github.com/Zul1u/mini-projeto-intellux.git
cd mini-projeto-intellux/search-comp-front
```

(O monorepo contém `search-comp` e `search-comp-front`.) ([GitHub][1])

### 2) Instalar dependências

```bash
npm install
# ou: yarn / pnpm install
```

### 3) **Configurar variáveis de ambiente**

Copie o arquivo de exemplo e **remova o `.example`** do nome:

```bash
cp .env.example .env.local
```

Edite **`.env.local`** e configure a URL pública da API (exemplo):

```ini
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

No Next.js, variáveis acessíveis no **cliente** devem começar com **`NEXT_PUBLIC_`**. ([Next.js][2])

### 4) Rodar em desenvolvimento

```bash
npm run dev
```

Abra **[http://localhost:3000](http://localhost:3000)** no navegador.

> Lembre-se de subir o backend (`search-comp`) apontado por `NEXT_PUBLIC_API_BASE_URL`.

---

## 🧭 Principais decisões técnicas

- **Separação front/back no monorepo**: facilita deploy e manutenção; cada app tem seus próprios scripts e dependências. ([GitHub][1])
- **Next.js com App Router**: rotas baseadas em arquivos (`app/page.tsx`) e **layouts** reutilizáveis (`app/layout.tsx`) para UI compartilhada e composição mais clara. ([Next.js][3])
- **Config via `.env.local`**: a URL da API fica fora do código; no cliente, use o prefixo **`NEXT_PUBLIC_`**.

---

## ⚠️ Limitações e próximos passos

**Limitações:**

- A principal limitação durante o desenvolvimento foi **escolher as ferramentas** que seriam utilizadas para construir a aplicação.

**Próximos passos sugeridos:**

- Adicionar **testes** (ex.: Jest/RTL ou Vitest) e pipeline de **CI** (lint/test/build).
- **Documentar** os contratos da API consumida (ex.: exemplos de request/response no README e/ou Swagger no backend).
- **Tratamento de erros** para falhas na API (exibir uma mensagem amigável avisando que ocorreu um problema).
- **Salvar** os resultados em um banco de dados e **exibir no front** as buscas já feitas, com **filtros**.
- **Configuração mais robusta do Axios**: criar uma **instância** (`axios.create`) com `baseURL`/`timeout` e **interceptors** para padronizar sucesso/erro; **exigir tipagem do corpo** (quando houver) e **padronizar o tipo de retorno** no app, algo como:
  `{ data: <resposta-da-requisição>, statusCode: <status-da-requisição> }`.

[1]: https://github.com/Zul1u/mini-projeto-intellux "GitHub - Zul1u/mini-projeto-intellux"
[2]: https://nextjs.org/docs/pages/guides/environment-variables?utm_source=chatgpt.com "Guides: Environment Variables"
[3]: https://nextjs.org/docs/app/getting-started/layouts-and-pages?utm_source=chatgpt.com "Getting Started: Layouts and Pages"
[4]: https://vercel.com/docs/environment-variables/framework-environment-variables?utm_source=chatgpt.com "Framework environment variables"

---

[1]: https://axios-http.com/docs/interceptors?utm_source=chatgpt.com "Interceptors | Axios Docs"
[2]: https://axios-http.com/docs/instance?utm_source=chatgpt.com "The Axios Instance | Axios Docs"
[3]: https://axios-http.com/docs/handling_errors?utm_source=chatgpt.com "Handling Errors | Axios Docs"
