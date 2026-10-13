import type { Criterio, EvidenciaCriterio, NivelEvidencia, Peca, PecaId, RegraInterna, ResultadoPeca, Severidade } from "../contrato.js";

export const LIMIARES = { critico: 35, alto: 55, medio: 75 } as const;

export function severidade(score: number): Severidade | null {
  if (score < LIMIARES.critico) return "CRITICO";
  if (score < LIMIARES.alto) return "ALTO";
  if (score < LIMIARES.medio) return "MEDIO";
  return null;
}

const arred = (n: number) => Math.round(n * 10) / 10;

/** Monta uma peça com o cálculo padrão: média ponderada dos níveis, depois regras internas. */
export function criarPeca(def: Omit<Peca, "avaliar" | "peso"> & { peso?: number }): Peca {
  const peca: Peca = {
    peso: 1,
    ...def,
    avaliar(evidencias: Map<string, EvidenciaCriterio>): ResultadoPeca {
      const niveis: Record<string, NivelEvidencia> = {};
      let soma = 0, pesoTotal = 0;
      for (const c of peca.criterios) {
        const bruto = Number(evidencias.get(c.id)?.nivel ?? 0);
        const n = (Math.max(0, Math.min(3, Number.isFinite(bruto) ? bruto : 0)) | 0) as NivelEvidencia;
        niveis[c.id] = n;
        soma += (n / 3) * c.peso;
        pesoTotal += c.peso;
      }
      const semRegras = arred((soma / pesoTotal) * 100);
      let score = semRegras;
      const aplicadas: string[] = [];
      for (const r of peca.regras) {
        const teto = r.aplicar(niveis);
        if (teto !== null && score > teto) { score = teto; aplicadas.push(r.descricao); }
      }
      const min = Math.min(...Object.values(niveis));
      return {
        peca: peca.id,
        score,
        score_sem_regras: semRegras,
        regras_aplicadas: aplicadas,
        severidade: severidade(score),
        criterios_mais_fracos: min < 3 ? Object.keys(niveis).filter((k) => niveis[k] === min) : [],
      };
    },
  };
  return peca;
}

/** Atalho para declarar um critério. */
export function criterio(
  id: string, descricao: string, pergunta: string, peso: number,
  ancoras: [string, string, string, string], fontes: string[],
): Criterio {
  return { id, descricao, pergunta, peso, ancoras: { 0: ancoras[0], 1: ancoras[1], 2: ancoras[2], 3: ancoras[3] }, fontes };
}

export type { PecaId, RegraInterna };
