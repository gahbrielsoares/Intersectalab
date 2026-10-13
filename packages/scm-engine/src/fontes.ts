import type { Fonte } from "./contrato.js";

/**
 * Biblioteca de fontes. Cada regra do método aponta para uma ou mais destas.
 * Os textos das regras são resumos próprios em português; não reproduzem os originais.
 */
export const FONTES: Record<string, Fonte> = {
  kth_irl: {
    id: "kth_irl",
    nome: "KTH Innovation Readiness Level",
    referencia: "KTH Innovation, KTH Royal Institute of Technology (Suécia). KTH Innovation Readiness Level: seis dimensões (cliente, tecnologia, modelo de negócio, propriedade intelectual, equipe e financiamento), cada uma em 9 níveis. Adotado por universidades como a DTU (Dinamarca).",
    url: "https://kthinnovationreadinesslevel.com/",
    tipo: "framework_institucional",
  },
  nasa_trl: {
    id: "nasa_trl",
    nome: "NASA Technology Readiness Level",
    referencia: "NASA, Technology Readiness Levels (1970s), padronizado na ISO 16290:2013. Escala de 1 a 9 da maturidade tecnológica, do princípio observado ao sistema provado em operação.",
    url: "https://www.nasa.gov/directorates/somd/space-communications-navigation-program/technology-readiness-levels/",
    tipo: "padrao_internacional",
  },
  camuffo_2020: {
    id: "camuffo_2020",
    nome: "Camuffo et al., Management Science (2020)",
    referencia: "Camuffo, A., Cordova, A., Gambardella, A., Spina, C. (2020). A Scientific Approach to Entrepreneurial Decision Making: Evidence from a Randomized Control Trial. Management Science, 66(2), 564-586.",
    url: "https://doi.org/10.1287/mnsc.2018.3249",
    tipo: "estudo_revisado",
  },
  camuffo_2024: {
    id: "camuffo_2024",
    nome: "Camuffo et al., Strategic Management Journal (2024)",
    referencia: "Camuffo, A., Gambardella, A., Messinese, D., Novelli, E., Paolucci, E., Spina, C. (2024). A Scientific Approach to Entrepreneurial Decision Making: Large Scale Replication and Extension. Strategic Management Journal, 45(6), 1209-1237. Quatro ensaios randomizados com 759 startups.",
    url: "https://doi.org/10.1002/smj.3580",
    tipo: "estudo_revisado",
  },
  gompers_2020: {
    id: "gompers_2020",
    nome: "Gompers et al., Journal of Financial Economics (2020)",
    referencia: "Gompers, P., Gornall, W., Kaplan, S., Strebulaev, I. (2020). How do venture capitalists make decisions? Journal of Financial Economics, 135(1), 169-190. Pesquisa com 885 investidores de 681 fundos.",
    url: "https://doi.org/10.1016/j.jfineco.2019.06.011",
    tipo: "estudo_revisado",
  },
  cbinsights: {
    id: "cbinsights",
    nome: "CB Insights, análises de startups encerradas",
    referencia: "CB Insights, The Top Reasons Startups Fail (2014, 101 casos; 2021, 111 casos). Ausência de necessidade de mercado foi a causa mais citada em 2014 (42%) e a segunda em 2021 (35%); também aparecem falta de caixa, equipe, concorrência, modelo de negócio e barreiras regulatórias. Dados autodeclarados, não revisados por pares.",
    url: "https://www.cbinsights.com/research/report/startup-failure-reasons-top/",
    tipo: "dados_setoriais",
  },
  icorps: {
    id: "icorps",
    nome: "NSF I-Corps",
    referencia: "National Science Foundation (EUA), programa Innovation Corps, baseado no Customer Development de Steve Blank. Equipes acadêmicas realizam ao menos 100 entrevistas de descoberta de clientes antes de decidir seguir.",
    url: "https://www.nsf.gov/funding/initiatives/i-corps",
    tipo: "framework_institucional",
  },
};
