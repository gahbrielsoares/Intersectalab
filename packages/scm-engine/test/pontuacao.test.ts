import { describe, expect, it } from "vitest";
import { calcularDiagnostico, rubricaV0, type EvidenciaCriterio, type NivelEvidencia } from "../src/index.js";

const todos = (nivel: NivelEvidencia): EvidenciaCriterio[] =>
  rubricaV0.pecas.flatMap((p) => p.criterios.map((c) => ({
    criterio_id: c.id, nivel, justificativa: "teste", trechos_fonte: [],
  })));

describe("calcularDiagnostico", () => {
  it("projeto totalmente evidenciado recebe 100 e nenhuma peça em xeque", () => {
    const d = calcularDiagnostico(rubricaV0, todos(3));
    expect(d.score_geral).toBe(100);
    expect(d.pecas_em_xeque).toHaveLength(0);
    expect(d.risco_xeque_mate).toBeNull();
  });

  it("sem evidências recebe 0, e 'não sei' conta como ausente", () => {
    const d = calcularDiagnostico(rubricaV0, []);
    expect(d.score_geral).toBe(0);
    expect(d.pecas_em_xeque).toHaveLength(3);
  });

  it("é determinístico: mesma entrada, mesmo resultado", () => {
    const e = todos(2);
    expect(calcularDiagnostico(rubricaV0, e)).toEqual(calcularDiagnostico(rubricaV0, e));
  });

  it("Rei fraco limita o score geral (trava)", () => {
    const e = todos(3).map((x) => (x.criterio_id.startsWith("rei.") ? { ...x, nivel: 0 as const } : x));
    const d = calcularDiagnostico(rubricaV0, e);
    expect(d.score_sem_travas).toBeGreaterThan(45);
    expect(d.score_geral).toBe(45);
    expect(d.travas_aplicadas).toContain("rei");
    expect(d.risco_xeque_mate?.peca).toBe("rei");
  });

  it("rejeita evidência para critério inexistente", () => {
    expect(() => calcularDiagnostico(rubricaV0, [
      { criterio_id: "rei.inventado", nivel: 3, justificativa: "", trechos_fonte: [] },
    ])).toThrow();
  });
});
