# LGPD e confidencialidade (rascunho)

- Projetos de pesquisa podem conter segredo industrial e invenções não patenteadas: tratar todo conteúdo enviado como confidencial.
- Coletar consentimento explícito antes do diagnóstico, com finalidade declarada.
- Definir prazo de retenção de conversas e PDFs e permitir exclusão a pedido.
- Usar provedores de LLM com política de não treinamento sobre os dados enviados, registrada no contrato.
- Separar dados de NITs por organização (isolamento por tenant).
- Nunca versionar dados reais de projetos no repositório (`.gitignore` já bloqueia `*.privado.json` em `evals/`).
