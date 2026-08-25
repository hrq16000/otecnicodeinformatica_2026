import { BairroMalhaLayout } from "@/components/bairro/BairroMalhaLayout";
import { bairroMalha } from "@/lib/bairrosMalha";

// Malha programática de cobertura — nasce SHALLOW (noindex) até enriquecimento.
const Atuba = () => {
  const bairro = bairroMalha("atuba");
  if (!bairro) return null;
  return <BairroMalhaLayout bairro={bairro} />;
};

export default Atuba;
