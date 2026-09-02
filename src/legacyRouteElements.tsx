import { lazy, Suspense, useEffect, useState } from "react";
import { JsonLdSsrSink } from "@/lib/jsonLdSsr";
import IndexPage from "./pages/Index";

/**
 * ─────────────────────────────────────────────────────────────
 * P0 SSR_JSONLD_INTERMITENTE — sink DENTRO do módulo da página
 * ─────────────────────────────────────────────────────────────
 * Cada página abaixo é `React.lazy`. Em isolate frio o chunk ainda não está no
 * cache de módulos: o subtree suspende, o React (Fizz) segue renderizando os
 * IRMÃOS e adia a página para outra tarefa de stream. Qualquer sink de JSON-LD
 * posicionado como irmão — no `__root` ou ao lado da página — portanto executa
 * ANTES de a rota registrar seus slots, e o HTML sai apenas com Organization +
 * WebSite. Em isolate quente nada suspende, o mesmo commit serve 6–7 blocos:
 * é essa a "intermitência" observada em produção.
 *
 * A correção é estrutural e sem dependência temporal: o sink é composto DENTRO
 * do módulo resolvido da página. Ele deixa de ser irmão do ponto de suspensão
 * e passa a ser filho do mesmo segmento já resolvido, renderizado logo após o
 * conteúdo da página — em isolate frio e quente, sem timer, retry, delay,
 * hidratação ou segunda renderização.
 */
const comSinkDeJsonLd = (Pagina: React.ComponentType<any>) => {
  const PaginaComJsonLd = (props: any) => (
    <>
      <Pagina {...props} />
      <JsonLdSsrSink />
    </>
  );
  PaginaComJsonLd.displayName = `comSinkDeJsonLd(${Pagina.displayName ?? Pagina.name ?? "Pagina"})`;
  return PaginaComJsonLd;
};

/** `React.lazy` de página: resolve o módulo e já o compõe com o sink único. */
const lazyPagina = (
  carregar: () => Promise<{ default: React.ComponentType<any> }>,
) => lazy(() => carregar().then((m) => ({ default: comSinkDeJsonLd(m.default) })));

/** Home é import estático (não suspende), mas usa o mesmo sink único. */
const Index = comSinkDeJsonLd(IndexPage);

// Lazy-loaded pages for code splitting & faster initial load
const Servicos = lazyPagina(() => import("./pages/Servicos"));
const AtendimentoDomicilio = lazyPagina(() => import("./pages/AtendimentoDomicilio"));
const AtendimentoRemoto = lazyPagina(() => import("./pages/AtendimentoRemoto"));

const PrecosEPoliticas = lazyPagina(() => import("./pages/PrecosEPoliticas"));
const TecnicoInformaticaCuritiba = lazyPagina(() => import("./pages/TecnicoInformaticaCuritiba"));
const TecnicoInformaticaSaoJosePinhais = lazyPagina(() => import("./pages/TecnicoInformaticaSaoJosePinhais"));
const TecnicoInformaticaAraucaria = lazyPagina(() => import("./pages/TecnicoInformaticaAraucaria"));
const TecnicoInformaticaCampoLargo = lazyPagina(() => import("./pages/TecnicoInformaticaCampoLargo"));
const TecnicoInformaticaPinhais = lazyPagina(() => import("./pages/TecnicoInformaticaPinhais"));
const Sobre = lazyPagina(() => import("./pages/Sobre"));
const GestorResponsavel = lazyPagina(() => import("./pages/GestorResponsavel"));
const Contato = lazyPagina(() => import("./pages/Contato"));
const Blog = lazyPagina(() => import("./pages/Blog"));
const BlogPost = lazyPagina(() => import("./pages/BlogPost"));
const FAQ = lazyPagina(() => import("./pages/FAQ"));
const ComoFunciona = lazyPagina(() => import("./pages/ComoFunciona"));
const DiagnosticoTecnico = lazyPagina(() => import("./pages/DiagnosticoTecnico"));
const Diagnostico60s = lazyPagina(() => import("./pages/Diagnostico60s"));
const EquipamentosAtendidos = lazyPagina(() => import("./pages/EquipamentosAtendidos"));
const AreasAtendidas = lazyPagina(() => import("./pages/AreasAtendidas"));
const ProblemasReaisCasos = lazyPagina(() => import("./pages/ProblemasReaisCasos"));
const ColetaEntrega = lazyPagina(() => import("./pages/ColetaEntrega"));
const SegurancaDosDados = lazyPagina(() => import("./pages/SegurancaDosDados"));
const PoliticaPecasCliente = lazyPagina(() => import("./pages/PoliticaPecasCliente"));
const ColetaFormulario = lazyPagina(() => import("./pages/ColetaFormulario"));
const QuandoNaoCompensa = lazyPagina(() => import("./pages/QuandoNaoCompensa"));
const SejaParceiro = lazyPagina(() => import("./pages/SejaParceiro"));
const DiretorioProfissionais = lazyPagina(() => import("./pages/profissionais/DiretorioProfissionais"));
const PerfilProfissional = lazyPagina(() => import("./pages/profissionais/PerfilProfissional"));
const CadastroParceiro = lazyPagina(() => import("./pages/profissionais/CadastroParceiro"));
const ProfissionaisLocal = lazyPagina(() => import("./pages/profissionais/ProfissionaisLocal"));
const Empresas = lazyPagina(() => import("./pages/Empresas"));
const Atendimento = lazyPagina(() => import("./pages/Atendimento"));
const ValorizacaoTrabalhoTecnico = lazyPagina(() => import("./pages/ValorizacaoTrabalhoTecnico"));
const NotFound = lazyPagina(() => import("./pages/NotFound"));
const AssistenciaTecnicaCuritiba = lazyPagina(() => import("./pages/AssistenciaTecnicaCuritiba"));
const ArrumarPC = lazyPagina(() => import("./pages/ArrumarPC"));
const ArrumarPCCity = lazyPagina(() => import("./pages/arrumar-pc/ArrumarPCCity"));
const ArrumarPCServicoCidade = lazyPagina(() => import("./pages/arrumar-pc/ArrumarPCServicoCidade"));
const TermosCondicoes = lazyPagina(() => import("./pages/TermosCondicoes"));
const PoliticaPrivacidade = lazyPagina(() => import("./pages/PoliticaPrivacidade"));
const PoliticaCookiesAnuncios = lazyPagina(() => import("./pages/PoliticaCookiesAnuncios"));
const StatusAnuncios = lazyPagina(() => import("./pages/StatusAnuncios"));
const Anuncie = lazyPagina(() => import("./pages/Anuncie"));
const FunilIndisponivel = lazyPagina(() => import("./pages/FunilIndisponivel"));
const DebugTelemetria = lazyPagina(() => import("./pages/DebugTelemetria"));
const OrdemDeServico = lazyPagina(() => import("./pages/OrdemDeServico"));
const StatusOs = lazyPagina(() => import("./pages/StatusOs"));
const Depoimentos = lazyPagina(() => import("./pages/Depoimentos"));
const ComoAvaliar = lazyPagina(() => import("./pages/ComoAvaliar"));
const Avaliar = lazyPagina(() => import("./pages/Avaliar"));
const ExcluirMeusDados = lazyPagina(() => import("./pages/ExcluirMeusDados"));

const AdminLogin = lazyPagina(() => import("./pages/admin/AdminLogin"));
const AdminFunnel = lazyPagina(() => import("./pages/admin/AdminFunnel"));
const AdminReviews = lazyPagina(() => import("./pages/admin/AdminReviews"));
const AdminVitals = lazyPagina(() => import("./pages/admin/AdminVitals"));
const AdminAuditoriaLocal = lazyPagina(() => import("./pages/admin/AdminAuditoriaLocal"));
const AdminGatesLocais = lazyPagina(() => import("./pages/admin/AdminGatesLocais"));
const AdminInventarioBairros = lazyPagina(() => import("./pages/admin/AdminInventarioBairros"));
const AdminBairros = lazyPagina(() => import("./pages/admin/AdminBairros"));
const AdminIndexacao = lazyPagina(() => import("./pages/admin/AdminIndexacao"));
const AdminEditorialOndas = lazyPagina(() => import("./pages/admin/AdminEditorialOndas"));
const AdminOndas = lazyPagina(() => import("./pages/admin/AdminOndas"));
const AdminPublicacoesPendentes = lazyPagina(() => import("./pages/admin/AdminPublicacoesPendentes"));
const AdminAutoridadeSeo = lazyPagina(() => import("./pages/admin/AdminAutoridadeSeo"));
const AdminAutoridadeAtlas = lazyPagina(() => import("./pages/admin/AdminAutoridadeAtlas"));
const AdminBiblioteca = lazyPagina(() => import("./pages/admin/AdminBiblioteca"));
const AdminSeo = lazyPagina(() => import("./pages/admin/AdminSeo"));
const AdminCapasPendentes = lazyPagina(() => import("./pages/admin/AdminCapasPendentes"));
const AdminUiPerformance = lazyPagina(() => import("./pages/admin/AdminUiPerformance"));
const AdminDashboard = lazyPagina(() => import("./pages/admin/AdminDashboard"));
const AdminCasos = lazyPagina(() => import("./pages/admin/AdminCasos"));
const AdminOsAudit = lazyPagina(() => import("./pages/admin/AdminOsAudit"));
const AdminConversasOs = lazyPagina(() => import("./pages/admin/AdminConversasOs"));
const PedidoChat = lazyPagina(() => import("./pages/os/PedidoChat"));
const AdminOperacao = lazyPagina(() => import("./pages/admin/AdminOperacao"));
const AdminProvasMonitor = lazyPagina(() => import("./pages/admin/AdminProvasMonitor"));
const AdminProvasVerticais = lazyPagina(() => import("./pages/admin/AdminProvasVerticais"));
const AdminConversao = lazyPagina(() => import("./pages/admin/AdminConversao"));
const AdminExperimentoWa = lazyPagina(() => import("./pages/admin/AdminExperimentoWa"));
const AdminPublicacao = lazyPagina(() => import("./pages/admin/AdminPublicacao"));
const AdminFotos = lazyPagina(() => import("./pages/admin/AdminFotos"));
const AdminEditorLocal = lazyPagina(() => import("./pages/admin/AdminEditorLocal"));
const AdminPerformanceLocal = lazyPagina(() => import("./pages/admin/AdminPerformanceLocal"));
const AdminAuditoriaAcessos = lazyPagina(() => import("./pages/admin/AdminAuditoriaAcessos"));
const AdminQaTrafego = lazyPagina(() => import("./pages/admin/AdminQaTrafego"));
const AdminLinkBuilder = lazyPagina(() => import("./pages/admin/AdminLinkBuilder"));

const ConsertoImpressoraCuritiba = lazyPagina(() => import("./pages/ConsertoImpressoraCuritiba"));
const AssistenciaEletrodomesticosInteligentesCuritiba = lazyPagina(() => import("./pages/AssistenciaEletrodomesticosInteligentesCuritiba"));
const Status = lazyPagina(() => import("./pages/Status"));
const CreditosDeImagens = lazyPagina(() => import("./pages/CreditosDeImagens"));

const Obrigado = lazyPagina(() => import("./pages/Obrigado"));

// Hubs SEO de categorias (TV, Som, Videogame, Celular) × cidades/bairros
const ConsertoTVCity = lazyPagina(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoTVCity })));
const ConsertoSomCity = lazyPagina(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoSomCity })));
const ConsertoVideogameCity = lazyPagina(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoVideogameCity })));
const ConsertoCelularLocalCity = lazyPagina(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoCelularLocalCity })));
const ConsertoTVHub = lazyPagina(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoTVHub })));
const ConsertoSomHub = lazyPagina(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoSomHub })));
const ConsertoVideogameHub = lazyPagina(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoVideogameHub })));
const ConsertoCelularLocalHub = lazyPagina(() => import("./pages/hubs/CategoryLocalTemplate").then(m => ({ default: m.ConsertoCelularLocalHub })));
// Hub SEO — Empresa de TI em Curitiba
const EmpresaDeTiCuritiba = lazyPagina(() => import("./pages/EmpresaDeTiCuritiba"));

// Bairros Curitiba
const CentroCivicoMalha = lazyPagina(() => import("./pages/bairros/CentroCivico"));
const AltoDaXvMalha = lazyPagina(() => import("./pages/bairros/AltoDaXv"));
const PradoVelhoMalha = lazyPagina(() => import("./pages/bairros/PradoVelho"));
const CampinaDoSiqueiraMalha = lazyPagina(() => import("./pages/bairros/CampinaDoSiqueira"));
const BairroAltoMalha = lazyPagina(() => import("./pages/bairros/BairroAlto"));
const AtubaMalha = lazyPagina(() => import("./pages/bairros/Atuba"));
const GuabirotubaMalha = lazyPagina(() => import("./pages/bairros/Guabirotuba"));
const FannyMalha = lazyPagina(() => import("./pages/bairros/Fanny"));
const LindoiaMalha = lazyPagina(() => import("./pages/bairros/Lindoia"));
const SantaQuiteriaMalha = lazyPagina(() => import("./pages/bairros/SantaQuiteria"));
const VistaAlegreMalha = lazyPagina(() => import("./pages/bairros/VistaAlegre"));
const ButiatuvinhaMalha = lazyPagina(() => import("./pages/bairros/Butiatuvinha"));
const BairrosHub = lazyPagina(() => import("./pages/BairrosHub"));
const Centro = lazyPagina(() => import("./pages/bairros/Centro"));
const Batel = lazyPagina(() => import("./pages/bairros/Batel"));
const Portao = lazyPagina(() => import("./pages/bairros/Portao"));
const CampoComprido = lazyPagina(() => import("./pages/bairros/CampoComprido"));
const CIC = lazyPagina(() => import("./pages/bairros/CIC"));
const SantaFelicidade = lazyPagina(() => import("./pages/bairros/SantaFelicidade"));

// Bairros São José dos Pinhais
const SaoJoseDosPinhais = lazyPagina(() => import("./pages/bairros/SaoJoseDosPinhais"));
const AfonsoPena = lazyPagina(() => import("./pages/bairros/AfonsoPena"));
const Cruzeiro = lazyPagina(() => import("./pages/bairros/Cruzeiro"));
const Aristocrata = lazyPagina(() => import("./pages/bairros/Aristocrata"));
const Braga = lazyPagina(() => import("./pages/bairros/Braga"));
const Costeira = lazyPagina(() => import("./pages/bairros/Costeira"));
const Aviacao = lazyPagina(() => import("./pages/bairros/Aviacao"));
const ParqueDaFonte = lazyPagina(() => import("./pages/bairros/ParqueDaFonte"));
const Guatupe = lazyPagina(() => import("./pages/bairros/Guatupe"));
const SaoCristovao = lazyPagina(() => import("./pages/bairros/SaoCristovao"));
const SaoDomingos = lazyPagina(() => import("./pages/bairros/SaoDomingos"));
const SaoMarcos = lazyPagina(() => import("./pages/bairros/SaoMarcos"));
const SaoFrancisco = lazyPagina(() => import("./pages/bairros/SaoFrancisco"));
const DelRey = lazyPagina(() => import("./pages/bairros/DelRey"));
const BarroPreto = lazyPagina(() => import("./pages/bairros/BarroPreto"));

// Bairros Araucária
const AraucariaCentro = lazyPagina(() => import("./pages/bairros/AraucariaCentro"));
const CapelaVelhaAraucaria = lazyPagina(() => import("./pages/bairros/CapelaVelhaAraucaria"));
const ThomazCoelhoAraucaria = lazyPagina(() => import("./pages/bairros/ThomazCoelhoAraucaria"));

const CacheiraAraucaria = lazyPagina(() => import("./pages/bairros/CacheiraAraucaria"));
const ThomazCoelhoIIAraucaria = lazyPagina(() => import("./pages/bairros/ThomazCoelhoIIAraucaria"));
const JardimBoaVistaAraucaria = lazyPagina(() => import("./pages/bairros/JardimBoaVistaAraucaria"));
const SaoMiguelAraucaria = lazyPagina(() => import("./pages/bairros/SaoMiguelAraucaria"));
const CaliforniaAraucaria = lazyPagina(() => import("./pages/bairros/CaliforniaAraucaria"));
const VilaNovaAraucaria = lazyPagina(() => import("./pages/bairros/VilaNovaAraucaria"));
const IndustrialAraucaria = lazyPagina(() => import("./pages/bairros/IndustrialAraucaria"));
const JardimIguacuAraucaria = lazyPagina(() => import("./pages/bairros/JardimIguacuAraucaria"));
const PlantaSaoTiagoAraucaria = lazyPagina(() => import("./pages/bairros/PlantaSaoTiagoAraucaria"));
const JardimShangrilaAraucaria = lazyPagina(() => import("./pages/bairros/JardimShangrilaAraucaria"));
const JardimLaranjeirasCL = lazyPagina(() => import("./pages/bairros/JardimLaranjeirasCL"));
const SaoMarcosCampoLargo = lazyPagina(() => import("./pages/bairros/SaoMarcosCampoLargo"));
const SaoJoseCampoLargo = lazyPagina(() => import("./pages/bairros/SaoJoseCampoLargo"));
const JardimEsperancaCL = lazyPagina(() => import("./pages/bairros/JardimEsperancaCL"));
const ColoniaMalhadaCL = lazyPagina(() => import("./pages/bairros/ColoniaMalhadaCL"));
const LamenhaGrandeCL = lazyPagina(() => import("./pages/bairros/LamenhaGrandeCL"));
const VilaCandidaCL = lazyPagina(() => import("./pages/bairros/VilaCandidaCL"));
const JardimNovoHorizonteCL = lazyPagina(() => import("./pages/bairros/JardimNovoHorizonteCL"));
const TimbotuvaCL = lazyPagina(() => import("./pages/bairros/TimbotuvaCL"));
const JardimPlanaltoIICL = lazyPagina(() => import("./pages/bairros/JardimPlanaltoIICL"));
const JardimPedroDemeterco = lazyPagina(() => import("./pages/bairros/JardimPedroDemeterco"));
const JardimKarlaPinhais = lazyPagina(() => import("./pages/bairros/JardimKarlaPinhais"));
const JardimClaudiaIIPinhais = lazyPagina(() => import("./pages/bairros/JardimClaudiaIIPinhais"));
const JardimWissingerPinhais = lazyPagina(() => import("./pages/bairros/JardimWissingerPinhais"));
const VilaAmeliaPinhais = lazyPagina(() => import("./pages/bairros/VilaAmeliaPinhais"));
const JardimEsplanadaPinhais = lazyPagina(() => import("./pages/bairros/JardimEsplanadaPinhais"));
const VilaMariaAntonietaPinhais = lazyPagina(() => import("./pages/bairros/VilaMariaAntonietaPinhais"));
const JardimDonaRosaPinhais = lazyPagina(() => import("./pages/bairros/JardimDonaRosaPinhais"));
const ParqueNascentesPinhais = lazyPagina(() => import("./pages/bairros/ParqueNascentesPinhais"));
const JardimTropicalPinhais = lazyPagina(() => import("./pages/bairros/JardimTropicalPinhais"));
// Bairros Campo Largo
const CampoLargoCentro = lazyPagina(() => import("./pages/bairros/CampoLargoCentro"));
const FerrariaCampoLargo = lazyPagina(() => import("./pages/bairros/FerrariaCampoLargo"));
const JardimGuilherminaCampoLargo = lazyPagina(() => import("./pages/bairros/JardimGuilherminaCampoLargo"));

// Bairros Pinhais
const PinhaisCentro = lazyPagina(() => import("./pages/bairros/PinhaisCentro"));
const WeissopolisPinhais = lazyPagina(() => import("./pages/bairros/WeissopolisPinhais"));
const AltoGloria = lazyPagina(() => import("./pages/bairros/AltoGloria"));
const Reboucas = lazyPagina(() => import("./pages/bairros/Reboucas"));
const VilaIzabel = lazyPagina(() => import("./pages/bairros/VilaIzabel"));
const Seminario = lazyPagina(() => import("./pages/bairros/Seminario"));
const HugoLange = lazyPagina(() => import("./pages/bairros/HugoLange"));
const JardimSocial = lazyPagina(() => import("./pages/bairros/JardimSocial"));
const JardimAmericas = lazyPagina(() => import("./pages/bairros/JardimAmericas"));
const Taruma = lazyPagina(() => import("./pages/bairros/Taruma"));
const CapaoImbuia = lazyPagina(() => import("./pages/bairros/CapaoImbuia"));
const Hauer = lazyPagina(() => import("./pages/bairros/Hauer"));
const AltoBoqueiraoCtba = lazyPagina(() => import("./pages/bairros/AltoBoqueiraoCtba"));
const SitioCercado = lazyPagina(() => import("./pages/bairros/SitioCercado"));
const NovoMundo = lazyPagina(() => import("./pages/bairros/NovoMundo"));
const Fazendinha = lazyPagina(() => import("./pages/bairros/Fazendinha"));
const AguaVerdeBairro = lazyPagina(() => import("./pages/bairros/AguaVerdeBairro"));
const QuissisanaSJP = lazyPagina(() => import("./pages/bairros/QuissisanaSJP"));
const AcademiaSJP = lazyPagina(() => import("./pages/bairros/AcademiaSJP"));
const ColoniaMurcySJP = lazyPagina(() => import("./pages/bairros/ColoniaMurcySJP"));
const BonecaSJP = lazyPagina(() => import("./pages/bairros/BonecaSJP"));
const OuroFinoSJP = lazyPagina(() => import("./pages/bairros/OuroFinoSJP"));
const AgricolareSJP = lazyPagina(() => import("./pages/bairros/AgricolareSJP"));
const CampoLargoSJP = lazyPagina(() => import("./pages/bairros/CampoLargoSJP"));
const ItaliaSJP = lazyPagina(() => import("./pages/bairros/ItaliaSJP"));
const BordoDoCampoSJP2 = lazyPagina(() => import("./pages/bairros/BordoDoCampoSJP2"));
const IndependenciaSJP = lazyPagina(() => import("./pages/bairros/IndependenciaSJP"));
const OswaldoCruzColombo = lazyPagina(() => import("./pages/bairros/OswaldoCruzColombo"));
const ColareColombo = lazyPagina(() => import("./pages/bairros/ColareColombo"));
const CampinaGrandeColombo = lazyPagina(() => import("./pages/bairros/CampinaGrandeColombo"));
const TaxiqueiraColomboo = lazyPagina(() => import("./pages/bairros/TaxiqueiraColomboo"));
const EmbuColombo = lazyPagina(() => import("./pages/bairros/EmbuColombo"));
const JardimUniaoPiraquara = lazyPagina(() => import("./pages/bairros/JardimUniaoPiraquara"));
const JardimSantoAntonioPiraquara = lazyPagina(() => import("./pages/bairros/JardimSantoAntonioPiraquara"));
const JardimSaoPauloPiraquara = lazyPagina(() => import("./pages/bairros/JardimSaoPauloPiraquara"));
const IraiPiraquara = lazyPagina(() => import("./pages/bairros/IraiPiraquara"));
const BoaVistaTamandare = lazyPagina(() => import("./pages/bairros/BoaVistaTamandare"));
const CampoDoTenenteTamandare = lazyPagina(() => import("./pages/bairros/CampoDoTenenteTamandare"));
const JardimParanaguaTamandare = lazyPagina(() => import("./pages/bairros/JardimParanaguaTamandare"));
const JardimSaoJorgeTamandare = lazyPagina(() => import("./pages/bairros/JardimSaoJorgeTamandare"));
const EucaliptosFRG2 = lazyPagina(() => import("./pages/bairros/EucaliptosFRG2"));
const JardimCondorFRG = lazyPagina(() => import("./pages/bairros/JardimCondorFRG"));
const JardimIperigoFRG = lazyPagina(() => import("./pages/bairros/JardimIperigoFRG"));
const JardimDasPedrasFRG = lazyPagina(() => import("./pages/bairros/JardimDasPedrasFRG"));
const JoqueiFRCM = lazyPagina(() => import("./pages/bairros/JoqueiFRCM"));
const AntonioOliveraCM = lazyPagina(() => import("./pages/bairros/AntonioOliveraCM"));
const EspigoAlegreCM = lazyPagina(() => import("./pages/bairros/EspigoAlegreCM"));
const JardimFlorestalQB = lazyPagina(() => import("./pages/bairros/JardimFlorestalQB"));
const JardimJaponeQB = lazyPagina(() => import("./pages/bairros/JardimJaponeQB"));
const GraciosaMirQB = lazyPagina(() => import("./pages/bairros/GraciosaMirQB"));
const PinevillePinhais = lazyPagina(() => import("./pages/bairros/PinevillePinhais"));

// Novas cidades
const TecnicoInformaticaColombo = lazyPagina(() => import("./pages/TecnicoInformaticaColombo"));
const TecnicoInformaticaFazendaRioGrande = lazyPagina(() => import("./pages/TecnicoInformaticaFazendaRioGrande"));
const TecnicoInformaticaAlmiranteTamandare = lazyPagina(() => import("./pages/TecnicoInformaticaAlmiranteTamandare"));

// Bairros Colombo
const CentroColombo = lazyPagina(() => import("./pages/bairros/CentroColombo"));
const MaracanaColombo = lazyPagina(() => import("./pages/bairros/MaracanaColombo"));
const GuaraitubaColombo = lazyPagina(() => import("./pages/bairros/GuaraitubaColombo"));

// Bairros Fazenda Rio Grande
const CentroFRG = lazyPagina(() => import("./pages/bairros/CentroFRG"));
const EucaliptosFRG = lazyPagina(() => import("./pages/bairros/EucaliptosFRG"));
const NacoesFRG = lazyPagina(() => import("./pages/bairros/NacoesFRG"));

// Bairros Almirante Tamandaré
const CentroAlmiranteTamandare = lazyPagina(() => import("./pages/bairros/CentroAlmiranteTamandare"));
const JardimMontoSantoAT = lazyPagina(() => import("./pages/bairros/JardimMontoSantoAT"));
const CachoeiraAT = lazyPagina(() => import("./pages/bairros/CachoeiraAT"));

// Novos bairros Curitiba
const AguaVerde = lazyPagina(() => import("./pages/bairros/AguaVerde"));
const Bigorrilho = lazyPagina(() => import("./pages/bairros/Bigorrilho"));
const Merces = lazyPagina(() => import("./pages/bairros/Merces"));
const BoaVista = lazyPagina(() => import("./pages/bairros/BoaVista"));
const Juveve = lazyPagina(() => import("./pages/bairros/Juveve"));
const Cabral = lazyPagina(() => import("./pages/bairros/Cabral"));
const CristoRei = lazyPagina(() => import("./pages/bairros/CristoRei"));
const Cajuru = lazyPagina(() => import("./pages/bairros/Cajuru"));
const Uberaba = lazyPagina(() => import("./pages/bairros/Uberaba"));
const Pinheirinho = lazyPagina(() => import("./pages/bairros/Pinheirinho"));
const Xaxim = lazyPagina(() => import("./pages/bairros/Xaxim"));
const Boqueirao = lazyPagina(() => import("./pages/bairros/Boqueirao"));
const Bacacheri = lazyPagina(() => import("./pages/bairros/Bacacheri"));
const Tingui = lazyPagina(() => import("./pages/bairros/Tingui"));
// Novos bairros Araucária
const ChapadaAraucaria = lazyPagina(() => import("./pages/bairros/ChapadaAraucaria"));
const CosteiraAraucaria = lazyPagina(() => import("./pages/bairros/CosteiraAraucaria"));
const IguacuAraucaria = lazyPagina(() => import("./pages/bairros/IguacuAraucaria"));
const CampinaDaBarra = lazyPagina(() => import("./pages/bairros/CampinaDaBarra"));
const PortoDasLaranjeiras = lazyPagina(() => import("./pages/bairros/PortoDasLaranjeiras"));
const Tindiquera = lazyPagina(() => import("./pages/bairros/Tindiquera"));
const BariguiAraucaria = lazyPagina(() => import("./pages/bairros/BariguiAraucaria"));
const FazendaVelhaAraucaria = lazyPagina(() => import("./pages/bairros/FazendaVelhaAraucaria"));
const EstacaoAraucaria = lazyPagina(() => import("./pages/bairros/EstacaoAraucaria"));
const BoqueiraoAraucaria = lazyPagina(() => import("./pages/bairros/BoqueiraoAraucaria"));
const SabiaAraucaria = lazyPagina(() => import("./pages/bairros/SabiaAraucaria"));
const PassaunaAraucaria = lazyPagina(() => import("./pages/bairros/PassaunaAraucaria"));
const GuajuviraAraucaria = lazyPagina(() => import("./pages/bairros/GuajuviraAraucaria"));
// Novos bairros Colombo
const AltoMaracanaColombo = lazyPagina(() => import("./pages/bairros/AltoMaracanaColombo"));
const AtubaColombo = lazyPagina(() => import("./pages/bairros/AtubaColombo"));
const CampoPequenoColombo = lazyPagina(() => import("./pages/bairros/CampoPequenoColombo"));
const FatimaColombo = lazyPagina(() => import("./pages/bairros/FatimaColombo"));
const GabirobalColombo = lazyPagina(() => import("./pages/bairros/GabirobalColombo"));
const JardimOsascoColombo = lazyPagina(() => import("./pages/bairros/JardimOsascoColombo"));
const MonzaColombo = lazyPagina(() => import("./pages/bairros/MonzaColombo"));
const PalmitalColombo = lazyPagina(() => import("./pages/bairros/PalmitalColombo"));
const RocaGrandeColombo = lazyPagina(() => import("./pages/bairros/RocaGrandeColombo"));
const SaoGabrielColombo = lazyPagina(() => import("./pages/bairros/SaoGabrielColombo"));
const SantaTerezinhaColombo = lazyPagina(() => import("./pages/bairros/SantaTerezinhaColombo"));
// Novos bairros Pinhais
const EmilianoPerneta = lazyPagina(() => import("./pages/bairros/EmilianoPerneta"));
const MariaAntonieta = lazyPagina(() => import("./pages/bairros/MariaAntonieta"));
const VargemGrande = lazyPagina(() => import("./pages/bairros/VargemGrande"));
const EstanciaPinhais = lazyPagina(() => import("./pages/bairros/EstanciaPinhais"));
const AltoTaruma = lazyPagina(() => import("./pages/bairros/AltoTaruma"));
const GraciosaPinhais = lazyPagina(() => import("./pages/bairros/GraciosaPinhais"));
const JardimAmelia = lazyPagina(() => import("./pages/bairros/JardimAmelia"));
const PalmitalPinhais = lazyPagina(() => import("./pages/bairros/PalmitalPinhais"));
const AtubaPinhais = lazyPagina(() => import("./pages/bairros/AtubaPinhais"));
const SeteVilas = lazyPagina(() => import("./pages/bairros/SeteVilas"));
const VilaTaruma = lazyPagina(() => import("./pages/bairros/VilaTaruma"));
const ValeDasAguas = lazyPagina(() => import("./pages/bairros/ValeDasAguas"));
const JardimClaudia = lazyPagina(() => import("./pages/bairros/JardimClaudia"));
// Novos bairros Campo Largo
const JardimAmericaCL = lazyPagina(() => import("./pages/bairros/JardimAmericaCL"));
const BotiatuvaCL = lazyPagina(() => import("./pages/bairros/BotiatuvaCL"));
const RondinhaCL = lazyPagina(() => import("./pages/bairros/RondinhaCL"));
const SaoSilvestreCL = lazyPagina(() => import("./pages/bairros/SaoSilvestreCL"));
const TresCorregosCL = lazyPagina(() => import("./pages/bairros/TresCorregosCL"));
const ItaquiCL = lazyPagina(() => import("./pages/bairros/ItaquiCL"));
const OuroFinoCL = lazyPagina(() => import("./pages/bairros/OuroFinoCL"));
const BateiasCL = lazyPagina(() => import("./pages/bairros/BateiasCL"));
const PalmitalCL = lazyPagina(() => import("./pages/bairros/PalmitalCL"));
const SantaCruzCL = lazyPagina(() => import("./pages/bairros/SantaCruzCL"));
const CorreiaDeFreitasCL = lazyPagina(() => import("./pages/bairros/CorreiaDeFreitasCL"));
const JardimPlanaltoCL = lazyPagina(() => import("./pages/bairros/JardimPlanaltoCL"));
const VilaSoleneCL = lazyPagina(() => import("./pages/bairros/VilaSoleneCL"));
// Novos bairros FRG, AT, Piraquara, Campo Magro, Quatro Barras, SJP
const IguacuFRG = lazyPagina(() => import("./pages/bairros/IguacuFRG"));
const GralhaAzulFRG = lazyPagina(() => import("./pages/bairros/GralhaAzulFRG"));
const SantaTerezinhaFRG = lazyPagina(() => import("./pages/bairros/SantaTerezinhaFRG"));
const JardimEstadosFRG = lazyPagina(() => import("./pages/bairros/JardimEstadosFRG"));
const PioneirosFRG = lazyPagina(() => import("./pages/bairros/PioneirosFRG"));
const SaoLourencoFRG = lazyPagina(() => import("./pages/bairros/SaoLourencoFRG"));
const HortenciaFRG = lazyPagina(() => import("./pages/bairros/HortenciaFRG"));
const TanguaAT = lazyPagina(() => import("./pages/bairros/TanguaAT"));
const SaoVenancioAT = lazyPagina(() => import("./pages/bairros/SaoVenancioAT"));
const JardimGrazielaAT = lazyPagina(() => import("./pages/bairros/JardimGrazielaAT"));
const JardimRomaAT = lazyPagina(() => import("./pages/bairros/JardimRomaAT"));
const ColoniaAntonioPradoAT = lazyPagina(() => import("./pages/bairros/ColoniaAntonioPradoAT"));
const TranqueiraAT = lazyPagina(() => import("./pages/bairros/TranqueiraAT"));
const JardimParaisoAT = lazyPagina(() => import("./pages/bairros/JardimParaisoAT"));
const CentroPiraquara = lazyPagina(() => import("./pages/bairros/CentroPiraquara"));
const JardimPrimaveraPiraquara = lazyPagina(() => import("./pages/bairros/JardimPrimaveraPiraquara"));
const PlantaDeodoroPiraquara = lazyPagina(() => import("./pages/bairros/PlantaDeodoroPiraquara"));
const VilaMacedoPiraquara = lazyPagina(() => import("./pages/bairros/VilaMacedoPiraquara"));
const GuaritubaPiraquara = lazyPagina(() => import("./pages/bairros/GuaritubaPiraquara"));
const PradoVelhoPiraquara = lazyPagina(() => import("./pages/bairros/PradoVelhoPiraquara"));
const SaoCristaoPiraquara = lazyPagina(() => import("./pages/bairros/SaoCristaoPiraquara"));
const JardimBelaVistaPiraquara = lazyPagina(() => import("./pages/bairros/JardimBelaVistaPiraquara"));
const CaiuaPiraquara = lazyPagina(() => import("./pages/bairros/CaiuaPiraquara"));
const CentroCampoMagro = lazyPagina(() => import("./pages/bairros/CentroCampoMagro"));
const SedeCampoMagro = lazyPagina(() => import("./pages/bairros/SedeCampoMagro"));
const JardimBoaVistaCM = lazyPagina(() => import("./pages/bairros/JardimBoaVistaCM"));
const SaoSebastiaoCM = lazyPagina(() => import("./pages/bairros/SaoSebastiaoCM"));
const RioVerdeCM = lazyPagina(() => import("./pages/bairros/RioVerdeCM"));
const BotiatuvaCM = lazyPagina(() => import("./pages/bairros/BotiatuvaCM"));
const CentroQuatroBarras = lazyPagina(() => import("./pages/bairros/CentroQuatroBarras"));
const JardimMeninoDeusQB = lazyPagina(() => import("./pages/bairros/JardimMeninoDeusQB"));
const VilaSaoJoseQB = lazyPagina(() => import("./pages/bairros/VilaSaoJoseQB"));
const BordaDoCampoQB = lazyPagina(() => import("./pages/bairros/BordaDoCampoQB"));
const SaoLourencoQB = lazyPagina(() => import("./pages/bairros/SaoLourencoQB"));
const VilaMariaQB = lazyPagina(() => import("./pages/bairros/VilaMariaQB"));
const CidadeJardimSJP = lazyPagina(() => import("./pages/bairros/CidadeJardimSJP"));
const PedroMoroSJP = lazyPagina(() => import("./pages/bairros/PedroMoroSJP"));
const IpeSJP = lazyPagina(() => import("./pages/bairros/IpeSJP"));
const RioPequenoSJP = lazyPagina(() => import("./pages/bairros/RioPequenoSJP"));
const BordaDoCampoSJP = lazyPagina(() => import("./pages/bairros/BordaDoCampoSJP"));

const TecnicoInformaticaCuritibaAds = lazyPagina(() => import("./pages/ads/TecnicoInformaticaCuritibaAds"));

// Páginas de Serviços Individuais
const ServicoCore = lazyPagina(() => import("./pages/servicos/ServicoCore"));

const MontagemPc = lazyPagina(() => import("./pages/servicos/MontagemPc"));
const ComputadorLento = lazyPagina(() => import("./pages/servicos/ComputadorLento"));
const ComputadorNaoLiga = lazyPagina(() => import("./pages/servicos/ComputadorNaoLiga"));
const ManutencaoTV = lazyPagina(() => import("./pages/servicos/ManutencaoTV"));
const ConsertoCelular = lazyPagina(() => import("./pages/servicos/ConsertoCelular"));

// Novas cidades
const TecnicoInformaticaPiraquara = lazyPagina(() => import("./pages/TecnicoInformaticaPiraquara"));
const TecnicoInformaticaCampoMagro = lazyPagina(() => import("./pages/TecnicoInformaticaCampoMagro"));
const TecnicoInformaticaQuatroBarras = lazyPagina(() => import("./pages/TecnicoInformaticaQuatroBarras"));

// Páginas combinadas Serviço + Bairro
const FormatacaoCentro = lazyPagina(() => import("./pages/servico-bairro/FormatacaoCentro"));
const ConsertoNotebookBatel = lazyPagina(() => import("./pages/servico-bairro/ConsertoNotebookBatel"));
const RemocaoVirusPortao = lazyPagina(() => import("./pages/servico-bairro/RemocaoVirusPortao"));
const UpgradeSsdSantaFelicidade = lazyPagina(() => import("./pages/servico-bairro/UpgradeSsdSantaFelicidade"));
const FormatacaoSaoJosePinhais = lazyPagina(() => import("./pages/servico-bairro/FormatacaoSaoJosePinhais"));
const ConsertoNotebookCIC = lazyPagina(() => import("./pages/servico-bairro/ConsertoNotebookCIC"));
const RedesWifiAraucaria = lazyPagina(() => import("./pages/servico-bairro/RedesWifiAraucaria"));
const RemocaoVirusCentro = lazyPagina(() => import("./pages/servico-bairro/RemocaoVirusCentro"));
const UpgradeSsdBatel = lazyPagina(() => import("./pages/servico-bairro/UpgradeSsdBatel"));
const FormatacaoPortao = lazyPagina(() => import("./pages/servico-bairro/FormatacaoPortao"));
const RedesWifiCIC = lazyPagina(() => import("./pages/servico-bairro/RedesWifiCIC"));
const BackupCentro = lazyPagina(() => import("./pages/servico-bairro/BackupCentro"));
const ConsertoNotebookPortao = lazyPagina(() => import("./pages/servico-bairro/ConsertoNotebookPortao"));
// RedesWifiSantaFelicidade legado desativado; rota agora usa RedesWifiSantaFelicidadeAncora (indexável).
const FormatacaoCampoComprido = lazyPagina(() => import("./pages/servico-bairro/FormatacaoCampoComprido"));
const RemocaoVirusBatel = lazyPagina(() => import("./pages/servico-bairro/RemocaoVirusBatel"));
const MontagemPcCIC = lazyPagina(() => import("./pages/servico-bairro/MontagemPcCIC"));

// SJP
const RemocaoVirusSaoJosePinhais = lazyPagina(() => import("./pages/servico-bairro/RemocaoVirusSaoJosePinhais"));
const ConsertoNotebookSaoJosePinhais = lazyPagina(() => import("./pages/servico-bairro/ConsertoNotebookSaoJosePinhais"));
const UpgradeSsdSaoJosePinhais = lazyPagina(() => import("./pages/servico-bairro/UpgradeSsdSaoJosePinhais"));
const RedesWifiSaoJosePinhais = lazyPagina(() => import("./pages/servico-bairro/RedesWifiSaoJosePinhais"));

// Araucária
const FormatacaoAraucaria = lazyPagina(() => import("./pages/servico-bairro/FormatacaoAraucaria"));
const RemocaoVirusAraucaria = lazyPagina(() => import("./pages/servico-bairro/RemocaoVirusAraucaria"));
const ConsertoNotebookAraucaria = lazyPagina(() => import("./pages/servico-bairro/ConsertoNotebookAraucaria"));
const UpgradeSsdAraucaria = lazyPagina(() => import("./pages/servico-bairro/UpgradeSsdAraucaria"));

// Campo Largo
const FormatacaoCampoLargo = lazyPagina(() => import("./pages/servico-bairro/FormatacaoCampoLargo"));
const RemocaoVirusCampoLargo = lazyPagina(() => import("./pages/servico-bairro/RemocaoVirusCampoLargo"));
const ConsertoNotebookCampoLargo = lazyPagina(() => import("./pages/servico-bairro/ConsertoNotebookCampoLargo"));
const RedesWifiCampoLargo = lazyPagina(() => import("./pages/servico-bairro/RedesWifiCampoLargo"));

// Pinhais
const FormatacaoPinhais = lazyPagina(() => import("./pages/servico-bairro/FormatacaoPinhais"));
const RemocaoVirusPinhais = lazyPagina(() => import("./pages/servico-bairro/RemocaoVirusPinhais"));
const ConsertoNotebookPinhais = lazyPagina(() => import("./pages/servico-bairro/ConsertoNotebookPinhais"));
const UpgradeSsdPinhais = lazyPagina(() => import("./pages/servico-bairro/UpgradeSsdPinhais"));
const RedesWifiPinhais = lazyPagina(() => import("./pages/servico-bairro/RedesWifiPinhais"));

// Wi-Fi + TV Smart por bairro (indexáveis — 5 bairros âncora)
const RedesWifiBatel = lazyPagina(() => import("./pages/servico-bairro/RedesWifiBatel"));
const RedesWifiCentro = lazyPagina(() => import("./pages/servico-bairro/RedesWifiCentro"));
const RedesWifiAguaVerde = lazyPagina(() => import("./pages/servico-bairro/RedesWifiAguaVerde"));
const RedesWifiPortao = lazyPagina(() => import("./pages/servico-bairro/RedesWifiPortao"));
const ManutencaoTvBatel = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvBatel"));
const ManutencaoTvCentro = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvCentro"));
const ManutencaoTvAguaVerde = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvAguaVerde"));
const ManutencaoTvCic = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvCic"));
const ManutencaoTvPortao = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvPortao"));
// Onda 2 — completa 12 bairros-âncora indexáveis (Wi-Fi + TV Smart)
const RedesWifiBigorrilho = lazyPagina(() => import("./pages/servico-bairro/RedesWifiBigorrilho"));
const RedesWifiCabral = lazyPagina(() => import("./pages/servico-bairro/RedesWifiCabral"));
const RedesWifiSantaFelicidadeAncora = lazyPagina(() => import("./pages/servico-bairro/RedesWifiSantaFelicidadeAncora"));
const RedesWifiBoaVista = lazyPagina(() => import("./pages/servico-bairro/RedesWifiBoaVista"));
const RedesWifiCristoRei = lazyPagina(() => import("./pages/servico-bairro/RedesWifiCristoRei"));
const RedesWifiCajuru = lazyPagina(() => import("./pages/servico-bairro/RedesWifiCajuru"));
const RedesWifiBoqueirao = lazyPagina(() => import("./pages/servico-bairro/RedesWifiBoqueirao"));
const ManutencaoTvBigorrilho = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvBigorrilho"));
const ManutencaoTvCabral = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvCabral"));
const ManutencaoTvSantaFelicidade = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvSantaFelicidade"));
const ManutencaoTvBoaVista = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvBoaVista"));
const ManutencaoTvCristoRei = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvCristoRei"));
const ManutencaoTvCajuru = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvCajuru"));
const ManutencaoTvBoqueirao = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvBoqueirao"));
// Onda 3 — 4 novos bairros âncora (Wi-Fi + TV Smart)
const RedesWifiJardimAmericas = lazyPagina(() => import("./pages/servico-bairro/RedesWifiJardimAmericas"));
const ManutencaoTvJardimAmericas = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvJardimAmericas"));
const RedesWifiEcoville = lazyPagina(() => import("./pages/servico-bairro/RedesWifiEcoville"));
const ManutencaoTvEcoville = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvEcoville"));
const RedesWifiAltoXV = lazyPagina(() => import("./pages/servico-bairro/RedesWifiAltoXV"));
const ManutencaoTvAltoXV = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvAltoXV"));
const RedesWifiReboucas = lazyPagina(() => import("./pages/servico-bairro/RedesWifiReboucas"));
const ManutencaoTvReboucas = lazyPagina(() => import("./pages/servico-bairro/ManutencaoTvReboucas"));

// Dynamic service+city page
const ServicoCidadePage = lazyPagina(() => import("./pages/servico-bairro/ServicoBairroGerado"));

// Dynamic problem/intent pages (50 páginas de intenção de busca)
const ProblemaPage = lazyPagina(() => import("./pages/ProblemaPage"));
const NotebookNaoLiga = lazyPagina(() => import("./pages/problemas/NotebookNaoLiga"));
const ProblemaComputadorLento = lazyPagina(() => import("./pages/problemas/ComputadorLento"));
const ProblemasHub = lazyPagina(() => import("./pages/problemas/ProblemasHub"));
const ClusterProblemaPage = lazyPagina(() => import("./pages/problemas/ClusterProblemaPage"));
const EquipamentosHub = lazyPagina(() => import("./pages/equipamentos/EquipamentosHub"));
const ClusterEquipamentoPage = lazyPagina(() => import("./pages/equipamentos/ClusterEquipamentoPage"));
const SolucoesHub = lazyPagina(() => import("./pages/solucoes/SolucoesHub"));
const ClusterSolucaoPage = lazyPagina(() => import("./pages/solucoes/ClusterSolucaoPage"));


// Pillar do cluster de informática
const GuiaTecnicoInformatica = lazyPagina(() => import("./pages/GuiaTecnicoInformatica"));
const AutoridadeTecnica = lazyPagina(() => import("./pages/AutoridadeTecnica"));

// Fase 3 — Biblioteca Técnica (glossário + ferramentas orientativas)
const GlossarioHub = lazyPagina(() => import("./pages/biblioteca/GlossarioHub"));
const GlossarioTermo = lazyPagina(() => import("./pages/biblioteca/GlossarioTermo"));
const FerramentasHub = lazyPagina(() => import("./pages/biblioteca/FerramentasHub"));
const FerramentaChecklist = lazyPagina(() => import("./pages/biblioteca/FerramentaChecklist"));

// Fase 4 — Guias de decisão independentes (/decisoes)
const DecisoesHub = lazyPagina(() => import("./pages/decisoes/DecisoesHub"));
const DecisaoGuia = lazyPagina(() => import("./pages/decisoes/DecisaoGuia"));

// Taxonomia de entidades (/entidades)
const EntidadesHub = lazyPagina(() => import("./pages/entidades/EntidadesHub"));
const EntidadeDetalhe = lazyPagina(() => import("./pages/entidades/EntidadeDetalhe"));

// Procedimentos Técnicos hub
const ProcedimentosPlaca = lazyPagina(() => import("./pages/ProcedimentosPlaca"));

// Marcas
const Marcas = lazyPagina(() => import("./pages/Marcas"));
const MarcaPage = lazyPagina(() => import("./pages/MarcaPage"));

// CFTV
const CFTVPage = lazyPagina(() => import("./pages/CFTV"));
const CFTVCuritiba = lazyPagina(() => import("./pages/cftv/CFTVCuritiba"));
const CFTVSaoJosePinhais = lazyPagina(() => import("./pages/cftv/CFTVSaoJosePinhais"));
const CFTVLitoral = lazyPagina(() => import("./pages/cftv/CFTVLitoral"));
const CFTVGuaratuba = lazyPagina(() => import("./pages/cftv/CFTVGuaratuba"));
const CFTVAraucaria = lazyPagina(() => import("./pages/cftv/CFTVAraucaria"));
const CFTVCampoLargo = lazyPagina(() => import("./pages/cftv/CFTVCampoLargo"));
const CFTVPinhais = lazyPagina(() => import("./pages/cftv/CFTVPinhais"));

const WhatsAppChatbot = lazy(() => import("@/components/WhatsAppChatbot").then((m) => ({ default: m.WhatsAppChatbot })));
const SocialProofProvider = lazy(() => import("@/components/social-proof").then((m) => ({ default: m.SocialProofProvider })));
const GA4ChecklistPanel = lazy(() => import("@/components/GA4ChecklistPanel").then((m) => ({ default: m.GA4ChecklistPanel })));
const Toaster = lazy(() => import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));


export const IdleEnhancements = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const activate = () => setEnabled(true);
    const idleId: number = typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback(activate, { timeout: 4500 })
      : (globalThis.setTimeout(activate, 2500) as unknown as number);

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      } else {
        globalThis.clearTimeout(idleId);
      }

    };
  }, []);

  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
      <WhatsAppChatbot />
      <SocialProofProvider />
      <GA4ChecklistPanel />
    </Suspense>
  );
};


// ─────────────────────────────────────────────────────────────
// Gerado pela migração TanStack Start a partir de src/LegacyApp.tsx.
// Cada rota em src/routes/ referencia um elemento deste registro,
// preservando lazy-loading e code-splitting por página.
// ─────────────────────────────────────────────────────────────

export const legacyRouteElements: Record<string, () => React.ReactElement> = {
  "/": () => <Index />,
  "/servicos": () => <Servicos />,
  "/atendimento-domicilio": () => <AtendimentoDomicilio />,
  "/atendimento-remoto": () => <AtendimentoRemoto />,
  "/arrumar-pc": () => <ArrumarPC />,
  "/arrumar-pc/online": () => <ArrumarPC />,
  "/arrumar-pc/servico/:servico/:cidade": () => <ArrumarPCServicoCidade />,
  "/arrumar-pc/:cidade": () => <ArrumarPCCity />,
  "/empresa-de-ti-curitiba": () => <EmpresaDeTiCuritiba />,
  "/precos-e-politicas": () => <PrecosEPoliticas />,
  "/valores": () => <PrecosEPoliticas />,
  "/tecnico-informatica-curitiba": () => <TecnicoInformaticaCuritiba />,
  "/tecnico-informatica-sao-jose-pinhais": () => <TecnicoInformaticaSaoJosePinhais />,
  "/tecnico-informatica-araucaria": () => <TecnicoInformaticaAraucaria />,
  "/tecnico-informatica-campo-largo": () => <TecnicoInformaticaCampoLargo />,
  "/tecnico-informatica-pinhais": () => <TecnicoInformaticaPinhais />,
  "/tecnico-informatica-colombo": () => <TecnicoInformaticaColombo />,
  "/tecnico-informatica-fazenda-rio-grande": () => <TecnicoInformaticaFazendaRioGrande />,
  "/tecnico-informatica-almirante-tamandare": () => <TecnicoInformaticaAlmiranteTamandare />,
  "/tecnico-informatica-piraquara": () => <TecnicoInformaticaPiraquara />,
  "/tecnico-informatica-campo-magro": () => <TecnicoInformaticaCampoMagro />,
  "/tecnico-informatica-quatro-barras": () => <TecnicoInformaticaQuatroBarras />,
  "/sobre": () => <Sobre />,
  "/gestor-responsavel": () => <GestorResponsavel />,
  "/contato": () => <Contato />,
  "/obrigado": () => <Obrigado />,
  "/blog": () => <Blog />,
  "/blog/:slug": () => <BlogPost />,
  "/faq": () => <FAQ />,
  "/como-funciona": () => <ComoFunciona />,
  "/diagnostico-tecnico": () => <DiagnosticoTecnico />,
  "/diagnostico-60s": () => <Diagnostico60s />,
  "/equipamentos-atendidos": () => <EquipamentosAtendidos />,
  "/areas-atendidas": () => <AreasAtendidas />,
  "/seguranca-dos-dados": () => <SegurancaDosDados />,
  "/politica-de-pecas-do-cliente": () => <PoliticaPecasCliente />,
  "/avaliar": () => <Avaliar />,
  "/excluir-meus-dados": () => <ExcluirMeusDados />,
  "/problemas-reais-e-casos": () => <ProblemasReaisCasos />,
  "/coleta-e-entrega": () => <ColetaEntrega />,
  "/coleta-formulario": () => <ColetaFormulario />,
  "/quando-nao-compensa": () => <QuandoNaoCompensa />,
  "/seja-parceiro": () => <SejaParceiro />,
  "/profissionais": () => <DiretorioProfissionais />,
  "/profissionais/cadastro": () => <CadastroParceiro />,
  "/profissional/:slug": () => <PerfilProfissional />,
  "/profissionais/:estado": () => <ProfissionaisLocal />,
  "/profissionais/:estado/:cidade": () => <ProfissionaisLocal />,
  "/atendimento": () => <Atendimento />,
  "/empresas": () => <Empresas />,
  "/valorizacao-do-trabalho-tecnico": () => <ValorizacaoTrabalhoTecnico />,
  "/bairros/centro-civico": () => <CentroCivicoMalha />,
  "/bairros/alto-da-xv": () => <AltoDaXvMalha />,
  "/bairros/prado-velho": () => <PradoVelhoMalha />,
  "/bairros/campina-do-siqueira": () => <CampinaDoSiqueiraMalha />,
  "/bairros/bairro-alto": () => <BairroAltoMalha />,
  "/bairros/atuba": () => <AtubaMalha />,
  "/bairros/guabirotuba": () => <GuabirotubaMalha />,
  "/bairros/fanny": () => <FannyMalha />,
  "/bairros/lindoia": () => <LindoiaMalha />,
  "/bairros/santa-quiteria": () => <SantaQuiteriaMalha />,
  "/bairros/vista-alegre": () => <VistaAlegreMalha />,
  "/bairros/butiatuvinha": () => <ButiatuvinhaMalha />,
  "/bairros": () => <BairrosHub />,
  "/bairros/centro": () => <Centro />,
  "/bairros/batel": () => <Batel />,
  "/bairros/portao": () => <Portao />,
  "/bairros/campo-comprido": () => <CampoComprido />,
  "/bairros/cic": () => <CIC />,
  "/bairros/santa-felicidade": () => <SantaFelicidade />,
  "/bairros/sao-jose-dos-pinhais": () => <SaoJoseDosPinhais />,
  "/bairros/afonso-pena": () => <AfonsoPena />,
  "/bairros/cruzeiro": () => <Cruzeiro />,
  "/bairros/aristocrata": () => <Aristocrata />,
  "/bairros/braga": () => <Braga />,
  "/bairros/costeira": () => <Costeira />,
  "/bairros/aviacao": () => <Aviacao />,
  "/bairros/parque-da-fonte": () => <ParqueDaFonte />,
  "/bairros/guatupe": () => <Guatupe />,
  "/bairros/sao-cristovao": () => <SaoCristovao />,
  "/bairros/sao-domingos": () => <SaoDomingos />,
  "/bairros/sao-marcos": () => <SaoMarcos />,
  "/bairros/sao-francisco": () => <SaoFrancisco />,
  "/bairros/del-rey": () => <DelRey />,
  "/bairros/barro-preto": () => <BarroPreto />,
  "/bairros/centro-araucaria": () => <AraucariaCentro />,
  "/bairros/capela-velha": () => <CapelaVelhaAraucaria />,
  "/bairros/thomaz-coelho": () => <ThomazCoelhoAraucaria />,
  "/bairros/cachoeira-araucaria": () => <CacheiraAraucaria />,
  "/bairros/thomaz-coelho-ii": () => <ThomazCoelhoIIAraucaria />,
  "/bairros/jardim-boa-vista-araucaria": () => <JardimBoaVistaAraucaria />,
  "/bairros/sao-miguel-araucaria": () => <SaoMiguelAraucaria />,
  "/bairros/california-araucaria": () => <CaliforniaAraucaria />,
  "/bairros/vila-nova-araucaria": () => <VilaNovaAraucaria />,
  "/bairros/industrial-araucaria": () => <IndustrialAraucaria />,
  "/bairros/jardim-iguacu-araucaria": () => <JardimIguacuAraucaria />,
  "/bairros/planta-sao-tiago-araucaria": () => <PlantaSaoTiagoAraucaria />,
  "/bairros/jardim-shangrila-araucaria": () => <JardimShangrilaAraucaria />,
  "/bairros/jardim-laranjeiras-cl": () => <JardimLaranjeirasCL />,
  "/bairros/sao-marcos-campo-largo": () => <SaoMarcosCampoLargo />,
  "/bairros/sao-jose-campo-largo": () => <SaoJoseCampoLargo />,
  "/bairros/jardim-esperanca-cl": () => <JardimEsperancaCL />,
  "/bairros/colonia-malhada-cl": () => <ColoniaMalhadaCL />,
  "/bairros/lamenha-grande-cl": () => <LamenhaGrandeCL />,
  "/bairros/vila-candida-cl": () => <VilaCandidaCL />,
  "/bairros/jardim-novo-horizonte-cl": () => <JardimNovoHorizonteCL />,
  "/bairros/timbotuva-cl": () => <TimbotuvaCL />,
  "/bairros/jardim-planalto-ii-cl": () => <JardimPlanaltoIICL />,
  "/bairros/jardim-pedro-demeterco": () => <JardimPedroDemeterco />,
  "/bairros/jardim-karla-pinhais": () => <JardimKarlaPinhais />,
  "/bairros/jardim-claudia-ii-pinhais": () => <JardimClaudiaIIPinhais />,
  "/bairros/jardim-wissinger-pinhais": () => <JardimWissingerPinhais />,
  "/bairros/vila-amelia-pinhais": () => <VilaAmeliaPinhais />,
  "/bairros/jardim-esplanada-pinhais": () => <JardimEsplanadaPinhais />,
  "/bairros/vila-maria-antonieta-pinhais": () => <VilaMariaAntonietaPinhais />,
  "/bairros/jardim-dona-rosa-pinhais": () => <JardimDonaRosaPinhais />,
  "/bairros/parque-nascentes-pinhais": () => <ParqueNascentesPinhais />,
  "/bairros/jardim-tropical-pinhais": () => <JardimTropicalPinhais />,
  "/bairros/centro-campo-largo": () => <CampoLargoCentro />,
  "/bairros/ferraria": () => <FerrariaCampoLargo />,
  "/bairros/jardim-guilhermina": () => <JardimGuilherminaCampoLargo />,
  "/bairros/centro-pinhais": () => <PinhaisCentro />,
  "/bairros/weissopolis": () => <WeissopolisPinhais />,
  "/bairros/pineville": () => <PinevillePinhais />,
  "/bairros/centro-colombo": () => <CentroColombo />,
  "/bairros/maracana-colombo": () => <MaracanaColombo />,
  "/bairros/guaraituba-colombo": () => <GuaraitubaColombo />,
  "/bairros/centro-fazenda-rio-grande": () => <CentroFRG />,
  "/bairros/eucaliptos-frg": () => <EucaliptosFRG />,
  "/bairros/nacoes-frg": () => <NacoesFRG />,
  "/bairros/centro-almirante-tamandare": () => <CentroAlmiranteTamandare />,
  "/bairros/jardim-monte-santo": () => <JardimMontoSantoAT />,
  "/bairros/cachoeira-at": () => <CachoeiraAT />,
  "/bairros/agua-verde": () => <AguaVerde />,
  "/bairros/bigorrilho": () => <Bigorrilho />,
  "/bairros/merces": () => <Merces />,
  "/bairros/boa-vista": () => <BoaVista />,
  "/bairros/juveve": () => <Juveve />,
  "/bairros/cabral": () => <Cabral />,
  "/bairros/cristo-rei": () => <CristoRei />,
  "/bairros/cajuru": () => <Cajuru />,
  "/bairros/uberaba": () => <Uberaba />,
  "/bairros/pinheirinho": () => <Pinheirinho />,
  "/bairros/xaxim": () => <Xaxim />,
  "/bairros/alto-da-gloria": () => <AltoGloria />,
  "/bairros/reboucas": () => <Reboucas />,
  "/bairros/vila-izabel": () => <VilaIzabel />,
  "/bairros/seminario": () => <Seminario />,
  "/bairros/hugo-lange": () => <HugoLange />,
  "/bairros/jardim-social": () => <JardimSocial />,
  "/bairros/jardim-das-americas": () => <JardimAmericas />,
  "/bairros/taruma": () => <Taruma />,
  "/bairros/capao-da-imbuia": () => <CapaoImbuia />,
  "/bairros/hauer": () => <Hauer />,
  "/bairros/alto-boqueirao": () => <AltoBoqueiraoCtba />,
  "/bairros/sitio-cercado": () => <SitioCercado />,
  "/bairros/novo-mundo": () => <NovoMundo />,
  "/bairros/fazendinha": () => <Fazendinha />,
  "/bairros/jardim-botanico": () => <AguaVerdeBairro />,
  "/bairros/quississana-sjp": () => <QuissisanaSJP />,
  "/bairros/academia-sjp": () => <AcademiaSJP />,
  "/bairros/colonia-murici-sjp": () => <ColoniaMurcySJP />,
  "/bairros/boneca-do-iguacu-sjp": () => <BonecaSJP />,
  "/bairros/ouro-fino-sjp": () => <OuroFinoSJP />,
  "/bairros/agricola-sjp": () => <AgricolareSJP />,
  "/bairros/campo-largo-roseira-sjp": () => <CampoLargoSJP />,
  "/bairros/italia-sjp": () => <ItaliaSJP />,
  "/bairros/borda-campo-sjp": () => <BordoDoCampoSJP2 />,
  "/bairros/independencia-sjp": () => <IndependenciaSJP />,
  "/bairros/osvaldo-cruz-colombo": () => <OswaldoCruzColombo />,
  "/bairros/sao-dimas-colombo": () => <ColareColombo />,
  "/bairros/campina-grande-colombo": () => <CampinaGrandeColombo />,
  "/bairros/taxiqueira-colombo": () => <TaxiqueiraColomboo />,
  "/bairros/embu-colombo": () => <EmbuColombo />,
  "/bairros/jardim-uniao-piraquara": () => <JardimUniaoPiraquara />,
  "/bairros/jardim-santo-antonio-piraquara": () => <JardimSantoAntonioPiraquara />,
  "/bairros/jardim-sao-paulo-piraquara": () => <JardimSaoPauloPiraquara />,
  "/bairros/irai-piraquara": () => <IraiPiraquara />,
  "/bairros/boa-vista-at": () => <BoaVistaTamandare />,
  "/bairros/campo-tenente-at": () => <CampoDoTenenteTamandare />,
  "/bairros/jardim-paranagua-at": () => <JardimParanaguaTamandare />,
  "/bairros/jardim-sao-jorge-at": () => <JardimSaoJorgeTamandare />,
  "/bairros/parque-industrial-frg": () => <EucaliptosFRG2 />,
  "/bairros/jardim-condor-frg": () => <JardimCondorFRG />,
  "/bairros/jardim-ipe-frg": () => <JardimIperigoFRG />,
  "/bairros/jardim-das-pedras-frg": () => <JardimDasPedrasFRG />,
  "/bairros/joquei-clube-cm": () => <JoqueiFRCM />,
  "/bairros/antonio-olivero-cm": () => <AntonioOliveraCM />,
  "/bairros/espigao-alegre-cm": () => <EspigoAlegreCM />,
  "/bairros/jardim-florestal-qb": () => <JardimFlorestalQB />,
  "/bairros/jardim-japao-qb": () => <JardimJaponeQB />,
  "/bairros/graciosa-qb": () => <GraciosaMirQB />,
  "/bairros/boqueirao": () => <Boqueirao />,
  "/bairros/bacacheri": () => <Bacacheri />,
  "/bairros/tingui": () => <Tingui />,
  "/bairros/chapada": () => <ChapadaAraucaria />,
  "/bairros/costeira-araucaria": () => <CosteiraAraucaria />,
  "/bairros/iguacu-araucaria": () => <IguacuAraucaria />,
  "/bairros/campina-da-barra": () => <CampinaDaBarra />,
  "/bairros/porto-das-laranjeiras": () => <PortoDasLaranjeiras />,
  "/bairros/tindiquera": () => <Tindiquera />,
  "/bairros/barigui-araucaria": () => <BariguiAraucaria />,
  "/bairros/fazenda-velha-araucaria": () => <FazendaVelhaAraucaria />,
  "/bairros/estacao-araucaria": () => <EstacaoAraucaria />,
  "/bairros/boqueirao-araucaria": () => <BoqueiraoAraucaria />,
  "/bairros/sabia": () => <SabiaAraucaria />,
  "/bairros/passauna": () => <PassaunaAraucaria />,
  "/bairros/guajuvira": () => <GuajuviraAraucaria />,
  "/bairros/alto-maracana": () => <AltoMaracanaColombo />,
  "/bairros/atuba-colombo": () => <AtubaColombo />,
  "/bairros/campo-pequeno": () => <CampoPequenoColombo />,
  "/bairros/fatima-colombo": () => <FatimaColombo />,
  "/bairros/gabirobal": () => <GabirobalColombo />,
  "/bairros/jardim-osasco": () => <JardimOsascoColombo />,
  "/bairros/monza-colombo": () => <MonzaColombo />,
  "/bairros/palmital-colombo": () => <PalmitalColombo />,
  "/bairros/roca-grande": () => <RocaGrandeColombo />,
  "/bairros/sao-gabriel-colombo": () => <SaoGabrielColombo />,
  "/bairros/santa-terezinha-colombo": () => <SantaTerezinhaColombo />,
  "/bairros/emiliano-perneta": () => <EmilianoPerneta />,
  "/bairros/maria-antonieta": () => <MariaAntonieta />,
  "/bairros/vargem-grande": () => <VargemGrande />,
  "/bairros/estancia-pinhais": () => <EstanciaPinhais />,
  "/bairros/alto-taruma": () => <AltoTaruma />,
  "/bairros/graciosa": () => <GraciosaPinhais />,
  "/bairros/jardim-amelia": () => <JardimAmelia />,
  "/bairros/palmital-pinhais": () => <PalmitalPinhais />,
  "/bairros/atuba-pinhais": () => <AtubaPinhais />,
  "/bairros/sete-vilas": () => <SeteVilas />,
  "/bairros/vila-taruma": () => <VilaTaruma />,
  "/bairros/vale-das-aguas": () => <ValeDasAguas />,
  "/bairros/jardim-claudia": () => <JardimClaudia />,
  "/bairros/jardim-america-campo-largo": () => <JardimAmericaCL />,
  "/bairros/botiatuva": () => <BotiatuvaCL />,
  "/bairros/rondinha": () => <RondinhaCL />,
  "/bairros/sao-silvestre": () => <SaoSilvestreCL />,
  "/bairros/tres-corregos": () => <TresCorregosCL />,
  "/bairros/itaqui": () => <ItaquiCL />,
  "/bairros/ouro-fino": () => <OuroFinoCL />,
  "/bairros/bateias": () => <BateiasCL />,
  "/bairros/palmital-campo-largo": () => <PalmitalCL />,
  "/bairros/santa-cruz-campo-largo": () => <SantaCruzCL />,
  "/bairros/correia-de-freitas": () => <CorreiaDeFreitasCL />,
  "/bairros/jardim-planalto-campo-largo": () => <JardimPlanaltoCL />,
  "/bairros/vila-solene": () => <VilaSoleneCL />,
  "/bairros/iguacu-frg": () => <IguacuFRG />,
  "/bairros/gralha-azul": () => <GralhaAzulFRG />,
  "/bairros/santa-terezinha-frg": () => <SantaTerezinhaFRG />,
  "/bairros/jardim-estados": () => <JardimEstadosFRG />,
  "/bairros/pioneiros-frg": () => <PioneirosFRG />,
  "/bairros/sao-lourenco-frg": () => <SaoLourencoFRG />,
  "/bairros/hortencia-frg": () => <HortenciaFRG />,
  "/bairros/tangua-at": () => <TanguaAT />,
  "/bairros/sao-venancio": () => <SaoVenancioAT />,
  "/bairros/jardim-graziela": () => <JardimGrazielaAT />,
  "/bairros/jardim-roma": () => <JardimRomaAT />,
  "/bairros/colonia-antonio-prado": () => <ColoniaAntonioPradoAT />,
  "/bairros/tranqueira-at": () => <TranqueiraAT />,
  "/bairros/jardim-paraiso-at": () => <JardimParaisoAT />,
  "/bairros/centro-piraquara": () => <CentroPiraquara />,
  "/bairros/jardim-primavera-piraquara": () => <JardimPrimaveraPiraquara />,
  "/bairros/planta-deodoro-piraquara": () => <PlantaDeodoroPiraquara />,
  "/bairros/vila-macedo-piraquara": () => <VilaMacedoPiraquara />,
  "/bairros/guarituba-piraquara": () => <GuaritubaPiraquara />,
  "/bairros/prado-velho-piraquara": () => <PradoVelhoPiraquara />,
  "/bairros/sao-cristao-piraquara": () => <SaoCristaoPiraquara />,
  "/bairros/jardim-bela-vista-piraquara": () => <JardimBelaVistaPiraquara />,
  "/bairros/caiua-piraquara": () => <CaiuaPiraquara />,
  "/bairros/centro-campo-magro": () => <CentroCampoMagro />,
  "/bairros/sede-campo-magro": () => <SedeCampoMagro />,
  "/bairros/jardim-boa-vista-cm": () => <JardimBoaVistaCM />,
  "/bairros/sao-sebastiao-cm": () => <SaoSebastiaoCM />,
  "/bairros/rio-verde-cm": () => <RioVerdeCM />,
  "/bairros/botiatuva-cm": () => <BotiatuvaCM />,
  "/bairros/centro-quatro-barras": () => <CentroQuatroBarras />,
  "/bairros/jardim-menino-deus-qb": () => <JardimMeninoDeusQB />,
  "/bairros/vila-sao-jose-qb": () => <VilaSaoJoseQB />,
  "/bairros/borda-do-campo-qb": () => <BordaDoCampoQB />,
  "/bairros/sao-lourenco-qb": () => <SaoLourencoQB />,
  "/bairros/vila-maria-qb": () => <VilaMariaQB />,
  "/bairros/cidade-jardim-sjp": () => <CidadeJardimSJP />,
  "/bairros/pedro-moro-sjp": () => <PedroMoroSJP />,
  "/bairros/ipe-sjp": () => <IpeSJP />,
  "/bairros/rio-pequeno-sjp": () => <RioPequenoSJP />,
  "/bairros/borda-do-campo-sjp": () => <BordaDoCampoSJP />,
  "/ads/tecnico-informatica-curitiba": () => <TecnicoInformaticaCuritibaAds />,
  "/cftv": () => <CFTVPage />,
  "/cftv/curitiba": () => <CFTVCuritiba />,
  "/cftv/sao-jose-dos-pinhais": () => <CFTVSaoJosePinhais />,
  "/cftv/litoral": () => <CFTVLitoral />,
  "/cftv/guaratuba": () => <CFTVGuaratuba />,
  "/cftv/araucaria": () => <CFTVAraucaria />,
  "/cftv/campo-largo": () => <CFTVCampoLargo />,
  "/cftv/pinhais": () => <CFTVPinhais />,
  "/servicos/formatacao": () => <ServicoCore slug="formatacao" />,
  "/servicos/manutencao-de-notebook": () => <ServicoCore slug="manutencao-de-notebook" />,
  "/servicos/manutencao-de-computador": () => <ServicoCore slug="manutencao-de-computador" />,
  "/servicos/upgrade-ssd-ram": () => <ServicoCore slug="upgrade-ssd-ram" />,
  "/servicos/remocao-de-virus": () => <ServicoCore slug="remocao-de-virus" />,
  "/servicos/recuperacao-de-dados": () => <ServicoCore slug="recuperacao-de-dados" />,
  "/servicos/redes-e-wifi": () => <ServicoCore slug="redes-e-wifi" />,
  "/servicos/suporte-tecnico-empresarial": () => <ServicoCore slug="suporte-tecnico-empresarial" />,
  "/servicos/manutencao-preventiva-empresas": () => <ServicoCore slug="manutencao-preventiva-empresas" />,
  "/servicos/backup-para-empresas": () => <ServicoCore slug="backup-para-empresas" />,
  "/servicos/suporte-home-office": () => <ServicoCore slug="suporte-home-office" />,
  "/servicos/montagem-de-pc": () => <ServicoCore slug="montagem-de-pc" />,
  "/servicos/pc-gamer": () => <ServicoCore slug="pc-gamer" />,
  "/servicos/conserto-tv": () => <ServicoCore slug="conserto-tv" />,
  "/servicos/conserto-placa": () => <ServicoCore slug="conserto-placa" />,
  "/servicos/conserto-monitor": () => <ServicoCore slug="conserto-monitor" />,
  "/servicos/conserto-impressora-3d": () => <ServicoCore slug="conserto-impressora-3d" />,

  "/servicos/montagem-pc": () => <MontagemPc />,
  "/servicos/computador-lento": () => <ComputadorLento />,
  "/servicos/computador-nao-liga": () => <ComputadorNaoLiga />,
  "/servicos/manutencao-tv": () => <ManutencaoTV />,
  "/servicos/conserto-celular": () => <ConsertoCelular />,
  "/servicos/formatacao-computador/centro": () => <FormatacaoCentro />,
  "/servicos/conserto-pc-notebook/batel": () => <ConsertoNotebookBatel />,
  "/servicos/remocao-virus/portao": () => <RemocaoVirusPortao />,
  "/servicos/upgrade-ssd-memoria/santa-felicidade": () => <UpgradeSsdSantaFelicidade />,
  "/servicos/formatacao-computador/sao-jose-dos-pinhais": () => <FormatacaoSaoJosePinhais />,
  "/servicos/conserto-pc-notebook/cic": () => <ConsertoNotebookCIC />,
  "/servicos/redes-wifi/araucaria": () => <RedesWifiAraucaria />,
  "/servicos/remocao-virus/centro": () => <RemocaoVirusCentro />,
  "/servicos/upgrade-ssd-memoria/batel": () => <UpgradeSsdBatel />,
  "/servicos/formatacao-computador/portao": () => <FormatacaoPortao />,
  "/servicos/redes-wifi/cic": () => <RedesWifiCIC />,
  "/servicos/redes-wifi/batel": () => <RedesWifiBatel />,
  "/servicos/redes-wifi/centro": () => <RedesWifiCentro />,
  "/servicos/redes-wifi/agua-verde": () => <RedesWifiAguaVerde />,
  "/servicos/redes-wifi/portao": () => <RedesWifiPortao />,
  "/servicos/manutencao-tv/batel": () => <ManutencaoTvBatel />,
  "/servicos/manutencao-tv/centro": () => <ManutencaoTvCentro />,
  "/servicos/manutencao-tv/agua-verde": () => <ManutencaoTvAguaVerde />,
  "/servicos/manutencao-tv/cic": () => <ManutencaoTvCic />,
  "/servicos/manutencao-tv/portao": () => <ManutencaoTvPortao />,
  "/servicos/redes-wifi/bigorrilho": () => <RedesWifiBigorrilho />,
  "/servicos/redes-wifi/cabral": () => <RedesWifiCabral />,
  "/servicos/redes-wifi/boa-vista": () => <RedesWifiBoaVista />,
  "/servicos/redes-wifi/cristo-rei": () => <RedesWifiCristoRei />,
  "/servicos/redes-wifi/cajuru": () => <RedesWifiCajuru />,
  "/servicos/redes-wifi/boqueirao": () => <RedesWifiBoqueirao />,
  "/servicos/manutencao-tv/bigorrilho": () => <ManutencaoTvBigorrilho />,
  "/servicos/manutencao-tv/cabral": () => <ManutencaoTvCabral />,
  "/servicos/manutencao-tv/santa-felicidade": () => <ManutencaoTvSantaFelicidade />,
  "/servicos/manutencao-tv/boa-vista": () => <ManutencaoTvBoaVista />,
  "/servicos/manutencao-tv/cristo-rei": () => <ManutencaoTvCristoRei />,
  "/servicos/manutencao-tv/cajuru": () => <ManutencaoTvCajuru />,
  "/servicos/manutencao-tv/boqueirao": () => <ManutencaoTvBoqueirao />,
  "/servicos/redes-wifi/jardim-das-americas": () => <RedesWifiJardimAmericas />,
  "/servicos/manutencao-tv/jardim-das-americas": () => <ManutencaoTvJardimAmericas />,
  "/servicos/redes-wifi/ecoville": () => <RedesWifiEcoville />,
  "/servicos/manutencao-tv/ecoville": () => <ManutencaoTvEcoville />,
  "/servicos/redes-wifi/alto-da-xv": () => <RedesWifiAltoXV />,
  "/servicos/manutencao-tv/alto-da-xv": () => <ManutencaoTvAltoXV />,
  "/servicos/redes-wifi/reboucas": () => <RedesWifiReboucas />,
  "/servicos/manutencao-tv/reboucas": () => <ManutencaoTvReboucas />,
  "/servicos/backup-recuperacao/centro": () => <BackupCentro />,
  "/servicos/conserto-pc-notebook/portao": () => <ConsertoNotebookPortao />,
  "/servicos/redes-wifi/santa-felicidade": () => <RedesWifiSantaFelicidadeAncora />,
  "/servicos/formatacao-computador/campo-comprido": () => <FormatacaoCampoComprido />,
  "/servicos/remocao-virus/batel": () => <RemocaoVirusBatel />,
  "/servicos/montagem-pc/cic": () => <MontagemPcCIC />,
  "/servicos/remocao-virus/sao-jose-dos-pinhais": () => <RemocaoVirusSaoJosePinhais />,
  "/servicos/conserto-pc-notebook/sao-jose-dos-pinhais": () => <ConsertoNotebookSaoJosePinhais />,
  "/servicos/upgrade-ssd-memoria/sao-jose-dos-pinhais": () => <UpgradeSsdSaoJosePinhais />,
  "/servicos/redes-wifi/sao-jose-dos-pinhais": () => <RedesWifiSaoJosePinhais />,
  "/servicos/formatacao-computador/araucaria": () => <FormatacaoAraucaria />,
  "/servicos/remocao-virus/araucaria": () => <RemocaoVirusAraucaria />,
  "/servicos/conserto-pc-notebook/araucaria": () => <ConsertoNotebookAraucaria />,
  "/servicos/upgrade-ssd-memoria/araucaria": () => <UpgradeSsdAraucaria />,
  "/servicos/formatacao-computador/campo-largo": () => <FormatacaoCampoLargo />,
  "/servicos/remocao-virus/campo-largo": () => <RemocaoVirusCampoLargo />,
  "/servicos/conserto-pc-notebook/campo-largo": () => <ConsertoNotebookCampoLargo />,
  "/servicos/redes-wifi/campo-largo": () => <RedesWifiCampoLargo />,
  "/servicos/formatacao-computador/pinhais": () => <FormatacaoPinhais />,
  "/servicos/remocao-virus/pinhais": () => <RemocaoVirusPinhais />,
  "/servicos/conserto-pc-notebook/pinhais": () => <ConsertoNotebookPinhais />,
  "/servicos/upgrade-ssd-memoria/pinhais": () => <UpgradeSsdPinhais />,
  "/servicos/redes-wifi/pinhais": () => <RedesWifiPinhais />,
  "/servicos/:servico/:cidade": () => <ServicoCidadePage />,
  "/procedimentos-placa": () => <ProcedimentosPlaca />,
  "/procedimentos/:slug": () => <ProblemaPage />,
  "/marcas": () => <Marcas />,
  "/marcas/:slug": () => <MarcaPage />,
  "/problemas": () => <ProblemasHub />,
  "/problemas/notebook-nao-liga": () => <NotebookNaoLiga />,
  "/problemas/computador-lento": () => <ProblemaComputadorLento />,
  "/problemas/wifi-instavel": () => <ClusterProblemaPage />,
  "/problemas/tela-azul": () => <ClusterProblemaPage />,
  "/problemas/arquivos-apagados": () => <ClusterProblemaPage />,
  "/problemas/computador-desliga-sozinho": () => <ClusterProblemaPage />,
  "/problemas/notebook-nao-carrega": () => <ClusterProblemaPage />,
  "/problemas/hd-fazendo-barulho": () => <ClusterProblemaPage />,
  "/problemas/computador-nao-da-imagem": () => <ClusterProblemaPage />,
  "/problemas/cheiro-de-queimado": () => <ClusterProblemaPage />,
  "/problemas/notebook-molhado": () => <ClusterProblemaPage />,
  "/problemas/windows-nao-inicia": () => <ClusterProblemaPage />,
  "/problemas/computador-esquentando": () => <ClusterProblemaPage />,
  "/problemas/impressora-nao-imprime": () => <ClusterProblemaPage />,
  "/problemas/teclado-notebook-nao-funciona": () => <ClusterProblemaPage />,
  "/equipamentos": () => <EquipamentosHub />,
  "/equipamentos/:slug": () => <ClusterEquipamentoPage />,
  "/solucoes": () => <SolucoesHub />,
  "/solucoes/:slug": () => <ClusterSolucaoPage />,
  "/guia-tecnico-informatica": () => <GuiaTecnicoInformatica />,
  "/autoridade-tecnica": () => <AutoridadeTecnica />,
  "/glossario": () => <GlossarioHub />,
  "/glossario/:termo": () => <GlossarioTermo />,
  "/ferramentas": () => <FerramentasHub />,
  "/ferramentas/:slug": () => <FerramentaChecklist />,
  "/decisoes": () => <DecisoesHub />,
  "/decisoes/:slug": () => <DecisaoGuia />,
  "/entidades": () => <EntidadesHub />,
  "/entidades/:slug": () => <EntidadeDetalhe />,
  "/problemas/:slug": () => <ProblemaPage />,
  "/assistencia-tecnica-curitiba": () => <AssistenciaTecnicaCuritiba />,
  "/termos-e-condicoes": () => <TermosCondicoes />,
  "/politica-de-privacidade": () => <PoliticaPrivacidade />,
  "/politica-de-cookies-e-anuncios": () => <PoliticaCookiesAnuncios />,
  "/status-de-anuncios": () => <StatusAnuncios />,
  "/anuncie": () => <Anuncie />,
  "/funil-indisponivel": () => <FunilIndisponivel />,
  "/debug/telemetria": () => <DebugTelemetria />,
  "/ordem-de-servico": () => <OrdemDeServico />,
  "/status-da-ordem-de-servico": () => <StatusOs />,
  "/status-os": () => <StatusOs />,
  "/depoimentos": () => <Depoimentos />,
  "/como-avaliar": () => <ComoAvaliar />,
  "/admin/login": () => <AdminLogin />,
  "/admin/funnel": () => <AdminFunnel />,
  "/admin/reviews": () => <AdminReviews />,
  "/admin/vitals": () => <AdminVitals />,
  "/admin/auditoria-local": () => <AdminAuditoriaLocal />,
  "/admin/gates-locais": () => <AdminGatesLocais />,
  "/admin/inventario-bairros": () => <AdminInventarioBairros />,
  "/admin/bairros": () => <AdminBairros />,
  "/admin/indexacao": () => <AdminIndexacao />,
  "/admin/editorial-ondas": () => <AdminEditorialOndas />,
  "/admin/ondas": () => <AdminOndas />,
  "/admin/publicacoes-pendentes": () => <AdminPublicacoesPendentes />,
  "/admin/autoridade-seo": () => <AdminAutoridadeSeo />,
  "/admin/autoridade-atlas": () => <AdminAutoridadeAtlas />,
  "/admin/capas-pendentes": () => <AdminCapasPendentes />,
  "/admin/biblioteca": () => <AdminBiblioteca />,
  "/admin/seo": () => <AdminSeo />,
  "/admin/ui-performance": () => <AdminUiPerformance />,
  "/admin/dashboard": () => <AdminDashboard />,
  "/admin/casos": () => <AdminCasos />,
  "/admin/auditoria-os": () => <AdminOsAudit />,
  "/admin/conversas": () => <AdminConversasOs />,
  "/pedido": () => <PedidoChat />,
  "/admin/operacao": () => <AdminOperacao />,
  "/admin/provas-monitor": () => <AdminProvasMonitor />,
  "/admin/provas-verticais": () => <AdminProvasVerticais />,
  "/admin/conversao": () => <AdminConversao />,
  "/admin/link-builder": () => <AdminLinkBuilder />,
  "/admin/experimento-wa": () => <AdminExperimentoWa />,
  "/admin/publicacao": () => <AdminPublicacao />,
  "/admin/fotos": () => <AdminFotos />,
  "/admin/editor-local": () => <AdminEditorLocal />,
  "/admin/performance-local": () => <AdminPerformanceLocal />,
  "/admin/auditoria-acessos": () => <AdminAuditoriaAcessos />,
  "/admin/qa-trafego": () => <AdminQaTrafego />,
  "/conserto-impressora-curitiba": () => <ConsertoImpressoraCuritiba />,
  "/assistencia-eletrodomesticos-inteligentes-curitiba": () => <AssistenciaEletrodomesticosInteligentesCuritiba />,
  "/conserto-tv-curitiba": () => <ConsertoTVHub />,
  "/conserto-tv/:local": () => <ConsertoTVCity />,
  "/conserto-som-curitiba": () => <ConsertoSomHub />,
  "/conserto-som/:local": () => <ConsertoSomCity />,
  "/conserto-videogame-curitiba": () => <ConsertoVideogameHub />,
  "/conserto-videogame/:local": () => <ConsertoVideogameCity />,
  "/conserto-celular-curitiba": () => <ConsertoCelularLocalHub />,
  "/conserto-celular/:local": () => <ConsertoCelularLocalCity />,
  "/status": () => <Status />,
  "/creditos-de-imagens": () => <CreditosDeImagens />,
};




/** Redirects que antes eram <Navigate replace> no React Router. */
export const legacyNavigateRedirects: Record<string, string> = {
  "/patrocinadores": "/anuncie",
  "/admin": "/admin/funnel",
  "/index": "/",
};

export const LegacyNotFound = NotFound;
