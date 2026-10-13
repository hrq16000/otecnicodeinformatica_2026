import ServicoCore from "./ServicoCore";
import data from "@/lib/servicosCoreShards/recuperacao-de-dados";

const RecuperacaoDadosCore = () => <ServicoCore slug="recuperacao-de-dados" baseData={data} />;

export default RecuperacaoDadosCore;
