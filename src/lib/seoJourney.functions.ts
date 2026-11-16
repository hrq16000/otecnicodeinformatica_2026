import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {isQaEvent} from "@/lib/qaExclusion";

export const createSeoOrder = createServerFn({method:"POST"})
  .middleware([requireSupabaseAuth])
  .validator((input:{leadId:string;phone:string;name:string})=>{
    if(!/^[0-9a-f-]{36}$/i.test(input.leadId) || !/^\+?\d{10,15}$/.test(input.phone) || input.name.trim().length<2 || input.name.length>120) throw new Error("Informe chamado, nome e WhatsApp válidos");
    return input;
  })
  .handler(async({data,context})=>{
    const {data:admin,error:roleError}=await context.supabase.rpc("has_role",{_user_id:context.userId,_role:"admin"});
    if(roleError || !admin)throw new Error("Acesso restrito à administração");
    const {data:lead,error}=await context.supabase.from("funnel_submissions").select("id,created_at,session_id,utm_source,utm_medium,utm_campaign,journey_id,origin_route,city,neighborhood_slug,service_slug,sintoma,equipamento").eq("id",data.leadId).single();
    if(error || !lead)throw new Error("Chamado não encontrado");
    if(isQaEvent(lead))throw new Error("Chamado de teste não pode gerar atendimento comercial");
    const {data:existing,error:existingError}=await context.supabase.from("ordens_servico").select("id,protocolo").eq("lead_id",lead.id).limit(1).maybeSingle();
    if(existingError)throw new Error(existingError.message);
    if(existing)throw new Error("Este chamado já possui OS; abra a lista de ordens");
    const {data:order,error:saveError}=await context.supabase.from("ordens_servico").insert({
      protocolo:`OS-OTI-${crypto.randomUUID()}`,cliente_nome:data.name.trim(),telefone:data.phone,
      status:"recebida",equipamento:lead.equipamento,sintomas:lead.sintoma,lead_id:lead.id,journey_id:lead.journey_id,
      origin_route:lead.origin_route,city:lead.city,neighborhood_slug:lead.neighborhood_slug,service_slug:lead.service_slug,
    }).select("id,protocolo").single();
    if(saveError || !order)throw new Error(saveError?.message??"Não foi possível criar a OS");
    return order;
  });

export const readSeoJourney = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { days: number }) => {
    if (![7,30,90].includes(input.days)) throw new Error("Período inválido");
    return input;
  })
  .handler(async ({ data, context }) => {
    const {data: admin, error: roleError} = await context.supabase.rpc("has_role", {_user_id:context.userId,_role:"admin"});
    if (roleError || !admin) throw new Error("Acesso restrito à administração");
    const since = new Date(Date.now() - data.days * 86400000).toISOString();
    const [events, leads, orders] = await Promise.all([
      context.supabase.from("click_events").select("created_at,session_id,utm_source,utm_medium,utm_campaign,journey_id,event_type,path,problema,cidade,neighborhood_slug,attribution_channel").gte("created_at",since).in("event_type",["page_view","wa_click"]).order("created_at",{ascending:false}).limit(1000),
      context.supabase.from("funnel_submissions").select("id,created_at,session_id,utm_source,utm_medium,utm_campaign,journey_id,equipamento,sintoma,city,neighborhood_slug,status_atendimento,origin_route,service_slug").gte("created_at",since).eq("equipamento","descricao_ia").order("created_at",{ascending:false}).limit(1000),
      context.supabase.from("ordens_servico").select("id,protocolo,created_at,status,lead_id,journey_id").order("created_at",{ascending:false}).limit(1000),
    ]);
    const error = events.error ?? leads.error ?? orders.error;
    if (error) throw new Error(error.message);
    return { events: events.data ?? [], leads: leads.data ?? [], orders: orders.data ?? [], since, limited: [events.data,leads.data,orders.data].some(rows => (rows?.length ?? 0) >= 1000), fetchedAt: new Date().toISOString() };
  });

export const linkSeoOrder = createServerFn({method:"POST"})
  .middleware([requireSupabaseAuth])
  .validator((input: { leadId: string; orderId: string }) => {
    if (![input.leadId,input.orderId].every(id => /^[0-9a-f-]{36}$/i.test(id))) throw new Error("Seleção inválida");
    return input;
  })
  .handler(async ({data,context}) => {
    const {data:admin,error:roleError} = await context.supabase.rpc("has_role",{_user_id:context.userId,_role:"admin"});
    if (roleError || !admin) throw new Error("Acesso restrito à administração");
    const {data:lead,error} = await context.supabase.from("funnel_submissions").select("id,journey_id,origin_route,city,neighborhood_slug,service_slug,created_at").eq("id",data.leadId).single();
    if (error || !lead) throw new Error("Solicitação não encontrada");
    const result = await context.supabase.from("ordens_servico").update({lead_id:lead.id,journey_id:lead.journey_id,origin_route:lead.origin_route,city:lead.city,neighborhood_slug:lead.neighborhood_slug,service_slug:lead.service_slug}).eq("id",data.orderId).is("lead_id",null).gte("created_at",lead.created_at).select("id").single();
    if (result.error || !result.data) throw new Error("OS já vinculada, anterior à solicitação ou indisponível");
    return {ok:true};
  });