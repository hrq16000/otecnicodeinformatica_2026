import { createFileRoute } from "@tanstack/react-router";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { OrdensServicoPanel } from "@/components/admin/OrdensServicoPanel";
import { Button } from "@/components/ui/button";

function OrdensPage(){
  const {loading,isAdmin}=useAdminAuth();
  if(loading)return <main className="p-6" role="status">Verificando acesso…</main>;
  if(!isAdmin)return <main className="p-6"><h1 className="text-xl font-semibold">Acesso administrativo necessário</h1><Button asChild variant="outline" className="mt-4"><a href="/admin">Entrar na administração</a></Button></main>;
  return <main className="mx-auto min-h-screen max-w-6xl px-4 py-6"><div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h1 className="text-2xl font-semibold">Ordens de serviço</h1><Button asChild variant="outline"><a href="/admin/seo">SEO e conversões</a></Button></div><OrdensServicoPanel /></main>;
}
export const Route=createFileRoute("/admin_/ordens")({
  component:OrdensPage,
  head:()=>({meta:[{title:"Ordens de serviço | O Técnico de Informática"},{name:"description",content:"Acompanhamento administrativo das ordens, status e fechamento de atendimentos."},{name:"robots",content:"noindex,nofollow"},{property:"og:title",content:"Ordens de serviço | O Técnico de Informática"},{property:"og:description",content:"Gestão privada de ordens e atendimentos."},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"}]})
});