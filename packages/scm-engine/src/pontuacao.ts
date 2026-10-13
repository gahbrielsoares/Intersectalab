/**
 * Cálculo determinístico do diagnóstico.
 * Mesma rubrica + mesmas evidências = mesmo score, sempre.
 */
import type {
  Diagnostico, EvidenciaCriterio, Peca, ResultadoPeca, Rubrica, Severidade,
} from "./tipos.js";

const NIVEL_MAX = 3;
const arred = (n: number) => Math.round(n * 10) / 10;

export function validarRubrica(r: Rubrica): void {
  const ids = new Set<string>();
  for (const p of r.pecas) {
    if (p.peso <= 0) throw new Error(`Peso inválido na peça ${p.id}`);
    if (p.criterios.length === 0) throw new Error(`Peça ${p.id} sem critérios`);
    for (const c of p.criterios) {
      if (c.peso <= 0) throw new Error(`Peso inválido no critério ${c.id}`);
      if (ids.has(c.id)) throw new Error(`Critério duplicado: ${c.id}`);
      ids.add(c.id);
    }
  }
}

function severidade(score: number, r: Rubrica): Severidade | null {
  const l = r.limiares_severidade;
  if (score < l.critico_abaixo_de) return "CRITICO";
  if (score < l.alto_abaixo_de) return "ALTO";
  if (score < l.medio_abaixo_de) return "MEDIO";
  return null;
}

function pontuarPeca(peca: Peca, evid: Map<string, EvidenciaCriterio>, r: Rubrica): ResultadoPeca {
  let soma = 0, pesoTotal = 0;
  const niveis: Array<{ id: string; nivel: number }> = [];
  for (const c of peca.criterios) {
    // Critério sem evidência extraída conta como 0 ("não saber também é uma resposta").
    const nivel = evid.get(c.id)?.nivel ?? 0;
    soma += (nivel / NIVEL_MAX) * c.peso;
    pesoTotal += c.peso;
    niveis.push({ id: c.id, nivel });
  }
  const score = arred((soma / pesoTotal) * 100);
  const minimo = Math.min(...niveis.map((n) => n.nivel));
  return {
    peca: peca.id,
    score,
    severidade: severidade(score, r),
    criterios_mais_fracos: niveis.filter((n) => n.nivel === minimo && minimo < NIVEL_MAX).map((n) => n.id),
  };
}

export function calcularDiagnostico(r: Rubrica, evidencias: EvidenciaCriterio[]): Diagnostico {
  validarRubrica(r);
  const idsValidos = new Set(r.pecas.flatMap((p) => p.criterios.map((c) => c.id)));
  const evid = new Map<string, EvidenciaCriterio>();
  for (const e of evidencias) {
    if (!idsValidos.has(e.criterio_id)) throw new Error(`Evidência para critério desconhecido: ${e.criterio_id}`);
    evid.set(e.criterio_id, e);
  }

  const pecas = r.pecas.map((p) => pontuarPeca(p, evid, r));
  const pesoTotal = r.pecas.reduce((s, p) => s + p.peso, 0);
  const scoreSemTravas = arred(
    pecas.reduce((s, res, i) => s + res.score * r.pecas[i]!.peso, 0) / pesoTotal,
  );

  let scoreGeral = scoreSemTravas;
  const travasAplicadas: Diagnostico["travas_aplicadas"] = [];
  for (const t of r.travas) {
    const res = pecas.find((p) => p.peca === t.peca);
    if (res && res.score < t.minimo && scoreGeral > t.teto_score_geral) {
      scoreGeral = t.teto_score_geral;
      travasAplicadas.push(t.peca);
    }
  }

  // Urgência = lacuna da peça × peso da peça no método.
  const pesoDe = new Map(r.pecas.map((p) => [p.id, p.peso]));
  const emXeque = pecas
    .filter((p) => p.severidade !== null)
    .sort((a, b) => (100 - b.score) * pesoDe.get(b.peca)! - (100 - a.score) * pesoDe.get(a.peca)!)
    .slice(0, 3);

  return {
    versao_rubrica: r.versao,
    score_geral: scoreGeral,
    score_sem_travas: scoreSemTravas,
    travas_aplicadas: travasAplicadas,
    pecas,
    pecas_em_xeque: emXeque,
    risco_xeque_mate: emXeque[0] ?? null,
  };
}
