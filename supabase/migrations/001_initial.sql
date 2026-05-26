-- Sea Road Brokerage INC — Initial Schema
-- Run this in Supabase SQL Editor

-- ─── admin_users ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.admin_users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  full_name   TEXT,
  role        TEXT NOT NULL DEFAULT 'viewer'
                CHECK (role IN ('super_admin', 'admin', 'dispatcher', 'viewer')),
  is_active   BOOLEAN NOT NULL DEFAULT true,
  last_login  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: only service role can read/write admin_users (never exposed to public)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- ─── loads ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.loads (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  load_id              TEXT NOT NULL UNIQUE,
  status               TEXT NOT NULL DEFAULT 'active'
                         CHECK (status IN ('active', 'pending', 'covered', 'cancelled', 'delivered')),
  origin_city          TEXT NOT NULL,
  origin_state         TEXT NOT NULL,
  destination_city     TEXT NOT NULL,
  destination_state    TEXT NOT NULL,
  equipment_type       TEXT NOT NULL
                         CHECK (equipment_type IN ('Dry Van', 'Flatbed', 'Refrigerated', 'Step Deck', 'RGN', 'Intermodal', 'Tanker', 'Lowboy')),
  weight_lbs           INTEGER NOT NULL,
  commodity            TEXT NOT NULL,
  pickup_date          DATE NOT NULL,
  delivery_date        DATE NOT NULL,
  rate                 NUMERIC(10, 2),
  distance_miles       INTEGER,
  special_requirements TEXT,
  contact_name         TEXT,
  contact_phone        TEXT,
  contact_email        TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: public can read active loads only; writes require service role
ALTER TABLE public.loads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active loads"
  ON public.loads FOR SELECT
  USING (status = 'active');

-- ─── quote_requests ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_ref            TEXT NOT NULL UNIQUE DEFAULT concat('QR-', upper(substr(gen_random_uuid()::text, 1, 8))),
  full_name            TEXT NOT NULL,
  company_name         TEXT,
  email                TEXT NOT NULL,
  phone                TEXT NOT NULL,
  origin_city          TEXT NOT NULL,
  origin_state         TEXT NOT NULL,
  destination_city     TEXT NOT NULL,
  destination_state    TEXT NOT NULL,
  shipment_type        TEXT NOT NULL,
  commodity            TEXT NOT NULL,
  weight_lbs           INTEGER NOT NULL,
  dimensions           TEXT,
  pickup_date          DATE NOT NULL,
  delivery_date        DATE,
  special_instructions TEXT,
  status               TEXT NOT NULL DEFAULT 'new'
                         CHECK (status IN ('new', 'reviewing', 'quoted', 'accepted', 'rejected', 'expired')),
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Public can insert quote requests; only service role reads them
CREATE POLICY "Anyone can submit a quote"
  ON public.quote_requests FOR INSERT
  WITH CHECK (true);

-- ─── carrier_applications ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.carrier_applications (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name       TEXT NOT NULL,
  contact_name       TEXT NOT NULL,
  email              TEXT NOT NULL,
  phone              TEXT NOT NULL,
  dot_number         TEXT NOT NULL,
  mc_number          TEXT NOT NULL,
  fleet_size         INTEGER NOT NULL,
  equipment_types    TEXT[] NOT NULL DEFAULT '{}',
  insurance_provider TEXT,
  insurance_expiry   DATE,
  service_areas      TEXT,
  status             TEXT NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending', 'approved', 'rejected', 'under_review')),
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.carrier_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply as carrier"
  ON public.carrier_applications FOR INSERT
  WITH CHECK (true);

-- ─── contact_messages ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send a message"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- ─── Enable Realtime on loads ────────────────────────────────────────────────
-- This makes the public load board update live when admin adds/edits loads
ALTER PUBLICATION supabase_realtime ADD TABLE public.loads;

-- ─── updated_at trigger ──────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_loads_updated_at
  BEFORE UPDATE ON public.loads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_admin_users_updated_at
  BEFORE UPDATE ON public.admin_users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
