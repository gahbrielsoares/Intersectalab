"use strict";
var SCM = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/site.ts
  var site_exports = {};
  __export(site_exports, {
    calcular: () => calcular,
    fontes: () => fontes,
    pecas: () => pecas,
    regrasTabuleiro: () => regrasTabuleiro,
    totalCriterios: () => totalCriterios,
    versao: () => versao
  });

  // src/fontes.ts
  var FONTES = {
    kth_irl: {
      id: "kth_irl",
      nome: "KTH Innovation Readiness Level",
      referencia: "KTH Innovation, KTH Royal Institute of Technology (Su\xE9cia). KTH Innovation Readiness Level: seis dimens\xF5es (cliente, tecnologia, modelo de neg\xF3cio, propriedade intelectual, equipe e financiamento), cada uma em 9 n\xEDveis. Adotado por universidades como a DTU (Dinamarca).",
      url: "https://kthinnovationreadinesslevel.com/",
      tipo: "framework_institucional"
    },
    nasa_trl: {
      id: "nasa_trl",
      nome: "NASA Technology Readiness Level",
      referencia: "NASA, Technology Readiness Levels (1970s), padronizado na ISO 16290:2013. Escala de 1 a 9 da maturidade tecnol\xF3gica, do princ\xEDpio observado ao sistema provado em opera\xE7\xE3o.",
      url: "https://www.nasa.gov/directorates/somd/space-communications-navigation-program/technology-readiness-levels/",
      tipo: "padrao_internacional"
    },
    camuffo_2020: {
      id: "camuffo_2020",
      nome: "Camuffo et al., Management Science (2020)",
      referencia: "Camuffo, A., Cordova, A., Gambardella, A., Spina, C. (2020). A Scientific Approach to Entrepreneurial Decision Making: Evidence from a Randomized Control Trial. Management Science, 66(2), 564-586.",
      url: "https://doi.org/10.1287/mnsc.2018.3249",
      tipo: "estudo_revisado"
    },
    camuffo_2024: {
      id: "camuffo_2024",
      nome: "Camuffo et al., Strategic Management Journal (2024)",
      referencia: "Camuffo, A., Gambardella, A., Messinese, D., Novelli, E., Paolucci, E., Spina, C. (2024). A Scientific Approach to Entrepreneurial Decision Making: Large Scale Replication and Extension. Strategic Management Journal, 45(6), 1209-1237. Quatro ensaios randomizados com 759 startups.",
      url: "https://doi.org/10.1002/smj.3580",
      tipo: "estudo_revisado"
    },
    gompers_2020: {
      id: "gompers_2020",
      nome: "Gompers et al., Journal of Financial Economics (2020)",
      referencia: "Gompers, P., Gornall, W., Kaplan, S., Strebulaev, I. (2020). How do venture capitalists make decisions? Journal of Financial Economics, 135(1), 169-190. Pesquisa com 885 investidores de 681 fundos.",
      url: "https://doi.org/10.1016/j.jfineco.2019.06.011",
      tipo: "estudo_revisado"
    },
    cbinsights: {
      id: "cbinsights",
      nome: "CB Insights, an\xE1lises de startups encerradas",
      referencia: "CB Insights, The Top Reasons Startups Fail (2014, 101 casos; 2021, 111 casos). Aus\xEAncia de necessidade de mercado foi a causa mais citada em 2014 (42%) e a segunda em 2021 (35%); tamb\xE9m aparecem falta de caixa, equipe, concorr\xEAncia, modelo de neg\xF3cio e barreiras regulat\xF3rias. Dados autodeclarados, n\xE3o revisados por pares.",
      url: "https://www.cbinsights.com/research/report/startup-failure-reasons-top/",
      tipo: "dados_setoriais"
    },
    icorps: {
      id: "icorps",
      nome: "NSF I-Corps",
      referencia: "National Science Foundation (EUA), programa Innovation Corps, baseado no Customer Development de Steve Blank. Equipes acad\xEAmicas realizam ao menos 100 entrevistas de descoberta de clientes antes de decidir seguir.",
      url: "https://www.nsf.gov/funding/initiatives/i-corps",
      tipo: "framework_institucional"
    }
  };

  // src/pecas/base.ts
  var LIMIARES = { critico: 35, alto: 55, medio: 75 };
  function severidade(score) {
    if (score < LIMIARES.critico) return "CRITICO";
    if (score < LIMIARES.alto) return "ALTO";
    if (score < LIMIARES.medio) return "MEDIO";
    return null;
  }
  var arred = (n) => Math.round(n * 10) / 10;
  function criarPeca(def) {
    const peca = {
      peso: 1,
      ...def,
      avaliar(evidencias) {
        var _a, _b;
        const niveis = {};
        let soma = 0, pesoTotal = 0;
        for (const c of peca.criterios) {
          const bruto = Number((_b = (_a = evidencias.get(c.id)) == null ? void 0 : _a.nivel) != null ? _b : 0);
          const n = Math.max(0, Math.min(3, Number.isFinite(bruto) ? bruto : 0)) | 0;
          niveis[c.id] = n;
          soma += n / 3 * c.peso;
          pesoTotal += c.peso;
        }
        const semRegras = arred(soma / pesoTotal * 100);
        let score = semRegras;
        const aplicadas = [];
        for (const r of peca.regras) {
          const teto = r.aplicar(niveis);
          if (teto !== null && score > teto) {
            score = teto;
            aplicadas.push(r.descricao);
          }
        }
        const min = Math.min(...Object.values(niveis));
        return {
          peca: peca.id,
          score,
          score_sem_regras: semRegras,
          regras_aplicadas: aplicadas,
          severidade: severidade(score),
          criterios_mais_fracos: min < 3 ? Object.keys(niveis).filter((k) => niveis[k] === min) : []
        };
      }
    };
    return peca;
  }
  function criterio(id, descricao, pergunta, peso, ancoras, fontes2) {
    return { id, descricao, pergunta, peso, ancoras: { 0: ancoras[0], 1: ancoras[1], 2: ancoras[2], 3: ancoras[3] }, fontes: fontes2 };
  }

  // src/pecas/rei.ts
  var rei = criarPeca({
    id: "rei",
    nome: "Rei",
    papel: "O Problema",
    simbolo: "\u2654",
    descricao: "Verifica se existe um problema real, espec\xEDfico e confirmado por quem o vive.",
    fontes: ["kth_irl", "cbinsights", "icorps"],
    integracoes_futuras: ["Bases de dados setoriais (IBGE, DATASUS) para dimensionar o custo do problema"],
    criterios: [
      criterio(
        "rei.problema_especifico",
        "Problema descrito de forma espec\xEDfica",
        "Quem exatamente sofre esse problema, em que situa\xE7\xE3o e com que frequ\xEAncia?",
        1,
        [
          "N\xE3o h\xE1 descri\xE7\xE3o do problema.",
          "Problema gen\xE9rico ou suposto, sem dizer quem sofre e quando.",
          "Problema descrito com p\xFAblico e situa\xE7\xE3o, com base em fontes secund\xE1rias (relat\xF3rios, literatura).",
          "Problema descrito com p\xFAblico, situa\xE7\xE3o e frequ\xEAncia, confirmados em contato direto com quem o vive."
        ],
        ["kth_irl"]
      ),
      criterio(
        "rei.validado_com_clientes",
        "Problema confirmado diretamente por v\xE1rios clientes ou usu\xE1rios",
        "Com quantos clientes ou usu\xE1rios voc\xEAs conversaram, e quantos confirmaram o problema?",
        3,
        [
          "Nenhuma conversa com clientes ou usu\xE1rios.",
          "S\xF3 a percep\xE7\xE3o da equipe ou da literatura, sem conversas diretas.",
          "Poucas conversas diretas (menos de 5 em B2B ou de 10 em B2C) ou apenas com especialistas.",
          "Problema e sua import\xE2ncia confirmados por v\xE1rios clientes (cerca de 5 a 10 em B2B, 10 a 20 em B2C, ou os l\xEDderes de um mercado concentrado)."
        ],
        ["kth_irl", "icorps"]
      ),
      criterio(
        "rei.independe_da_solucao",
        "Problema existe independentemente da solu\xE7\xE3o proposta",
        "Esse problema existiria e seria reconhecido mesmo se a sua tecnologia n\xE3o existisse?",
        2,
        [
          "O problema s\xF3 \xE9 descrito como a aus\xEAncia da pr\xF3pria solu\xE7\xE3o.",
          "O problema parece ter sido formulado a partir da tecnologia, sem evid\xEAncia de que j\xE1 incomoda algu\xE9m.",
          "H\xE1 sinais de que o problema existe por si (gastos atuais, solu\xE7\xF5es improvisadas), mas pouco documentados.",
          "H\xE1 evid\xEAncia clara de que o problema j\xE1 gera custo, perda ou esfor\xE7o hoje, com ou sem a solu\xE7\xE3o."
        ],
        ["cbinsights", "kth_irl"]
      ),
      criterio(
        "rei.custo_do_problema",
        "Impacto do problema quantificado",
        "Quanto esse problema custa hoje, para quem, e como esse n\xFAmero foi obtido?",
        2,
        [
          "N\xE3o h\xE1 estimativa de impacto.",
          "Impacto afirmado sem n\xFAmeros ou com n\xFAmeros sem origem.",
          "Impacto estimado com dados secund\xE1rios ou c\xE1lculo pr\xF3prio n\xE3o validado.",
          "Impacto quantificado com dados de clientes, medi\xE7\xF5es ou fontes oficiais citadas."
        ],
        ["kth_irl", "cbinsights"]
      )
    ],
    regras: [
      {
        id: "rei.sem_validacao_direta",
        descricao: "Sem confirma\xE7\xE3o direta de clientes, o problema ainda \xE9 hip\xF3tese: a nota do Rei fica limitada a 50.",
        aplicar: (n) => n["rei.validado_com_clientes"] <= 1 ? 50 : null,
        fontes: ["kth_irl", "icorps"]
      }
    ]
  });

  // src/pecas/rainha.ts
  var rainha = criarPeca({
    id: "rainha",
    nome: "Rainha",
    papel: "L\xF3gica do Neg\xF3cio",
    simbolo: "\u2655",
    descricao: "Verifica se a tecnologia entrega ganho real fora do laborat\xF3rio e se h\xE1 uma forma vi\xE1vel de gerar receita.",
    fontes: ["nasa_trl", "kth_irl"],
    integracoes_futuras: ["Bases de patentes e artigos para comparar com o estado da arte"],
    criterios: [
      criterio(
        "rainha.proposta_de_valor",
        "Proposta de valor estruturada",
        "Qual necessidade \xE9 atendida, com que abordagem, com que benef\xEDcio e frente a quais alternativas?",
        1,
        [
          "N\xE3o h\xE1 proposta de valor.",
          "Ideia de neg\xF3cio vaga, sem dizer benef\xEDcio nem alternativas.",
          "Necessidade, abordagem e benef\xEDcio descritos, mas sem compara\xE7\xE3o com alternativas.",
          "Necessidade, abordagem, benef\xEDcio e compara\xE7\xE3o com alternativas descritos de forma estruturada."
        ],
        ["kth_irl"]
      ),
      criterio(
        "rainha.ganho_vs_alternativas",
        "Ganho mensur\xE1vel frente \xE0s alternativas existentes",
        "Em n\xFAmeros, quanto a solu\xE7\xE3o \xE9 melhor, mais barata ou mais r\xE1pida que o que j\xE1 existe?",
        2,
        [
          "N\xE3o h\xE1 compara\xE7\xE3o com o que existe.",
          "Superioridade afirmada sem n\xFAmeros.",
          "Ganho medido em laborat\xF3rio ou estimado, sem confirma\xE7\xE3o de mercado.",
          "Ganho medido e confirmado por clientes, parceiros ou testes independentes."
        ],
        ["kth_irl", "nasa_trl"]
      ),
      criterio(
        "rainha.maturidade_tecnologica",
        "Maturidade tecnol\xF3gica (escala TRL)",
        "Em que ambiente a tecnologia j\xE1 foi demonstrada: conceito, laborat\xF3rio, ambiente relevante ou opera\xE7\xE3o real?",
        2,
        [
          "Apenas princ\xEDpio ou conceito formulado (TRL 1 a 2).",
          "Prova de conceito ou valida\xE7\xE3o em laborat\xF3rio (TRL 3 a 4).",
          "Valida\xE7\xE3o ou demonstra\xE7\xE3o em ambiente relevante, pr\xF3ximo do real (TRL 5 a 6).",
          "Prot\xF3tipo demonstrado em ambiente operacional ou sistema qualificado (TRL 7 ou mais)."
        ],
        ["nasa_trl"]
      ),
      criterio(
        "rainha.modelo_de_receita",
        "Modelo de receita e viabilidade econ\xF4mica",
        "Quem paga, quanto, com que frequ\xEAncia, e os n\xFAmeros fecham frente aos custos?",
        2,
        [
          "N\xE3o h\xE1 modelo de receita.",
          "Forma de cobran\xE7a imaginada, sem pre\xE7os nem custos.",
          "Modelo com pre\xE7o e custos estimados e primeira proje\xE7\xE3o econ\xF4mica, ainda n\xE3o testados.",
          "Pre\xE7o e modelo testados com clientes (venda-teste, pr\xE9-venda ou piloto pago)."
        ],
        ["kth_irl"]
      )
    ],
    regras: []
  });

  // src/pecas/torre.ts
  var torre = criarPeca({
    id: "torre",
    nome: "Torre",
    papel: "Hip\xF3teses",
    simbolo: "\u2656",
    descricao: "Verifica se as premissas do projeto est\xE3o expl\xEDcitas, priorizadas e testadas com crit\xE9rio.",
    fontes: ["camuffo_2020", "camuffo_2024", "icorps"],
    integracoes_futuras: [],
    criterios: [
      criterio(
        "torre.hipoteses_explicitas",
        "Hip\xF3teses de neg\xF3cio escritas de forma expl\xEDcita e test\xE1vel",
        "Quais s\xE3o as hip\xF3teses do projeto, escritas de forma que possam ser provadas falsas?",
        1,
        [
          "N\xE3o h\xE1 hip\xF3teses declaradas.",
          "Cren\xE7as impl\xEDcitas no texto, n\xE3o formuladas como hip\xF3teses.",
          "Algumas hip\xF3teses expl\xEDcitas, mas vagas ou dif\xEDceis de testar.",
          "Hip\xF3teses expl\xEDcitas, espec\xEDficas e false\xE1veis, cobrindo cliente, valor e neg\xF3cio."
        ],
        ["camuffo_2020", "camuffo_2024"]
      ),
      criterio(
        "torre.premissa_critica",
        "Premissa mais arriscada identificada",
        "Qual premissa, se for falsa, encerra o projeto amanh\xE3?",
        2,
        [
          "N\xE3o identifica nenhuma premissa cr\xEDtica.",
          "Cita riscos gen\xE9ricos sem apontar a premissa decisiva.",
          "Aponta a premissa cr\xEDtica, mas sem justificar por que \xE9 a mais arriscada.",
          "Aponta e justifica a premissa mais arriscada e a prioriza nos testes."
        ],
        ["camuffo_2020", "icorps"]
      ),
      criterio(
        "torre.teste_com_criterio",
        "Testes com m\xE9trica e crit\xE9rio de decis\xE3o definidos antes",
        "Como a premissa \xE9 testada, com que m\xE9trica, e qual resultado faria voc\xEAs mudarem de rumo?",
        2,
        [
          "Nenhum teste realizado ou planejado.",
          "Testes informais, sem m\xE9trica nem crit\xE9rio de aceita\xE7\xE3o.",
          "Testes com m\xE9trica, mas sem crit\xE9rio de decis\xE3o definido antes, ou s\xF3 em laborat\xF3rio.",
          "Testes fora do laborat\xF3rio com m\xE9trica e limite de aceita\xE7\xE3o ou rejei\xE7\xE3o definidos antes do resultado."
        ],
        ["camuffo_2020", "camuffo_2024"]
      ),
      criterio(
        "torre.decisao_por_evidencia",
        "Decis\xF5es tomadas a partir dos resultados",
        "Que decis\xF5es j\xE1 foram mudadas por causa do que os testes mostraram?",
        1,
        [
          "N\xE3o h\xE1 registro de aprendizado com testes.",
          "Mudan\xE7as feitas por opini\xE3o, sem liga\xE7\xE3o com resultados.",
          "Algum ajuste feito a partir de resultados, pouco documentado.",
          "Decis\xF5es documentadas (seguir, ajustar, pivotar ou encerrar) baseadas em resultados de testes."
        ],
        ["camuffo_2024"]
      )
    ],
    regras: []
  });

  // src/pecas/bispo.ts
  var bispo = criarPeca({
    id: "bispo",
    nome: "Bispo",
    papel: "Mercado",
    simbolo: "\u2657",
    descricao: "Verifica se h\xE1 um comprador real identificado, com interesse demonstrado, num mercado dimensionado.",
    fontes: ["kth_irl", "cbinsights", "gompers_2020"],
    integracoes_futuras: [
      "Portal Nacional de Contrata\xE7\xF5es P\xFAblicas (PNCP) para compradores p\xFAblicos",
      "Dados do IBGE e de associa\xE7\xF5es setoriais para dimensionar o mercado"
    ],
    criterios: [
      criterio(
        "bispo.segmento_alvo",
        "Segmento de entrada definido",
        "Quem ser\xE3o os primeiros clientes, de forma espec\xEDfica?",
        1,
        [
          "N\xE3o h\xE1 p\xFAblico-alvo definido.",
          "P\xFAblico amplo e gen\xE9rico (por exemplo, toda a ind\xFAstria ou todos os hospitais).",
          "Segmentos identificados, sem escolha clara de por onde entrar.",
          "Segmento de entrada escolhido e justificado, com perfil dos primeiros clientes."
        ],
        ["kth_irl"]
      ),
      criterio(
        "bispo.comprador_vs_usuario",
        "Decisor de compra identificado e distinguido do usu\xE1rio",
        "Quem usa e quem decide e paga pela compra s\xE3o a mesma pessoa? Quem \xE9 o decisor?",
        2,
        [
          "N\xE3o h\xE1 distin\xE7\xE3o entre usu\xE1rio e comprador.",
          "Comprador presumido, sem contato.",
          "Comprador identificado por cargo ou fun\xE7\xE3o, com contato limitado.",
          "Decisor econ\xF4mico identificado e consultado, com o processo de compra entendido."
        ],
        ["kth_irl"]
      ),
      criterio(
        "bispo.interesse_demonstrado",
        "Interesse concreto de clientes",
        "Que sinal concreto de interesse j\xE1 existe: carta de inten\xE7\xE3o, piloto, pr\xE9-venda ou venda-teste?",
        3,
        [
          "Nenhum sinal de interesse.",
          "Interesse apenas verbal ou presumido.",
          "Rela\xE7\xE3o estabelecida com clientes-alvo (reuni\xF5es recorrentes, participa\xE7\xE3o em requisitos, carta de inten\xE7\xE3o).",
          "Piloto, teste estendido, pr\xE9-venda ou primeira venda com cliente-alvo."
        ],
        ["kth_irl"]
      ),
      criterio(
        "bispo.tamanho_mercado",
        "Mercado dimensionado",
        "Qual o tamanho do mercado que voc\xEAs conseguem atender, e como esse n\xFAmero foi calculado?",
        1,
        [
          "N\xE3o h\xE1 dimensionamento.",
          "N\xFAmero de mercado total sem origem ou sem recorte.",
          "Mercado total e atend\xEDvel estimados de cima para baixo, com fontes.",
          "Mercado atend\xEDvel calculado de baixo para cima (n\xFAmero de clientes vezes pre\xE7o), com fontes."
        ],
        ["kth_irl"]
      ),
      criterio(
        "bispo.concorrencia_e_troca",
        "Concorr\xEAncia, alternativas e custo de troca mapeados",
        "O que o cliente usa hoje, e o que ele precisaria abandonar para adotar a solu\xE7\xE3o?",
        1,
        [
          "N\xE3o cita concorrentes ou alternativas.",
          "Afirma n\xE3o ter concorrentes ou cita poucos, sem an\xE1lise.",
          "Concorrentes diretos e indiretos mapeados, sem an\xE1lise do custo de troca.",
          "Concorr\xEAncia, alternativas atuais e custo de troca analisados e confirmados com clientes."
        ],
        ["kth_irl", "cbinsights"]
      )
    ],
    regras: [
      {
        id: "bispo.sem_sinal_de_compra",
        descricao: "Sem nenhum sinal concreto de interesse de clientes, a nota do Bispo fica limitada a 45.",
        aplicar: (n) => n["bispo.interesse_demonstrado"] === 0 ? 45 : null,
        fontes: ["kth_irl"]
      }
    ]
  });

  // src/pecas/cavalo.ts
  var cavalo = criarPeca({
    id: "cavalo",
    nome: "Cavalo",
    papel: "Riscos",
    simbolo: "\u2658",
    descricao: "Verifica se os riscos de propriedade intelectual, regula\xE7\xE3o e produ\xE7\xE3o est\xE3o mapeados e tratados.",
    fontes: ["kth_irl", "cbinsights"],
    integracoes_futuras: [
      "INPI e Espacenet para busca de patentes e anterioridade",
      "ANVISA, MAPA e INMETRO para enquadramento regulat\xF3rio"
    ],
    criterios: [
      criterio(
        "cavalo.titularidade_pi",
        "Titularidade da propriedade intelectual clara",
        "A quem pertence a tecnologia (universidade, inventores, empresa) e h\xE1 acordos formalizando isso?",
        2,
        [
          "N\xE3o se sabe a quem pertence a tecnologia.",
          "Titularidade presumida, sem verificar pol\xEDtica da institui\xE7\xE3o nem acordos.",
          "Titularidade identificada (inventores e institui\xE7\xE3o), com acordos em andamento.",
          "Titularidade e direitos de uso formalizados em acordos ou na pol\xEDtica da institui\xE7\xE3o."
        ],
        ["kth_irl"]
      ),
      criterio(
        "cavalo.protecao_pi",
        "Prote\xE7\xE3o da propriedade intelectual",
        "A patenteabilidade foi avaliada, e h\xE1 pedido de patente ou outra prote\xE7\xE3o depositada?",
        1,
        [
          "Nenhuma avalia\xE7\xE3o de prote\xE7\xE3o.",
          "Ideia de patentear, sem busca de anterioridade.",
          "Busca de anterioridade feita ou novidade confirmada, sem pedido depositado.",
          "Pedido de patente ou outro registro depositado com apoio profissional, ou patente concedida."
        ],
        ["kth_irl"]
      ),
      criterio(
        "cavalo.liberdade_de_operacao",
        "Liberdade de opera\xE7\xE3o avaliada",
        "Alguma patente de terceiros pode impedir voc\xEAs de vender a solu\xE7\xE3o?",
        1,
        [
          "N\xE3o considerado.",
          "Risco reconhecido, sem an\xE1lise.",
          "An\xE1lise inicial do cen\xE1rio de patentes e concorrentes.",
          "Avalia\xE7\xE3o de liberdade de opera\xE7\xE3o feita, idealmente com apoio profissional."
        ],
        ["kth_irl"]
      ),
      criterio(
        "cavalo.regulatorio",
        "Caminho regulat\xF3rio mapeado",
        "Quais registros, certifica\xE7\xF5es ou autoriza\xE7\xF5es s\xE3o necess\xE1rios, em qual \xF3rg\xE3o, com que prazo e custo?",
        2,
        [
          "N\xE3o se sabe se h\xE1 exig\xEAncias regulat\xF3rias.",
          "Exig\xEAncia reconhecida, sem identificar \xF3rg\xE3o nem caminho.",
          "\xD3rg\xE3o e tipo de registro identificados, sem prazo e custo estimados.",
          "Caminho regulat\xF3rio mapeado com \xF3rg\xE3o, etapas, prazo e custo, ou confirma\xE7\xE3o documentada de que n\xE3o se aplica."
        ],
        ["cbinsights"]
      ),
      criterio(
        "cavalo.cadeia_e_escala",
        "Riscos de insumos, fornecedores e produ\xE7\xE3o em escala",
        "Algum insumo, fornecedor ou etapa de produ\xE7\xE3o pode travar o projeto ao escalar?",
        1,
        [
          "N\xE3o considerado.",
          "Riscos citados de forma gen\xE9rica.",
          "Riscos espec\xEDficos identificados, sem plano de mitiga\xE7\xE3o.",
          "Riscos espec\xEDficos identificados com alternativas ou plano de mitiga\xE7\xE3o."
        ],
        ["kth_irl", "nasa_trl"]
      )
    ],
    regras: []
  });

  // src/pecas/peao.ts
  var peao = criarPeca({
    id: "peao",
    nome: "Pe\xE3o",
    papel: "Equipe",
    simbolo: "\u2659",
    descricao: "Verifica se h\xE1 uma equipe comprometida, com compet\xEAncias t\xE9cnicas e de neg\xF3cio, capaz de levar o projeto ao mercado.",
    fontes: ["kth_irl", "gompers_2020", "cbinsights"],
    integracoes_futuras: ["Plataforma Lattes e ORCID para hist\xF3rico e experi\xEAncia da equipe"],
    criterios: [
      criterio(
        "peao.campeao",
        "Um campe\xE3o comprometido com a comercializa\xE7\xE3o",
        "Quem vai levar o projeto ao mercado, com quanto tempo de dedica\xE7\xE3o, e quer isso de fato?",
        2,
        [
          "Ningu\xE9m assume levar o projeto ao mercado.",
          "Interesse declarado, mas o respons\xE1vel prefere seguir pesquisando ou tem pouco tempo.",
          "H\xE1 um respons\xE1vel interessado, com dedica\xE7\xE3o parcial.",
          "H\xE1 um campe\xE3o com dedica\xE7\xE3o significativa e inten\xE7\xE3o clara de empreender ou licenciar."
        ],
        ["kth_irl", "gompers_2020"]
      ),
      criterio(
        "peao.competencias_complementares",
        "Compet\xEAncias t\xE9cnicas e de neg\xF3cio presentes",
        "A equipe tem quem desenvolva a tecnologia e quem venda e negocie?",
        2,
        [
          "Uma pessoa s\xF3, sem as compet\xEAncias necess\xE1rias.",
          "Apenas compet\xEAncias t\xE9cnicas, sem ningu\xE9m de neg\xF3cio.",
          "Algumas compet\xEAncias de neg\xF3cio, com lacunas identificadas e plano para supri-las.",
          "Equipe complementar com compet\xEAncias t\xE9cnicas e de neg\xF3cio para o curto prazo."
        ],
        ["kth_irl", "gompers_2020"]
      ),
      criterio(
        "peao.experiencia_setor",
        "Experi\xEAncia no setor ou mercado-alvo",
        "Algu\xE9m da equipe ou dos conselheiros j\xE1 trabalhou no setor do cliente?",
        2,
        [
          "Nenhuma experi\xEAncia no setor.",
          "Experi\xEAncia apenas acad\xEAmica no tema.",
          "Experi\xEAncia indireta (projetos com empresas do setor, conselheiros pontuais).",
          "Membro da equipe ou conselheiro ativo com experi\xEAncia profissional no setor."
        ],
        ["gompers_2020"]
      ),
      criterio(
        "peao.alinhamento_societario",
        "Pap\xE9is, participa\xE7\xE3o e compromisso acordados",
        "Os pap\xE9is e a divis\xE3o de participa\xE7\xE3o est\xE3o acordados entre os membros?",
        1,
        [
          "N\xE3o discutido.",
          "Conversas iniciais, sem acordo.",
          "Pap\xE9is definidos, participa\xE7\xE3o em discuss\xE3o.",
          "Pap\xE9is, participa\xE7\xE3o e compromisso de tempo acordados por escrito."
        ],
        ["kth_irl"]
      ),
      criterio(
        "peao.dependencia_individuo",
        "Baixa depend\xEAncia de uma \xFAnica pessoa",
        "Se a pessoa-chave sair, o projeto continua?",
        1,
        [
          "O projeto depende inteiramente de uma pessoa.",
          "Depend\xEAncia alta reconhecida, sem plano.",
          "Conhecimento parcialmente distribu\xEDdo ou plano de recrutamento iniciado.",
          "Compet\xEAncias-chave distribu\xEDdas e conselheiros ou membros de reserva envolvidos."
        ],
        ["kth_irl"]
      )
    ],
    regras: []
  });

  // src/tabuleiro.ts
  var VERSAO_METODO = "0.2.0";
  var PESOS = { rei: 3, peao: 3, bispo: 2.5, rainha: 2, torre: 2, cavalo: 1.5 };
  var PECAS = [rei, rainha, torre, bispo, cavalo, peao].map((p) => ({ ...p, peso: PESOS[p.id] }));
  var REGRAS_TABULEIRO = [
    {
      id: "rei_fraco",
      descricao: "O problema (Rei) n\xE3o est\xE1 validado: a nota geral fica limitada a 45.",
      fontes: ["cbinsights", "kth_irl"],
      teto: 45,
      aplica: (r) => r.rei.score < 40
    },
    {
      id: "peca_zerada",
      descricao: "Alguma pe\xE7a est\xE1 praticamente sem evid\xEAncia: a nota geral fica limitada a 60, pois todas as dimens\xF5es precisam de um m\xEDnimo de maturidade.",
      fontes: ["kth_irl"],
      teto: 60,
      aplica: (r) => Object.values(r).some((x) => x.score < 15)
    }
  ];
  var arred2 = (n) => Math.round(n * 10) / 10;
  function validarPecas(pecas2 = PECAS) {
    const ids = /* @__PURE__ */ new Set();
    for (const p of pecas2) {
      if (!(p.peso > 0)) throw new Error(`Peso inv\xE1lido na pe\xE7a ${p.id}`);
      if (!p.criterios.length) throw new Error(`Pe\xE7a ${p.id} sem crit\xE9rios`);
      for (const f of p.fontes) if (!FONTES[f]) throw new Error(`Fonte desconhecida ${f} em ${p.id}`);
      for (const c of p.criterios) {
        if (!c.id.startsWith(p.id + ".")) throw new Error(`Crit\xE9rio ${c.id} fora do prefixo da pe\xE7a ${p.id}`);
        if (ids.has(c.id)) throw new Error(`Crit\xE9rio duplicado: ${c.id}`);
        if (!(c.peso > 0)) throw new Error(`Peso inv\xE1lido no crit\xE9rio ${c.id}`);
        if (!c.fontes.length) throw new Error(`Crit\xE9rio ${c.id} sem fonte`);
        for (const f of c.fontes) if (!FONTES[f]) throw new Error(`Fonte desconhecida ${f} em ${c.id}`);
        ids.add(c.id);
      }
    }
  }
  function calcularDiagnostico(evidencias, pecas2 = PECAS) {
    var _a;
    validarPecas(pecas2);
    const validos = new Set(pecas2.flatMap((p) => p.criterios.map((c) => c.id)));
    const mapa = /* @__PURE__ */ new Map();
    for (const e of evidencias) if (validos.has(e.criterio_id)) mapa.set(e.criterio_id, e);
    const resultados = pecas2.map((p) => p.avaliar(mapa));
    const porId = Object.fromEntries(resultados.map((r) => [r.peca, r]));
    const pesoTotal = pecas2.reduce((s, p) => s + p.peso, 0);
    const semRegras = arred2(resultados.reduce((s, r, i) => s + r.score * pecas2[i].peso, 0) / pesoTotal);
    let geral = semRegras;
    const aplicadas = [];
    for (const regra of REGRAS_TABULEIRO) {
      if (regra.aplica(porId) && geral > regra.teto) {
        geral = regra.teto;
        aplicadas.push({ id: regra.id, descricao: regra.descricao });
      }
    }
    const peso = Object.fromEntries(pecas2.map((p) => [p.id, p.peso]));
    const emXeque = resultados.filter((r) => r.severidade !== null).sort((a, b) => (100 - b.score) * peso[b.peca] - (100 - a.score) * peso[a.peca]).slice(0, 3);
    return {
      versao_metodo: VERSAO_METODO,
      score_geral: geral,
      score_sem_regras: semRegras,
      regras_aplicadas: aplicadas,
      pecas: resultados,
      pecas_em_xeque: emXeque,
      risco_xeque_mate: (_a = emXeque[0]) != null ? _a : null
    };
  }

  // src/site.ts
  var versao = VERSAO_METODO;
  var fontes = FONTES;
  var regrasTabuleiro = REGRAS_TABULEIRO.map(({ id, descricao, fontes: fontes2, teto }) => ({ id, descricao, fontes: fontes2, teto }));
  var pecas = PECAS.map((p) => ({
    id: p.id,
    nome: `${p.nome}: ${p.papel}`,
    nomeCurto: p.nome,
    papel: p.papel,
    simbolo: p.simbolo,
    descricao: p.descricao,
    peso: p.peso,
    fontes: p.fontes,
    integracoes_futuras: p.integracoes_futuras,
    regras: p.regras.map(({ id, descricao, fontes: fontes2 }) => ({ id, descricao, fontes: fontes2 })),
    criterios: p.criterios.map((c) => ({ id: c.id, descricao: c.descricao, pergunta: c.pergunta, peso: c.peso, ancoras: c.ancoras, fontes: c.fontes }))
  }));
  var totalCriterios = pecas.reduce((s, p) => s + p.criterios.length, 0);
  function calcular(evidencias) {
    const d = calcularDiagnostico(evidencias);
    const evid = {};
    for (const e of evidencias) evid[e.criterio_id] = e;
    const conv = (r) => ({ peca: r.peca, score: r.score, severidade: r.severidade, fracos: r.criterios_mais_fracos, regras: r.regras_aplicadas });
    return {
      versao: d.versao_metodo,
      geral: d.score_geral,
      semTravas: d.score_sem_regras,
      travas: d.regras_aplicadas.map((r) => r.id),
      motivos: d.regras_aplicadas.map((r) => r.descricao),
      pecas: d.pecas.map(conv),
      xeque: d.pecas_em_xeque.map(conv),
      mate: d.risco_xeque_mate ? conv(d.risco_xeque_mate) : null,
      evid
    };
  }
  return __toCommonJS(site_exports);
})();
