/**
 * TABULEIRO
 * Junta as seis peças: define quanto cada uma pesa na nota final e as regras
 * que dependem de mais de uma peça (as peças "conversando").
 */
import type { EvidenciaCriterio, Peca, PecaId, ResultadoPeca } from "./contrato.js";
import { FONTES } from "./fontes.js";
import { rei } from "./pecas/rei.js";
import { rainha } from "./pecas/rainha.js";
import { torre } from "./pecas/torre.js";
import { bispo } from "./pecas/bispo.js";
import { cavalo } from "./pecas/cavalo.js";
import { peao } from "./pecas/peao.js";

export const VERSAO_METODO = "0.2.0";

/**
 * Pesos das peças na nota final. Pontos de partida informados por dados, não um modelo
 * calibrado: devem ser ajustados com a criadora do método e com os projetos-gabarito (evals).
 *  - Rei 3: ausência de necessidade de mercado está entre as duas causas de encerramento mais citadas (CB Insights).
 *  - Peão 3: equipe é o fator mais importante para 47% dos investidores e importante para 95% (Gompers et al., 2020).
 *  - Bispo 2,5: mercado e concorrência são citados por 68% dos investidores e em cerca de 20% dos encerramentos.
 *  - Rainha 2: modelo de negócio é importante para 83% dos investidores; modelo falho aparece em cerca de 19% dos encerramentos.
 *  - Torre 2: testar hipóteses melhora desempenho em ensaios randomizados (Camuffo et al., 2020; 2024).
 *  - Cavalo 1,5: barreiras regulatórias e legais aparecem em cerca de 18% dos encerramentos; peso maior em setores regulados.
 */
export const PESOS: Record<PecaId, number> = { rei: 3, peao: 3, bispo: 2.5, rainha: 2, torre: 2, cavalo: 1.5 };

export const PECAS: Peca[] = [rei, rainha, torre, bispo, cavalo, peao].map((p) => ({ ...p, peso: PESOS[p.id] }));

/** Regras entre peças. Cada uma limita a nota geral quando a condição é atendida. */
export const REGRAS_TABULEIRO = [
  {
    id: "rei_fraco",
    descricao: "O problema (Rei) não está validado: a nota geral fica limitada a 45.",
    fontes: ["cbinsights", "kth_irl"],
    teto: 45,
    aplica: (r: Record<PecaId, ResultadoPeca>) => r.rei.score < 40,
  },
  {
    id: "peca_zerada",
    descricao: "Alguma peça está praticamente sem evidência: a nota geral fica limitada a 60, pois todas as dimensões precisam de um mínimo de maturidade.",
    fontes: ["kth_irl"],
    teto: 60,
    aplica: (r: Record<PecaId, ResultadoPeca>) => Object.values(r).some((x) => x.score < 15),
  },
];

export interface Diagnostico {
  versao_metodo: string;
  score_geral: number;
  score_sem_regras: number;
  regras_aplicadas: Array<{ id: string; descricao: string }>;
  pecas: ResultadoPeca[];
  pecas_em_xeque: ResultadoPeca[];
  risco_xeque_mate: ResultadoPeca | null;
}

const arred = (n: number) => Math.round(n * 10) / 10;

export function validarPecas(pecas: Peca[] = PECAS): void {
  const ids = new Set<string>();
  for (const p of pecas) {
    if (!(p.peso > 0)) throw new Error(`Peso inválido na peça ${p.id}`);
    if (!p.criterios.length) throw new Error(`Peça ${p.id} sem critérios`);
    for (const f of p.fontes) if (!FONTES[f]) throw new Error(`Fonte desconhecida ${f} em ${p.id}`);
    for (const c of p.criterios) {
      if (!c.id.startsWith(p.id + ".")) throw new Error(`Critério ${c.id} fora do prefixo da peça ${p.id}`);
      if (ids.has(c.id)) throw new Error(`Critério duplicado: ${c.id}`);
      if (!(c.peso > 0)) throw new Error(`Peso inválido no critério ${c.id}`);
      if (!c.fontes.length) throw new Error(`Critério ${c.id} sem fonte`);
      for (const f of c.fontes) if (!FONTES[f]) throw new Error(`Fonte desconhecida ${f} em ${c.id}`);
      ids.add(c.id);
    }
  }
}

export function calcularDiagnostico(evidencias: EvidenciaCriterio[], pecas: Peca[] = PECAS): Diagnostico {
  validarPecas(pecas);
  const validos = new Set(pecas.flatMap((p) => p.criterios.map((c) => c.id)));
  const mapa = new Map<string, EvidenciaCriterio>();
  for (const e of evidencias) if (validos.has(e.criterio_id)) mapa.set(e.criterio_id, e);

  const resultados = pecas.map((p) => p.avaliar(mapa));
  const porId = Object.fromEntries(resultados.map((r) => [r.peca, r])) as Record<PecaId, ResultadoPeca>;
  const pesoTotal = pecas.reduce((s, p) => s + p.peso, 0);
  const semRegras = arred(resultados.reduce((s, r, i) => s + r.score * pecas[i]!.peso, 0) / pesoTotal);

  let geral = semRegras;
  const aplicadas: Diagnostico["regras_aplicadas"] = [];
  for (const regra of REGRAS_TABULEIRO) {
    if (regra.aplica(porId) && geral > regra.teto) { geral = regra.teto; aplicadas.push({ id: regra.id, descricao: regra.descricao }); }
  }

  const peso = Object.fromEntries(pecas.map((p) => [p.id, p.peso])) as Record<PecaId, number>;
  const emXeque = resultados
    .filter((r) => r.severidade !== null)
    .sort((a, b) => (100 - b.score) * peso[b.peca] - (100 - a.score) * peso[a.peca])
    .slice(0, 3);

  return {
    versao_metodo: VERSAO_METODO,
    score_geral: geral,
    score_sem_regras: semRegras,
    regras_aplicadas: aplicadas,
    pecas: resultados,
    pecas_em_xeque: emXeque,
    risco_xeque_mate: emXeque[0] ?? null,
  };
}
