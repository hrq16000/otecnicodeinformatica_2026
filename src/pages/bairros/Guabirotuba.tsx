import { BairroMalhaLayout } from "@/components/bairro/BairroMalhaLayout";
import { bairroMalha } from "@/lib/bairrosMalha";

// Malha programática de cobertura — nasce SHALLOW (noindex) até enriquecimento.
const Guabirotuba = () => {
  const bairro = bairroMalha("guabirotuba");
  if (!bairro) return null;
  return <BairroMalhaLayout bairro={bairro} />;
};

export default Guabirotuba;
