/** Dicionário ES. Segue o formato de `pt.ts`. */
import type { Lang } from "../langs";
import type { Dict } from "./pt";

export const es: Dict = {
  lang: "es" as Lang,
  htmlLang: "es",
  meta: {
    title: "luna&co — Sistemas a medida para operaciones",
    description:
      "Sistemas internos, datos y automatización para operaciones que crecieron más allá de la planilla. Alcance y plazo definidos, código en el repositorio del cliente.",
  },
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
    value: "Sistemas a medida para operaciones que ya superaron la planilla.",
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
    whatsapp: "Hablar por WhatsApp",
    whatsappMessage: "¡Hola! Vengo del sitio de luna&co y quería hablar sobre un proyecto.",
    form: {
      title: "O descríbalo aquí, en dos líneas",
      name: "Nombre",
      company: "Empresa",
      email: "Correo",
      message: "¿Qué traba la operación hoy?",
      submit: "Enviar",
      sending: "Enviando…",
      ok: "Recibido. Respondemos en hasta un día hábil.",
      error: "No se pudo enviar ahora. Escriba a contact@lunaco.tech.",
    },
  },
  footer: {
    blurb:
      "Estudio de ingeniería de software. Sistemas internos, datos y automatización para operaciones que crecieron más allá de la planilla.",
    navTitle: "NAVEGAR",
    contactTitle: "CONTACTO",
  },
  hud: ["Manifiesto", "Servicios", "Trabajos", "Proceso", "Inversión", "Estudio", "Preguntas", "Contacto"],
};
