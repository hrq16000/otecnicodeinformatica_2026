import { BairroMalhaLayout } from "@/components/bairro/BairroMalhaLayout";
import { bairroMalha } from "@/lib/bairrosMalha";

// Malha programática de cobertura — nasce SHALLOW (noindex) até enriquecimento.
const PradoVelho = () => {
  const bairro = bairroMalha("prado-velho");
  if (!bairro) return null;
  return <BairroMalhaLayout bairro={bairro} />;
};

export default PradoVelho;
