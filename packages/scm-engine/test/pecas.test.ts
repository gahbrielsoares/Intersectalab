import { describe, expect, it } from "vitest";
import { FONTES, PECAS, calcularDiagnostico, rei, bispo, validarPecas, type EvidenciaCriterio, type NivelEvidencia } from "../src/index.js";

const todos = (nivel: NivelEvidencia): EvidenciaCriterio[] =>
  PECAS.flatMap((p) => p.criterios.map((c) => ({ criterio_id: c.id, nivel, justificativa: "", trechos_fonte: [] })));
const mapa = (ev: EvidenciaCriterio[]) => new Map(ev.map((e) => [e.criterio_id, e]));

describe("estrutura das peças", () => {
  it("são seis peças válidas, com critérios e fontes existentes", () => {
    expect(PECAS.map((p) => p.id)).toEqual(["rei", "rainha", "torre", "bispo", "cavalo", "peao"]);
    expect(() => validarPecas()).not.toThrow();
  });
  it("todo critério tem as quatro âncoras e pelo menos uma fonte", () => {
    for (const p of PECAS) for (const c of p.criterios) {
      expect(Object.keys(c.ancoras)).toEqual(["0", "1", "2", "3"]);
      expect(c.fontes.every((f) => FONTES[f])).toBe(true);
    }
  });
});

describe("cada peça avalia sozinha", () => {
  it("Rei: sem validação direta com clientes, a nota da peça fica limitada a 50", () => {
    const ev = todos(3).map((e) => (e.criterio_id === "rei.validado_com_clientes" ? { ...e, nivel: 1 as const } : e));
    const r = rei.avaliar(mapa(ev));
    expect(r.score_sem_regras).toBeGreaterThan(50);
    expect(r.score).toBe(50);
    expect(r.regras_aplicadas).toHaveLength(1);
  });
  it("Bispo: sem nenhum sinal de interesse, a nota da peça fica limitada a 45", () => {
    const ev = todos(3).map((e) => (e.criterio_id === "bispo.interesse_demonstrado" ? { ...e, nivel: 0 as const } : e));
    expect(bispo.avaliar(mapa(ev)).score).toBe(45);
  });
});

describe("tabuleiro", () => {
  it("tudo comprovado dá 100; nada comprovado dá 0", () => {
    expect(calcularDiagnostico(todos(3)).score_geral).toBe(100);
    expect(calcularDiagnostico([]).score_geral).toBe(0);
  });
  it("é determinístico", () => {
    expect(calcularDiagnostico(todos(2))).toEqual(calcularDiagnostico(todos(2)));
  });
  it("Rei fraco limita a nota geral a 45", () => {
    const ev = todos(3).map((e) => (e.criterio_id.startsWith("rei.") ? { ...e, nivel: 0 as const } : e));
    const d = calcularDiagnostico(ev);
    expect(d.score_geral).toBe(45);
    expect(d.regras_aplicadas.map((r) => r.id)).toContain("rei_fraco");
    expect(d.risco_xeque_mate?.peca).toBe("rei");
  });
  it("uma peça praticamente zerada limita a nota geral a 60", () => {
    const ev = todos(3).map((e) => (e.criterio_id.startsWith("cavalo.") ? { ...e, nivel: 0 as const } : e));
    const d = calcularDiagnostico(ev);
    expect(d.score_geral).toBe(60);
    expect(d.regras_aplicadas.map((r) => r.id)).toContain("peca_zerada");
  });
  it("ignora critérios desconhecidos e níveis fora da escala", () => {
    const d = calcularDiagnostico([{ criterio_id: "rei.inventado", nivel: 3, justificativa: "", trechos_fonte: [] },
      { criterio_id: "rei.problema_especifico", nivel: 9 as never, justificativa: "", trechos_fonte: [] }]);
    expect(d.score_geral).toBeLessThan(10);
  });
});
