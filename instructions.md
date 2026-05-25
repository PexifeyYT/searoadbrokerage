# Sea Road Brokerage INC - Website Development Instructions

## Project Overview
Build a professional, modern freight brokerage website for Sea Road Brokerage INC with multi-language support, dark/light theme toggle, and integrated quote request system.

## Company Information
- **Company Name**: Sea Road Brokerage INC
- **Address**: 22492 Road 19 Site# J, Chowchilla, California
- **Phone**: 209-920-0003
- **Email**: searoadbrokerageinc@gmail.com
- **USDOT Number**: 4398936
- **MC Number**: MC-1726540
- **USDOT Status**: ACTIVE

## Tech Stack
- **Frontend**: React with TypeScript (Next.js 14+ with App Router)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Forms**: Web3Forms API integration
- **Internationalization**: next-intl or i18next
- **Theme**: next-themes for dark/light mode
- **Deployment**: Vercel (recommended) or Netlify

## Design Requirements

### Color Scheme
- **Primary Theme**: White/Blue (professional, clean)
- **Light Theme** (default):
  - Primary Blue: #0A6EBD (similar to C.H. Robinson blue)
  - Secondary Blue: #1E88E5
  - Accent Blue: #42A5F5
  - Background: #FFFFFF
  - Text: #1F2937
  - Gray: #F3F4F6
- **Dark Theme**:
  - Primary Blue: #42A5F5
  - Background: #0F172A
  - Surface: #1E293B
  - Text: #F1F5F9
  - Border: #334155

### Theme Toggle
- Small button in **top-left corner** of navigation
- Icon: Sun/Moon toggle
- Default: Light theme
- Persist user preference in localStorage
- Smooth transitions between themes (200ms)

### Logo Placeholder
- Reserve space: 180px x 50px in header
- Placeholder text: "Sea Road Brokerage" with truck icon
- Easy to replace later with actual logo
- Maintain aspect ratio and responsive sizing

## Site Structure

### Navigation Menu
Primary navigation items (horizontal menu):
1. **Services** (dropdown)
   - Freight Services
     - Full Truckload (FTL)
     - Less Than Truckload (LTL)
     - Intermodal
     - Flatbed
     - Temperature Controlled
     - Expedited Shipping
   - Logistics Services
     - Supply Chain Management
     - Route Optimization
     - Warehousing Solutions
   - Specialized Services
     - Hazardous Materials
     - Oversized Loads
     - Cross-Border Shipping

2. **Carriers** (dropdown)
   - Become a Carrier
   - Carrier Requirements
   - Load Board
   - Carrier Support
   - Payment Terms

3. **Resources** (dropdown)
   - Industry Insights
   - Freight Market Updates
   - Shipping Guides
   - Documentation
   - FAQ

4. **About** (dropdown)
   - Our Company
   - Why Choose Us
   - Service Areas
   - Certifications
   - Contact Us

5. **Contact** (link)
   - Direct link to contact page with quote form

### Additional Navigation Elements
- **Language Selector** (top-right): Dropdown with flags
  - English (en-us) - default
  - Spanish (es)
  - French (fr-ca)
  - Punjabi (pa) - for your demographic
- **Get a Quote** button (CTA - prominent blue button)
- **Track Shipment** link
- **Phone Number** visible in header: (209) 920-0003

## Page Structure

### 1. Homepage (`/`)
**Hero Section**:
- Large background image (freight/logistics themed)
- Headline: "Reliable Freight Solutions Across North America"
- Subheadline: "Professional freight brokerage services with USDOT #4398936 | MC-1726540"
- Two CTAs: "Get a Quote" (primary) + "Become a Carrier" (secondary)

**Features Section**:
- 4-6 feature cards with icons:
  - Nationwide Coverage
  - 24/7 Support
  - Competitive Rates
  - Real-time Tracking
  - Licensed & Insured
  - Quick Payment

**Services Overview**:
- Grid of main service categories (3 columns)
- Image + title + brief description
- "Learn More" links to service pages

**Why Choose Us**:
- Statistics/metrics:
  - Years in Business
  - Loads Delivered
  - Carrier Network Size
  - Customer Satisfaction Rate
- Trust indicators (USDOT, MC numbers, certifications)

**CTA Section**:
- "Ready to Ship?" section
- Quote form preview or link
- Contact information

**Client Logos** (optional for now):
- Placeholder for client/partner logos
- Add later when available

### 2. Quote Request Page (`/quote`)
**Form Implementation** (Web3Forms):

```typescript
// Form fields (required unless marked optional):
interface QuoteFormData {
  // Contact Information
  firstName: string;
  lastName: string;
  company?: string;  // optional
  email: string;
  phone: string;
  
  // Billing Details
  billingAddress: string;
  city: string;
  state: string;
  zip: string;
  country: string;  // default "United States"
  
  // Shipment Details
  shipmentType: 'FTL' | 'LTL' | 'Intermodal' | 'Flatbed' | 'Temperature Controlled' | 'Other';
  origin: string;
  destination: string;
  pickupDate: string;  // date picker
  deliveryDate?: string;  // optional
  commodityType: string;
  weight: number;
  dimensions?: string;  // optional (L x W x H)
  specialRequirements?: string;  // textarea, optional
  
  // Terms acceptance
  termsAccepted: boolean;  // REQUIRED checkbox
}
```

**Form Validation**:
- All required fields must be filled
- Email format validation
- Phone format validation (US/Canada)
- Terms checkbox MUST be checked to submit
- Real-time validation feedback

**Web3Forms Integration**:
```typescript
// Web3Forms endpoint
const FORM_ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

// Include honeypot field for spam prevention
// Add reCAPTCHA or hCaptcha (optional but recommended)
```

**Required Checkbox**:
- Text: "I agree to the [Terms of Service](#) and [Privacy Policy](#) and consent to be contacted regarding my quote request."
- Must be checked to enable submit button
- Visual indication (disabled button until checked)
- Error message if submission attempted without checking

**Success/Error Handling**:
- Success: Redirect to thank-you page with quote reference number
- Error: Display error message inline, maintain form data
- Loading state during submission

**Data Storage** (Supabase):
- Store all quote requests in `quote_requests` table
- Auto-generate quote reference ID
- Timestamp all submissions
- Store IP address and user agent for security

### 3. Services Pages
Create individual pages for each main service:
- `/services/full-truckload`
- `/services/less-than-truckload`
- `/services/intermodal`
- `/services/specialized`

Each page should include:
- Hero section with service-specific imagery
- Detailed service description
- Benefits/features list
- Pricing factors (transparency)
- CTA to quote form
- Related services

### 4. Carriers Page (`/carriers`)
- Information for carrier partners
- Requirements to join network
- Benefits of partnering
- Application form (similar to quote form)
- Payment terms and schedules
- Support resources

### 5. About Page (`/about`)
- Company story and mission
- Leadership team (placeholder for now)
- Service areas map
- Certifications and compliance:
  - USDOT #4398936
  - MC-1726540
  - Insurance information
  - Safety ratings
- Timeline/milestones

### 6. Contact Page (`/contact`)
- Company information card:
  - Address: 22492 Road 19 Site# J, Chowchilla, CA
  - Phone: (209) 920-0003
  - Email: searoadbrokerageinc@gmail.com
  - Hours of operation
- Embedded Google Map (Chowchilla location)
- Contact form (simpler than quote form)
- Social media links (placeholder)

### 7. Load Board Page (`/load-board`)
- Public-facing load board displaying available loads
- Search and filter capabilities:
  - Origin/Destination search
  - Equipment type filter
  - Date range filter
  - Weight/size filters
- Load details cards showing:
  - Load ID
  - Origin → Destination
  - Pickup/Delivery dates
  - Equipment type needed
  - Weight and dimensions
  - Rate (if public)
  - Contact button
- Updates daily from admin dashboard
- Responsive grid layout
- "Load details" modal on click

## Admin Dashboard (`/admin`)

### Authentication & Access Control

**Multi-Layer Security:**

**Layer 1 - Supabase Auth Login:**
- Email/password authentication via Supabase Auth
- Only users with verified emails can attempt login
- Redirect to login page if not authenticated

**Layer 2 - Admin Email Verification:**
- Check if logged-in user's email exists in `admin_users` table
- If email is verified as admin → show "Admin Dashboard" button in user menu
- If not admin → no access to admin routes

**Layer 3 - Dashboard Password:**
- After accessing `/admin` route, prompt for dashboard password
- Current password: `123456` (stored in environment variable)
- Password persists in session (not on every page)
- Can be changed via environment variable later

**Admin Management:**
- Super admins can add/remove admin users
- Add admin by email (must be valid Gmail or email format)
- Email verification required before admin access
- Admin roles: `super_admin`, `admin`, `viewer`
- Super admin can manage other admins
- Regular admin can manage loads but not other admins

### Admin Dashboard Structure

**URL**: `/admin` (protected route)

**Layout**: Clean, minimal white theme with sidebar navigation

**Sidebar Sections:**
1. 📊 **Dashboard** (Overview/Home)
2. 🚛 **Load Board Management**
3. 📈 **Analytics**
4. 👥 **Admin Users**
5. 📧 **Quote Requests**
6. 🎯 **Carrier Applications**
7. 💬 **Contact Messages**
8. ⚙️ **Settings**

### 1. Dashboard (Overview) - `/admin/dashboard`

**Key Metrics Cards:**
- Total Active Loads
- Quote Requests (last 30 days)
- Website Traffic (last 30 days)
- Carrier Applications (pending)

**Recent Activity Feed:**
- Latest quote requests
- New carrier applications
- Recently added loads
- Recent contact messages

**Quick Actions:**
- Add New Load (button)
- View Pending Quotes (link)
- View Analytics (link)

### 2. Load Board Management - `/admin/loads`

**Main View:**
- Table/grid of all loads with filters:
  - Status filter (Active, Filled, Expired, Draft)
  - Date range
  - Origin/Destination search
  - Equipment type
- Columns:
  - Load ID
  - Origin → Destination
  - Pickup Date
  - Equipment Type
  - Status
  - Created Date
  - Actions (Edit, Delete, Duplicate)

**"New Load" Button:**
Opens modal or slide-over with form:

```typescript
interface LoadFormData {
  // Basic Info
  loadId?: string;  // Auto-generated if empty
  status: 'active' | 'filled' | 'expired' | 'draft';
  
  // Route Details
  origin: {
    city: string;
    state: string;
    zipCode: string;
  };
  destination: {
    city: string;
    state: string;
    zipCode: string;
  };
  
  // Dates
  pickupDate: string;
  pickupDateFlexible: boolean;
  deliveryDate: string;
  deliveryDateFlexible: boolean;
  
  // Load Details
  equipmentType: 'Dry Van' | 'Flatbed' | 'Reefer' | 'Step Deck' | 'Other';
  weight: number;  // lbs
  length?: number;  // feet
  commodity: string;
  
  // Pricing (optional - may not show on public board)
  rate?: number;
  rateType?: 'Flat' | 'Per Mile';
  showRate: boolean;  // Display on public board?
  
  // Additional Details
  specialRequirements?: string;
  loadedMiles?: number;
  emptyMiles?: number;
  
  // Contact
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  
  // Internal Notes (not shown publicly)
  internalNotes?: string;
  
  // Auto-managed
  postedBy: string;  // Admin user ID
  createdAt: timestamp;
  updatedAt: timestamp;
  expiresAt?: timestamp;  // Auto-expire date
}
```

**Form Features:**
- Real-time validation
- Auto-save as draft
- Duplicate load function
- Bulk upload via CSV (future)
- Auto-expire loads after X days
- Address autocomplete

**Actions:**
- **Add New Load**: Opens empty form
- **Edit Load**: Prefills form with existing data
- **Delete Load**: Confirmation modal
- **Duplicate Load**: Copy load with new ID
- **Bulk Actions**: Archive, delete multiple
- **Export**: Download loads as CSV/Excel

### 3. Analytics - `/admin/analytics`

**Traffic Analytics:**
- Daily/Weekly/Monthly visitors
- Page views breakdown
- Top pages visited
- Referral sources
- Geographic data (map visualization)
- Device breakdown (mobile/desktop/tablet)
- Browser statistics

**Conversion Metrics:**
- Quote form submissions
- Quote form abandonment rate
- Contact form submissions
- Load board clicks/engagement
- Average time on site

**Load Board Analytics:**
- Most viewed loads
- Loads by equipment type
- Loads by region
- Average load posting duration
- Fill rate (if tracking)

**Quote Request Analytics:**
- Requests by service type
- Requests by region
- Response time metrics
- Conversion rate (quote → customer)

**Charts & Visualizations:**
- Line charts for trends
- Pie charts for breakdowns
- Bar charts for comparisons
- Heatmaps for geographic data

**Data Integration:**
- Google Analytics 4 integration
- Supabase Analytics
- Custom event tracking
- Export to CSV/PDF

### 4. Admin Users Management - `/admin/users`

**User List:**
- Table showing all admin users:
  - Email
  - Name
  - Role (Super Admin, Admin, Viewer)
  - Status (Active, Pending, Suspended)
  - Last Login
  - Actions

**Add Admin User:**
- Form with fields:
  - Email (Gmail or any valid email)
  - Name
  - Role dropdown
  - Send invitation email checkbox
- Verification process:
  - Email added to `admin_users` table with `pending` status
  - Invitation email sent with signup link
  - User creates account via Supabase Auth
  - Email verified → status changes to `active`
  - User can now see Admin Dashboard button

**Roles & Permissions:**

**Super Admin:**
- Full access to everything
- Can add/remove/edit admins
- Can change dashboard password
- Can delete loads, quotes, etc.

**Admin:**
- Can manage loads (add, edit, delete)
- Can view analytics
- Can view and respond to quotes
- Cannot manage other admins

**Viewer:**
- Read-only access
- Can view loads, analytics, quotes
- Cannot add, edit, or delete anything

**Admin Actions:**
- Edit user (change role, name)
- Suspend user (revoke access)
- Delete user (permanent)
- Resend invitation
- View activity log

### 5. Quote Requests Management - `/admin/quotes`

**Quote List:**
- All quote requests from website
- Filters:
  - Status (New, In Progress, Quoted, Closed)
  - Date range
  - Service type
  - Search by name/email
- Columns:
  - Quote Reference
  - Customer Name
  - Service Type
  - Origin → Destination
  - Submitted Date
  - Status
  - Actions

**Quote Detail View:**
- Full quote details (all form data)
- Internal notes field
- Status update dropdown
- Assign to admin dropdown
- Email customer button (template)
- Mark as complete
- Activity timeline

**Actions:**
- Change status
- Add internal notes
- Email customer (templates)
- Export to PDF
- Archive/Delete

### 6. Carrier Applications - `/admin/carriers`

**Application List:**
- All carrier applications
- Similar structure to quote requests
- Filters by status, date, etc.

**Application Detail:**
- Full application details
- Document uploads (if implemented)
- Approval workflow
- Background check notes
- Contract status

### 7. Contact Messages - `/admin/messages`

**Message List:**
- All contact form submissions
- Mark as read/unread
- Reply functionality
- Archive messages

### 8. Settings - `/admin/settings`

**General Settings:**
- Dashboard password change
- Auto-expire loads (days)
- Email notification preferences
- Public load board visibility toggle

**Company Info:**
- Update company details
- USDOT/MC numbers
- Contact information
- Operating hours

**Email Templates:**
- Quote response templates
- Carrier approval templates
- General email templates

**Integration Settings:**
- Google Analytics ID
- Web3Forms API key
- Other API configurations

**Backup & Export:**
- Export all data
- Database backup options
- Restore from backup

## Supabase Database Schema

### Tables

**1. `quote_requests`**
```sql
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Contact Info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company VARCHAR(200),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  
  -- Billing
  billing_address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip VARCHAR(20) NOT NULL,
  country VARCHAR(100) DEFAULT 'United States',
  
  -- Shipment
  shipment_type VARCHAR(50) NOT NULL,
  origin VARCHAR(200) NOT NULL,
  destination VARCHAR(200) NOT NULL,
  pickup_date DATE NOT NULL,
  delivery_date DATE,
  commodity_type VARCHAR(200) NOT NULL,
  weight DECIMAL(10, 2) NOT NULL,
  dimensions VARCHAR(50),
  special_requirements TEXT,
  
  -- Metadata
  quote_reference VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  ip_address INET,
  user_agent TEXT,
  language VARCHAR(5) DEFAULT 'en-us',
  
  -- Admin fields
  assigned_to UUID REFERENCES admin_users(id),
  internal_notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Indexes
  INDEX idx_email (email),
  INDEX idx_created_at (created_at),
  INDEX idx_status (status),
  INDEX idx_quote_reference (quote_reference)
);
```

**2. `carrier_applications`**
```sql
CREATE TABLE carrier_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  company_name VARCHAR(200) NOT NULL,
  contact_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  
  dot_number VARCHAR(20),
  mc_number VARCHAR(20),
  insurance_amount DECIMAL(12, 2),
  fleet_size INTEGER,
  
  status VARCHAR(20) DEFAULT 'pending',
  assigned_to UUID REFERENCES admin_users(id),
  internal_notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  INDEX idx_email (email),
  INDEX idx_status (status)
);
```

**3. `contact_messages`**
```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(200),
  message TEXT NOT NULL,
  
  status VARCHAR(20) DEFAULT 'unread',
  assigned_to UUID REFERENCES admin_users(id),
  replied_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

**4. `newsletter_subscribers`** (optional)
```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  language VARCHAR(5) DEFAULT 'en-us'
);
```

**5. `loads`** (Load Board)
```sql
CREATE TABLE loads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Load Identification
  load_id VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- active, filled, expired, draft
  
  -- Origin
  origin_city VARCHAR(100) NOT NULL,
  origin_state VARCHAR(50) NOT NULL,
  origin_zip VARCHAR(20) NOT NULL,
  
  -- Destination
  destination_city VARCHAR(100) NOT NULL,
  destination_state VARCHAR(50) NOT NULL,
  destination_zip VARCHAR(20) NOT NULL,
  
  -- Dates
  pickup_date DATE NOT NULL,
  pickup_date_flexible BOOLEAN DEFAULT false,
  delivery_date DATE,
  delivery_date_flexible BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE, -- Auto-expire
  
  -- Load Details
  equipment_type VARCHAR(50) NOT NULL, -- Dry Van, Flatbed, Reefer, etc.
  weight DECIMAL(10, 2) NOT NULL, -- lbs
  length DECIMAL(5, 2), -- feet
  commodity VARCHAR(200) NOT NULL,
  
  -- Pricing
  rate DECIMAL(10, 2),
  rate_type VARCHAR(20), -- Flat, Per Mile
  show_rate BOOLEAN DEFAULT false,
  loaded_miles INTEGER,
  empty_miles INTEGER,
  
  -- Contact (optional - may use company defaults)
  contact_name VARCHAR(100),
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  
  -- Additional
  special_requirements TEXT,
  internal_notes TEXT,
  
  -- Admin tracking
  posted_by UUID REFERENCES admin_users(id) NOT NULL,
  
  -- Indexes
  INDEX idx_status (status),
  INDEX idx_load_id (load_id),
  INDEX idx_pickup_date (pickup_date),
  INDEX idx_equipment_type (equipment_type),
  INDEX idx_origin_state (origin_state),
  INDEX idx_destination_state (destination_state),
  INDEX idx_expires_at (expires_at)
);
```

**6. `admin_users`**
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- User Info (links to Supabase Auth)
  auth_user_id UUID REFERENCES auth.users(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  
  -- Admin Access
  role VARCHAR(20) DEFAULT 'admin', -- super_admin, admin, viewer
  status VARCHAR(20) DEFAULT 'pending', -- pending, active, suspended
  
  -- Tracking
  last_login TIMESTAMP WITH TIME ZONE,
  invited_by UUID REFERENCES admin_users(id),
  invitation_sent_at TIMESTAMP WITH TIME ZONE,
  
  -- Indexes
  INDEX idx_email (email),
  INDEX idx_auth_user_id (auth_user_id),
  INDEX idx_status (status),
  INDEX idx_role (role)
);
```

**7. `admin_activity_log`**
```sql
CREATE TABLE admin_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  admin_user_id UUID REFERENCES admin_users(id) NOT NULL,
  action VARCHAR(100) NOT NULL, -- login, logout, create_load, edit_load, etc.
  entity_type VARCHAR(50), -- load, quote, carrier_application, etc.
  entity_id UUID,
  details JSONB, -- Additional context
  ip_address INET,
  user_agent TEXT,
  
  INDEX idx_admin_user_id (admin_user_id),
  INDEX idx_created_at (created_at),
  INDEX idx_action (action)
);
```

**8. `site_analytics`** (optional - for custom tracking)
```sql
CREATE TABLE site_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  event_type VARCHAR(50) NOT NULL, -- page_view, quote_submit, load_view, etc.
  page_path VARCHAR(500),
  referrer VARCHAR(500),
  user_id UUID, -- If logged in
  session_id VARCHAR(100),
  
  -- Geographic
  country VARCHAR(100),
  region VARCHAR(100),
  city VARCHAR(100),
  
  -- Device
  device_type VARCHAR(20), -- mobile, tablet, desktop
  browser VARCHAR(50),
  os VARCHAR(50),
  
  -- Custom data
  metadata JSONB,
  
  INDEX idx_event_type (event_type),
  INDEX idx_created_at (created_at),
  INDEX idx_page_path (page_path)
);
```

### Row Level Security (RLS)
Enable RLS on all tables and create policies for:

**Public Tables** (quote_requests, carrier_applications, contact_messages):
- Public INSERT for forms
- Authenticated admin SELECT/UPDATE/DELETE

**Admin Tables** (admin_users, admin_activity_log):
- Only authenticated admins can SELECT
- Only super_admins can INSERT/UPDATE/DELETE admin_users
- Auto INSERT for activity_log

**Loads Table**:
- Public SELECT for active, non-expired loads (for public load board)
- Authenticated admin INSERT/UPDATE/DELETE
- Filter expired loads from public view

**Example RLS Policies:**

```sql
-- Public can view active loads
CREATE POLICY "Public can view active loads"
ON loads FOR SELECT
TO public
USING (status = 'active' AND (expires_at IS NULL OR expires_at > NOW()));

-- Admins can do everything with loads
CREATE POLICY "Admins can manage loads"
ON loads
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.auth_user_id = auth.uid()
    AND admin_users.status = 'active'
  )
);

-- Only super admins can manage admin users
CREATE POLICY "Super admins manage admin users"
ON admin_users FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.auth_user_id = auth.uid()
    AND admin_users.role = 'super_admin'
    AND admin_users.status = 'active'
  )
);

-- Admins can view quotes/applications/messages
CREATE POLICY "Admins can view submissions"
ON quote_requests FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.auth_user_id = auth.uid()
    AND admin_users.status = 'active'
  )
);
```

## Internationalization (i18n)

### Supported Languages
- English (en-us) - Default
- Spanish (es)
- French Canadian (fr-ca)
- Punjabi (pa)

### URL Structure
- `/en-us/` - English
- `/es/` - Spanish
- `/fr-ca/` - French Canadian
- `/pa/` - Punjabi

### Translation Files Structure
```
/locales
  /en-us
    common.json
    home.json
    services.json
    quote.json
    carriers.json
    about.json
    contact.json
  /es
    [same structure]
  /fr-ca
    [same structure]
  /pa
    [same structure]
```

### Key Translation Strings
Priority translations:
- Navigation menu items
- Form labels and validation messages
- CTAs (buttons)
- Hero headlines
- Service descriptions
- Contact information labels
- Footer content
- Error messages

### Language Selector
- Dropdown in top-right of navigation
- Show flag icons + language name
- Persist selection in cookie/localStorage
- Automatically detect browser language on first visit
- Redirect to appropriate locale

## Responsive Design

### Breakpoints (Tailwind)
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Wide: > 1280px

### Mobile Considerations
- Hamburger menu for navigation on mobile
- Simplified hero sections
- Stack service cards vertically
- Touch-friendly form inputs (min 44px height)
- Click-to-call phone numbers
- Optimized images for mobile bandwidth

## SEO Requirements

### Meta Tags (per page)
- Title: "[Page Name] | Sea Road Brokerage INC - Freight Brokerage Services"
- Description: Unique, keyword-rich (150-160 chars)
- Keywords: freight broker, logistics, trucking, LTL, FTL, etc.
- Open Graph tags for social sharing
- Schema.org markup:
  - Organization
  - LocalBusiness
  - Service
  - ContactPoint

### Technical SEO
- Semantic HTML5
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for all images
- XML sitemap
- robots.txt
- Fast page load times (<3s)
- Mobile-first indexing
- HTTPS (SSL certificate)

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- WebP format with fallbacks
- Lazy loading below the fold
- Responsive image sizes
- CDN delivery (Vercel/Netlify automatic)

### Code Splitting
- Route-based code splitting (Next.js automatic)
- Dynamic imports for heavy components
- Lazy load language translations

### Caching Strategy
- Static pages: ISR (revalidate every 3600s)
- API routes: Cache with appropriate headers
- Browser caching for assets

## Accessibility (WCAG 2.1 AA)

### Requirements
- Keyboard navigation support
- ARIA labels for interactive elements
- Color contrast ratios ≥ 4.5:1 (text)
- Focus indicators visible
- Form labels properly associated
- Skip to main content link
- Screen reader testing
- Alt text for images

### Form Accessibility
- Proper label/input associations
- Error messages announced to screen readers
- Required field indicators
- Keyboard-navigable dropdowns
- Focus management

## Environment Variables

Create `.env.local` file:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Web3Forms
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key

# Admin Dashboard
ADMIN_DASHBOARD_PASSWORD=123456
NEXT_PUBLIC_ADMIN_ROUTE=/admin

# Optional: reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://searoadbrokerage.com
NEXT_PUBLIC_COMPANY_EMAIL=searoadbrokerageinc@gmail.com
NEXT_PUBLIC_COMPANY_PHONE=209-920-0003

# Analytics (future)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Components to Build

### Core Components

**1. Layout Components**
- `Header.tsx` - Main navigation with theme toggle, language selector
- `Footer.tsx` - Multi-column footer with links, contact info
- `MobileMenu.tsx` - Hamburger menu for mobile
- `ThemeToggle.tsx` - Sun/Moon icon button (top-left)
- `LanguageSelector.tsx` - Dropdown with flags

**2. UI Components**
- `Button.tsx` - Primary, secondary, outline variants
- `Card.tsx` - Service cards, feature cards
- `Input.tsx` - Form inputs with validation states
- `Select.tsx` - Dropdown selects
- `Checkbox.tsx` - Custom styled checkbox
- `DatePicker.tsx` - Date selection for pickup/delivery
- `Modal.tsx` - General modal component
- `Alert.tsx` - Success/error messages
- `LoadingSpinner.tsx` - Loading states

**3. Form Components**
- `QuoteForm.tsx` - Main quote request form
- `ContactForm.tsx` - Simpler contact form
- `CarrierApplicationForm.tsx` - Carrier signup
- `FormField.tsx` - Reusable form field wrapper
- `ValidationMessage.tsx` - Error/success messages

**4. Feature Components**
- `Hero.tsx` - Homepage hero section
- `ServiceCard.tsx` - Individual service display
- `FeatureGrid.tsx` - Features/benefits display
- `StatsCounter.tsx` - Animated statistics
- `TestimonialSlider.tsx` - Client testimonials (future)
- `ClientLogos.tsx` - Partner/client logos (future)
- `Map.tsx` - Google Maps embed

**5. Utility Components**
- `SEO.tsx` - Meta tags wrapper
- `ErrorBoundary.tsx` - Error handling
- `PageLoader.tsx` - Page transition loading

**6. Admin Dashboard Components**
- `AdminLayout.tsx` - Admin dashboard layout with sidebar
- `AdminSidebar.tsx` - Navigation sidebar for admin
- `AdminHeader.tsx` - Top bar with user menu, logout
- `DashboardCard.tsx` - Metric cards for overview
- `LoadForm.tsx` - Add/edit load form
- `LoadTable.tsx` - Load board management table
- `AdminPasswordPrompt.tsx` - Dashboard password entry
- `AdminGuard.tsx` - Route protection wrapper
- `AnalyticsChart.tsx` - Charts for analytics
- `QuoteManagement.tsx` - Quote request management
- `UserManagement.tsx` - Admin user management
- `ActivityLog.tsx` - Admin activity display

## Development Phases

### Phase 1: Foundation (Week 1)
- [x] Set up Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up Supabase project and schema
- [ ] Implement theme system (light/dark)
- [ ] Create base layout (Header, Footer)
- [ ] Set up i18n with en-us default
- [ ] Create component library basics

### Phase 2: Core Pages (Week 2)
- [ ] Homepage with hero and features
- [ ] Services pages (all variations)
- [ ] About page
- [ ] Contact page with map
- [ ] 404 and error pages

### Phase 3: Forms & Integration (Week 3)
- [ ] Build quote request form
- [ ] Integrate Web3Forms
- [ ] Connect Supabase database
- [ ] Add form validation
- [ ] Implement success/error handling
- [ ] Create carrier application form
- [ ] Build contact form

### Phase 4: Multi-language (Week 4)
- [ ] Set up translation infrastructure
- [ ] Create translation files for all pages
- [ ] Implement language switching
- [ ] Add Spanish translations
- [ ] Add French Canadian translations
- [ ] Add Punjabi translations
- [ ] Test language routing

### Phase 5: Polish & Optimization (Week 5)
- [ ] Optimize images and assets
- [ ] Implement SEO best practices
- [ ] Add loading states and animations
- [ ] Accessibility audit and fixes
- [ ] Mobile responsiveness testing
- [ ] Cross-browser testing
- [ ] Performance optimization

### Phase 6: Admin Dashboard (Weeks 6-7)
- [ ] Set up Supabase Auth for admin login
- [ ] Create admin database tables (loads, admin_users, activity_log)
- [ ] Build admin authentication flow
- [ ] Implement email verification for admin access
- [ ] Create dashboard password protection
- [ ] Build admin layout and sidebar navigation
- [ ] Create dashboard overview page with metrics
- [ ] Build load board management (add, edit, delete loads)
- [ ] Create load form with all fields
- [ ] Implement analytics page with charts
- [ ] Build admin user management (add, remove admins)
- [ ] Create quote request management interface
- [ ] Build carrier application management
- [ ] Add contact message management
- [ ] Implement settings page
- [ ] Create activity logging system
- [ ] Build public load board page (displays active loads)
- [ ] Test admin permissions and roles
- [ ] Implement admin activity tracking

### Phase 7: Testing & Deployment (Week 8)
- [ ] End-to-end testing
- [ ] Form submission testing
- [ ] Database query optimization
- [ ] Security review
- [ ] Deploy to Vercel/Netlify
- [ ] Set up custom domain
- [ ] Configure SSL
- [ ] Set up monitoring/analytics

## Design Inspiration & References

### Similar Sites for Reference
**DO NOT COPY - Only use for structure/feature inspiration:**
- TQL: https://www.tql.com/
  - Clean, professional layout
  - Clear service categorization
  - Strong CTAs
- C.H. Robinson: https://www.chrobinson.com/en-us/
  - Multi-language implementation
  - Dropdown navigation structure
  - Resource center layout
  - Footer organization

### Unique Design Elements for Sea Road
- More modern, clean aesthetic (avoid cluttered look)
- Prominent trust signals (USDOT, MC numbers)
- California/West Coast visual theme (optional)
- Emphasis on personal service vs. corporate
- Mobile-first approach
- Faster load times than competitors
- Simpler, more intuitive quote process

## Content Strategy

### Pages Needing Content Writing
1. **Homepage**
   - Hero headline and subheadline
   - Value propositions (3-4 points)
   - Service summaries (50-75 words each)
   - Why choose us section (4-6 benefits)
   - CTA copy

2. **Service Pages** (each needs):
   - Page title and H1
   - Service description (200-300 words)
   - Benefits list (5-7 items)
   - Common use cases (3-5 examples)
   - Pricing factors (transparency)

3. **About Page**
   - Company mission statement
   - Story/background (150-200 words)
   - Core values (3-5 points)
   - Service area description

4. **Carriers Page**
   - Why partner with us (5-7 benefits)
   - Requirements list
   - Payment terms details
   - Support information

5. **Legal Pages**
   - Terms of Service
   - Privacy Policy
   - Cookie Policy (if using analytics)

## File Structure

```
sea-road-brokerage/
├── public/
│   ├── images/
│   │   ├── logo-placeholder.svg
│   │   ├── hero/
│   │   ├── services/
│   │   └── icons/
│   ├── locales/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx (Homepage)
│   │   │   ├── services/
│   │   │   ├── carriers/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── quote/
│   │   │   └── load-board/
│   │   ├── admin/
│   │   │   ├── layout.tsx (Admin layout with sidebar)
│   │   │   ├── middleware.ts (Auth check)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx (Overview)
│   │   │   ├── loads/
│   │   │   │   ├── page.tsx (Load list)
│   │   │   │   ├── new/
│   │   │   │   └── [id]/
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   ├── users/
│   │   │   │   ├── page.tsx (Admin user management)
│   │   │   │   └── new/
│   │   │   ├── quotes/
│   │   │   │   ├── page.tsx (Quote list)
│   │   │   │   └── [id]/
│   │   │   ├── carriers/
│   │   │   │   ├── page.tsx (Carrier applications)
│   │   │   │   └── [id]/
│   │   │   ├── messages/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx (Admin login)
│   │   └── api/
│   │       ├── quote/
│   │       ├── contact/
│   │       ├── carrier-application/
│   │       └── admin/
│   │           ├── loads/
│   │           ├── users/
│   │           ├── auth/
│   │           └── analytics/
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── forms/
│   │   ├── features/
│   │   └── admin/
│   │       ├── AdminLayout.tsx
│   │       ├── AdminSidebar.tsx
│   │       ├── AdminHeader.tsx
│   │       ├── LoadForm.tsx
│   │       ├── LoadTable.tsx
│   │       ├── AnalyticsChart.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── web3forms.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useAdmin.ts
│   │   ├── useAuth.ts
│   │   └── useAnalytics.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   └── config/
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Dependencies

### Core
```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    
    "@supabase/supabase-js": "^2.43.0",
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "next-intl": "^3.15.0",
    "next-themes": "^0.3.0",
    
    "react-hook-form": "^7.51.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.3.0",
    
    "date-fns": "^3.6.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",
    "lucide-react": "^0.378.0",
    
    "recharts": "^2.12.0",
    "react-chartjs-2": "^5.2.0",
    "chart.js": "^4.4.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

## Security Considerations

### Form Security
- CSRF protection (Next.js automatic)
- Rate limiting on form submissions
- Honeypot fields for spam prevention
- Input sanitization before database insert
- reCAPTCHA v3 (invisible) recommended

### Database Security
- Row Level Security enabled on Supabase
- Never expose service role key client-side
- Validate all inputs server-side
- Parameterized queries (Supabase automatic)
- Limit query results (pagination)

### General Security
- HTTPS only (force redirect)
- Security headers (Next.js config)
- Content Security Policy
- No sensitive data in URLs
- Sanitize user-generated content
- Regular dependency updates

## Testing Checklist

### Functionality
- [ ] All forms submit successfully
- [ ] Form validation works correctly
- [ ] Required checkbox prevents submission
- [ ] Supabase data saves correctly
- [ ] Email notifications sent (Web3Forms)
- [ ] Theme toggle works across pages
- [ ] Language switching works
- [ ] All links navigate correctly
- [ ] Mobile menu opens/closes
- [ ] Maps load properly

### Cross-Browser
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Responsive Design
- [ ] Mobile (320px - 640px)
- [ ] Tablet (641px - 1024px)
- [ ] Desktop (1025px+)
- [ ] 4K displays (2560px+)

### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader testing (NVDA/JAWS)
- [ ] Color contrast validation
- [ ] Focus indicators visible
- [ ] Form errors announced

### Performance
- [ ] Lighthouse score > 90 (all metrics)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Image optimization verified

## Launch Checklist

### Pre-Launch
- [ ] All content finalized and reviewed
- [ ] Logo uploaded and replaced
- [ ] All translations complete
- [ ] Forms tested with real submissions
- [ ] Analytics configured (GA4, etc.)
- [ ] Error tracking set up (Sentry, etc.)
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Email forwarding set up
- [ ] Backup strategy in place

### Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Set up Google My Business
- [ ] Monitor form submissions
- [ ] Check for broken links
- [ ] Monitor error logs
- [ ] Review analytics weekly

## Future Enhancements (TODO.txt additions)

### Near-term (1-3 months)
- [ ] Customer testimonials section
- [ ] Blog/news section for SEO
- [ ] Load tracking portal
- [ ] Real-time freight quotes (API integration)
- [ ] Carrier portal (login area)
- [ ] Admin dashboard for quote management
- [ ] Email automation (quote follow-ups)
- [ ] Live chat widget

### Mid-term (3-6 months)
- [ ] Payment processing integration
- [ ] Document upload system
- [ ] Automated load matching
- [ ] Customer portal (login area)
- [ ] Mobile app (React Native)
- [ ] Integration with TMS software
- [ ] API for third-party integrations
- [ ] Advanced analytics dashboard

### Long-term (6-12 months)
- [ ] AI-powered route optimization
- [ ] Predictive pricing engine
- [ ] Blockchain for shipment tracking
- [ ] IoT integration for real-time tracking
- [ ] Machine learning for demand forecasting
- [ ] Automated carrier onboarding
- [ ] Multi-currency support
- [ ] International shipping expansion

## Support & Maintenance

### Ongoing Tasks
- Monitor form submissions daily
- Respond to quote requests within 4 hours
- Update content monthly (blog, news)
- Review analytics monthly
- Update dependencies quarterly
- Security audits quarterly
- Backup verification monthly
- Performance monitoring weekly

### Monitoring Setup
- Uptime monitoring (UptimeRobot, etc.)
- Error tracking (Sentry)
- Analytics (Google Analytics 4)
- Form submission alerts (email/SMS)
- SSL certificate expiration alerts
- Database backup verification

## Notes for Development

### Design Principles
1. **Simplicity First**: Keep navigation and user flows simple
2. **Trust Signals**: Prominently display USDOT/MC numbers
3. **Mobile-First**: Design for mobile, enhance for desktop
4. **Performance**: Optimize for speed above all
5. **Accessibility**: WCAG 2.1 AA compliance minimum
6. **SEO**: Semantic HTML and proper meta tags
7. **Conversion**: Clear CTAs on every page

### Development Best Practices
- Use TypeScript strictly (no `any` types)
- Follow Next.js App Router patterns
- Component-based architecture
- Atomic design principles
- Git commit messages: conventional commits
- Code reviews before merge
- Test locally before deployment
- Document complex logic

### Common Pitfalls to Avoid
- Don't copy designs directly from reference sites
- Don't skip mobile testing
- Don't ignore accessibility
- Don't forget meta tags
- Don't hardcode text (use i18n)
- Don't skip form validation
- Don't expose API keys
- Don't neglect error handling

## Quick Start Commands

```bash
# Create Next.js project
npx create-next-app@latest sea-road-brokerage --typescript --tailwind --app

# Install dependencies
cd sea-road-brokerage
npm install @supabase/supabase-js next-intl next-themes react-hook-form zod @hookform/resolvers date-fns clsx tailwind-merge lucide-react

# Install dev dependencies
npm install -D @types/node @types/react @types/react-dom

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Contact for Development Questions
- **Project Owner**: Kanwaljit Singh
- **Email**: searoadbrokerageinc@gmail.com
- **Phone**: 209-920-0003

---

**Last Updated**: May 23, 2026
**Version**: 1.0
**Status**: Ready for Development
