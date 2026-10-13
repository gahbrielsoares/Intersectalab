/**
 * ♘ CAVALO: RISCOS
 * O movimento que ninguém vê chegando: propriedade intelectual, regulação e cadeia de produção.
 *
 * Base: dimensão de propriedade intelectual do KTH IRL (da titularidade clara à liberdade de
 * operação) e as análises da CB Insights, em que desafios regulatórios e legais aparecem em
 * cerca de 18% dos casos (2021).
 */
import { criarPeca, criterio } from "./base.js";

export const cavalo = criarPeca({
  id: "cavalo",
  nome: "Cavalo",
  papel: "Riscos",
  simbolo: "♘",
  descricao: "Verifica se os riscos de propriedade intelectual, regulação e produção estão mapeados e tratados.",
  fontes: ["kth_irl", "cbinsights"],
  integracoes_futuras: [
    "INPI e Espacenet para busca de patentes e anterioridade",
    "ANVISA, MAPA e INMETRO para enquadramento regulatório",
  ],
  criterios: [
    criterio("cavalo.titularidade_pi",
      "Titularidade da propriedade intelectual clara",
      "A quem pertence a tecnologia (universidade, inventores, empresa) e há acordos formalizando isso?", 2,
      ["Não se sabe a quem pertence a tecnologia.",
       "Titularidade presumida, sem verificar política da instituição nem acordos.",
       "Titularidade identificada (inventores e instituição), com acordos em andamento.",
       "Titularidade e direitos de uso formalizados em acordos ou na política da instituição."],
      ["kth_irl"]),
    criterio("cavalo.protecao_pi",
      "Proteção da propriedade intelectual",
      "A patenteabilidade foi avaliada, e há pedido de patente ou outra proteção depositada?", 1,
      ["Nenhuma avaliação de proteção.",
       "Ideia de patentear, sem busca de anterioridade.",
       "Busca de anterioridade feita ou novidade confirmada, sem pedido depositado.",
       "Pedido de patente ou outro registro depositado com apoio profissional, ou patente concedida."],
      ["kth_irl"]),
    criterio("cavalo.liberdade_de_operacao",
      "Liberdade de operação avaliada",
      "Alguma patente de terceiros pode impedir vocês de vender a solução?", 1,
      ["Não considerado.",
       "Risco reconhecido, sem análise.",
       "Análise inicial do cenário de patentes e concorrentes.",
       "Avaliação de liberdade de operação feita, idealmente com apoio profissional."],
      ["kth_irl"]),
    criterio("cavalo.regulatorio",
      "Caminho regulatório mapeado",
      "Quais registros, certificações ou autorizações são necessários, em qual órgão, com que prazo e custo?", 2,
      ["Não se sabe se há exigências regulatórias.",
       "Exigência reconhecida, sem identificar órgão nem caminho.",
       "Órgão e tipo de registro identificados, sem prazo e custo estimados.",
       "Caminho regulatório mapeado com órgão, etapas, prazo e custo, ou confirmação documentada de que não se aplica."],
      ["cbinsights"]),
    criterio("cavalo.cadeia_e_escala",
      "Riscos de insumos, fornecedores e produção em escala",
      "Algum insumo, fornecedor ou etapa de produção pode travar o projeto ao escalar?", 1,
      ["Não considerado.",
       "Riscos citados de forma genérica.",
       "Riscos específicos identificados, sem plano de mitigação.",
       "Riscos específicos identificados com alternativas ou plano de mitigação."],
      ["kth_irl", "nasa_trl"]),
  ],
  regras: [],
});
