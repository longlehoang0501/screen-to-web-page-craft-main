CREATE TABLE public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  ticket_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.registrations TO anon;
GRANT ALL ON public.registrations TO service_role;

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_can_insert_registrations"
ON public.registrations
FOR INSERT
TO anon
WITH CHECK (true);