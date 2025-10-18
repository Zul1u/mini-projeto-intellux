import { Injectable } from '@nestjs/common';
import { CompanyRequestDTO, TrendRequestDTO } from '../dto';

@Injectable()
export class IntelligencePromptFactory {
  searchCompany(input: CompanyRequestDTO): string {
    const { companyName, language } = input;

    return `
Você é um analista de mercado com acesso à ferramenta web_search.

Sua tarefa: buscar na web pelo nome de uma empresa específica e retornar EXATAMENTE um JSON no formato abaixo.

Regras e requisitos:
- Se necessário use a ferramenta web_search para a coleta de informações.
- Use apenas informações encontradas nesta execução.
- Evite fontes não confiáveis.
- Não invente links; todas as URLs devem ser reais e acessíveis.
- Responda em ${language}.
- Liste no máximo 3 concorrentes.
- O campo "name" deve ser preenchido com o nome oficial da empresa encontrado durante a busca
- A resposta DEVE ser somente o JSON, sem qualquer texto adicional.

Entrada:
- Nome da empresa-alvo: "${companyName}"

Critérios de pesquisa e seleção:
- Foque no que a empresa faz (produtos/serviços, mercados atendidos) e onde atua.
- No campo "branch", liste as áreas/categorias em que a empresa atua (ex.: "notebooks", "smartphones", "serviços em nuvem").
- Para concorrentes diretos, escolha empresas atuais e relevantes que disputem o mesmo mercado/segmento (público, canal e/ou categoria).
- Em "why", explique por que são concorrentes.
- No "branch" dos concorrentes, liste as áreas/categorias específicas em que concorrem com a empresa-alvo.
- Se não encontrar a empresa solicitada: retorne "name" exatamente igual ao valor recebido, um "summary" breve explicando o motivo, e defina "branch": [], "competitors": [] e "sources": [].

Formato de saída (JSON):
{
  "name": "string",
  "summary": "string",
  "branch": ["string", "string"],
  "competitors": [
    {
      "name": "string",
      "site": "https://...",
      "why": "string",
      "branch": ["string", "string"]
    }
  ],
  "sources": [
    { "url": "https://...", "title": "string" }
  ]
}

Processo com web_search (não imprimir estes passos na saída):
1) Verifique se existe uma empresa com o nome recebido.
2) Pesquise pelo nome exato da empresa com termos como "about", "overview", "company profile" (pt/en).
3) Valide no site oficial.
4) Colete informações adicionais em fontes confiáveis (relatórios anuais/10-K, páginas institucionais, press releases, perfis corporativos reconhecidos).
5) Identifique até 3 concorrentes diretos; para cada um, valide com o site oficial e, quando necessário, uma fonte de apoio. Preencha "why" e "branch".
6) Monte a lista de fontes com "title" e "url" quando disponível.
7) Gere apenas o JSON final, exatamente no schema especificado.
`.trim();
  }

  searchMarketTrends(input: TrendRequestDTO): string {
    const { market, language, region } = input;

    return `
Você é um analista de mercado com acesso à ferramenta web_search.

Sua tarefa: buscar na web pela tendência de mercado específica e retornar EXATAMENTE um JSON no formato abaixo.

Regras e requisitos:
- Use a ferramenta web_search para TODA a coleta de informações.
- Use apenas informações encontradas nesta execução.
- Evite fontes não confiáveis.
- Não invente links; todas as URLs devem ser reais e acessíveis.
- A resposta DEVE ser somente o JSON, sem qualquer texto adicional.
- Liste no máximo 3 “pros” e 3 “against”.
- Responda em ${language}.

Critérios de pesquisa e seleção:
- Foque em buscar sempre as informações mais recentes sobre o mercado.
- Região de foco: ${region}.
- Limite a sua busca a no máximo os últimos 3 anos.
- No campo “summary” dê um breve resumo sobre o mercado pesquisado.
- No campo “trend” dê um breve resumo sobre a tendência do mercado dizendo se é favorável ou não.
- Na lista de “pros”, preencha o campo “name” com qual seria o ponto positivo, o campo “why” com um breve resumo do porquê e “sources” com as principais fontes.
- Na lista de “against”, preencha o campo “name” com qual seria o ponto negativo, o campo “why” com um breve resumo do porquê e “sources” com as principais fontes.
- Se o valor recebido não tiver haver com algum mercado especifico retorne: retorne "market" exatamente igual ao valor recebido, um "summary" breve explicando o motivo, "trend" uma string vazia "" e defina "pros": [], "against": [] e "sources": [].

Entrada:
- Nome da tendência de mercado: "${market}"

Formato de saída (JSON):
{
  "market": "string",
  "summary": "string",
  "trend": "string",
  "pros": [
    {
      "name": "string",
      "sources": [ { "url": "https://...", "title": "string" } ],
      "why": "string"
    }
  ],
  "against": [
    {
      "name": "string",
      "sources": [ { "url": "https://...", "title": "string" } ],
      "why": "string"
    }
  ],
  "sources": [
    { "url": "https://...", "title": "string" }
  ]
}

Processo com web_search (não imprimir estes passos na saída):
1) Busque por relatórios, matérias e páginas institucionais recentes dentro de máximo 3 anos atras.
2) Valide informações em fontes oficiais quando possível.
4) Liste as principais fontes em "sources".
5) Gere apenas o JSON final, exatamente no schema especificado.
`.trim();
  }
}
