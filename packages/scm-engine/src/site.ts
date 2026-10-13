/**
 * Ponte para a versão estática (apps/web-estatico). É empacotado em scm-engine.js,
 * que o site carrega e expõe como window.SCM. Assim o site usa exatamente as mesmas
 * peças e regras deste pacote: um único lugar para editar o método.
 */
import { FONTES } from "./fontes.js";
import { PECAS, REGRAS_TABULEIRO, VERSAO_METODO, calcularDiagnostico } from "./tabuleiro.js";
import type { EvidenciaCriterio } from "./contrato.js";

export const versao = VERSAO_METODO;
export const fontes = FONTES;
export const regrasTabuleiro = REGRAS_TABULEIRO.map(({ id, descricao, fontes, teto }) => ({ id, descricao, fontes, teto }));
export const pecas = PECAS.map((p) => ({
  id: p.id, nome: `${p.nome}: ${p.papel}`, nomeCurto: p.nome, papel: p.papel, simbolo: p.simbolo,
  descricao: p.descricao, peso: p.peso, fontes: p.fontes, integracoes_futuras: p.integracoes_futuras,
  regras: p.regras.map(({ id, descricao, fontes }) => ({ id, descricao, fontes })),
  criterios: p.criterios.map((c) => ({ id: c.id, descricao: c.descricao, pergunta: c.pergunta, peso: c.peso, ancoras: c.ancoras, fontes: c.fontes })),
}));
export const totalCriterios = pecas.reduce((s, p) => s + p.criterios.length, 0);

/** Mesmo cálculo do pacote, no formato que a página já usa. */
export function calcular(evidencias: EvidenciaCriterio[]) {
  const d = calcularDiagnostico(evidencias);
  const evid: Record<string, EvidenciaCriterio> = {};
  for (const e of evidencias) evid[e.criterio_id] = e;
  const conv = (r: (typeof d.pecas)[number]) => ({ peca: r.peca, score: r.score, severidade: r.severidade, fracos: r.criterios_mais_fracos, regras: r.regras_aplicadas });
  return {
    versao: d.versao_metodo,
    geral: d.score_geral,
    semTravas: d.score_sem_regras,
    travas: d.regras_aplicadas.map((r) => r.id),
    motivos: d.regras_aplicadas.map((r) => r.descricao),
    pecas: d.pecas.map(conv),
    xeque: d.pecas_em_xeque.map(conv),
    mate: d.risco_xeque_mate ? conv(d.risco_xeque_mate) : null,
    evid,
  };
}
