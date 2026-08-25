import { BairroMalhaLayout } from "@/components/bairro/BairroMalhaLayout";
import { bairroMalha } from "@/lib/bairrosMalha";

// Malha programática de cobertura — nasce SHALLOW (noindex) até enriquecimento.
const Butiatuvinha = () => {
  const bairro = bairroMalha("butiatuvinha");
  if (!bairro) return null;
  return <BairroMalhaLayout bairro={bairro} />;
};

export default Butiatuvinha;
