/**
 * ♔ REI: O PROBLEMA
 * Se o Rei cai, o jogo acaba: sem um problema real, nenhuma outra peça salva o projeto.
 *
 * Base: dimensão de cliente do KTH IRL (níveis 1 a 4: da hipótese ao problema confirmado
 * por vários clientes) e as análises da CB Insights, em que a ausência de necessidade de
 * mercado é uma das duas causas mais citadas de encerramento de startups.
 */
import { criarPeca, criterio } from "./base.js";

export const rei = criarPeca({
  id: "rei",
  nome: "Rei",
  papel: "O Problema",
  simbolo: "♔",
  descricao: "Verifica se existe um problema real, específico e confirmado por quem o vive.",
  fontes: ["kth_irl", "cbinsights", "icorps"],
  integracoes_futuras: ["Bases de dados setoriais (IBGE, DATASUS) para dimensionar o custo do problema"],
  criterios: [
    criterio("rei.problema_especifico",
      "Problema descrito de forma específica",
      "Quem exatamente sofre esse problema, em que situação e com que frequência?", 1,
      ["Não há descrição do problema.",
       "Problema genérico ou suposto, sem dizer quem sofre e quando.",
       "Problema descrito com público e situação, com base em fontes secundárias (relatórios, literatura).",
       "Problema descrito com público, situação e frequência, confirmados em contato direto com quem o vive."],
      ["kth_irl"]),
    criterio("rei.validado_com_clientes",
      "Problema confirmado diretamente por vários clientes ou usuários",
      "Com quantos clientes ou usuários vocês conversaram, e quantos confirmaram o problema?", 3,
      ["Nenhuma conversa com clientes ou usuários.",
       "Só a percepção da equipe ou da literatura, sem conversas diretas.",
       "Poucas conversas diretas (menos de 5 em B2B ou de 10 em B2C) ou apenas com especialistas.",
       "Problema e sua importância confirmados por vários clientes (cerca de 5 a 10 em B2B, 10 a 20 em B2C, ou os líderes de um mercado concentrado)."],
      ["kth_irl", "icorps"]),
    criterio("rei.independe_da_solucao",
      "Problema existe independentemente da solução proposta",
      "Esse problema existiria e seria reconhecido mesmo se a sua tecnologia não existisse?", 2,
      ["O problema só é descrito como a ausência da própria solução.",
       "O problema parece ter sido formulado a partir da tecnologia, sem evidência de que já incomoda alguém.",
       "Há sinais de que o problema existe por si (gastos atuais, soluções improvisadas), mas pouco documentados.",
       "Há evidência clara de que o problema já gera custo, perda ou esforço hoje, com ou sem a solução."],
      ["cbinsights", "kth_irl"]),
    criterio("rei.custo_do_problema",
      "Impacto do problema quantificado",
      "Quanto esse problema custa hoje, para quem, e como esse número foi obtido?", 2,
      ["Não há estimativa de impacto.",
       "Impacto afirmado sem números ou com números sem origem.",
       "Impacto estimado com dados secundários ou cálculo próprio não validado.",
       "Impacto quantificado com dados de clientes, medições ou fontes oficiais citadas."],
      ["kth_irl", "cbinsights"]),
  ],
  regras: [
    {
      id: "rei.sem_validacao_direta",
      descricao: "Sem confirmação direta de clientes, o problema ainda é hipótese: a nota do Rei fica limitada a 50.",
      aplicar: (n) => (n["rei.validado_com_clientes"]! <= 1 ? 50 : null),
      fontes: ["kth_irl", "icorps"],
    },
  ],
});
