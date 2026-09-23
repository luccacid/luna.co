/**
 * Dicionário PT — a referência: o tipo `Dict` sai daqui e EN/ES o seguem.
 *
 * Módulo sem "use client" de propósito: quem importa é o layout (server),
 * que serializa apenas o dicionário do idioma pedido. Os outros dois nunca
 * entram no bundle do cliente.
 */
import type { Lang } from "../langs";

export const pt = {
  lang: "pt" as Lang,
  htmlLang: "pt-BR",
  meta: {
    title: "luna&co — Sistemas sob medida para operações",
    description:
      "Sistemas internos, dados e automação para operações que cresceram além da planilha. Escopo e prazo definidos, código no repositório do cliente.",
  },
  nav: {
    links: [
      { href: "#servicos", label: "Serviços" },
      { href: "#processo", label: "Processo" },
      { href: "#sobre", label: "Estúdio" },
      { href: "#contato", label: "Contato" },
    ],
    cta: "Falar com a gente",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    menu: "Menu de navegação",
    main: "Principal",
    home: "luna&co — início",
    skip: "Pular para o conteúdo",
    language: "Idioma",
  },
  hero: {
    railLeft: "luna&co — estúdio de software",
    railRight: "sistemas sob medida",
    tagline: "Building Digital Systems",
    value: "Sistemas sob medida para operações que cresceram além da planilha.",
    scroll: "Rolar",
  },
  statement: {
    kicker: "O que fazemos",
    lead1: "Software sob medida para",
    leadAccent: "o que a sua operação",
    lead2: "ainda faz na mão.",
    body: "Planilha compartilhada, retrabalho e informação espalhada entre sistemas custam caro e não aparecem no balanço. Desenhamos e construímos o sistema que organiza esse processo — com escopo fechado, prazo definido e o código no repositório do cliente.",
    cta: "Conversar sobre o seu projeto",
  },
  marquee: [
    "SISTEMAS INTERNOS",
    "INTEGRAÇÕES",
    "DADOS E BI",
    "AUTOMAÇÃO DE PROCESSOS",
    "IA APLICADA",
    "APLICAÇÕES WEB",
    "PORTAIS E INTRANETS",
  ],
  services: {
    kicker: "Serviços",
    title: "Frentes de trabalho",
    intro:
      "A maior parte dos projetos combina mais de uma frente. O escopo é definido no diagnóstico, antes da proposta.",
    items: [
      {
        title: "Sistemas internos",
        body: "O sistema que a operação usa todos os dias: cadastro, aprovação, acompanhamento e histórico. Substitui a planilha compartilhada e o controle paralelo.",
        tags: "Web · Banco de dados · Controle de acesso",
      },
      {
        title: "Dados e BI",
        body: "Consolidação das bases em um lugar só e painéis que respondem às perguntas da diretoria sem depender de alguém montar o relatório à mão.",
        tags: "ETL · Painéis · Indicadores",
      },
      {
        title: "Automação e integrações",
        body: "Rotinas manuais e repetitivas viram processo automático. Integração entre ERP, planilhas, e-mail e serviços externos por API.",
        tags: "APIs · Rotinas · ERP",
      },
      {
        title: "IA aplicada",
        body: "Leitura de documentos, classificação e apoio à decisão onde existe ganho real de tempo — com critério de avaliação definido antes de entrar em produção.",
        tags: "Documentos · Classificação · Avaliação",
      },
    ],
  },
  process: {
    kicker: "Como trabalhamos",
    title: "Do problema ao sistema em produção",
    steps: [
      {
        title: "Diagnóstico",
        body: "Entendemos o processo como ele funciona hoje, com quem executa. Sem custo e sem compromisso.",
      },
      {
        title: "Escopo e proposta",
        body: "Documento com escopo, prazo e valor fechados. O que fica de fora também está escrito.",
      },
      {
        title: "Construção",
        body: "Entregas em ciclos curtos, revisadas com o cliente. Nada de caixa-preta até o fim do projeto.",
      },
      {
        title: "Entrega e evolução",
        body: "Sistema em produção, equipe treinada e código documentado no repositório do cliente.",
      },
    ],
  },
  about: {
    kicker: "O estúdio",
    title1: "Poucos projetos por vez,",
    title2: "acompanhados de perto.",
    body: "A luna&co é um estúdio de engenharia de software. Trabalhamos direto com quem decide, sem camada de intermediação: quem levanta o problema é quem escreve o código e entrega o sistema funcionando.",
    pillars: [
      { name: "Produto", role: "Diagnóstico e escopo" },
      { name: "Engenharia", role: "Construção e entrega" },
      { name: "Dados", role: "Integração e indicadores" },
    ],
    stats: [
      "Equipe dedicada por projeto",
      "Código entregue ao cliente",
      "Escopo e valor fechados",
      "Suporte após a entrega",
    ],
  },
  cases: {
    kicker: "Trabalhos",
    title: "O que já construímos",
    intro:
      "Descrevemos os projetos por setor e escopo. Nomes de clientes só aparecem com autorização.",
    challengeLabel: "Desafio",
    builtLabel: "O que construímos",
    items: [
      {
        sector: "Fundo de investimento",
        title: "Plataforma interna de crédito",
        challenge:
          "Análise de crédito e acompanhamento de carteira distribuídos entre planilhas, relatórios manuais e rotinas paralelas.",
        built:
          "Sistema único: consolidação das bases, análise por empresa, monitoramento com alertas, painéis de indicadores e automação das rotinas repetitivas.",
      },
      {
        sector: "Saúde",
        title: "Aplicativo de cuidado com apoio de IA",
        challenge:
          "Acompanhamento de pacientes dependente de registro manual e comunicação dispersa entre quem cuida.",
        built:
          "Aplicativo com registro estruturado, histórico por paciente e apoio de IA na leitura e organização das informações.",
      },
    ],
  },
  stack: {
    kicker: "Tecnologia",
    title: "Com o que trabalhamos",
    intro:
      "Ferramentas maduras e amplamente documentadas — para que o sistema continue manutenível por outra equipe se um dia for preciso.",
    items: ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Power BI", "APIs REST"],
  },
  pricing: {
    kicker: "Investimento",
    title: "Como cobramos",
    intro:
      "Sem hora aberta e sem fatura surpresa. O valor sai do escopo, e o escopo sai do diagnóstico.",
    items: [
      {
        title: "Diagnóstico sem custo",
        body: "A conversa inicial e o levantamento do processo não são cobrados. Só há proposta depois de entender o problema.",
      },
      {
        title: "Valor fechado por projeto",
        body: "Preço definido antes de começar, junto com o prazo. Mudança de escopo é acordada por escrito, nunca cobrada por fora.",
      },
      {
        title: "Pagamento parcelado",
        body: "O pagamento acompanha as entregas do projeto, não o calendário.",
      },
      {
        title: "Faixa de investimento sob consulta",
        body: "Varia com o número de frentes e integrações. Dizemos a faixa já na primeira conversa, antes de qualquer documento.",
      },
    ],
  },
  faq: {
    kicker: "Dúvidas frequentes",
    title: "Antes de falar com a gente",
    items: [
      {
        q: "Quanto tempo leva um projeto?",
        a: "Depende do escopo, e você sabe o prazo antes de começar: ele entra na proposta junto com o valor. Entregamos em ciclos curtos, então as primeiras partes do sistema ficam utilizáveis bem antes do fim do projeto.",
      },
      {
        q: "Quem fica com o código?",
        a: "Você. O código é entregue documentado no seu repositório, e a infraestrutura fica em contas suas. Não há dependência contratual da luna&co para continuar usando ou evoluindo o sistema.",
      },
      {
        q: "Já tenho uma equipe de TI. Ainda faz sentido?",
        a: "Faz, e é comum. Normalmente a equipe interna sustenta o que já existe e não tem folga para construir o novo. Entramos na frente específica, entregamos e passamos o bastão — com o código no padrão que a sua equipe consegue manter.",
      },
      {
        q: "E depois da entrega?",
        a: "Há um período de acompanhamento incluído para ajustes e correções. Depois disso, evolução e suporte podem seguir como contrato separado ou ser assumidos pela sua equipe — a escolha é sua.",
      },
      {
        q: "Como sei que não vai virar um projeto sem fim?",
        a: "O escopo é fechado por escrito antes de começar, e o que fica de fora também está no documento. Mudança de escopo vira uma decisão explícita, com impacto de prazo e valor na mesa, em vez de aparecer na fatura.",
      },
      {
        q: "Vocês trabalham com quais tipos de empresa?",
        a: "Operações que já cresceram além da planilha e têm processo definido o bastante para virar sistema. Setor não é restrição; o que importa é haver um dono do processo disponível para trabalhar junto no diagnóstico.",
      },
    ],
  },
  cta: {
    title: "Tem um processo que já pede um sistema?",
    body: "Descreva o que trava a operação hoje. Respondemos em até um dia útil com os próximos passos.",
    copy: "Copiar e-mail",
    copied: "E-mail copiado",
    whatsapp: "Falar no WhatsApp",
    whatsappMessage: "Olá! Vim pelo site da luna&co e queria falar sobre um projeto.",
    form: {
      title: "Ou descreva aqui, em duas linhas",
      name: "Nome",
      company: "Empresa",
      email: "E-mail",
      message: "O que trava a operação hoje?",
      submit: "Enviar",
      sending: "Enviando…",
      ok: "Recebido. Respondemos em até um dia útil.",
      error: "Não foi possível enviar agora. Escreva para contact@lunaco.tech.",
    },
  },
  footer: {
    blurb:
      "Estúdio de engenharia de software. Sistemas internos, dados e automação para operações que cresceram além da planilha.",
    navTitle: "NAVEGAR",
    contactTitle: "CONTATO",
  },
  hud: ["Manifesto", "Serviços", "Trabalhos", "Processo", "Investimento", "Estúdio", "Dúvidas", "Contato"],
};

/** Formato do dicionário — derivado do PT, que é a referência. */
export type Dict = typeof pt;
