/**
 * Tipos centrais do Scientific Chess Method (SCM).
 *
 * Princípio: o LLM NÃO atribui notas. Ele extrai evidências por critério
 * (nível + trecho de origem). O score é calculado em código a partir da
 * rubrica versionada. Ver docs/adr/0001-score-deterministico.md.
 */

export type PecaId = "rei" | "rainha" | "torre" | "bispo" | "cavalo" | "peao";

/**
 * Nível de evidência extraído para cada critério.
 * 0 = ausente      → o tema não aparece, ou o pesquisador "não sabe"
 * 1 = presumido    → afirmado sem dado ou fonte ("o mercado é enorme")
 * 2 = parcial      → há dado, mas indireto, de laboratório ou incompleto
 * 3 = evidenciado  → dado externo, verificável, testado fora da bancada
 */
export type NivelEvidencia = 0 | 1 | 2 | 3;

export type Severidade = "CRITICO" | "ALTO" | "MEDIO";

export interface Criterio {
  id: string;                 // ex.: "rei.existe_independente"
  descricao: string;          // o que está sendo avaliado
  pergunta_guia: string;      // pergunta que o chat usa para investigar
  peso: number;               // peso relativo dentro da peça (> 0)
  /** Descrição do que caracteriza cada nível, usada no prompt de extração. */
  ancoras: Record<NivelEvidencia, string>;
}

export interface Peca {
  id: PecaId;
  nome: string;               // "Rei · O Problema"
  simbolo: string;            // "♔"
  peso: number;               // peso relativo no score geral (> 0)
  criterios: Criterio[];
}

export interface Rubrica {
  versao: string;             // semver — todo diagnóstico guarda a versão usada
  pecas: Peca[];
  /**
   * Travas: se a peça ficar abaixo do mínimo, o score geral é limitado ao teto.
   * Ex.: sem problema real (Rei fraco), o projeto não pode ter score alto.
   */
  travas: Array<{ peca: PecaId; minimo: number; teto_score_geral: number }>;
  /** Limiares de severidade aplicados ao score da peça (0–100). */
  limiares_severidade: { critico_abaixo_de: number; alto_abaixo_de: number; medio_abaixo_de: number };
}

/** Saída da etapa de extração (produzida pelo LLM, validada por schema). */
export interface EvidenciaCriterio {
  criterio_id: string;
  nivel: NivelEvidencia;
  justificativa: string;      // por que este nível
  trechos_fonte: string[];    // citações da conversa ou do PDF que sustentam o nível
}

export interface ResultadoPeca {
  peca: PecaId;
  score: number;              // 0–100
  severidade: Severidade | null;
  criterios_mais_fracos: string[];
}

export interface Diagnostico {
  versao_rubrica: string;
  score_geral: number;        // 0–100 ("posição no tabuleiro")
  score_sem_travas: number;
  travas_aplicadas: PecaId[];
  pecas: ResultadoPeca[];
  pecas_em_xeque: ResultadoPeca[];   // até 3, ordenadas por urgência
  risco_xeque_mate: ResultadoPeca | null;
}
