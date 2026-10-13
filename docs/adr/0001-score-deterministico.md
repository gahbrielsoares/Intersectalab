# ADR 0001 — Score calculado em código, não pelo LLM

**Status:** proposto

## Contexto
O diferencial declarado da Intersecta frente a "IA genérica" é um método calibrado. Se o LLM gerar o número diretamente, o score varia entre execuções, não é auditável e projetos não são comparáveis entre si, o que inviabiliza o benchmark de portfólio.

## Decisão
O processo tem três etapas:
1. O LLM extrai, para cada critério da rubrica, um **nível de evidência** (0 ausente, 1 presumido, 2 parcial, 3 evidenciado), com justificativa e trechos de origem, em JSON validado por schema.
2. O `scm-engine` calcula scores por peça e geral a partir de pesos, travas e limiares definidos na rubrica versionada.
3. O LLM redige o diagnóstico usando o resultado calculado, sem alterar números.

## Consequências
- Score reproduzível, explicável critério a critério e defensável diante de bancas e NITs.
- O método fica codificado como ativo proprietário, separado do provedor de LLM.
- A qualidade passa a depender da extração de evidências, medida pelos `evals`.
