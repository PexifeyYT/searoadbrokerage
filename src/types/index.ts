export interface QuoteFormData {
  full_name: string;
  company_name?: string;
  email: string;
  phone: string;
  origin_city: string;
  origin_state: string;
  destination_city: string;
  destination_state: string;
  shipment_type: 'FTL' | 'LTL' | 'Intermodal' | 'Flatbed' | 'Refrigerated' | 'Specialized';
  commodity: string;
  weight_lbs: number;
  dimensions?: string;
  pickup_date: string;
  delivery_date?: string;
  special_instructions?: string;
  terms_accepted: boolean;
  _honey?: string;
}

export interface LoadFormData {
  load_id?: string;
  origin_city: string;
  origin_state: string;
  destination_city: string;
  destination_state: string;
  equipment_type: 'Dry Van' | 'Flatbed' | 'Refrigerated' | 'Step Deck' | 'RGN' | 'Intermodal' | 'Tanker' | 'Lowboy';
  weight_lbs: number;
  commodity: string;
  pickup_date: string;
  delivery_date: string;
  rate?: number;
  distance_miles?: number;
  special_requirements?: string;
  status: 'active' | 'pending' | 'covered' | 'cancelled' | 'delivered';
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'super_admin' | 'admin' | 'dispatcher' | 'viewer';
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

export interface QuoteRequest {
  id: string;
  quote_ref: string;
  full_name: string;
  company_name?: string;
  email: string;
  phone: string;
  origin_city: string;
  origin_state: string;
  destination_city: string;
  destination_state: string;
  shipment_type: string;
  commodity: string;
  weight_lbs: number;
  dimensions?: string;
  pickup_date: string;
  delivery_date?: string;
  special_instructions?: string;
  status: 'new' | 'reviewing' | 'quoted' | 'accepted' | 'rejected' | 'expired';
  created_at: string;
  updated_at: string;
}

export interface CarrierApplication {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  dot_number: string;
  mc_number: string;
  fleet_size: number;
  equipment_types: string[];
  insurance_provider?: string;
  insurance_expiry?: string;
  service_areas?: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Load {
  id: string;
  load_id: string;
  origin_city: string;
  origin_state: string;
  destination_city: string;
  destination_state: string;
  equipment_type: string;
  weight_lbs: number;
  commodity: string;
  pickup_date: string;
  delivery_date: string;
  rate?: number;
  distance_miles?: number;
  special_requirements?: string;
  status: 'active' | 'pending' | 'covered' | 'cancelled' | 'delivered';
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  created_at: string;
  updated_at: string;
}
