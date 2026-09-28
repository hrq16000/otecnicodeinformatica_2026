import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface GeoFAQ {
  question: string;
  answer: string;
}

// FAQs específicas por bairro - NÃO genéricas
export const bairroFAQs: Record<string, GeoFAQ[]> = {
  // Curitiba - Centro
  "centro": [
    {
      question: "Como funciona o atendimento no Centro de Curitiba?",
      answer: "O atendimento começa por triagem no WhatsApp. Depois de entender o problema e o endereço, definimos se o caso pode ser remoto, presencial ou precisa de bancada, conforme a agenda disponível."
    },
    {
      question: "Como é organizada a visita no Centro?",
      answer: "Confirmamos o endereço, o tipo de prédio e as condições de acesso antes da visita. Quando o caso pode ser resolvido remotamente ou por coleta, essa alternativa é informada na triagem."
    },
    {
      question: "Atendem empresas e escritórios no Centro?",
      answer: "Sim. O suporte pode atender computadores, rede e periféricos de empresas e escritórios no Centro, conforme o escopo do chamado. Atendimento recorrente é avaliado separadamente."
    },
    {
      question: "Vocês informam horário de chegada ao Centro?",
      answer: "O horário é combinado depois da triagem e da confirmação do endereço. Não prometemos tempo fixo de chegada antes de avaliar agenda, trânsito e modalidade do atendimento."
    }
  ],

  // Curitiba - Batel
  "batel": [
    {
      question: "Quanto custa formatação de notebook no Batel?",
      answer: "A formatação de notebook no Batel parte de R$ 99,99. O valor final depende da complexidade: backup de dados, instalação de programas específicos, etc. atendimento sem compromisso."
    },
    {
      question: "Atendem residências e apartamentos no Batel?",
      answer: "Sim! Atendemos tanto residências quanto escritórios no Batel. Para prédios, basta liberar a entrada na portaria. Técnico identificado e com todos os equipamentos."
    },
    {
      question: "Fazem suporte para home office no Batel?",
      answer: "Sim. Podemos configurar estação de home office, incluindo VPN, impressora, scanner, backup e ajustes de desempenho, conforme a necessidade e compatibilidade dos equipamentos."
    },
    {
      question: "Consertam MacBook e notebooks Apple no Batel?",
      answer: "Trabalhamos principalmente com Windows, mas realizamos diagnósticos em MacBooks. Para reparos específicos de hardware Apple, podemos indicar parceiros especializados."
    }
  ],

  // Curitiba - Portão
  "portao": [
    {
      question: "Há atendimento aos fins de semana no Portão?",
      answer: "A disponibilidade varia conforme a agenda. A confirmação de data e horário é feita no WhatsApp depois da triagem do problema."
    },
    {
      question: "Fazem upgrade de SSD no Portão?",
      answer: "Sim. O upgrade de HD para SSD pode ser indicado quando o diagnóstico confirma gargalo de armazenamento. A capacidade e a possibilidade de migração são avaliadas antes da execução."
    },
    {
      question: "Quanto tempo leva um atendimento de vírus no Portão?",
      answer: "O prazo depende do tipo de infecção, do estado do sistema e da necessidade de backup. Casos mais complexos podem exigir coleta ou bancada, e isso é informado após o diagnóstico."
    }
  ],

  // Curitiba - CIC
  "cic": [
    {
      question: "Vocês atendem empresas na CIC?",
      answer: "Sim. A CIC (Cidade Industrial de Curitiba) está na área de atendimento. O suporte é pontual, por chamado, com escopo e valor informados antes de começar; manutenção recorrente é avaliada caso a caso."
    },
    {
      question: "Fazem manutenção em computadores industriais na CIC?",
      answer: "Trabalhamos principalmente com computadores e notebooks comerciais. Para equipamentos industriais específicos, podemos fazer diagnóstico inicial e indicar a solução adequada."
    },
    {
      question: "Como é definido o valor de atendimento na CIC?",
      answer: "O diagnóstico parte de R$ 99,99 quando aplicável. O valor final depende do equipamento, da complexidade, da modalidade de atendimento e de eventuais peças, sempre informado antes da execução."
    }
  ],

  // Curitiba - Santa Felicidade
  "santa-felicidade": [
    {
      question: "Atendem comércios em Santa Felicidade?",
      answer: "Sim, o suporte pode atender computadores, rede e periféricos de pequenos comércios, conforme o escopo do chamado. Sistemas fiscais ou integrações específicas são avaliados antes de qualquer alteração."
    },
    {
      question: "Fazem instalação de câmeras de segurança em Santa Felicidade?",
      answer: "Fazemos a configuração de sistemas de câmeras IP e DVR/NVR. Para instalação física das câmeras, trabalhamos em parceria com profissionais especializados."
    },
    {
      question: "Como é definido o horário em Santa Felicidade?",
      answer: "O horário é confirmado depois da triagem e do endereço. A disponibilidade depende da agenda, do trânsito e de a falha exigir visita, suporte remoto ou bancada."
    }
  ],

  // São José dos Pinhais
  "afonso-pena": [
    {
      question: "Atendem a região do Afonso Pena em São José dos Pinhais?",
      answer: "Sim. O Afonso Pena está na área atendida. A modalidade e o horário são definidos após a triagem do equipamento e a confirmação do endereço."
    },
    {
      question: "Vocês informam tempo de chegada ao Afonso Pena?",
      answer: "Não usamos um tempo fixo antes da triagem. O horário é combinado conforme o endereço, a agenda e o tipo de atendimento necessário."
    },
    {
      question: "Fazem suporte para empresas de transporte no Afonso Pena?",
      answer: "Podemos prestar suporte a computadores, rede e backup de empresas da região. Sistemas específicos de rastreamento ou integrações de terceiros são avaliados antes de qualquer alteração."
    }
  ],

  // Araucária
  "centro-araucaria": [
    {
      question: "Vocês atendem em Araucária mesmo?",
      answer: "Sim. Araucária faz parte da área de atendimento. A modalidade, o horário e o escopo são confirmados após a triagem do problema e do endereço."
    },
    {
      question: "Como é definido o valor do atendimento em Araucária?",
      answer: "O diagnóstico parte de R$ 99,99 quando aplicável. O valor final depende do equipamento, da complexidade, da modalidade e de eventuais peças, sempre aprovado antes da execução."
    },
    {
      question: "Atendem indústrias em Araucária?",
      answer: "Sim. Araucária está na área de atendimento, incluindo escritórios administrativos de indústrias. O atendimento é por chamado, conforme a disponibilidade da agenda."
    }
  ],

  // Campo Largo
  "centro-campo-largo": [
    {
      question: "Vocês vão até Campo Largo?",
      answer: "Sim! Campo Largo está na nossa área de atendimento. Atendemos residências e empresas em toda a cidade, especialmente na região central."
    },
    {
      question: "Como é definido o horário em Campo Largo?",
      answer: "A agenda é confirmada depois da triagem e do endereço. Não prometemos tempo fixo de chegada antes de avaliar deslocamento e modalidade necessária."
    },
    {
      question: "Fazem reparo de notebook em Campo Largo?",
      answer: "Sim! Fazemos diagnóstico e reparo de notebooks em Campo Largo. Caso precise de peças específicas, podemos coletar o equipamento e devolver após o serviço."
    }
  ],

  // Pinhais
  "centro-pinhais": [
    {
      question: "Como funciona a disponibilidade em Pinhais?",
      answer: "A disponibilidade é confirmada depois da triagem do problema e do endereço. Quando o caso pode começar remotamente, essa opção também é informada."
    },
    {
      question: "Vocês prometem tempo fixo de chegada em Pinhais?",
      answer: "Não. O horário é combinado conforme agenda, endereço, trânsito e modalidade do atendimento, evitando promessas antes de entender o caso."
    },
    {
      question: "Fazem formatação em Pinhais?",
      answer: "Sim. A formatação pode ser realizada quando o diagnóstico indicar necessidade. Antes da reinstalação, confirmamos backup, compatibilidade de drivers e o escopo dos programas a instalar."
    }
  ]
};

interface GeoSpecificFAQsProps {
  bairroSlug: string;
  bairroNome: string;
  cidadeNome: string;
}

export const GeoSpecificFAQs = ({ bairroSlug, bairroNome, cidadeNome }: GeoSpecificFAQsProps) => {
  const faqs = bairroFAQs[bairroSlug] || [];
  
  if (faqs.length === 0) return null;

  // Schema FAQPage para SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-12 md:py-16 bg-secondary">
      {/* Schema FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            Perguntas Frequentes - {bairroNome}, {cidadeNome}
          </h2>
          
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background rounded-lg border-none"
              >
                <AccordionTrigger className="px-5 py-4 text-left font-semibold text-foreground hover:text-accent hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default GeoSpecificFAQs;
