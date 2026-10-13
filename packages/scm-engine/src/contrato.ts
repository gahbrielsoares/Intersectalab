/**
 * CONTRATO DAS PEÇAS
 *
 * Toda peça do Scientific Chess Method segue este formato. Assim cada peça
 * evolui sozinha (critérios, regras, integrações) e o tabuleiro continua
 * sabendo combiná-las na nota final.
 *
 * Princípio: a IA NÃO dá nota. Ela só classifica a evidência de cada critério
 * (nível 0 a 3). A nota é calculada por estas regras, sempre igual para a
 * mesma entrada.
 */

export type PecaId = "rei" | "rainha" | "torre" | "bispo" | "cavalo" | "peao";

/**
 * Nível de evidência de um critério.
 * 0 = ausente: não há informação, ou o pesquisador declara não saber.
 * 1 = suposição: afirmado sem dado, fonte ou teste.
 * 2 = parcial: há dado, mas indireto, de laboratório, de poucas fontes ou incompleto.
 * 3 = comprovado: dado externo e verificável, obtido com clientes, parceiros ou em ambiente real.
 */
export type NivelEvidencia = 0 | 1 | 2 | 3;

export type Severidade = "CRITICO" | "ALTO" | "MEDIO";

/** Referência científica ou metodológica que sustenta uma regra. */
export interface Fonte {
  id: string;
  nome: string;          // nome curto exibido na interface
  referencia: string;    // citação completa
  url: string;
  tipo: "estudo_revisado" | "framework_institucional" | "padrao_internacional" | "dados_setoriais";
}

export interface Criterio {
  id: string;                                  // ex.: "rei.validado_com_clientes"
  descricao: string;                           // o que é avaliado
  pergunta: string;                            // pergunta que o projeto precisa responder
  peso: number;                                // peso dentro da peça (> 0)
  ancoras: Record<NivelEvidencia, string>;     // o que caracteriza cada nível, usado pela IA
  fontes: string[];                            // ids de Fonte
}

export interface EvidenciaCriterio {
  criterio_id: string;
  nivel: NivelEvidencia;
  justificativa: string;
  trechos_fonte: string[];
}

/** Regra interna da peça: limita a nota da própria peça quando uma condição crítica não é atendida. */
export interface RegraInterna {
  id: string;
  descricao: string;
  /** Retorna o teto da nota da peça, ou null se a regra não se aplica. */
  aplicar: (niveis: Record<string, NivelEvidencia>) => number | null;
  fontes: string[];
}

export interface ResultadoPeca {
  peca: PecaId;
  score: number;                 // 0 a 100
  score_sem_regras: number;
  regras_aplicadas: string[];    // descrições das regras internas que limitaram a nota
  severidade: Severidade | null;
  criterios_mais_fracos: string[];
}

export interface Peca {
  id: PecaId;
  nome: string;                  // "Rei"
  papel: string;                 // "O Problema"
  simbolo: string;               // "♔"
  descricao: string;             // o que a peça avalia, em uma frase
  peso: number;                  // peso no tabuleiro (definido em tabuleiro.ts)
  criterios: Criterio[];
  regras: RegraInterna[];
  fontes: string[];              // fundamentação geral da peça
  /** Fontes de dados externas que esta peça poderá consultar no futuro. */
  integracoes_futuras: string[];
  avaliar: (evidencias: Map<string, EvidenciaCriterio>) => ResultadoPeca;
}
