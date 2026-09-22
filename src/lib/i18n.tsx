"use client";

/**
 * i18n do site — PT / EN / ES.
 *
 * Toda a copy vive neste dicionário; os componentes leem via `useT()`. A troca
 * é client-side (sem rota /en, /es) porque o site é uma landing de página
 * única em export estático: uma rota por idioma triplicaria o build para
 * ganhar pouco. O HTML pré-renderizado sai em PT — que é o idioma indexado.
 *
 * ponytail: se um dia houver blog ou páginas indexáveis por idioma, aí sim
 * migrar para `app/[lang]/` com generateStaticParams + hreflang.
 */
import { useEffect, useSyncExternalStore } from "react";

export const LANGS = ["pt", "en", "es"] as const;
export type Lang = (typeof LANGS)[number];

const STORAGE_KEY = "lunaco:lang";

/* ================================================================== */
/*  Dicionário                                                         */
/* ================================================================== */

const pt = {
  htmlLang: "pt-BR",
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

const en: Dict = {
  htmlLang: "en",
  nav: {
    links: [
      { href: "#servicos", label: "Services" },
      { href: "#processo", label: "Process" },
      { href: "#sobre", label: "Studio" },
      { href: "#contato", label: "Contact" },
    ],
    cta: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Navigation menu",
    main: "Main",
    home: "luna&co — home",
    skip: "Skip to content",
    language: "Language",
  },
  hero: {
    railLeft: "luna&co — software studio",
    railRight: "custom-built systems",
    tagline: "Building Digital Systems",
    scroll: "Scroll",
  },
  statement: {
    kicker: "What we do",
    lead1: "Custom software for",
    leadAccent: "what your operation",
    lead2: "still does by hand.",
    body: "Shared spreadsheets, rework and data scattered across systems are expensive, and none of it shows up on the balance sheet. We design and build the system that puts that process in order — fixed scope, defined deadline, and the code in your own repository.",
    cta: "Talk about your project",
  },
  marquee: [
    "INTERNAL SYSTEMS",
    "INTEGRATIONS",
    "DATA AND BI",
    "PROCESS AUTOMATION",
    "APPLIED AI",
    "WEB APPLICATIONS",
    "PORTALS AND INTRANETS",
  ],
  services: {
    kicker: "Services",
    title: "What we build",
    intro:
      "Most projects combine more than one of these. Scope is defined during the assessment, before any proposal.",
    items: [
      {
        title: "Internal systems",
        body: "The system your team uses every day: records, approvals, tracking and history. It replaces the shared spreadsheet and the side controls nobody talks about.",
        tags: "Web · Database · Access control",
      },
      {
        title: "Data and BI",
        body: "Your sources consolidated in one place, with dashboards that answer management's questions without someone assembling the report by hand.",
        tags: "ETL · Dashboards · Metrics",
      },
      {
        title: "Automation and integrations",
        body: "Manual, repetitive routines become automated processes. Integration between ERP, spreadsheets, email and external services over APIs.",
        tags: "APIs · Routines · ERP",
      },
      {
        title: "Applied AI",
        body: "Document reading, classification and decision support where the time saved is real — with evaluation criteria agreed before anything reaches production.",
        tags: "Documents · Classification · Evaluation",
      },
    ],
  },
  process: {
    kicker: "How we work",
    title: "From the problem to a system in production",
    steps: [
      {
        title: "Assessment",
        body: "We map the process as it actually works today, with the people who run it. No cost, no commitment.",
      },
      {
        title: "Scope and proposal",
        body: "A document with fixed scope, timeline and price. What is out of scope is written down too.",
      },
      {
        title: "Build",
        body: "Delivered in short cycles and reviewed with you. No black box until the end of the project.",
      },
      {
        title: "Handover and evolution",
        body: "System in production, team trained, and documented code in your repository.",
      },
    ],
  },
  about: {
    kicker: "The studio",
    title1: "A few projects at a time,",
    title2: "each one closely run.",
    body: "luna&co is a software engineering studio. We work directly with the people who decide, with no layer in between: whoever maps the problem is who writes the code and delivers the working system.",
    pillars: [
      { name: "Product", role: "Assessment and scope" },
      { name: "Engineering", role: "Build and delivery" },
      { name: "Data", role: "Integration and metrics" },
    ],
    stats: [
      "Dedicated team per project",
      "Code handed to the client",
      "Fixed scope and price",
      "Support after delivery",
    ],
  },
  cases: {
    kicker: "Work",
    title: "What we have built",
    intro:
      "We describe projects by sector and scope. Client names appear only with permission.",
    challengeLabel: "Challenge",
    builtLabel: "What we built",
    items: [
      {
        sector: "Investment fund",
        title: "Internal credit platform",
        challenge:
          "Credit analysis and portfolio monitoring spread across spreadsheets, manual reports and parallel routines.",
        built:
          "A single system: consolidated sources, per-company analysis, monitoring with alerts, dashboards and automation of the repetitive routines.",
      },
      {
        sector: "Healthcare",
        title: "Care application with AI support",
        challenge:
          "Patient follow-up depending on manual records and communication scattered among caregivers.",
        built:
          "An application with structured records, per-patient history and AI support for reading and organising the information.",
      },
    ],
  },
  stack: {
    kicker: "Technology",
    title: "What we work with",
    intro:
      "Mature, well-documented tools — so the system stays maintainable by another team if it ever needs to be.",
    items: ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Power BI", "REST APIs"],
  },
  pricing: {
    kicker: "Investment",
    title: "How we charge",
    intro:
      "No open-ended hours, no surprise invoice. The price comes from the scope, and the scope comes from the assessment.",
    items: [
      {
        title: "Assessment at no cost",
        body: "The first conversation and the process mapping are not billed. A proposal only follows once we understand the problem.",
      },
      {
        title: "Fixed price per project",
        body: "Price agreed before we start, together with the timeline. Scope changes are agreed in writing, never billed on the side.",
      },
      {
        title: "Payment in stages",
        body: "Payment follows the project's deliveries, not the calendar.",
      },
      {
        title: "Investment range on request",
        body: "It varies with the number of fronts and integrations. We give you the range in the first conversation, before any document.",
      },
    ],
  },
  faq: {
    kicker: "Frequently asked",
    title: "Before you get in touch",
    items: [
      {
        q: "How long does a project take?",
        a: "It depends on scope, and you know the timeline before we start: it goes into the proposal alongside the price. We deliver in short cycles, so the first parts of the system are usable well before the project ends.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The code is delivered documented in your repository, and the infrastructure runs in your own accounts. Nothing contractually ties you to luna&co to keep using or extending the system.",
      },
      {
        q: "We already have an IT team. Does this still make sense?",
        a: "It does, and it is common. The internal team usually keeps what already exists running and has no slack to build the new thing. We take that specific front, deliver it and hand it over — with code in a standard your team can maintain.",
      },
      {
        q: "What happens after delivery?",
        a: "A follow-up period for adjustments and fixes is included. After that, support and further work can continue as a separate contract or be taken over by your team — your call.",
      },
      {
        q: "How do I know it won't become a never-ending project?",
        a: "Scope is fixed in writing before we start, and what is out of scope is in the document too. A scope change becomes an explicit decision, with its impact on time and price on the table, instead of showing up on the invoice.",
      },
      {
        q: "What kind of companies do you work with?",
        a: "Operations that have outgrown the spreadsheet and have a process defined enough to become a system. Sector is not a restriction; what matters is having a process owner available to work with us during the assessment.",
      },
    ],
  },
  cta: {
    title: "Is a process of yours already asking for a system?",
    body: "Tell us what slows the operation down today. We reply within one business day with the next steps.",
    copy: "Copy email",
    copied: "Email copied",
  },
  footer: {
    blurb:
      "Software engineering studio. Internal systems, data and automation for operations that outgrew the spreadsheet.",
    navTitle: "NAVIGATE",
    contactTitle: "CONTACT",
  },
  hud: ["Manifesto", "Services", "Work", "Process", "Investment", "Studio", "FAQ", "Contact"],
};

const es: Dict = {
  htmlLang: "es",
  nav: {
    links: [
      { href: "#servicos", label: "Servicios" },
      { href: "#processo", label: "Proceso" },
      { href: "#sobre", label: "Estudio" },
      { href: "#contato", label: "Contacto" },
    ],
    cta: "Hablemos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    menu: "Menú de navegación",
    main: "Principal",
    home: "luna&co — inicio",
    skip: "Saltar al contenido",
    language: "Idioma",
  },
  hero: {
    railLeft: "luna&co — estudio de software",
    railRight: "sistemas a medida",
    tagline: "Building Digital Systems",
    scroll: "Desplazar",
  },
  statement: {
    kicker: "Qué hacemos",
    lead1: "Software a medida para",
    leadAccent: "lo que su operación",
    lead2: "aún hace a mano.",
    body: "La planilla compartida, el retrabajo y la información dispersa entre sistemas cuestan caro y no aparecen en el balance. Diseñamos y construimos el sistema que ordena ese proceso — con alcance cerrado, plazo definido y el código en el repositorio del cliente.",
    cta: "Conversar sobre su proyecto",
  },
  marquee: [
    "SISTEMAS INTERNOS",
    "INTEGRACIONES",
    "DATOS Y BI",
    "AUTOMATIZACIÓN DE PROCESOS",
    "IA APLICADA",
    "APLICACIONES WEB",
    "PORTALES E INTRANETS",
  ],
  services: {
    kicker: "Servicios",
    title: "Líneas de trabajo",
    intro:
      "La mayoría de los proyectos combina más de una línea. El alcance se define en el diagnóstico, antes de la propuesta.",
    items: [
      {
        title: "Sistemas internos",
        body: "El sistema que la operación usa todos los días: registro, aprobación, seguimiento e historial. Sustituye la planilla compartida y el control paralelo.",
        tags: "Web · Base de datos · Control de acceso",
      },
      {
        title: "Datos y BI",
        body: "Consolidación de las bases en un solo lugar y paneles que responden las preguntas de la dirección sin depender de que alguien arme el informe a mano.",
        tags: "ETL · Paneles · Indicadores",
      },
      {
        title: "Automatización e integraciones",
        body: "Las rutinas manuales y repetitivas se vuelven proceso automático. Integración entre ERP, planillas, correo y servicios externos por API.",
        tags: "APIs · Rutinas · ERP",
      },
      {
        title: "IA aplicada",
        body: "Lectura de documentos, clasificación y apoyo a la decisión donde hay una ganancia real de tiempo — con criterios de evaluación definidos antes de entrar en producción.",
        tags: "Documentos · Clasificación · Evaluación",
      },
    ],
  },
  process: {
    kicker: "Cómo trabajamos",
    title: "Del problema al sistema en producción",
    steps: [
      {
        title: "Diagnóstico",
        body: "Entendemos el proceso tal como funciona hoy, junto a quienes lo ejecutan. Sin costo y sin compromiso.",
      },
      {
        title: "Alcance y propuesta",
        body: "Documento con alcance, plazo y valor cerrados. Lo que queda fuera también está escrito.",
      },
      {
        title: "Construcción",
        body: "Entregas en ciclos cortos, revisadas con el cliente. Nada de caja negra hasta el final del proyecto.",
      },
      {
        title: "Entrega y evolución",
        body: "Sistema en producción, equipo capacitado y código documentado en el repositorio del cliente.",
      },
    ],
  },
  about: {
    kicker: "El estudio",
    title1: "Pocos proyectos a la vez,",
    title2: "acompañados de cerca.",
    body: "luna&co es un estudio de ingeniería de software. Trabajamos directamente con quien decide, sin capas intermedias: quien releva el problema es quien escribe el código y entrega el sistema funcionando.",
    pillars: [
      { name: "Producto", role: "Diagnóstico y alcance" },
      { name: "Ingeniería", role: "Construcción y entrega" },
      { name: "Datos", role: "Integración e indicadores" },
    ],
    stats: [
      "Equipo dedicado por proyecto",
      "Código entregado al cliente",
      "Alcance y valor cerrados",
      "Soporte después de la entrega",
    ],
  },
  cases: {
    kicker: "Trabajos",
    title: "Lo que ya construimos",
    intro:
      "Describimos los proyectos por sector y alcance. Los nombres de clientes solo aparecen con autorización.",
    challengeLabel: "Desafío",
    builtLabel: "Lo que construimos",
    items: [
      {
        sector: "Fondo de inversión",
        title: "Plataforma interna de crédito",
        challenge:
          "Análisis de crédito y seguimiento de cartera repartidos entre planillas, informes manuales y rutinas paralelas.",
        built:
          "Un único sistema: consolidación de las bases, análisis por empresa, monitoreo con alertas, paneles de indicadores y automatización de las rutinas repetitivas.",
      },
      {
        sector: "Salud",
        title: "Aplicación de cuidado con apoyo de IA",
        challenge:
          "Seguimiento de pacientes dependiente del registro manual y de una comunicación dispersa entre quienes cuidan.",
        built:
          "Aplicación con registro estructurado, historial por paciente y apoyo de IA en la lectura y organización de la información.",
      },
    ],
  },
  stack: {
    kicker: "Tecnología",
    title: "Con qué trabajamos",
    intro:
      "Herramientas maduras y bien documentadas — para que el sistema siga siendo mantenible por otro equipo si algún día hace falta.",
    items: ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Power BI", "APIs REST"],
  },
  pricing: {
    kicker: "Inversión",
    title: "Cómo cobramos",
    intro:
      "Sin hora abierta y sin factura sorpresa. El valor sale del alcance, y el alcance sale del diagnóstico.",
    items: [
      {
        title: "Diagnóstico sin costo",
        body: "La conversación inicial y el relevamiento del proceso no se cobran. Solo hay propuesta después de entender el problema.",
      },
      {
        title: "Valor cerrado por proyecto",
        body: "Precio definido antes de empezar, junto con el plazo. Los cambios de alcance se acuerdan por escrito, nunca se cobran por fuera.",
      },
      {
        title: "Pago por etapas",
        body: "El pago acompaña las entregas del proyecto, no el calendario.",
      },
      {
        title: "Rango de inversión a consultar",
        body: "Varía según la cantidad de líneas de trabajo e integraciones. Le decimos el rango en la primera conversación, antes de cualquier documento.",
      },
    ],
  },
  faq: {
    kicker: "Preguntas frecuentes",
    title: "Antes de hablar con nosotros",
    items: [
      {
        q: "¿Cuánto tarda un proyecto?",
        a: "Depende del alcance, y usted conoce el plazo antes de empezar: entra en la propuesta junto con el valor. Entregamos en ciclos cortos, así que las primeras partes del sistema quedan utilizables bastante antes del final del proyecto.",
      },
      {
        q: "¿De quién es el código?",
        a: "Suyo. El código se entrega documentado en su repositorio y la infraestructura queda en cuentas suyas. No hay dependencia contractual de luna&co para seguir usando o evolucionando el sistema.",
      },
      {
        q: "Ya tengo un equipo de TI. ¿Igual tiene sentido?",
        a: "Sí, y es habitual. El equipo interno suele sostener lo que ya existe y no tiene margen para construir lo nuevo. Tomamos esa línea específica, la entregamos y pasamos el testigo — con código en un estándar que su equipo pueda mantener.",
      },
      {
        q: "¿Y después de la entrega?",
        a: "Hay un período de acompañamiento incluido para ajustes y correcciones. Después de eso, el soporte y la evolución pueden seguir como contrato aparte o quedar a cargo de su equipo — usted decide.",
      },
      {
        q: "¿Cómo sé que no se va a volver un proyecto sin fin?",
        a: "El alcance se cierra por escrito antes de empezar, y lo que queda fuera también está en el documento. Un cambio de alcance se vuelve una decisión explícita, con su impacto en plazo y valor sobre la mesa, en vez de aparecer en la factura.",
      },
      {
        q: "¿Con qué tipo de empresas trabajan?",
        a: "Operaciones que ya crecieron más allá de la planilla y tienen un proceso lo bastante definido como para volverse sistema. El sector no es una restricción; lo que importa es que haya un responsable del proceso disponible para trabajar junto en el diagnóstico.",
      },
    ],
  },
  cta: {
    title: "¿Tiene un proceso que ya pide un sistema?",
    body: "Cuéntenos qué traba la operación hoy. Respondemos en hasta un día hábil con los próximos pasos.",
    copy: "Copiar correo",
    copied: "Correo copiado",
  },
  footer: {
    blurb:
      "Estudio de ingeniería de software. Sistemas internos, datos y automatización para operaciones que crecieron más allá de la planilla.",
    navTitle: "NAVEGAR",
    contactTitle: "CONTACTO",
  },
  hud: ["Manifiesto", "Servicios", "Trabajos", "Proceso", "Inversión", "Estudio", "Preguntas", "Contacto"],
};

const DICTS: Record<Lang, Dict> = { pt, en, es };

/* ================================================================== */
/*  Store do idioma                                                    */
/* ================================================================== */

/**
 * Store externo em vez de estado + efeito: `useSyncExternalStore` devolve "pt"
 * no snapshot de servidor (batendo com o HTML pré-renderizado) e a preferência
 * real no cliente, sem setState dentro de efeito e sem mismatch de hidratação.
 */
let current: Lang | null = null;
const listeners = new Set<() => void>();

/** Preferência salva > idioma do navegador > pt. Lido uma vez, no cliente. */
function detect(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang;
  } catch {
    // localStorage bloqueado (aba privada, cookies off): cai no navegador.
  }
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  return nav === "en" || nav === "es" ? nav : "pt";
}

function getSnapshot(): Lang {
  if (current === null) current = detect();
  return current;
}

/** No servidor/prerender o site sai em PT — o idioma indexado. */
function getServerSnapshot(): Lang {
  return "pt";
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function setLang(l: Lang) {
  current = l;
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {
    // Sem persistência: a troca vale só para esta sessão.
  }
  listeners.forEach((fn) => fn());
}

/** Idioma atual + trocador. */
export function useLang() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // `lang` do <html> acompanha o idioma — leitores de tela usam a pronúncia certa.
  useEffect(() => {
    document.documentElement.lang = DICTS[lang].htmlLang;
  }, [lang]);
  return { lang, setLang };
}

/** Dicionário do idioma atual. */
export function useT(): Dict {
  return DICTS[useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)];
}

/**
 * Mantido como componente para o layout continuar declarando o escopo do
 * idioma; o estado vive no store acima, então aqui basta repassar os filhos.
 */
export function LangProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
