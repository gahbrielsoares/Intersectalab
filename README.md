# Intersecta Lab

Plataforma de diagnóstico estratégico para ciência aplicada e deep tech, baseada no **Scientific Chess Method (SCM)**.

- **Pesquisadores:** diagnóstico guiado por IA com score de prontidão tecno-comercial (0–100), mapa de risco e próximos movimentos.
- **NITs e ambientes de inovação:** triagem do portfólio em escala, benchmark entre projetos e dossiê exportável.

## Estrutura

```
apps/
  web-estatico/   versão de teste estática (GitHub Pages), IA via chave informada no navegador ✅
  prototipo/      versão de apresentação que roda dentro do Claude ✅
  web/            site + chat de diagnóstico com backend próprio — próxima fase
  nit/            painel institucional — a criar
packages/
  scm-engine/     rubrica versionada e cálculo determinístico do score ✅
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

## Versão de teste online

A pasta `apps/web-estatico/` é publicada no GitHub Pages pela branch `gh-pages`. Ao abrir, clique em **Conectar IA** e informe uma chave da API da Anthropic. A chave fica só no navegador de quem usa e nunca é gravada no repositório.

## Documentação

- [Arquitetura](docs/arquitetura.md)
- [ADR 0001 — Score determinístico](docs/adr/0001-score-deterministico.md)
- [LGPD](docs/lgpd.md)
- [Perguntas em aberto](docs/perguntas-em-aberto.md)

Projeto apoiado pelo Programa Centelha. Rio Claro · SP.
