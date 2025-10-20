Aqui está seu README revisado, com correções de português e pequenos ajustes de consistência, mantendo o conteúdo e os links originais:

---

# search-comp — Mini Projeto Intellux (Backend/API)

> Este diretório contém a **API** do monorepo `mini-projeto-intellux`. Na raiz do repositório você encontrará as pastas **`search-comp`** (backend) e **`search-comp-front`** (frontend). ([GitHub][1])

---

## 🧠 Funcionamento da aplicação

O backend expõe endpoints HTTP que o frontend consome para pesquisar **empresas** e/ou **tendências de mercado**. Em alto nível, o fluxo é:

1. Receber a requisição do frontend (JSON).
2. Validar e transformar os dados de entrada (DTOs + pipes). ([NestJS Documentation][2])
3. Orquestrar integrações externas (ex.: provedor de IA) usando chaves definidas via **variáveis de ambiente**. ([NestJS Documentation][3])
4. Retornar uma resposta **estruturada** para o cliente (ex.: `data` + `statusCode`).

> A configuração via `.env` é carregada no processo e injetada onde necessário (padrão `@nestjs/config`). ([NestJS Documentation][3])

---

## 🧰 Principais tecnologias utilizadas

- **Node.js** + **TypeScript**
- **NestJS** (arquitetura modular com `Module`, `Controller`, `Service`)
- **Validação/transformação** com **ValidationPipe**, `class-validator` e `class-transformer` (DTOs) ([NestJS Documentation][2])
- **Configuração** via **`@nestjs/config`** e variáveis de ambiente (.env) ([NestJS Documentation][3])
- **Pipes/Providers** (transformação, validação e injeção de dependências) ([NestJS Documentation][4])
- **Boas práticas de deploy**: segredos em variáveis de ambiente/secret manager (sem hardcode) ([NestJS Documentation][5])

---

## ▶️ Como rodar o projeto localmente

### 0) Pré-requisitos

- **Node.js** LTS (18+ ou 20+)
- **Git**

### 1) Clonar o repositório e entrar no backend

```bash
git clone https://github.com/Zul1u/mini-projeto-intellux.git
cd mini-projeto-intellux/search-comp
```

([GitHub][1])

### 2) Instalar dependências

```bash
npm install
# ou: yarn / pnpm install
```

### 3) **Configurar variáveis de ambiente (obrigatório)**

Copie o arquivo de exemplo e remova o sufixo:

```bash
cp .env.example .env
```

Abra **`.env`** e preencha os valores necessários (exemplos comuns):

```ini
OPENAI_API_KEY=...        # chave do provedor de IA
OPENAI_MODEL=gpt-5-mini   # modelo padrão
PORT=8080                 # porta local da API
CORS_ORIGIN=http://localhost:3000  # caso precise liberar o front localmente
```

> O carregamento de variáveis é feito pelo ConfigModule, acessadas via `ConfigService`. ([NestJS Documentation][3])

### 4) Subir em desenvolvimento

```bash
npm run start:dev
```

### 5) Testar rapidamente (exemplos)

```bash
# Health (ajuste a porta conforme seu .env)
curl http://localhost:8080/health

# Exemplo de busca por empresa (corpo ilustrativo)
curl -X POST http://localhost:8080/search/company \
  -H "Content-Type: application/json" \
  -d '{"companyName":"Nubank","language":"pt-BR"}'
```

> Dica: mantenha a **URL base** da API alinhada com o frontend (no front, use `NEXT_PUBLIC_API_BASE_URL`).

---

## 🧭 Principais decisões técnicas

- **Arquitetura NestJS** (module/controller/service) para separação de responsabilidades e testabilidade.
- **DTOs + ValidationPipe** para garantir **entradas válidas e tipadas** (evita que dados incorretos cheguem à camada de domínio). ([NestJS Documentation][2])
- **Configuração centralizada** via `@nestjs/config`, mantendo segredos fora do código e permitindo perfis por ambiente. ([NestJS Documentation][3])
- **Resposta padronizada** para o cliente (ex.: `{ data, statusCode }`) — facilita o consumo no frontend e a observabilidade.
- **CORS** configurável por ambiente (liberar o front local; restringir em produção).
- **Timeouts/retries** para chamadas externas (resiliência) e logs consistentes para troubleshooting.

---

## ⚠️ Limitações e próximos passos

**Limitações**

- **Tratamento de erros** ainda pode ser enriquecido (filtros globais, mapeamento consistente de status HTTP).
- **Observabilidade** inicial (logs estruturados, métricas, tracing) pode ser ampliada.
- **Testes** unitários/e2e e **CI** podem estar mínimos no começo.

**Próximos passos sugeridos:**

- **Documentar os endpoints** (Swagger) e publicar exemplos de requisição/resposta.
- **Adicionar testes** (unit/e2e) + pipeline de **CI** (lint/test/build).
- **Rate limiting** e **schema validation** mais rígida (defesa contra abuso).
- **Padronizar a saída** de todas as rotas no formato `{ data, statusCode }`.
- **Fallbacks/retries** para integrações externas e **timeouts** bem definidos.
- **Adicionar uma etapa de login** antes de começar a fazer as buscas.
- **Salvar as buscas já feitas** e criar **rota de GET** (com filtros por tipo e data da requisição) para **exibição no frontend** e **rota de DELETE**.

---

[1]: https://github.com/Zul1u/mini-projeto-intellux/tree/main/search-comp 'mini-projeto-intellux/search-comp at main · Zul1u/mini-projeto-intellux · GitHub'
[2]: https://docs.nestjs.com/techniques/validation?utm_source=chatgpt.com 'Validation | NestJS - A progressive Node.js framework'
[3]: https://docs.nestjs.com/techniques/configuration?utm_source=chatgpt.com 'Configuration | NestJS - A progressive Node.js framework'
[4]: https://docs.nestjs.com/pipes?utm_source=chatgpt.com 'Pipes | NestJS - A progressive Node.js framework'
[5]: https://docs.nestjs.com/deployment?utm_source=chatgpt.com 'Deployment | NestJS - A progressive Node.js framework'
