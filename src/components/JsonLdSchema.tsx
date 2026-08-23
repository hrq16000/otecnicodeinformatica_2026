import { useMemo } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SCHEMA_SLOTS, SLOT_PRIORITY, useJsonLdSlot } from '@/lib/jsonLdSlots';
import { buildHomeFaqSchema } from '@/lib/homeFaq';
import { buildLocalBusinessSchema } from '@/lib/localBusinessJsonLd';
import { buildOrganizationSchema } from '@/lib/organizationJsonLd';
import { SITE_BASE_URL } from "@/lib/siteConfig";

const SITE = SITE_BASE_URL;
const BUILD_DATE = new Date().toISOString();

export const JsonLdSchema = () => {
  const { location } = useRouterState();
  const isHome = (location.pathname ?? "").replace(/\/+$/, "") === "";

  const localBusinessSchema = useMemo(() => ({
    ...buildLocalBusinessSchema({
      path: "/",
      description:
        "Técnico de informática em Curitiba e região metropolitana. Formatação, conserto de computadores e notebooks, remoção de vírus, upgrade SSD, redes. Diagnóstico honesto antes de informar o valor.",
    }),
    slogan: "Assistência Técnica em Informática em Curitiba",
    knowsAbout: [
      "Manutenção de computadores", "Conserto de notebooks", "Formatação Windows",
      "Remoção de vírus", "Upgrade de hardware", "Configuração de redes",
      "Suporte técnico em informática", "Instalação de câmeras CFTV",
      "Conserto de impressoras", "Assistência de eletrodomésticos inteligentes"
    ],
    hasMap: "https://www.google.com/maps/search/?api=1&query=T%C3%A9cnico+em+Curitiba",
  }), []);

  // Paridade obrigatória com o bloco visível da home (HomeFaqSsr):
  // mesma fonte de dados, mesmo texto, ambos no HTML servido.
  const faqSchema = useMemo(() => buildHomeFaqSchema(), []);

  const websiteSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    "name": "O Técnico de Informática",
    "url": SITE,
    "inLanguage": "pt-BR",
    "publisher": { "@id": `${SITE}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE}/servicos?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }), []);

  const organizationSchema = useMemo(() => buildOrganizationSchema(), []);

  const webPageSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE}/#webpage-home`,
    "url": SITE,
    "name": "Técnico de Informática em Curitiba — Atendimento conforme a agenda",
    "isPartOf": { "@id": `${SITE}/#website` },
    "about": { "@id": `${SITE}/#organization` },
    "inLanguage": "pt-BR",
    "dateModified": BUILD_DATE,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".tldr", "[data-speakable]"]
    }
  }), []);

  const serviceItemListSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE}/#services-list`,
    "name": "Serviços de informática em Curitiba",
    "itemListOrder": "https://schema.org/ItemListUnordered",
    "numberOfItems": 8,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Formatação de Computador", "url": `${SITE}/servicos/formatacao-computador` },
      { "@type": "ListItem", "position": 2, "name": "Conserto de Notebook", "url": `${SITE}/servicos/conserto-notebook-curitiba` },
      { "@type": "ListItem", "position": 3, "name": "Remoção de Vírus", "url": `${SITE}/servicos/remocao-virus` },
      { "@type": "ListItem", "position": 4, "name": "Upgrade SSD e Memória", "url": `${SITE}/servicos/upgrade-ssd-memoria` },
      { "@type": "ListItem", "position": 5, "name": "Redes Wi-Fi", "url": `${SITE}/servicos/redes-wifi` },
      { "@type": "ListItem", "position": 6, "name": "Backup e Recuperação", "url": `${SITE}/servicos/backup-recuperacao` },
      { "@type": "ListItem", "position": 7, "name": "Conserto de Impressora", "url": `${SITE}/conserto-impressora-curitiba` },
      { "@type": "ListItem", "position": 8, "name": "Eletrodomésticos Inteligentes", "url": `${SITE}/assistencia-eletrodomesticos-inteligentes-curitiba` }
    ]
  }), []);

  const navigationSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "SiteNavigationElement", "position": 1, "name": "Serviços", "url": `${SITE}/servicos` },
      { "@type": "SiteNavigationElement", "position": 2, "name": "Como Funciona", "url": `${SITE}/como-funciona` },
      { "@type": "SiteNavigationElement", "position": 3, "name": "Valores", "url": `${SITE}/valores` },
      { "@type": "SiteNavigationElement", "position": 4, "name": "Contato", "url": `${SITE}/contato` },
      { "@type": "SiteNavigationElement", "position": 5, "name": "Blog", "url": `${SITE}/blog` },
      { "@type": "SiteNavigationElement", "position": 6, "name": "FAQ", "url": `${SITE}/faq` }
    ]
  }), []);

  // Entidades institucionais globais — um slot cada, cedidos a schemas de rota.
  useJsonLdSlot(SCHEMA_SLOTS.localBusiness, localBusinessSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.faq, faqSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.website, websiteSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.organization, organizationSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.itemListServices, serviceItemListSchema, SLOT_PRIORITY.global);
  useJsonLdSlot(SCHEMA_SLOTS.siteNavigation, navigationSchema, SLOT_PRIORITY.global);
  // WebPage é ancorado na home (#webpage-home): só vale na própria home.
  useJsonLdSlot(SCHEMA_SLOTS.webPage, isHome ? webPageSchema : null, SLOT_PRIORITY.global);

  return null;
};

export default JsonLdSchema;
