import { MapPin, MessageCircle } from "lucide-react";
import { Link } from "@/lib/router-compat";

// Indicações informadas para consulta — não constituem prova de técnico aprovado,
// disponibilidade imediata, escritório físico ou cobertura operacional em cada cidade.
const CAPITAIS: ReadonlyArray<readonly [string, string]> = [
  [
    "AC",
    "Rio Branco"
  ],
  [
    "AL",
    "Maceió"
  ],
  [
    "AP",
    "Macapá"
  ],
  [
    "AM",
    "Manaus"
  ],
  [
    "BA",
    "Salvador"
  ],
  [
    "CE",
    "Fortaleza"
  ],
  [
    "DF",
    "Brasília"
  ],
  [
    "ES",
    "Vitória"
  ],
  [
    "GO",
    "Goiânia"
  ],
  [
    "MA",
    "São Luís"
  ],
  [
    "MT",
    "Cuiabá"
  ],
  [
    "MS",
    "Campo Grande"
  ],
  [
    "MG",
    "Belo Horizonte"
  ],
  [
    "PA",
    "Belém"
  ],
  [
    "PB",
    "João Pessoa"
  ],
  [
    "PR",
    "Curitiba"
  ],
  [
    "PE",
    "Recife"
  ],
  [
    "PI",
    "Teresina"
  ],
  [
    "RJ",
    "Rio de Janeiro"
  ],
  [
    "RN",
    "Natal"
  ],
  [
    "RS",
    "Porto Alegre"
  ],
  [
    "RO",
    "Porto Velho"
  ],
  [
    "RR",
    "Boa Vista"
  ],
  [
    "SC",
    "Florianópolis"
  ],
  [
    "SP",
    "São Paulo"
  ],
  [
    "SE",
    "Aracaju"
  ],
  [
    "TO",
    "Palmas"
  ]
];

const CIDADES_INDICADAS: ReadonlyArray<{
  uf: string;
  cidades: ReadonlyArray<string>;
}> = [
  {
    "uf": "AC",
    "cidades": [
      "Rio Branco"
    ]
  },
  {
    "uf": "AL",
    "cidades": [
      "Coruripe"
    ]
  },
  {
    "uf": "AM",
    "cidades": [
      "Itacoatiara"
    ]
  },
  {
    "uf": "BA",
    "cidades": [
      "Bom Jesus da Lapa",
      "Tucano",
      "Poções",
      "Conceição do Coité",
      "Jequié",
      "Santo Antônio de Jesus",
      "Valença",
      "Cruz das Almas"
    ]
  },
  {
    "uf": "CE",
    "cidades": [
      "Aracati",
      "Tianguá",
      "Maracanaú"
    ]
  },
  {
    "uf": "ES",
    "cidades": [
      "Nova Venécia",
      "Colatina",
      "São Mateus"
    ]
  },
  {
    "uf": "GO",
    "cidades": [
      "Rio Verde",
      "Mineiros"
    ]
  },
  {
    "uf": "MA",
    "cidades": [
      "Barreirinhas",
      "Imperatriz"
    ]
  },
  {
    "uf": "MG",
    "cidades": [
      "Juiz de Fora",
      "Poços de Caldas",
      "Muriaé",
      "Três Corações",
      "Além Paraíba",
      "Salinas",
      "Visconde do Rio Branco"
    ]
  },
  {
    "uf": "MS",
    "cidades": [
      "Dourados",
      "Sidrolândia",
      "Naviraí"
    ]
  },
  {
    "uf": "MT",
    "cidades": [
      "Cuiabá"
    ]
  },
  {
    "uf": "PA",
    "cidades": [
      "Abaetetuba",
      "Paragominas",
      "Santarém",
      "Cametá",
      "Barcarena",
      "Altamira",
      "Bragança"
    ]
  },
  {
    "uf": "PB",
    "cidades": [
      "Campina Grande"
    ]
  },
  {
    "uf": "PE",
    "cidades": [
      "Araripina",
      "Salgueiro"
    ]
  },
  {
    "uf": "PI",
    "cidades": [
      "Campo Maior",
      "Altos"
    ]
  },
  {
    "uf": "PR",
    "cidades": [
      "Medianeira",
      "Londrina",
      "Cascavel",
      "Paranaguá",
      "Arapongas",
      "Cambé",
      "Francisco Beltrão",
      "Marechal Cândido Rondon"
    ]
  },
  {
    "uf": "RJ",
    "cidades": [
      "Magé",
      "Resende",
      "Saquarema",
      "Três Rios",
      "Barra do Piraí",
      "Seropédica",
      "Campos dos Goytacazes",
      "Mangaratiba",
      "Volta Redonda",
      "Macaé"
    ]
  },
  {
    "uf": "RO",
    "cidades": [
      "Porto Velho",
      "Vilhena"
    ]
  },
  {
    "uf": "RR",
    "cidades": [
      "Boa Vista"
    ]
  },
  {
    "uf": "RS",
    "cidades": [
      "Gravataí",
      "Santa Maria",
      "Rio Grande",
      "Santa Cruz do Sul",
      "Tramandaí",
      "Pelotas",
      "Vacaria"
    ]
  },
  {
    "uf": "SC",
    "cidades": [
      "Tubarão",
      "Canoinhas"
    ]
  },
  {
    "uf": "SP",
    "cidades": [
      "Presidente Venceslau",
      "Nova Odessa",
      "São Manuel",
      "Lins",
      "Andradina"
    ]
  }
];

type Props = {
  onSolicitar: (origem: string, mensagem: string) => void;
};

/**
 * Conteúdo informativo nacional na página de cobertura existente.
 * Evita dezenas de páginas locais sem prova individual de operação,
 * preserva a prioridade editorial de Curitiba e reutiliza o funil do site.
 */
export function CoberturaNacionalSection({ onSolicitar }: Props) {
  return (
    <section id="cobertura-nacional" aria-labelledby="titulo-cobertura-nacional" className="border-t border-border/60 bg-secondary/30 py-12 md:py-16">
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Curitiba e consulta de cobertura nacional
          </span>
          <h2 id="titulo-cobertura-nacional" className="mt-4 text-2xl font-heading font-bold text-foreground md:text-3xl">
            Atendimento de informática domiciliar em Curitiba e consulta nas capitais brasileiras
          </h2>
          <p className="mt-4 text-muted-foreground">
            Precisa de ajuda com computador, notebook, impressora ou Wi-Fi em casa ou na empresa?
            Curitiba e região metropolitana têm orientações locais detalhadas neste portal. Para
            outras cidades, reunimos capitais e localidades indicadas por participantes da rede
            para que você possa consultar a existência de um profissional compatível com seu serviço.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            <strong className="text-foreground">Importante:</strong> estar nesta relação não comprova
            cadastro aprovado, agenda disponível, cobertura integral do município ou atendimento
            presencial garantido. A disponibilidade precisa ser confirmada em cada solicitação.
            Não declaramos escritório ou loja física nas cidades listadas.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-accent/30 bg-card p-6">
            <h3 className="text-lg font-heading font-bold text-foreground">Atendimento domiciliar em Curitiba</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Para uma visita em Curitiba, informe bairro, equipamento e sintomas. Problemas
              de rede e Wi-Fi, instalação de periféricos e manutenção de vários computadores
              podem exigir avaliação no local. O diagnóstico e o deslocamento devem ser combinados
              antes do serviço.
            </p>
            <Link to="/tecnico-informatica-curitiba" className="mt-4 inline-block font-semibold text-accent underline underline-offset-4">
              Como funciona em Curitiba
            </Link>
          </article>
          <article className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-heading font-bold text-foreground">E se estou em outra cidade?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Informe cidade, UF e especialidade. Em uma solicitação nacional, é necessário
              confirmar se há profissional cadastrado, habilitado e disponível para a região.
              Suporte remoto pode resolver questões de software; visita domiciliar depende de
              profissional local e de condições acordadas diretamente com o cliente.
            </p>
            <Link to="/atendimento-remoto" className="mt-4 inline-block font-semibold text-accent underline underline-offset-4">
              Quando o suporte remoto é indicado
            </Link>
          </article>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-heading font-bold text-foreground">Capitais do Brasil: regiões para consultar disponibilidade</h3>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            As 27 capitais (incluindo o Distrito Federal) estão organizadas para orientar sua busca.
            A listagem é geográfica e não significa que cada capital já tenha técnico validado ou
            pronto para uma visita.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CAPITAIS.map(([uf, cidade]) => (
              <li key={uf} className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground">
                <span className="mr-2 font-bold text-accent">{uf}</span>
                {cidade}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-heading font-bold text-foreground">Cidades indicadas pela rede de profissionais</h3>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Lista inicial de municípios informados como possíveis áreas de atuação. Algumas cidades
            são capitais e aparecem também na relação acima. Inclusão não equivale a cadastro
            auditado, vínculo empregatício ou disponibilidade imediata.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CIDADES_INDICADAS.map(({ uf, cidades }) => (
              <article key={uf} className="rounded-xl border border-border bg-card p-5">
                <h4 className="text-base font-bold text-foreground">UF {uf}</h4>
                <ul className="mt-3 space-y-1 text-sm leading-relaxed text-muted-foreground">
                  {cidades.map((cidade) => (
                    <li key={cidade}>{cidade}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-heading font-bold text-foreground">O que informar ao pedir uma visita</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Sua cidade, UF e bairro, sem divulgar endereço completo publicamente.</li>
              <li>Se o equipamento é computador, notebook, impressora ou rede.</li>
              <li>O defeito observado e desde quando ocorre, sem compartilhar senhas.</li>
              <li>Se precisa de presença física ou aceita avaliação remota inicial.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-heading font-bold text-foreground">Como funciona a negociação</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              O portal busca aproximar clientes e técnicos independentes. O profissional e o cliente
              combinam diretamente escopo, disponibilidade, deslocamento, valor e condições do
              serviço. A plataforma não realiza despacho manual nem garante atendimento quando não
              houver profissional elegível na região.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Você é técnico e quer ampliar sua presença? Consulte os requisitos da
              <Link to="/seja-parceiro" className="ml-1 font-semibold text-accent underline underline-offset-4">
                área de parceiros
              </Link>.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-accent/30 bg-card p-6 md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <h3 className="text-lg font-heading font-bold text-foreground">Quer verificar atendimento na sua cidade?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Informe cidade e tipo de serviço no formulário. A relação de municípios não substitui
              confirmação de técnico habilitado e disponível.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSolicitar("areas_cobertura_nacional", "Olá! Gostaria de consultar a disponibilidade de um técnico de informática na minha cidade. Posso informar a UF, o município e o problema do equipamento?")}
            data-cta-location="areas_cobertura_nacional"
            data-wa-funnel="required"
            className="mt-5 inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-bold text-accent-foreground motion-surface md:mt-0"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Verificar minha região
          </button>
        </div>
      </div>
    </section>
  );
}
