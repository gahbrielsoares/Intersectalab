/**
 * ♗ BISPO: MERCADO
 * Anda na diagonal: o caminho até quem paga raramente é reto.
 *
 * Base: dimensão de cliente do KTH IRL nos níveis 5 a 8 (segmento-alvo, interesse
 * demonstrado, identificação do decisor econômico, disposição a pagar) e dimensão de
 * modelo de negócio (mercado dimensionado, concorrência). Ser superado pela concorrência
 * aparece em cerca de 20% dos casos analisados pela CB Insights (2021).
 */
import { criarPeca, criterio } from "./base.js";

export const bispo = criarPeca({
  id: "bispo",
  nome: "Bispo",
  papel: "Mercado",
  simbolo: "♗",
  descricao: "Verifica se há um comprador real identificado, com interesse demonstrado, num mercado dimensionado.",
  fontes: ["kth_irl", "cbinsights", "gompers_2020"],
  integracoes_futuras: [
    "Portal Nacional de Contratações Públicas (PNCP) para compradores públicos",
    "Dados do IBGE e de associações setoriais para dimensionar o mercado",
  ],
  criterios: [
    criterio("bispo.segmento_alvo",
      "Segmento de entrada definido",
      "Quem serão os primeiros clientes, de forma específica?", 1,
      ["Não há público-alvo definido.",
       "Público amplo e genérico (por exemplo, toda a indústria ou todos os hospitais).",
       "Segmentos identificados, sem escolha clara de por onde entrar.",
       "Segmento de entrada escolhido e justificado, com perfil dos primeiros clientes."],
      ["kth_irl"]),
    criterio("bispo.comprador_vs_usuario",
      "Decisor de compra identificado e distinguido do usuário",
      "Quem usa e quem decide e paga pela compra são a mesma pessoa? Quem é o decisor?", 2,
      ["Não há distinção entre usuário e comprador.",
       "Comprador presumido, sem contato.",
       "Comprador identificado por cargo ou função, com contato limitado.",
       "Decisor econômico identificado e consultado, com o processo de compra entendido."],
      ["kth_irl"]),
    criterio("bispo.interesse_demonstrado",
      "Interesse concreto de clientes",
      "Que sinal concreto de interesse já existe: carta de intenção, piloto, pré-venda ou venda-teste?", 3,
      ["Nenhum sinal de interesse.",
       "Interesse apenas verbal ou presumido.",
       "Relação estabelecida com clientes-alvo (reuniões recorrentes, participação em requisitos, carta de intenção).",
       "Piloto, teste estendido, pré-venda ou primeira venda com cliente-alvo."],
      ["kth_irl"]),
    criterio("bispo.tamanho_mercado",
      "Mercado dimensionado",
      "Qual o tamanho do mercado que vocês conseguem atender, e como esse número foi calculado?", 1,
      ["Não há dimensionamento.",
       "Número de mercado total sem origem ou sem recorte.",
       "Mercado total e atendível estimados de cima para baixo, com fontes.",
       "Mercado atendível calculado de baixo para cima (número de clientes vezes preço), com fontes."],
      ["kth_irl"]),
    criterio("bispo.concorrencia_e_troca",
      "Concorrência, alternativas e custo de troca mapeados",
      "O que o cliente usa hoje, e o que ele precisaria abandonar para adotar a solução?", 1,
      ["Não cita concorrentes ou alternativas.",
       "Afirma não ter concorrentes ou cita poucos, sem análise.",
       "Concorrentes diretos e indiretos mapeados, sem análise do custo de troca.",
       "Concorrência, alternativas atuais e custo de troca analisados e confirmados com clientes."],
      ["kth_irl", "cbinsights"]),
  ],
  regras: [
    {
      id: "bispo.sem_sinal_de_compra",
      descricao: "Sem nenhum sinal concreto de interesse de clientes, a nota do Bispo fica limitada a 45.",
      aplicar: (n) => (n["bispo.interesse_demonstrado"]! === 0 ? 45 : null),
      fontes: ["kth_irl"],
    },
  ],
});
