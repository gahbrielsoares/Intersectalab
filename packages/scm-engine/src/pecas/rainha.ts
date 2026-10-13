/**
 * ♕ RAINHA: LÓGICA DO NEGÓCIO
 * A peça mais versátil: une o ganho real da tecnologia com uma forma viável de capturar valor.
 *
 * Base: escala de maturidade tecnológica da NASA (TRL) e dimensão de modelo de negócio do
 * KTH IRL (da proposta de valor estruturada ao modelo testado com clientes).
 */
import { criarPeca, criterio } from "./base.js";

export const rainha = criarPeca({
  id: "rainha",
  nome: "Rainha",
  papel: "Lógica do Negócio",
  simbolo: "♕",
  descricao: "Verifica se a tecnologia entrega ganho real fora do laboratório e se há uma forma viável de gerar receita.",
  fontes: ["nasa_trl", "kth_irl"],
  integracoes_futuras: ["Bases de patentes e artigos para comparar com o estado da arte"],
  criterios: [
    criterio("rainha.proposta_de_valor",
      "Proposta de valor estruturada",
      "Qual necessidade é atendida, com que abordagem, com que benefício e frente a quais alternativas?", 1,
      ["Não há proposta de valor.",
       "Ideia de negócio vaga, sem dizer benefício nem alternativas.",
       "Necessidade, abordagem e benefício descritos, mas sem comparação com alternativas.",
       "Necessidade, abordagem, benefício e comparação com alternativas descritos de forma estruturada."],
      ["kth_irl"]),
    criterio("rainha.ganho_vs_alternativas",
      "Ganho mensurável frente às alternativas existentes",
      "Em números, quanto a solução é melhor, mais barata ou mais rápida que o que já existe?", 2,
      ["Não há comparação com o que existe.",
       "Superioridade afirmada sem números.",
       "Ganho medido em laboratório ou estimado, sem confirmação de mercado.",
       "Ganho medido e confirmado por clientes, parceiros ou testes independentes."],
      ["kth_irl", "nasa_trl"]),
    criterio("rainha.maturidade_tecnologica",
      "Maturidade tecnológica (escala TRL)",
      "Em que ambiente a tecnologia já foi demonstrada: conceito, laboratório, ambiente relevante ou operação real?", 2,
      ["Apenas princípio ou conceito formulado (TRL 1 a 2).",
       "Prova de conceito ou validação em laboratório (TRL 3 a 4).",
       "Validação ou demonstração em ambiente relevante, próximo do real (TRL 5 a 6).",
       "Protótipo demonstrado em ambiente operacional ou sistema qualificado (TRL 7 ou mais)."],
      ["nasa_trl"]),
    criterio("rainha.modelo_de_receita",
      "Modelo de receita e viabilidade econômica",
      "Quem paga, quanto, com que frequência, e os números fecham frente aos custos?", 2,
      ["Não há modelo de receita.",
       "Forma de cobrança imaginada, sem preços nem custos.",
       "Modelo com preço e custos estimados e primeira projeção econômica, ainda não testados.",
       "Preço e modelo testados com clientes (venda-teste, pré-venda ou piloto pago)."],
      ["kth_irl"]),
  ],
  regras: [],
});
