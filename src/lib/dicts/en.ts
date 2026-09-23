/** Dicionário EN. Segue o formato de `pt.ts`. */
import type { Lang } from "../langs";
import type { Dict } from "./pt";

export const en: Dict = {
  lang: "en" as Lang,
  htmlLang: "en",
  ogLocale: "en_US",
  meta: {
    title: "luna&co — Custom systems for operations",
    description:
      "Internal systems, data and automation for operations that outgrew the spreadsheet. Defined scope and timeline, code in the client's repository.",
  },
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
    value: "Custom systems for operations that have outgrown spreadsheets.",
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
    whatsapp: "Chat on WhatsApp",
    whatsappMessage: "Hi! I came from the luna&co site and would like to talk about a project.",
    form: {
      title: "Or describe it here, in two lines",
      name: "Name",
      company: "Company",
      email: "Email",
      message: "What slows the operation down today?",
      submit: "Send",
      sending: "Sending…",
      ok: "Received. We reply within one business day.",
      error: "Could not send right now. Please write to contact@lunaco.tech.",
    },
  },
  footer: {
    blurb:
      "Software engineering studio. Internal systems, data and automation for operations that outgrew the spreadsheet.",
    navTitle: "NAVIGATE",
    contactTitle: "CONTACT",
  },
  hud: ["Manifesto", "Services", "Work", "Process", "Investment", "Studio", "FAQ", "Contact"],
};
