/**
 * RUBRICA v0.1.0 — RASCUNHO TÉCNICO
 *
 * Critérios derivados das perguntas públicas do site (intersectalab.com).
 * Pesos, critérios e âncoras PRECISAM ser validados pela Dandara,
 * criadora do método. Nada aqui é a versão oficial do SCM.
 */
import type { Criterio, NivelEvidencia, Rubrica } from "../tipos.js";

const ancorasPadrao = (tema: string): Record<NivelEvidencia, string> => ({
  0: `Não há informação sobre ${tema}, ou o pesquisador declara não saber.`,
  1: `${tema} é afirmado sem dado, fonte ou teste (suposição).`,
  2: `Há dado sobre ${tema}, mas indireto, de laboratório ou incompleto.`,
  3: `${tema} é sustentado por dado externo e verificável, testado fora da bancada.`,
});

const c = (id: string, descricao: string, pergunta_guia: string, peso = 1): Criterio => ({
  id, descricao, pergunta_guia, peso, ancoras: ancorasPadrao(descricao.toLowerCase()),
});

export const rubricaV0: Rubrica = {
  versao: "0.1.0",
  pecas: [
    {
      id: "rei", nome: "Rei · O Problema", simbolo: "♔", peso: 3,
      criterios: [
        c("rei.existe_independente", "Existência do problema independente da solução",
          "Esse problema existe independente da sua solução, ou você precisou criar a solução para enxergá-lo?", 2),
        c("rei.impacto_mensuravel", "Impacto mensurável do problema",
          "Quanto esse problema custa hoje, e para quem? Como você mediu isso?"),
      ],
    },
    {
      id: "rainha", nome: "Rainha · Lógica do Negócio", simbolo: "♕", peso: 2,
      criterios: [
        c("rainha.ganho_vs_estado_da_arte", "Ganho mensurável frente ao estado da arte",
          "Qual é o ganho real e mensurável frente ao que já existe?", 2),
        c("rainha.fora_da_bancada", "Comportamento da solução fora da bancada",
          "O que muda quando a solução sai do laboratório?"),
      ],
    },
    {
      id: "torre", nome: "Torre · Hipóteses", simbolo: "♖", peso: 2,
      criterios: [
        c("torre.premissa_critica", "Identificação da premissa crítica",
          "Qual premissa central, se falsa, encerra o projeto amanhã?", 2),
        c("torre.teste_sem_vies", "Teste da premissa sem viés",
          "Como você testa essa premissa sem enviesar o resultado? Já testou fora do laboratório?"),
      ],
    },
    {
      id: "bispo", nome: "Bispo · Mercado", simbolo: "♗", peso: 2,
      criterios: [
        c("bispo.usuario_vs_pagador", "Distinção entre usuário e pagador",
          "Quem usa e quem paga são a mesma pessoa?"),
        c("bispo.comprador_identificado", "Comprador identificado (não presumido)",
          "O comprador já foi identificado e contatado, ou é presumido?", 2),
        c("bispo.custo_de_troca", "Custo de troca para o comprador",
          "O que esse comprador precisaria abandonar para adotar sua solução?"),
      ],
    },
    {
      id: "cavalo", nome: "Cavalo · Riscos", simbolo: "♘", peso: 2,
      criterios: [
        c("cavalo.regulatorio", "Risco regulatório mapeado",
          "Qual barreira regulatória pode travar a comercialização?"),
        c("cavalo.propriedade_intelectual", "Situação de propriedade intelectual",
          "Qual a situação de PI (patente, liberdade de operação, titularidade da ICT)?"),
        c("cavalo.cadeia_fornecimento", "Risco de cadeia de fornecimento e produção",
          "Algum insumo, fornecedor ou etapa de escala pode travar o projeto?"),
      ],
    },
    {
      id: "peao", nome: "Peão · Equipe", simbolo: "♙", peso: 1,
      criterios: [
        c("peao.intencao_comercializar", "Intenção do cientista principal de comercializar",
          "O cientista principal quer comercializar, ou quer continuar pesquisando?"),
        c("peao.competencia_comercial", "Competência comercial na equipe",
          "A equipe tem quem fecha negócio, ou é a mesma pessoa tentando fazer tudo?", 2),
      ],
    },
  ],
  travas: [
    { peca: "rei", minimo: 40, teto_score_geral: 45 },
  ],
  limiares_severidade: { critico_abaixo_de: 35, alto_abaixo_de: 55, medio_abaixo_de: 75 },
};
