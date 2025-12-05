# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Delivery Booster — Consulting Website

Restaurant delivery optimization consulting service for foreign restaurant owners in Bali & Thailand. Landing page with bilingual support (RU/EN) showcasing services, case studies, and testimonials.

---

## Project Documentation (Auto-loaded)

The project uses comprehensive AI documentation in the `ai_docs/` folder. **All files below are automatically imported** when Claude Code starts:

### Business Context
@ai_docs/business/GTM_MANIFEST.md
@ai_docs/business/ICP_PERSONA.md
@ai_docs/business/ONBOARDING_GUIDE.md
@ai_docs/business/SALES_DECK_EXPECTATIONS.md

### Development
@ai_docs/development/DEPLOYMENT.md
@ai_docs/development/LANDING_PAGE_IMPROVEMENTS.md

### UI/UX Design System
@ai_docs/UI/01-design-system.md
@ai_docs/UI/02-animations.md
@ai_docs/UI/03-components-architecture.md
@ai_docs/UI/04-ux-patterns.md

---

## How to Use Documentation

**Before working on UI components:**
- Read `ai_docs/UI/01-design-system.md` for colors, typography, spacing, components
- Check `ai_docs/UI/03-components-architecture.md` for existing components and patterns
- Follow `ai_docs/UI/02-animations.md` for animation patterns (Framer Motion)
- Review `ai_docs/UI/04-ux-patterns.md` for UX guidelines and user journey

**Before working on copy/messaging:**
- Read `ai_docs/business/GTM_MANIFEST.md` for positioning and messaging framework
- Understand `ai_docs/business/ICP_PERSONA.md` for target audience (foreign restaurant owners in Bali/Thailand)

**Before adding new features:**
- Check `ai_docs/development/LANDING_PAGE_IMPROVEMENTS.md` for planned improvements
- Document new features in `ai_docs/development/`
- Update relevant UI documentation if UI/UX is affected

**Before deploying to production:**
- Read `ai_docs/development/DEPLOYMENT.md` for complete deployment guide
- Server: Hetzner VPS (46.62.195.19)
- Process: SSH + git pull + npm run build + pm2 restart

---

## Development Commands

```bash
# Development
npm run dev      # Start development server (port 5000)
                 # Runs Express + Vite dev server with HMR

# Production Build
npm run build    # Build client (Vite) + server (esbuild)
                 # Output: dist/public/ (client) + dist/index.js (server)

npm run start    # Start production server from dist/

# Type Checking
npm run check    # Run TypeScript compiler (no emit)

# Database
npm run db:push  # Push Drizzle schema changes to PostgreSQL
```

---

## Architecture Overview

### Full-Stack TypeScript Application

**Frontend (client/):**
- React 18.3.1 + TypeScript 5.6.3
- Vite 5.4.19 (build tool with HMR)
- Wouter 3.3.5 (lightweight routing, ~1KB)
- Tailwind CSS 3.4.17 (styling)
- Framer Motion 11.18.2 (animations)
- Radix UI + shadcn/ui (47 accessible UI components)
- TanStack React Query 5.60.5 (data fetching)

**Backend (server/):**
- Express.js 4.21.2
- TypeScript ESNext modules
- Drizzle ORM 0.39.1 + PostgreSQL (Neon serverless)
- Passport.js (authentication, currently unused)

### Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Main sections (14) + ui/ (47 shadcn components)
│   │   ├── hooks/        # useLanguage (i18n), use-mobile, use-toast
│   │   ├── pages/        # home.tsx, not-found.tsx
│   │   ├── lib/          # utils.ts (cn), queryClient.ts
│   │   ├── App.tsx       # Root component with providers
│   │   └── main.tsx      # React entry point
│   └── public/           # Static assets (images)
│
├── server/               # Backend Express server
│   ├── index.ts          # Main entry point
│   ├── routes.ts         # API routes (minimal, ready for expansion)
│   ├── vite.ts           # Vite dev middleware
│   └── storage.ts        # Storage interface (in-memory)
│
├── shared/               # Shared types
│   └── schema.ts         # Drizzle ORM schema (users table)
│
└── ai_docs/              # AI documentation (business, dev, UI)
    ├── business/         # GTM strategy, ICP, onboarding, sales
    ├── development/      # Feature planning, improvements
    └── UI/               # Design system, animations, components, UX
```

### Path Aliases

```typescript
@/*           → client/src/*
@shared/*     → shared/*
@assets/*     → attached_assets/*
```

### Key Architectural Decisions

**1. Bilingual Support (RU/EN)**
- Custom React Context (`useLanguage` hook in `client/src/hooks/useLanguage.tsx`)
- Translation function: `t(ruText, enText)` returns text based on current language
- Default language: Russian (`ru`)
- **CRITICAL:** Always use `useLanguage()` for ALL user-facing text

**2. Glass Morphism Design**
- Dark theme with brand-green accents: `hsl(142 67% 35%)`
- Glass effect classes: `glass-card`, `glass-nav`
- All cards use: `glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300`

**3. Animation Strategy**
- Framer Motion for all animations
- Pattern: `whileInView` with `viewport={{ once: true }}` for performance
- Standard fade-in: `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}`
- Stagger children for lists: `staggerChildren: 0.1`
- All transitions: 300ms duration

**4. Component Pattern**
- Section structure: `<section py-16>` → `<div max-w-7xl mx-auto px-4>` → content
- Responsive: Mobile-first with Tailwind breakpoints (sm, md, lg)
- All interactive elements: `transition-all duration-300`

**5. Backend Architecture**
- Express serves both API (`/api/*`) and static files (production)
- Development: Vite dev middleware handles client HMR
- Production: Static files served from `server/public/`
- Database: PostgreSQL via Drizzle ORM (schema in `shared/schema.ts`)

---

## Mandatory Development Rules

### When Adding New Features

1. **Document first**: Create/update files in `ai_docs/development/`
2. **Update UI docs**: If UI/UX changes, update relevant files in `ai_docs/UI/`
3. **Follow design system**: Always read `01-design-system.md` before UI work
4. **Type safety**: 100% TypeScript coverage required

### When Modifying UI Components

1. **Read design system first**: `ai_docs/UI/01-design-system.md`
2. **Check existing components**: `ai_docs/UI/03-components-architecture.md`
3. **Follow animation patterns**: `ai_docs/UI/02-animations.md`
4. **Verify UX patterns**: `ai_docs/UI/04-ux-patterns.md`
5. **Reuse components**: Check `client/src/components/ui/` for existing shadcn components
6. **Document new patterns**: Add to appropriate `ai_docs/UI/` file

### When Working with Copy/Messaging

1. **Check positioning**: `ai_docs/business/GTM_MANIFEST.md`
2. **Understand ICP**: `ai_docs/business/ICP_PERSONA.md` (target: foreign restaurant owners in Bali/Thailand)
3. **Use bilingual function**: Always `{t("Русский", "English")}`, never hardcode

### Bilingual Support Rules

**CRITICAL - Never hardcode text:**

```tsx
// ✅ CORRECT
import { useLanguage } from '../hooks/useLanguage';

const { t } = useLanguage();
<h1>{t("Заголовок на русском", "Title in English")}</h1>

// ❌ WRONG
<h1>Hardcoded text</h1>
```

---

## Project-Specific Guidelines

### Target Audience
- Foreign restaurant owners in Bali & Thailand (see `ICP_PERSONA.md`)
- 70% Russian, 15% Ukrainian, 10% European, 5% Other
- Non-technical users who value time savings and results

### Brand Identity
- **Colors**: Dark theme (`hsl(135 28% 6%)`) + brand-green (`hsl(142 67% 35%)`)
- **Typography**: Inter font family (400, 500, 600, 700 weights)
- **Design**: Glass morphism throughout
- **Tone**: Direct, data-driven, honest (not corporate formal)

### CTAs and Integrations
- All CTAs lead to Telegram (not email, not forms on site)
- Telegram links: `@delivery_booster`, `@DeliveryBoosterBot`, `@DeliveryBoosterBali`
- YouTube video embed for social proof

### Page Structure (client/src/pages/home.tsx)
9 main sections in order:
1. HeroSection (title + 4-image gallery + 3 CTAs)
2. TargetAudienceSection
3. ServicesSection (6 service cards)
4. WorkProcessSection
5. CaseStudiesSection (4 cases with lightbox)
6. TestimonialsSection (3 testimonials with Embla carousel)
7. FounderSection
8. CTASection
9. VideoSection (YouTube embed)

### Key Components

**Header** (`components/Header.tsx`):
- Fixed position, glass effect
- Logo (DB gradient square) + LanguageToggle
- Telegram bot link

**LanguageToggle** (`components/LanguageToggle.tsx`):
- Two buttons: RU / EN
- Active state: `bg-brand-primary text-white`

**AnimatedBackground** (`components/AnimatedBackground.tsx`):
- 3 floating green blobs with blur(40px)
- CSS animation: 12s ease-in-out infinite
- Fixed position, z-0 (behind all content)

---

## Design System Quick Reference

### Colors
```css
--brand-green: hsl(142 67% 35%)        /* Primary accent */
--brand-green-light: hsl(142 65% 47%) /* Light accent */
--brand-bg: hsl(135 28% 6%)           /* Dark background */
--brand-text: hsl(135 35% 92%)        /* Light text */
--brand-muted: hsl(135 25% 82%)       /* Secondary text */
```

### Utility Classes
```css
.glass-card        /* rgba(255, 255, 255, 0.03) + blur(10px) */
.glass-nav         /* rgba(10, 15, 12, 0.8) + blur(12px) */
.brand-gradient    /* linear-gradient(90deg, brand-green, brand-green-light) */
.brand-shadow      /* 0 0 24px rgba(41, 194, 103, 0.35) */
```

### Button Patterns
```tsx
// Primary CTA
className="brand-gradient text-white px-6 py-3 rounded-xl font-medium
           brand-shadow hover:brand-shadow-hover transition-all duration-300
           transform hover:scale-105"

// Secondary (glass)
className="glass-card px-6 py-3 rounded-xl font-medium
           hover:bg-white/10 transition-all duration-300"
```

### Section Pattern
```tsx
<section className="py-16 border-t border-white/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div className="text-center mb-12" {...fadeInAnimation}>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        {t("Заголовок", "Title")}
      </h2>
    </motion.div>
    {/* Content */}
  </div>
</section>
```

---

## Common Patterns

### Animation (Framer Motion)
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

<motion.div {...fadeInUp}>Content</motion.div>

// Or with viewport trigger
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### Stagger Animation for Lists
```tsx
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Responsive Grid
```tsx
// 2 columns on desktop
className="grid lg:grid-cols-2 gap-12"

// 3 columns for cards
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"

// 4 columns for small items
className="grid grid-cols-2 md:grid-cols-4 gap-4"
```

---

## Important Notes

### Current State
- **Frontend**: Fully functional landing page with 9 sections
- **Backend**: Minimal API (ready for expansion)
- **Database**: Schema defined but not actively used (in-memory storage)
- **Authentication**: Passport configured but not implemented
- **Forms**: No forms on site—all CTAs lead to Telegram

### Tech Debt / Future Work
See `ai_docs/development/LANDING_PAGE_IMPROVEMENTS.md` for planned improvements including:
- Contact form implementation
- Google Analytics integration
- SEO optimization
- Image optimization
- Performance improvements

### shadcn/ui Components
47 components installed in `client/src/components/ui/`:
- accordion, alert-dialog, avatar, badge, button, card, carousel, checkbox, dialog, dropdown-menu, input, label, popover, scroll-area, select, tabs, toast, toaster, tooltip, etc.
- Currently used: toast, toaster, tooltip
- All available for use, accessible by default (Radix UI)

---

## Development Workflow

1. **Start development**: `npm run dev` (port 5000)
2. **Make changes**: Frontend auto-reloads (HMR), backend requires restart
3. **Check types**: `npm run check` before committing
4. **Build for production**: `npm run build`
5. **Test production**: `npm run start`

### Deployment (Hetzner VPS)
- **Server:** 46.62.195.19 (Hetzner Cloud)
- **Location:** `/var/www/booster.delivery`
- **SSH:** `ssh -p 2222 root@46.62.195.19`
- **Process:** Manual deploy via SSH (git pull + npm run build + pm2 restart)
- **Full Guide:** See `ai_docs/development/DEPLOYMENT.md`

---

## Key Files to Know

- `client/src/App.tsx` - Root component with providers (QueryClient, LanguageProvider, TooltipProvider, Toaster)
- `client/src/pages/home.tsx` - Main landing page (composition of 9 sections)
- `client/src/hooks/useLanguage.tsx` - Bilingual support (React Context)
- `client/src/index.css` - Global styles, CSS variables, custom utility classes
- `server/index.ts` - Express server entry point
- `shared/schema.ts` - Database schema (Drizzle ORM)
- `vite.config.ts` - Vite configuration with path aliases
- `tailwind.config.ts` - Tailwind configuration with custom theme

---

**Last Updated**: 2025-11-25
