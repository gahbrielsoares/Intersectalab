# Fundamentação científica das peças

Este documento explica de onde vem cada regra do motor (`packages/scm-engine`). Os critérios são resumos próprios em português, inspirados nas fontes abaixo; não reproduzem textos originais.

> Estado: base científica inicial (versão 0.2.0). Critérios, pesos e regras ainda serão ajustados com o documento do Scientific Chess Method da Dandara e calibrados com projetos-gabarito (`evals/`).

## Como o motor funciona

1. A IA lê o projeto e classifica cada critério em um nível de evidência de 0 a 3, usando as descrições de nível escritas em cada peça.
2. Cada peça calcula sua própria nota (média ponderada dos critérios) e aplica suas regras internas.
3. O tabuleiro combina as peças com seus pesos e aplica as regras entre peças.
4. A IA não dá nota em nenhum momento.

| Nível | Significado |
|---|---|
| 0 | Ausente: não há informação, ou o pesquisador não sabe |
| 1 | Suposição: afirmado sem dado, fonte ou teste |
| 2 | Parcial: dado indireto, de laboratório, de poucas fontes ou incompleto |
| 3 | Comprovado: dado externo e verificável, obtido com clientes, parceiros ou em ambiente real |

## Fontes

| Fonte | Tipo | Usada em |
|---|---|---|
| KTH Innovation Readiness Level (KTH Royal Institute of Technology) | Framework institucional, adotado por universidades como a DTU | Rei, Rainha, Bispo, Cavalo, Peão |
| NASA Technology Readiness Level / ISO 16290 | Padrão internacional | Rainha, Cavalo |
| Camuffo et al. (2020), *Management Science* | Ensaio randomizado, revisado por pares | Torre |
| Camuffo et al. (2024), *Strategic Management Journal*: 759 startups, 4 ensaios randomizados | Ensaio randomizado, revisado por pares | Torre |
| Gompers et al. (2020), *Journal of Financial Economics*: 885 investidores | Pesquisa empírica, revisada por pares | Peão, pesos |
| CB Insights, motivos de encerramento de startups (2014 e 2021) | Dados setoriais autodeclarados | Rei, Bispo, Cavalo, pesos |
| NSF I-Corps (Customer Development) | Programa institucional | Rei, Torre |

Referências completas e links ficam em `packages/scm-engine/src/fontes.ts`.

## As peças

**♔ Rei: O Problema** (`src/pecas/rei.ts`). Baseado nos níveis 1 a 4 da dimensão de cliente do KTH IRL: da hipótese própria ao problema confirmado por vários clientes (cerca de 5 a 10 em B2B, 10 a 20 em B2C). Regra interna: sem confirmação direta de clientes, a peça fica limitada a 50.

**♕ Rainha: Lógica do Negócio** (`src/pecas/rainha.ts`). Une a escala TRL (em que ambiente a tecnologia já foi demonstrada) com a dimensão de modelo de negócio do KTH IRL (proposta de valor, ganho frente às alternativas, modelo de receita).

**♖ Torre: Hipóteses** (`src/pecas/torre.ts`). Baseada nos ensaios randomizados de Camuffo et al.: empreendedores que formulam hipóteses explícitas e as testam com critério definido antes do resultado tomam decisões mais precisas e têm desempenho superior.

**♗ Bispo: Mercado** (`src/pecas/bispo.ts`). Níveis 5 a 8 da dimensão de cliente do KTH IRL (segmento-alvo, interesse concreto, identificação do decisor econômico) e dimensionamento de mercado e concorrência da dimensão de negócio. Regra interna: sem nenhum sinal concreto de interesse, a peça fica limitada a 45.

**♘ Cavalo: Riscos** (`src/pecas/cavalo.ts`). Dimensão de propriedade intelectual do KTH IRL (titularidade, proteção, liberdade de operação), caminho regulatório e riscos de cadeia de produção.

**♙ Peão: Equipe** (`src/pecas/peao.ts`). Dimensão de equipe do KTH IRL e Gompers et al. (2020): a equipe foi o fator mais citado como importante (95% dos investidores) e como o mais importante (47%).

## Pesos e regras do tabuleiro (`src/tabuleiro.ts`)

| Peça | Peso | Justificativa |
|---|---|---|
| Rei | 3 | Ausência de necessidade de mercado está entre as duas causas de encerramento mais citadas |
| Peão | 3 | Equipe é o fator mais importante para quase metade dos investidores |
| Bispo | 2,5 | Mercado e concorrência pesam na decisão de investimento e em cerca de 20% dos encerramentos |
| Rainha | 2 | Modelo de negócio é importante para 83% dos investidores |
| Torre | 2 | Testar hipóteses melhora desempenho em ensaios randomizados |
| Cavalo | 1,5 | Barreiras regulatórias e legais aparecem em cerca de 18% dos encerramentos |

Regras entre peças:
- Se o Rei ficar abaixo de 40, a nota geral fica limitada a 45.
- Se qualquer peça ficar abaixo de 15, a nota geral fica limitada a 60. Inspirado na regra do KTH de exigir um nível mínimo em todas as dimensões antes de financiar uma prova de conceito.

## Limitações conhecidas

- Os pesos são pontos de partida informados por dados, não um modelo estatístico calibrado. A calibração real virá dos projetos-gabarito.
- Os dados da CB Insights são autodeclarados por fundadores e não passam por revisão por pares.
- Gompers et al. mostram que investidores de saúde dão menos peso à equipe que os de tecnologia; no futuro, os pesos podem variar por setor.
- A dimensão de financiamento do KTH IRL não tem peça própria no método.

## Atenção: licença do KTH IRL

O KTH Innovation Readiness Level é marca registrada e o material original é protegido ("All rights reserved"). Universidades como a DTU usam o modelo sob licença da KTH. O motor usa os conceitos como referência, com textos próprios, e não usa o nome comercialmente. Antes de citar o KTH IRL em material de venda, recomenda-se consultar a KTH Innovation sobre licenciamento.
