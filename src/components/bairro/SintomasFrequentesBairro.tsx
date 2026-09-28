import { Link } from "@/lib/router-compat";
import { ArrowRight, Stethoscope } from "lucide-react";
import { clusterProblema } from "@/lib/clusterProblemas";

/**
 * Sintomas frequentes por bairro-âncora. A seleção segue o perfil declarado
 * de cada bairro (localIndexPolicy.json → intent), sem estatística inventada,
 * e só aponta para páginas de sintoma já existentes — nunca cria URL local.
 */
const SINTOMAS_POR_BAIRRO: Record<string, { contexto: string; slugs: string[] }> = {
  cic: { contexto: "Na CIC, com indústria e residências lado a lado, o que mais pesa é parada de máquina e aquecimento em ambiente com poeira.", slugs: ["computador-esquentando", "computador-desliga-sozinho", "cheiro-de-queimado", "impressora-nao-imprime"] },
  batel: { contexto: "No Batel, com escritórios e home office, os chamados giram em torno de rede, impressão e notebook de trabalho.", slugs: ["wifi-instavel", "impressora-nao-imprime", "notebook-nao-carrega", "teclado-notebook-nao-funciona"] },
  "agua-verde": { contexto: "No Água Verde, residencial denso, predominam Wi-Fi disputando canal com vizinhos e PC doméstico que não inicia.", slugs: ["wifi-instavel", "windows-nao-inicia", "computador-desliga-sozinho", "arquivos-apagados"] },
  centro: { contexto: "No Centro, com comércio e coleta, o comum é equipamento de balcão parado e perda de arquivos de trabalho.", slugs: ["computador-nao-da-imagem", "windows-nao-inicia", "arquivos-apagados", "impressora-nao-imprime"] },
  portao: { contexto: "No Portão, entre residências e comércio de bairro, aparecem mais PC que desliga, tela azul e Wi-Fi instável.", slugs: ["computador-desliga-sozinho", "tela-azul", "wifi-instavel", "notebook-nao-carrega"] },
  "santa-felicidade": { contexto: "Em Santa Felicidade, casas amplas tornam o alcance do Wi-Fi o problema mais recorrente.", slugs: ["wifi-instavel", "computador-esquentando", "hd-fazendo-barulho", "windows-nao-inicia"] },
  "boa-vista": { contexto: "Na Boa Vista, com residências e clínicas/escritórios de bairro, pesam impressão, dados e inicialização.", slugs: ["impressora-nao-imprime", "arquivos-apagados", "windows-nao-inicia", "wifi-instavel"] },
  bigorrilho: { contexto: "No Bigorrilho, prédios verticais e home office concentram notebook, teclado e rede de apartamento.", slugs: ["notebook-nao-carrega", "teclado-notebook-nao-funciona", "wifi-instavel", "notebook-molhado"] },
  cabral: { contexto: "No Cabral, consultórios e escritórios pequenos dependem de impressora, rede e dados preservados.", slugs: ["impressora-nao-imprime", "wifi-instavel", "hd-fazendo-barulho", "tela-azul"] },
  "afonso-pena": { contexto: "No Afonso Pena, empresas do entorno do aeroporto sentem mais a parada: desligamentos, tela azul e cheiro de queimado.", slugs: ["computador-desliga-sozinho", "tela-azul", "cheiro-de-queimado", "impressora-nao-imprime"] },
  cruzeiro: { contexto: "No Cruzeiro, residencial com comércio de rua, são comuns PC sem imagem, aquecimento e notebook sem carga.", slugs: ["computador-nao-da-imagem", "computador-esquentando", "notebook-nao-carrega", "wifi-instavel"] },
  costeira: { contexto: "Na Costeira, residencial próximo à divisa com Curitiba, predominam Windows que não inicia, HD com barulho e arquivos apagados.", slugs: ["windows-nao-inicia", "hd-fazendo-barulho", "arquivos-apagados", "computador-desliga-sozinho"] },
};

export function SintomasFrequentesBairro({ slug, nome }: { slug: string; nome: string }) {
  const cfg = SINTOMAS_POR_BAIRRO[slug];
  if (!cfg) return null;
  const itens = cfg.slugs.map((s) => clusterProblema(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (!itens.length) return null;
  return (
    <section className="border-b border-border/60 bg-background py-12 md:py-16" aria-labelledby="sintomas-bairro">
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            <Stethoscope className="h-4 w-4" aria-hidden="true" /> Sintomas frequentes
          </span>
          <h2 id="sintomas-bairro" className="mt-2 text-2xl font-heading font-bold text-foreground md:text-3xl">
            Problemas mais comuns para quem está em {nome}
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{cfg.contexto}</p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {itens.map((p) => (
            <Link key={p.path} to={p.path} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/50">
              <h3 className="font-semibold text-foreground group-hover:text-accent">{p.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.metaDescription}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                Ver causas e testes seguros <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
