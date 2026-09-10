-- Painel público de triagem: agregado diário sem PII, com supressão k=5.
create or replace function public.triagem_publica_diaria(dias integer default 30)
returns table (
  dia date,
  etapa text,
  eventos integer
)
language sql
stable
security definer
set search_path = public
as $$
  select
    d.dia,
    d.etapa,
    case when d.total >= 5 then d.total::integer else null end as eventos
  from (
    select
      (created_at at time zone 'America/Sao_Paulo')::date as dia,
      case
        when event_type in ('wa_click', 'whatsapp_open') then 'whatsapp'
        when funnel_stage is not null then funnel_stage
        else 'outros'
      end as etapa,
      count(*) as total
    from public.click_events
    where created_at >= now() - make_interval(days => greatest(1, least(coalesce(dias, 30), 90)))
    group by 1, 2
  ) d
  order by d.dia desc, d.etapa;
$$;

revoke all on function public.triagem_publica_diaria(integer) from public;
grant execute on function public.triagem_publica_diaria(integer) to anon, authenticated, service_role;