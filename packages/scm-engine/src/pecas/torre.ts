/**
 * ♖ TORRE: HIPÓTESES
 * A estrutura que protege o projeto: premissas explícitas e testadas como num experimento.
 *
 * Base: ensaios randomizados de Camuffo et al. (2020, 2024) com centenas de startups, em que
 * empreendedores treinados a formular e testar hipóteses como cientistas tiveram desempenho
 * superior e decisões mais precisas (abandonar ideias ruins, pivotar com critério).
 */
import { criarPeca, criterio } from "./base.js";

export const torre = criarPeca({
  id: "torre",
  nome: "Torre",
  papel: "Hipóteses",
  simbolo: "♖",
  descricao: "Verifica se as premissas do projeto estão explícitas, priorizadas e testadas com critério.",
  fontes: ["camuffo_2020", "camuffo_2024", "icorps"],
  integracoes_futuras: [],
  criterios: [
    criterio("torre.hipoteses_explicitas",
      "Hipóteses de negócio escritas de forma explícita e testável",
      "Quais são as hipóteses do projeto, escritas de forma que possam ser provadas falsas?", 1,
      ["Não há hipóteses declaradas.",
       "Crenças implícitas no texto, não formuladas como hipóteses.",
       "Algumas hipóteses explícitas, mas vagas ou difíceis de testar.",
       "Hipóteses explícitas, específicas e falseáveis, cobrindo cliente, valor e negócio."],
      ["camuffo_2020", "camuffo_2024"]),
    criterio("torre.premissa_critica",
      "Premissa mais arriscada identificada",
      "Qual premissa, se for falsa, encerra o projeto amanhã?", 2,
      ["Não identifica nenhuma premissa crítica.",
       "Cita riscos genéricos sem apontar a premissa decisiva.",
       "Aponta a premissa crítica, mas sem justificar por que é a mais arriscada.",
       "Aponta e justifica a premissa mais arriscada e a prioriza nos testes."],
      ["camuffo_2020", "icorps"]),
    criterio("torre.teste_com_criterio",
      "Testes com métrica e critério de decisão definidos antes",
      "Como a premissa é testada, com que métrica, e qual resultado faria vocês mudarem de rumo?", 2,
      ["Nenhum teste realizado ou planejado.",
       "Testes informais, sem métrica nem critério de aceitação.",
       "Testes com métrica, mas sem critério de decisão definido antes, ou só em laboratório.",
       "Testes fora do laboratório com métrica e limite de aceitação ou rejeição definidos antes do resultado."],
      ["camuffo_2020", "camuffo_2024"]),
    criterio("torre.decisao_por_evidencia",
      "Decisões tomadas a partir dos resultados",
      "Que decisões já foram mudadas por causa do que os testes mostraram?", 1,
      ["Não há registro de aprendizado com testes.",
       "Mudanças feitas por opinião, sem ligação com resultados.",
       "Algum ajuste feito a partir de resultados, pouco documentado.",
       "Decisões documentadas (seguir, ajustar, pivotar ou encerrar) baseadas em resultados de testes."],
      ["camuffo_2024"]),
  ],
  regras: [],
});
