# Versão de teste estática

Mesmo fluxo do protótipo (entrevista → extração de evidências → score pela rubrica → redação), rodando como página estática no GitHub Pages.

- A IA é acessada direto do navegador com a chave da API informada pelo usuário no pop-up **Conectar IA**.
- A chave fica em memória (ou na sessão da aba, se marcado) e é enviada apenas para `api.anthropic.com`.
- Use uma chave dedicada para testes, com limite de gastos no Console da Anthropic, e apague-a depois.

Esta abordagem é só para validação. Na versão de produção as chamadas passam por um backend próprio e a chave nunca chega ao navegador.

Para publicar uma alteração: copie `index.html` para a branch `gh-pages`.
