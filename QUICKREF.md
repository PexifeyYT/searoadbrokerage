# Sea Road Brokerage - Quick Reference for Development

## Essential Company Info
```
Company: Sea Road Brokerage INC
Address: 22492 Road 19 Site# J, Chowchilla, California
Phone: (209) 920-0003
Email: searoadbrokerageinc@gmail.com
USDOT: 4398936
MC: MC-1726540
```

## Tech Stack at a Glance
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Forms**: Web3Forms API
- **i18n**: next-intl
- **Theme**: next-themes
- **Hosting**: Vercel (recommended)

## Color Palette

### Light Theme (Default)
```css
--primary-blue: #0A6EBD
--secondary-blue: #1E88E5
--accent-blue: #42A5F5
--background: #FFFFFF
--text: #1F2937
--gray: #F3F4F6
```

### Dark Theme
```css
--primary-blue: #42A5F5
--background: #0F172A
--surface: #1E293B
--text: #F1F5F9
--border: #334155
```

## Supported Languages
1. English (en-us) - Default
2. Spanish (es)
3. French Canadian (fr-ca)
4. Punjabi (pa)

URL structure: `/en-us/`, `/es/`, `/fr-ca/`, `/pa/`

## Critical Features

### Admin Dashboard Authentication (3-Layer Security)

**Layer 1: Supabase Auth**
- Email/password login via Supabase Auth
- Only verified email users can login

**Layer 2: Admin Email Verification**
- User's email must exist in `admin_users` table
- If verified as admin → "Admin Dashboard" button appears
- If not admin → no access to admin routes

**Layer 3: Dashboard Password**
- After accessing `/admin`, prompt for password
- Password: `123456` (stored in env: `ADMIN_DASHBOARD_PASSWORD`)
- Persists in session (not required on every page)

**Admin Roles:**
- **Super Admin**: Full access, can manage other admins
- **Admin**: Can manage loads, quotes, view analytics
- **Viewer**: Read-only access

### Theme Toggle
- **Location**: Top-left corner of header
- **Icon**: Sun/Moon
- **Default**: Light theme
- **Persistence**: localStorage

### Quote Form Requirements
**Must have checkbox that blocks submission:**
"I agree to the Terms of Service and Privacy Policy and consent to be contacted regarding my quote request."

**Form fields** (see instructions.md for full schema):
- Contact info (name, email, phone)
- Billing details (address, city, state, zip)
- Shipment details (type, origin, destination, dates, weight, etc.)
- Terms checkbox (REQUIRED)

**Integration**:
- Web3Forms for email delivery
- Supabase for data storage
- Honeypot field for spam prevention
- Real-time validation

## Navigation Structure

```
Services
├── Freight Services
│   ├── Full Truckload (FTL)
│   ├── Less Than Truckload (LTL)
│   ├── Intermodal
│   ├── Flatbed
│   ├── Temperature Controlled
│   └── Expedited Shipping
├── Logistics Services
│   ├── Supply Chain Management
│   ├── Route Optimization
│   └── Warehousing Solutions
└── Specialized Services
    ├── Hazardous Materials
    ├── Oversized Loads
    └── Cross-Border Shipping

Carriers
├── Become a Carrier
├── Carrier Requirements
├── Load Board
├── Carrier Support
└── Payment Terms

Resources
├── Industry Insights
├── Freight Market Updates
├── Shipping Guides
├── Documentation
└── FAQ

About
├── Our Company
├── Why Choose Us
├── Service Areas
├── Certifications
└── Contact Us

Contact
```

## Priority Pages

### Public Site
1. **Homepage** - Hero, features, services overview, CTAs
2. **Quote Request** (/quote) - Main conversion point
3. **Services** - Individual pages for each service type
4. **Load Board** (/load-board) - Public load listings
5. **About** - Company info, USDOT/MC display
6. **Contact** - Form + map + info
7. **Carriers** - Partnership page + application

### Admin Dashboard (/admin)
1. **Dashboard** - Overview with metrics
2. **Loads** - Load board management (add, edit, delete)
3. **Analytics** - Traffic and conversion metrics
4. **Users** - Admin user management
5. **Quotes** - Quote request management
6. **Carriers** - Carrier application management
7. **Messages** - Contact message inbox
8. **Settings** - Dashboard configuration

## Supabase Tables

### Public Forms
**quote_requests**
```sql
- id (UUID, PK)
- created_at (timestamp)
- first_name, last_name, company, email, phone
- billing_address, city, state, zip, country
- shipment_type, origin, destination, pickup_date, delivery_date
- commodity_type, weight, dimensions, special_requirements
- quote_reference (unique)
- status (default: 'pending')
- ip_address, user_agent, language
- assigned_to (FK to admin_users)
- internal_notes
```

**carrier_applications**
```sql
- id (UUID, PK)
- created_at (timestamp)
- company_name, contact_name, email, phone
- dot_number, mc_number, insurance_amount, fleet_size
- status (default: 'pending')
- assigned_to (FK to admin_users)
- internal_notes
```

**contact_messages**
```sql
- id (UUID, PK)
- created_at (timestamp)
- name, email, phone, subject, message
- status (default: 'unread')
- assigned_to (FK to admin_users)
- replied_at
```

### Admin Dashboard Tables

**loads** (Load Board)
```sql
- id (UUID, PK)
- created_at, updated_at (timestamps)
- load_id (unique, VARCHAR)
- status (active, filled, expired, draft)
- origin_city, origin_state, origin_zip
- destination_city, destination_state, destination_zip
- pickup_date, pickup_date_flexible
- delivery_date, delivery_date_flexible
- expires_at (auto-expire)
- equipment_type (Dry Van, Flatbed, Reefer, etc.)
- weight (lbs), length (feet), commodity
- rate, rate_type, show_rate
- loaded_miles, empty_miles
- contact_name, contact_phone, contact_email
- special_requirements, internal_notes
- posted_by (FK to admin_users)
```

**admin_users**
```sql
- id (UUID, PK)
- created_at, updated_at (timestamps)
- auth_user_id (FK to Supabase auth.users)
- email (unique)
- name
- role (super_admin, admin, viewer)
- status (pending, active, suspended)
- last_login
- invited_by (FK to admin_users)
- invitation_sent_at
```

**admin_activity_log**
```sql
- id (UUID, PK)
- created_at (timestamp)
- admin_user_id (FK to admin_users)
- action (login, logout, create_load, edit_load, etc.)
- entity_type (load, quote, carrier_application, etc.)
- entity_id (UUID)
- details (JSONB)
- ip_address, user_agent
```

## Environment Variables Template

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Web3Forms
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key

# Admin Dashboard
ADMIN_DASHBOARD_PASSWORD=123456
NEXT_PUBLIC_ADMIN_ROUTE=/admin

# Site Config
NEXT_PUBLIC_SITE_URL=https://searoadbrokerage.com
NEXT_PUBLIC_COMPANY_EMAIL=searoadbrokerageinc@gmail.com
NEXT_PUBLIC_COMPANY_PHONE=209-920-0003
```

## Component Checklist

### Layout
- [ ] Header with nav, theme toggle, language selector
- [ ] Footer with links and contact info
- [ ] Mobile menu (hamburger)

### Forms
- [ ] QuoteForm with Web3Forms + Supabase
- [ ] ContactForm
- [ ] CarrierApplicationForm
- [ ] Required checkbox component

### UI Components
- [ ] Button (primary, secondary, outline)
- [ ] Card
- [ ] Input with validation
- [ ] Select/Dropdown
- [ ] DatePicker
- [ ] Modal
- [ ] Alert

### Feature Components
- [ ] Hero section
- [ ] ServiceCard
- [ ] FeatureGrid
- [ ] StatsCounter
- [ ] Map embed

## Design Principles

1. **Clean & Professional** - Not cluttered like some competitors
2. **Mobile-First** - Design for mobile, enhance for desktop
3. **Trust Signals** - Display USDOT/MC prominently
4. **Fast Loading** - Optimize everything for speed
5. **Accessible** - WCAG 2.1 AA compliance
6. **Original Design** - Don't copy reference sites directly

## Reference Sites (Structure Only - Don't Copy)
- TQL: https://www.tql.com/
- C.H. Robinson: https://www.chrobinson.com/en-us/

Use these for:
- Navigation patterns
- Service categorization ideas
- Feature inspiration
- Multi-language implementation examples

**DO NOT** copy:
- Exact designs
- Layouts
- Color schemes
- Images
- Copy/text

## Load Board Form Fields (Admin Dashboard)

```typescript
{
  loadId: string;  // Auto-generated
  status: 'active' | 'filled' | 'expired' | 'draft';
  
  // Route
  origin: { city, state, zipCode };
  destination: { city, state, zipCode };
  
  // Dates
  pickupDate: Date;
  pickupDateFlexible: boolean;
  deliveryDate: Date;
  deliveryDateFlexible: boolean;
  
  // Load Details
  equipmentType: 'Dry Van' | 'Flatbed' | 'Reefer' | 'Step Deck' | 'Other';
  weight: number; // lbs
  length?: number; // feet
  commodity: string;
  
  // Pricing (optional for public display)
  rate?: number;
  rateType?: 'Flat' | 'Per Mile';
  showRate: boolean;
  
  // Additional
  specialRequirements?: string;
  loadedMiles?: number;
  emptyMiles?: number;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  
  // Internal notes (admin only, not public)
  internalNotes?: string;
}
```

## Key Differentiators

Make Sea Road Brokerage stand out:
- Faster quote response times
- More personal service (not corporate)
- California/West Coast focus (optional)
- Simpler quote process
- Better mobile experience
- Faster page load times

## Development Commands

```bash
# Install
npm install

# Development
npm run dev

# Build
npm run build

# Production
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

## Testing Checklist (Before Each Push)

- [ ] All forms submit successfully
- [ ] Theme toggle works
- [ ] Language switching works
- [ ] Mobile menu opens/closes
- [ ] No console errors
- [ ] Responsive on mobile, tablet, desktop
- [ ] Links navigate correctly

## Launch Checklist (Final)

- [ ] Replace logo placeholder
- [ ] All content finalized
- [ ] All translations complete
- [ ] Forms tested with real data
- [ ] Analytics configured
- [ ] Domain configured
- [ ] SSL active
- [ ] Sitemap submitted

## Common Gotchas

1. **Forms**: Don't forget honeypot field for spam
2. **Checkbox**: Must be checked to submit - enforce this
3. **Theme**: Persist in localStorage, not just state
4. **i18n**: Don't hardcode text - use translation files
5. **Images**: Always optimize, use Next.js Image component
6. **API Keys**: Never expose on client side
7. **Mobile**: Test on real devices, not just DevTools
8. **Accessibility**: Don't forget keyboard navigation

## Performance Targets

- Lighthouse Score: >90 (all metrics)
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Cumulative Layout Shift: <0.1
- Page size: <2MB total

## File Structure Reminder

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── services/
│   │   ├── quote/
│   │   ├── carriers/
│   │   ├── about/
│   │   └── contact/
│   └── api/
├── components/
│   ├── layout/
│   ├── ui/
│   ├── forms/
│   └── features/
├── lib/
└── types/
```

## Logo Placeholder

Until real logo arrives:
- Size: 180px x 50px
- Text: "Sea Road Brokerage"
- Include truck icon from lucide-react
- Make it easy to swap out later

## Contact for Questions

**Kanwaljit Singh**
- Email: searoadbrokerageinc@gmail.com
- Phone: 209-920-0003

---

**Quick Links**
- Full Instructions: `instructions.md`
- TODO List: `TODO.txt`
- Reference: This file
