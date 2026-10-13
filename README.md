# Intersecta Lab

Plataforma de diagnóstico estratégico para ciência aplicada e deep tech, baseada no **Scientific Chess Method (SCM)**.

- **Pesquisadores:** diagnóstico guiado por IA com score de prontidão tecno-comercial (0–100), mapa de risco e próximos movimentos.
- **NITs e ambientes de inovação:** triagem do portfólio em escala, benchmark entre projetos e dossiê exportável.

## Estrutura

```
apps/
  web-estatico/   versão de teste estática (GitHub Pages), IA via chave informada no navegador (Gemini ou Claude) ✅
  prototipo/      versão de apresentação que roda dentro do Claude ✅
  web/            site + chat de diagnóstico com backend próprio — próxima fase
  nit/            painel institucional — a criar
packages/
  scm-engine/     motor do método: uma peça por arquivo (src/pecas), tabuleiro e fontes científicas ✅
  llm/            provedor de LLM, prompts versionados, extração estruturada
  ingest/         leitura de PDF e normalização de texto
  reports/        geração do dossiê (PDF)
  db/             schema Postgres e migrações
evals/            projetos-gabarito para medir concordância IA × especialista
docs/             arquitetura, decisões (ADRs), LGPD
```

## Começando

```bash
npm install
npm test
```

## Onde ficam as regras do método

Cada peça tem seu próprio arquivo em `packages/scm-engine/src/pecas/` (rei.ts, rainha.ts, torre.ts, bispo.ts, cavalo.ts, peao.ts). O arquivo `tabuleiro.ts` define o peso de cada peça e as regras entre peças. Depois de editar, rode `npm run build:site` dentro de `packages/scm-engine` para atualizar o site.

## Versão de teste online

A pasta `apps/web-estatico/` é publicada no GitHub Pages pela branch `gh-pages`. Ao abrir, clique em **Conectar IA** e escolha o provedor (Google Gemini, com plano gratuito, ou Anthropic Claude) e informe a chave da API. A chave fica só no navegador de quem usa e nunca é gravada no repositório.

## Documentação

- [Arquitetura](docs/arquitetura.md)
- [ADR 0001 — Score determinístico](docs/adr/0001-score-deterministico.md)
- [LGPD](docs/lgpd.md)
- [Fundamentação científica das peças](docs/metodo/fundamentacao.md)
- [Perguntas em aberto](docs/perguntas-em-aberto.md)
- [Design system (design.json)](docs/design/design.json)

Projeto apoiado pelo Programa Centelha. Rio Claro · SP.
