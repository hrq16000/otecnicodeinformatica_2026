import { BairroMalhaLayout } from "@/components/bairro/BairroMalhaLayout";
import { bairroMalha } from "@/lib/bairrosMalha";

// Malha programática de cobertura — nasce SHALLOW (noindex) até enriquecimento.
const SantaQuiteria = () => {
  const bairro = bairroMalha("santa-quiteria");
  if (!bairro) return null;
  return <BairroMalhaLayout bairro={bairro} />;
};

export default SantaQuiteria;
