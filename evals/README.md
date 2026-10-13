# Evals — concordância IA × especialista

Cada projeto-gabarito tem o texto (ou PDF) do projeto e a avaliação da especialista: nível de evidência por critério e score esperado.

O teste roda a extração do LLM sobre o projeto e compara com o gabarito:
- concordância por critério (mesmo nível ou diferença de 1);
- diferença absoluta no score geral;
- concordância nas três peças em xeque.

Use projetos anonimizados ou fictícios. Arquivos com dados reais devem terminar em `.privado.json` e ficam fora do Git.
