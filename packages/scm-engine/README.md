# @intersecta/scm-engine

Motor do Scientific Chess Method.

```
src/
├── contrato.ts     formato que toda peça segue
├── fontes.ts       referências científicas usadas pelas regras
├── pecas/
│   ├── base.ts     cálculo padrão de uma peça
│   ├── rei.ts      ♔ O Problema
│   ├── rainha.ts   ♕ Lógica do Negócio
│   ├── torre.ts    ♖ Hipóteses
│   ├── bispo.ts    ♗ Mercado
│   ├── cavalo.ts   ♘ Riscos
│   └── peao.ts     ♙ Equipe
├── tabuleiro.ts    pesos das peças, regras entre peças e nota final
└── site.ts         ponte para a versão estática (gera scm-engine.js)
```

Para evoluir uma peça, edite só o arquivo dela: critérios, descrições de nível, pesos internos, regras internas e integrações futuras. Depois:

```bash
npm test             # garante que o método continua válido
npm run build:site   # atualiza apps/web-estatico/scm-engine.js
```

Fundamentação: `docs/metodo/fundamentacao.md`.
