# Silvet — Project Plan

## Overview

Silvet is a veterinary cardiology clinic website targeting Polish-speaking pet owners with multi-language support. The project follows a phased approach: public website → booking system → CMS dashboard → automated communication → user accounts → compliance → analytics.

Each phase is designed as a vertical slice — independently deployable and valuable — rather than a horizontal layer. Later phases build on earlier ones but the architecture intentionally avoids coupling phases together so that the public site can ship immediately while dashboards and automation are built iteratively.

---

## Phase 1: Public Website (Current)

The public-facing homepage with service listing, 3D heart model, locale switching, and theme support. This phase is the foundation — it establishes the design system, i18n infrastructure, and deployment pipeline. Every subsequent phase inherits these decisions.

### Completed
- [x] Homepage with hero section (headline, subtitle, CTA button)
- [x] Services grid (4 services: echocardiography, cardiac screening, heart disease management, emergency cardiology)
- [x] Footer with contact details, opening hours, copyright
- [x] 4 locales: pl (Polish, default), en (English), de (German), pt (Portuguese)
- [x] Dark/light theme toggle (next-themes, class-based `.dark` strategy)
- [x] 3D heart model rendered via React Three Fiber (Draco-compressed `.glb`, 272KB)
- [x] Mobile hamburger menu with locale switcher, theme toggle (translated target-mode labels), contact link
- [x] Custom 404 page with brand identity (logo, 404, description, home link)
- [x] Decorative HeartPawIllustration SVG (heart + paw prints + ECG lines)
- [x] Language switcher dropdown in desktop and mobile nav
- [x] Locale detection via middleware (cookie-based + Accept-Language fallback)
- [x] Contact button linking to `/{locale}/contact`
- [x] 3D heart model: multi-axis dynamic rotation, lub-dub heartbeat pulse effect (1.5s cycle)
- [x] 3D heart model: per-child centering (fixes orbital wobble from rotation+centering on same group)
- [x] Mobile 3D heart: full-screen background at 52% opacity, full opacity on desktop (lg:)
- [x] Desktop nav hidden on mobile (`hidden md:flex`), hamburger visible on mobile (`md:hidden`)
- [x] Middleware named `proxy.ts` (Next.js 16 convention, replacing deprecated `middleware.ts`)
- [x] Next.js 16 `localeDetection: true` in routing config

### Architecture Decisions (Phase 1)
- **Framework**: Next.js 16 (App Router) — chosen for SSG/ISR, file-based routing, and React Server Components
- **i18n**: `next-intl` v4 — middleware-based locale detection, path-prefix routing (`/pl/...`, `/en/...`), colocated message files
- **Theme**: `next-themes` v0.4.6 — class strategy (toggles `.dark` class on `<html>`), `suppressHydrationWarning` to prevent SSR mismatch
- **Styling**: Tailwind v4 — `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css` for dark variants
- **3D**: `@react-three/fiber` + `@react-three/drei` — `useGLTF` with Draco decoder (auto-handled by drei v10.7.7)
- **Fonts**: Geist (sans, via `next/font/google`), Geist Mono (mono), Nunito Sans italic (logo font `--font-logo`)
- **Model compression**: `gltf-transform` CLI — Draco compression reduced `heart.glb` from 1.28MB to 272KB (79% reduction)
- **Middleware**: File named `proxy.ts` (Next.js 16 convention flips from `middleware.ts` to `proxy.ts`)
- **Locale redirect**: Polish is default; `/` redirects to `/pl` via middleware
- **Error recovery**: Locale detection issues (stale `NEXT_LOCALE` cookie) resolved by clearing cookie; future-proofed with explicit `localeDetection: true`

### Rationale for Key Decisions
- **No root `layout.tsx` yet**: The `[locale]/layout.tsx` serves as the de facto root layout for locale-routed pages. Not-found page uses inline styles because it exists outside the locale segment. A future refactor could add a root layout to share ThemeProvider and fonts with the 404 page, but this adds complexity with `lang` attribute propagation and was deferred.
- **404 page strategy**: Root `app/not-found.tsx` with client-side locale detection (reads from `window.location.pathname`) and CSS `prefers-color-scheme` for dark mode. This preserves SSG for `[locale]` pages while still providing a localized, themed 404 after hydration.

### Known Issues & Technical Debt
- 404 page shows English fallback before client-side hydration resolves locale
- 404 page may show light-theme flash before client-side hydration applies dark mode
- Font variables (`--font-logo`, `--font-geist-sans`) not available in root 404 page (defined in `[locale]/layout.tsx`)
- No root `layout.tsx` means ThemeProvider and font loading are duplicated or unavailable for non-locale routes

---

## Phase 2: Booking Flow

A multi-step appointment booking form allowing clients to schedule visits with specific doctors, select services, and provide pet/client details. This phase introduces the first interactive workflow and the initial database models.

### Booking Wizard (`/book`)
- [ ] Step 1: Date/time picker
  - Calendar grid showing available slots per day
  - Slots filtered by doctor availability (integrate with staff schedule)
  - Timezone-aware (display clinic timezone, let client pick)
  - Visual indicator for busy/full days
- [ ] Step 2: Pet information form
  - Fields: name, species (dog/cat/other), breed (free text), age (years/months), weight
  - Notes / reason for visit textarea
  - Option to select from existing pets (if logged in, Phase 5)
- [ ] Step 3: Client contact form
  - Fields: full name, email, phone, preferred contact method (email/SMS/phone)
  - Consent checkbox for data processing (RODO/GDPR — hooks into Phase 6)
  - Optional: preferred language for communication
- [ ] Step 4: Confirmation & summary
  - Review all entered details
  - Option to edit any step
  - Confirm button → creates appointment record
  - Redirect to confirmation page with appointment ID

### Contact Page (`/contact`)
- [ ] Static contact information (address, phone, email, map embed)
- [ ] Quick contact form (name, email, message) — sends email to clinic
- [ ] Google Maps embed showing clinic location
- [ ] Opening hours displayed prominently
- [ ] Language-aware content (per locale)

### Calendar & Availability
- [ ] Calendar view showing available slots per doctor
- [ ] Service type → duration mapping (e.g., echocardiography = 45min, screening = 30min)
- [ ] Home visit toggle (different duration, travel time buffer between slots)
- [ ] Buffer time between appointments (e.g., 10min for notes/cleanup)
- [ ] Max appointments per day per doctor
- [ ] Lunch break / non-working hours handling

### Client Verification
- [ ] Email verification (send code, verify before booking completes)
- [ ] SMS verification (send code via SMSAPI or Twilio)
- [ ] Skip verification for returning clients (cookie or account-based)
- [ ] Verification expiry (code valid for 15 minutes)
- [ ] Rate limiting (max 3 verification attempts per phone/email per hour)

### Integrations
- [ ] Google Calendar API — sync booked appointments to clinic calendar
- [ ] Cal.com integration — alternative self-hosted scheduling
- [ ] ICS file generation — for client calendar downloads
- [ ] Email notification: booking confirmation to client (via Resend/SendGrid/SES)

### Database Models (Phase 2)
- `Appointment` — id, client_id, pet_id, doctor_id, service_id, start_time, end_time, status, notes, created_at
- `Client` — id, name, email, phone, preferred_locale, verified_email, verified_phone
- `Pet` — id, client_id, name, species, breed, age, weight, notes
- `Service` — id, name (per locale), duration_minutes, price, description (per locale)
- `Doctor` — id, name, specialization, bio (per locale), photo, active
- `Schedule` — id, doctor_id, day_of_week, start_time, end_time, break_start, break_end

### Considerations
- Verification must complete before booking is confirmed (not after)
- Mobile-first multi-step form with progress indicator
- Polish locale is primary; forms should default to pl with locale-specific validation messages
- Stale appointments (older than 30 days) should be automatically archived
- Concurrent booking prevention (pessimistic locking or soft-reservation with 15min timeout)

---

## Phase 3: CMS Dashboard

Admin dashboard for clinic staff to manage content, view appointments, and configure the clinic's online presence. Designed for non-technical users (veterinarians, receptionists).

### Authentication & Authorization
- [ ] Admin login (email + password, or magic link)
- [ ] Role-based access control: admin, doctor, technician, reception
  - Admin: full access
  - Doctor: view own schedule, manage own appointments
  - Technician: view appointments, manage pet records
  - Reception: manage appointments, client records, communication
- [ ] Session management (JWT or secure cookies)
- [ ] Password reset flow (email-based)
- [ ] Two-factor authentication (TOTP) — future

### Dashboard Home
- [ ] Today's appointments summary (count, by status)
- [ ] Upcoming appointments list (next 24h)
- [ ] Quick actions: new appointment, new client, message client
- [ ] Unread messages / pending verifications badge
- [ ] Shortcuts to most-used sections

### Staff Management
- [ ] Staff profile CRUD: name, role, photo, bio (per locale), specialization
- [ ] Working hours editor: per day of week, per staff member
- [ ] Break scheduling (lunch, admin time)
- [ ] Time-off / vacation management (block calendar dates)
- [ ] Activity log for each staff member

### Service Catalog
- [ ] CRUD for services displayed on public site
- [ ] Per-locale name, description, duration, price
- [ ] Visibility toggle (show/hide on public site)
- [ ] Ordering / priority (controls grid position)
- [ ] Category tagging (cardiology, general, home visit)

### Appointment Management
- [ ] Table view: all appointments with filters (date, status, doctor, service)
- [ ] Calendar view: drag-and-drop rescheduling
- [ ] Appointment detail: client, pet, doctor, service, notes, status history
- [ ] Status transitions: pending → confirmed → checked-in → in-progress → completed / cancelled / no-show
- [ ] Cancel appointment with reason (and auto-notify client via Phase 4)
- [ ] Reschedule appointment (and auto-notify client)

### Client Database
- [ ] Client list with search (name, email, phone)
- [ ] Client detail: contact info, pets, appointment history, notes
- [ ] Merge duplicate clients
- [ ] Export client data (CSV/JSON) — for GDPR compliance
- [ ] Blocklist clients (for abusive/no-show behavior)

### Communication Templates
- [ ] Template editor: subject + body per channel (email/SMS)
- [ ] Per-locale templates (pl, en, de, pt)
- [ ] Variables supported: {client_name}, {pet_name}, {appointment_date}, {appointment_time}, {doctor_name}, {clinic_address}, {cancellation_link}, {reschedule_link}
- [ ] Template preview (rendered with sample data)
- [ ] Version history for templates
- [ ] Fallback chain: if locale template missing → use default locale (pl)

### Audit Log
- [ ] Track all mutations: who changed what, when
- [ ] Immutable log entries (append-only)
- [ ] Log viewer with filters (actor, action, resource, date range)
- [ ] Retention policy: 12 months

### Architecture (Phase 3)
- Dashboard at `/dashboard` (subdomain or path, under auth)
- API routes: `/api/*` — RESTful, rate-limited, authenticated
- Database tables: extend Phase 2 with CMS-specific models
  - `AuditLog` — id, actor_id, action, resource_type, resource_id, details, created_at
  - `CommunicationTemplate` — id, channel, locale, subject, body, variables, version
  - `TimeOff` — id, staff_id, start_date, end_date, reason, approved

---

## Phase 4: Automated Communication

Email and SMS notifications triggered by appointment lifecycle events. Reduces no-shows and improves client experience through timely, automated follow-up.

### Triggers & Events
- [ ] **Booking confirmed** → immediate confirmation with appointment summary
  - Includes: date, time, doctor, address, prep instructions, reschedule/cancel links
- [ ] **24h reminder** → SMS + email reminder day before
  - Includes: appointment details, "confirm" button, "reschedule" link
- [ ] **2h reminder** → SMS reminder 2 hours before (for same-day slots)
- [ ] **Follow-up** → 24h after appointment
  - Includes: thank you message, request for review, follow-up instructions
- [ ] **No-show** → 30min after missed appointment
  - Includes: "we missed you" message, rebooking link
- [ ] **Cancellation** → immediate notification to client + internal notification to doctor
  - Includes: cancellation confirmation, rebooking link
- [ ] **Rescheduling** → old slot cancelled notification + new slot confirmation
- [ ] **Birthday** → annual pet birthday greeting (opt-in)
  - Includes: discount / checkup reminder

### Templates
- [ ] Email templates (HTML + plain text fallback)
  - Branded with clinic logo, colors, fonts
  - Responsive design (mobile email clients)
  - Unsubscribe link in footer (legal requirement)
- [ ] SMS templates (plain text, 160-char optimized for concatenation)
- [ ] Per-locale templates for all trigger events
- [ ] Preview and test-send from CMS dashboard

### Providers
- [ ] **Email**: Resend (recommended — modern API, good deliverability) / SendGrid / SES
  - Dedicated sending domain (e.g., mail.silvet.pl)
  - DKIM, SPF, DMARC setup
  - Bounce handling (mark email as invalid)
  - Open/click tracking (optional, privacy-aware)
- [ ] **SMS**: Twilio (international) or SMSAPI (Polish market, cheaper for Polish numbers)
  - Sender name registration (Polish regulations require registration)
  - Delivery receipts
  - Opt-out handling (STOP keyword)

### Configuration
- [ ] Enable/disable individual triggers
- [ ] Override timing per trigger (e.g., reminder 48h instead of 24h)
- [ ] Quiet hours (don't send SMS between 21:00–8:00)
- [ ] Max reminder count (don't send infinite reminders)
- [ ] Test mode (send to clinic email only, not to real clients)

### Compliance
- [ ] Consent record: store which channels client opted into
- [ ] Unsubscribe handling: universal unsubscribe link in all emails
- [ ] Opt-out keyword handling for SMS
- [ ] Suppression list: don't send to bounced/complained addresses
- [ ] CAN-SPAM / RODO compliance: identify sender, physical address in footer

---

## Phase 5: User Accounts

Client portal allowing pet owners to manage their appointments, pets, and communication preferences without calling the clinic.

### Registration & Login
- [ ] Registration: email + password, or social login (Google, Apple)
- [ ] Magic link login (passwordless, email-based)
- [ ] Password reset flow
- [ ] Session management (remember me, multi-device)
- [ ] Account deletion (right to be forgotten — RODO)

### Client Dashboard
- [ ] Upcoming appointments list (with countdown, reschedule/cancel buttons)
- [ ] Past appointments list (with links to medical reports)
- [ ] Active pets summary (name, species, breed, age)
- [ ] Quick book new appointment button

### Pet Profiles
- [ ] Add/edit/remove pets (name, species, breed, age, weight, medical notes)
- [ ] Upload pet photo
- [ ] Vaccination records (manual entry, future: upload PDF)
- [ ] Medical history summary (linked appointments)
- [ ] Multiple pets per account (unlimited)

### Appointment Management
- [ ] Cancel appointment (with reason, within cancellation window)
- [ ] Reschedule (pick new slot from available times)
- [ ] Appointment history (date, doctor, service, notes, outcome)
- [ ] Download appointment summary (PDF)

### Medical Records
- [ ] View echocardiography reports (PDF)
- [ ] View screening results
- [ ] Download medical history (PDF export)
- [ ] Share records with another clinic (with consent)

### Communication Preferences
- [ ] Preferred contact method (email/SMS/phone/none)
- [ ] Opt-in/out for reminders, follow-ups, marketing, birthday greetings
- [ ] Preferred locale for communications
- [ ] Manage notification schedule (quiet hours)

### Security
- [ ] Rate limiting on login attempts (5 attempts → 15min lockout)
- [ ] Session expiry (30 days, configurable)
- [ ] API token management for integrations
- [ ] Suspicious login detection (new device/ip → email alert)

---

## Phase 6: Compliance & Privacy

Polish and European regulations for veterinary practice, data protection, and online services.

### RODO / GDPR
- [ ] Consent collection and record-keeping
  - Separate consents: appointment booking, marketing, communication, data sharing
  - Consent stored with timestamp and version
  - Easy withdrawal of consent
- [ ] Privacy policy page (per locale)
  - Data controller info (clinic details)
  - What data is collected, why, how long retained
  - Third-party data processors (email provider, SMS provider, hosting)
  - User rights: access, rectification, erasure, portability, objection
- [ ] Data retention schedules
  - Appointment records: 5 years (Polish veterinary law)
  - Client contact data: 5 years after last appointment
  - Communication logs: 2 years
  - Audit logs: 12 months
  - Website analytics: anonymized after 12 months
- [ ] Data deletion / anonymization workflows
  - Automatic: based on retention schedules
  - Manual: right to erasure request handling
- [ ] Data breach notification procedure
  - Internal alert → containment → assessment → notification to UODO (within 72h)
  - Template for client notification
- [ ] Data Processing Agreement (DPA) with third-party providers

### Veterinary Law (Polish)
- [ ] Record keeping requirements (Ustawa o zawodzie lekarza weterynarii)
  - Minimum data: patient identification, owner data, diagnosis, treatment, medications
  - Retention: minimum 5 years
  - Format: electronic with backup
- [ ] Prescription handling (if pharmacy add-on)
- [ ] Referral documentation between clinics
- [ ] Controlled substances tracking (if applicable)

### Website Compliance
- [ ] Cookie consent banner
  - Categories: essential, functional, analytics, marketing
  - Cookie preference storage
  - Per-locale text
- [ ] Accessibility (WCAG 2.1 AA)
  - Color contrast ratios
  - Keyboard navigation
  - Screen reader support
  - Focus indicators
- [ ] Terms of service page (per locale)
- [ ] Medical disclaimer (website content is informational, not medical advice)

### Patient Data Access Controls
- [ ] Role-based access (already planned in Phase 3)
- [ ] Access logging (already planned in Phase 3)
- [ ] Principle of least privilege: staff only see data relevant to their role
- [ ] Client-facing: clients only see their own data and their pets' data
- [ ] Data masking: sensitive fields (phone, email) masked for non-reception staff

---

## Phase 7: Analytics & Growth

Usage analytics, business intelligence, and marketing features to help the clinic grow.

### Appointment Analytics
- [ ] Appointment volume over time (daily, weekly, monthly)
- [ ] Popular services (by count, by revenue)
- [ ] No-show rate (overall, per doctor, per service, per time slot)
- [ ] Average appointment duration (actual vs scheduled)
- [ ] Cancellation rate and reasons breakdown
- [ ] Peak booking times (day of week, hour of day)
- [ ] Lead time: average days from booking to appointment
- [ ] Rebooking rate (percentage of clients with recurring appointments)

### Client Analytics
- [ ] New vs returning clients
- [ ] Client acquisition channels (direct, search, referral, social)
- [ ] Client retention rate (return within 6 months, 12 months)
- [ ] Average appointments per client
- [ ] Client locale distribution (pl/en/de/pt)
- [ ] Geographic distribution (by city/region)
- [ ] Pet population statistics (species, breed, age distribution)

### Locale & SEO Analytics
- [ ] Pageviews per locale
- [ ] Bounce rate per locale (on each locale's home page)
- [ ] Top landing pages per locale
- [ ] Search console integration (impressions, clicks, position per locale)
- [ ] Locale-specific keyword tracking
- [ ] hreflang tag validation

### Conversion Funnel
- [ ] Visit → click CTA → start booking → complete booking → show up, broken down by:
  - Locale
  - Device type (mobile vs desktop)
  - Referral source
- [ ] Drop-off points in booking flow (which step loses most users)
- [ ] Time-to-booking: days from first visit to completed booking
- [ ] A/B testing framework for CTA copy and placement

### Content & SEO
- [ ] Blog / news section
  - Article categories: heart health, breed guides, clinic news, case studies
  - Per-locale content (translated or original per market)
  - Author bio + photo
  - Social share buttons
  - RSS feed
- [ ] SEO optimization
  - Unique meta titles and descriptions per page per locale
  - Open Graph and Twitter Card tags
  - Structured data (JSON-LD): LocalBusiness, VeterinaryCare, FAQ, Article
  - Sitemap generation (per locale)
  - robots.txt per locale
  - Canonical URLs per locale
  - Breadcrumb structured data
- [ ] Google Business Profile integration
  - Sync appointment availability
  - Automate posting (new services, blog posts)
  - Respond to reviews from dashboard (notify when new review)

### Marketing Tools
- [ ] Newsletter signup (footer, with consent)
- [ ] Promotional campaign support (discount codes, first-visit offers)
- [ ] Referral program tracking
- [ ] Social media link management (Instagram, Facebook, LinkedIn)

### Dashboard & Reporting
- [ ] Analytics dashboard (subset of above metrics, refreshed hourly)
- [ ] Export reports (CSV, PDF, scheduled email)
- [ ] Comparison periods (this month vs last month, vs same month last year)
- [ ] Anomaly detection (sudden drop in bookings, spike in no-shows)
- [ ] Print-friendly report view

### Privacy Considerations
- Anonymize all analytics data (no PII in analytics system)
- Aggregate metrics only (minimum 5 clients per data point to prevent re-identification)
- Opt-out mechanism for analytics (cookie consent)
- Analytics data retention: 24 months, then aggregated to monthly totals (no individual events)
- Use privacy-preserving analytics (Plausible, Umami) or self-hosted (Matomo) — avoid Google Analytics unless consented

---

## Technical Stack

| Concern | Choice | Rationale |
|---------|--------|-----------|
| Framework | Next.js 16 (App Router) | SSG for public pages, RSC for performance, file-based routing |
| Language | TypeScript (strict) | Type safety, better refactoring, AI-friendly |
| Styling | Tailwind v4 | Utility-first, dark mode via `@custom-variant`, small bundle |
| i18n | next-intl v4 | Middleware-based, colocated messages, TypeScript integration |
| Theme | next-themes v0.4.6 | Class strategy, flash-free SSR, system preference support |
| 3D | Three.js + R3F + Drei | GPU-accelerated, Draco decoder built in, React-native API |
| Database | PostgreSQL (Prisma/Drizzle) | Relational model fits clinic domain, strong migration tooling |
| Auth | NextAuth.js / Lucia | Session-based, supports magic links + OAuth |
| Email | Resend | Modern API, good deliverability, React email templates |
| SMS | Twilio or SMSAPI | Twilio for intl, SMSAPI cheaper for Polish numbers |
| Hosting | Vercel | First-class Next.js support, edge functions, ISR |
| Model | Draco-compressed `.glb` | 79% smaller than uncompressed, auto-decoded by drei |
| Analytics | Plausible / Umami | Privacy-preserving, self-hostable, GDPR-compliant |
| Forms | React Hook Form + Zod | Performant, TypeScript-first validation |

## Architecture Principles

1. **Locale as first-class concern**: Every user-facing string goes through next-intl. No hardcoded text after Phase 1.
2. **Static by default, dynamic by choice**: Public pages pre-rendered at build time (SSG). Dynamic features (booking, dashboard) added only where needed.
3. **Vertical slices, not horizontal layers**: Each phase is a complete feature with its own UI, API, and data model — not a "frontend phase" then "backend phase."
4. **Polish-first**: Polish is the default locale. All content is authored in Polish first; other locales are translations. Fallback to pl if a locale is missing.
5. **Progressive enhancement**: Core functionality works without JavaScript. Enhanced with JS for better UX.
6. **Single source of truth**: No duplication of data between client and server. React Server Components fetch directly from database.
7. **Accessibility from day one**: WCAG 2.1 AA compliance built into component patterns, not retrofitted.
8. **Privacy by design**: Data minimization, retention limits, consent management, and anonymization built into every data flow.
