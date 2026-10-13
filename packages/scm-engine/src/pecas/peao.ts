/**
 * ♙ PEÃO: EQUIPE
 * Parece a peça mais simples, mas é a que de fato avança no tabuleiro.
 *
 * Base: dimensão de equipe do KTH IRL e Gompers et al. (2020): em pesquisa com 885
 * investidores de risco, a equipe foi o fator mais citado como importante (95%) e como o
 * mais importante (47%), à frente de modelo de negócio, produto e mercado.
 */
import { criarPeca, criterio } from "./base.js";

export const peao = criarPeca({
  id: "peao",
  nome: "Peão",
  papel: "Equipe",
  simbolo: "♙",
  descricao: "Verifica se há uma equipe comprometida, com competências técnicas e de negócio, capaz de levar o projeto ao mercado.",
  fontes: ["kth_irl", "gompers_2020", "cbinsights"],
  integracoes_futuras: ["Plataforma Lattes e ORCID para histórico e experiência da equipe"],
  criterios: [
    criterio("peao.campeao",
      "Um campeão comprometido com a comercialização",
      "Quem vai levar o projeto ao mercado, com quanto tempo de dedicação, e quer isso de fato?", 2,
      ["Ninguém assume levar o projeto ao mercado.",
       "Interesse declarado, mas o responsável prefere seguir pesquisando ou tem pouco tempo.",
       "Há um responsável interessado, com dedicação parcial.",
       "Há um campeão com dedicação significativa e intenção clara de empreender ou licenciar."],
      ["kth_irl", "gompers_2020"]),
    criterio("peao.competencias_complementares",
      "Competências técnicas e de negócio presentes",
      "A equipe tem quem desenvolva a tecnologia e quem venda e negocie?", 2,
      ["Uma pessoa só, sem as competências necessárias.",
       "Apenas competências técnicas, sem ninguém de negócio.",
       "Algumas competências de negócio, com lacunas identificadas e plano para supri-las.",
       "Equipe complementar com competências técnicas e de negócio para o curto prazo."],
      ["kth_irl", "gompers_2020"]),
    criterio("peao.experiencia_setor",
      "Experiência no setor ou mercado-alvo",
      "Alguém da equipe ou dos conselheiros já trabalhou no setor do cliente?", 2,
      ["Nenhuma experiência no setor.",
       "Experiência apenas acadêmica no tema.",
       "Experiência indireta (projetos com empresas do setor, conselheiros pontuais).",
       "Membro da equipe ou conselheiro ativo com experiência profissional no setor."],
      ["gompers_2020"]),
    criterio("peao.alinhamento_societario",
      "Papéis, participação e compromisso acordados",
      "Os papéis e a divisão de participação estão acordados entre os membros?", 1,
      ["Não discutido.",
       "Conversas iniciais, sem acordo.",
       "Papéis definidos, participação em discussão.",
       "Papéis, participação e compromisso de tempo acordados por escrito."],
      ["kth_irl"]),
    criterio("peao.dependencia_individuo",
      "Baixa dependência de uma única pessoa",
      "Se a pessoa-chave sair, o projeto continua?", 1,
      ["O projeto depende inteiramente de uma pessoa.",
       "Dependência alta reconhecida, sem plano.",
       "Conhecimento parcialmente distribuído ou plano de recrutamento iniciado.",
       "Competências-chave distribuídas e conselheiros ou membros de reserva envolvidos."],
      ["kth_irl"]),
  ],
  regras: [],
});
