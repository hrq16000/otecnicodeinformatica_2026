import { BairroMalhaLayout } from "@/components/bairro/BairroMalhaLayout";
import { bairroMalha } from "@/lib/bairrosMalha";

// Malha programática de cobertura — nasce SHALLOW (noindex) até enriquecimento.
const Fanny = () => {
  const bairro = bairroMalha("fanny");
  if (!bairro) return null;
  return <BairroMalhaLayout bairro={bairro} />;
};

export default Fanny;
