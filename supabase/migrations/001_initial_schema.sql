-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- QUOTE REQUESTS
-- ============================================================
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_ref VARCHAR(20) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  origin_city VARCHAR(100) NOT NULL,
  origin_state VARCHAR(10) NOT NULL,
  destination_city VARCHAR(100) NOT NULL,
  destination_state VARCHAR(10) NOT NULL,
  shipment_type VARCHAR(50) NOT NULL,
  commodity VARCHAR(255) NOT NULL,
  weight_lbs NUMERIC(10, 2) NOT NULL,
  dimensions VARCHAR(100),
  pickup_date DATE NOT NULL,
  delivery_date DATE,
  special_instructions TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','reviewing','quoted','accepted','rejected','expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_created_at ON quote_requests(created_at);
CREATE INDEX idx_quote_requests_email ON quote_requests(email);

-- ============================================================
-- CARRIER APPLICATIONS
-- ============================================================
CREATE TABLE carrier_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  dot_number VARCHAR(50) NOT NULL,
  mc_number VARCHAR(50) NOT NULL,
  fleet_size INTEGER NOT NULL,
  equipment_types TEXT[] NOT NULL DEFAULT '{}',
  insurance_provider VARCHAR(255),
  insurance_expiry DATE,
  service_areas TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','under_review','approved','rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_carrier_applications_status ON carrier_applications(status);
CREATE INDEX idx_carrier_applications_created_at ON carrier_applications(created_at);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- LOADS
-- ============================================================
CREATE TABLE loads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  load_id VARCHAR(20) NOT NULL UNIQUE,
  origin_city VARCHAR(100) NOT NULL,
  origin_state VARCHAR(10) NOT NULL,
  destination_city VARCHAR(100) NOT NULL,
  destination_state VARCHAR(10) NOT NULL,
  equipment_type VARCHAR(50) NOT NULL,
  weight_lbs NUMERIC(10, 2) NOT NULL,
  commodity VARCHAR(255) NOT NULL,
  pickup_date DATE NOT NULL,
  delivery_date DATE NOT NULL,
  rate NUMERIC(10, 2),
  distance_miles NUMERIC(10, 2),
  special_requirements TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (status IN ('active','pending','covered','cancelled','delivered')),
  contact_name VARCHAR(255),
  contact_phone VARCHAR(50),
  contact_email VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_loads_status ON loads(status);
CREATE INDEX idx_loads_pickup_date ON loads(pickup_date);
CREATE INDEX idx_loads_origin_state ON loads(origin_state);
CREATE INDEX idx_loads_destination_state ON loads(destination_state);
CREATE INDEX idx_loads_equipment_type ON loads(equipment_type);

-- ============================================================
-- ADMIN USERS
-- ============================================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'admin'
    CHECK (role IN ('super_admin','admin','dispatcher','viewer')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_is_active ON admin_users(is_active);

-- ============================================================
-- ADMIN ACTIVITY LOG
-- ============================================================
CREATE TABLE admin_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_admin_activity_log_admin_user_id ON admin_activity_log(admin_user_id);
CREATE INDEX idx_admin_activity_log_created_at ON admin_activity_log(created_at);

-- ============================================================
-- SITE ANALYTICS
-- ============================================================
CREATE TABLE site_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page VARCHAR(255) NOT NULL,
  visitor_id VARCHAR(100),
  referrer VARCHAR(500),
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_site_analytics_page ON site_analytics(page);
CREATE INDEX idx_site_analytics_created_at ON site_analytics(created_at);

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- Enable RLS
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE carrier_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE loads ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Public can insert quotes, carriers, contacts (via anon key / API routes)
CREATE POLICY "Allow public insert quote_requests"
  ON quote_requests FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert carrier_applications"
  ON carrier_applications FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert contact_messages"
  ON contact_messages FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public insert newsletter_subscribers"
  ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);

-- Public can read active loads
CREATE POLICY "Allow public read active loads"
  ON loads FOR SELECT TO anon USING (status = 'active');

-- Service role has full access (used by API routes via supabaseAdmin)
CREATE POLICY "Service role full access quote_requests"
  ON quote_requests FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access carrier_applications"
  ON carrier_applications FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access contact_messages"
  ON contact_messages FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access loads"
  ON loads FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access admin_users"
  ON admin_users FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access admin_activity_log"
  ON admin_activity_log FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carrier_applications_updated_at
  BEFORE UPDATE ON carrier_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loads_updated_at
  BEFORE UPDATE ON loads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
