import {useState} from "react";
import {useServerFn} from "@tanstack/react-start";
import {createSeoOrder} from "@/lib/seoJourney.functions";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog";
export function CreateOrderFromLead({leadId,onCreated}:{leadId:string;onCreated:()=>void}){
  const create=useServerFn(createSeoOrder);
  const [open,setOpen]=useState(false),[name,setName]=useState(""),[phone,setPhone]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState<string|null>(null);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError(null);
    try{await create({data:{leadId,name,phone}});window.__lovableEvents?.track?.("project.order_created",{source:"confirmed_lead"});setOpen(false);onCreated();}
    catch(e){setError(e instanceof Error?e.message:"Falha ao criar OS");}finally{setBusy(false);}
  }
  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button size="sm" variant="outline">Criar OS deste chamado</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Criar ordem de serviço confirmada</DialogTitle></DialogHeader><form onSubmit={submit} className="space-y-4"><div><Label htmlFor={`name-${leadId}`}>Nome do cliente</Label><Input id={`name-${leadId}`} value={name} onChange={e=>setName(e.target.value)} required minLength={2} maxLength={120}/></div><div><Label htmlFor={`phone-${leadId}`}>WhatsApp do cliente (com DDD)</Label><Input id={`phone-${leadId}`} value={phone} onChange={e=>setPhone(e.target.value)} type="tel" pattern="\+?[0-9]{10,15}" required/></div>{error&&<p role="alert" className="text-destructive">{error}</p>}<Button type="submit" disabled={busy}>{busy?"Criando…":"Confirmar atendimento e criar OS"}</Button></form></DialogContent></Dialog>;
}