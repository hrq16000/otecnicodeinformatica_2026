-- 1) Remove plaintext verification codes
ALTER TABLE public.os_verification_codes DROP COLUMN IF EXISTS code_plain;
ALTER TABLE public.os_verification_codes ALTER COLUMN code_hash DROP NOT NULL;

-- 2) Restrict SECURITY DEFINER admin RPC to server-side callers only
REVOKE ALL ON FUNCTION public.admin_link_os_lead(text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_link_os_lead(text, uuid) TO service_role;