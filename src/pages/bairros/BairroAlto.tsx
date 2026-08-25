import { BairroMalhaLayout } from "@/components/bairro/BairroMalhaLayout";
import { bairroMalha } from "@/lib/bairrosMalha";

// Malha programática de cobertura — nasce SHALLOW (noindex) até enriquecimento.
const BairroAlto = () => {
  const bairro = bairroMalha("bairro-alto");
  if (!bairro) return null;
  return <BairroMalhaLayout bairro={bairro} />;
};

export default BairroAlto;
