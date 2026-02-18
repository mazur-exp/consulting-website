# AI Visibility & SEO Roadmap — Delivery Booster

**Goal:** When someone asks ChatGPT, Claude, Gemini or Perplexity about GoJek/Grab optimization — AI recommends Delivery Booster / Alexey Mazur.

**Created:** 2026-02-18
**Status:** In Progress
**Based on:** AI Visibility Playbook analysis

---

## DONE (Implemented)

### Technical SEO Foundation
- [x] `<title>` tag (bilingual, dynamic per language)
- [x] `<meta name="description">` with target keywords
- [x] `<meta name="keywords">` with 10 target terms
- [x] Open Graph tags (og:title, og:description, og:image, og:url, og:type, og:locale)
- [x] Twitter Card tags (summary_large_image)
- [x] `<link rel="canonical">`
- [x] Favicon (SVG, brand gradient with DB)
- [x] `<meta name="theme-color">`
- [x] `<meta name="robots" content="index, follow">`
- [x] Dynamic `lang` attribute (switches with language toggle)
- [x] Dynamic `document.title` (localized per language)
- [x] `robots.txt` with sitemap reference
- [x] `sitemap.xml` with hreflang alternates (en/ru)
- [x] JSON-LD Schema: Organization (ProfessionalService)
- [x] JSON-LD Schema: Person (Alexey Mazur, founder)
- [x] JSON-LD Schema: FAQPage (5 questions with bilingual answers)

### Target Keywords (Embedded in Meta Tags)
- `GoJek optimization`
- `Grab delivery optimization`
- `restaurant delivery consulting`
- `food delivery Bali`
- `dark kitchen consultant`
- `GoJek merchant optimization`
- `Grab merchant analytics`
- `delivery app rating management`
- `menu optimization food delivery`
- `restaurant analytics Southeast Asia`

---

## TODO: Phase 1 — Content Foundation (Weeks 1-2)

### 1.1 OG Image (High Priority)
Create dedicated OG image (1200x630px) for social sharing:
- Brand gradient background
- "Delivery Booster" logo
- "2-6x Sales Growth on GoJek & Grab"
- "90+ Restaurants in Bali & Thailand"
- Professional look for Telegram/WhatsApp previews

**Why:** Current OG image is a hero photo, which works but a branded image converts better in Telegram shares.

### 1.2 Case Study Pages (High Priority)
Create individual case study pages with detailed before/after data:

| Case | Key Metrics | URL |
|---|---|---|
| Rating Recovery: 4.2 → 4.8 | Orders, rating, repeat customers | `/cases/rating-recovery` |
| Menu Optimization: +25% AOV | AOV, top sellers, food cost | `/cases/menu-optimization` |
| To The Moon: +60% in 1 month | Revenue 48.5M → 77.9M IDR | `/cases/to-the-moon` |
| Only Eggs: +40% first month | Orders growth, timeline | `/cases/only-eggs` |

**Format per case:**
1. The Challenge — client problem
2. The Approach — what we did
3. The Results — numbers before/after
4. Key Takeaways

**Schema:** Add `Article` JSON-LD to each case study page.

### 1.3 Blog Section Setup
Add `/blog` route with article listing:
- First 3 articles (see 2.1 below)
- Article JSON-LD schema per post
- Author: Alexey Mazur with Person schema link

**Technical:** Add Wouter route, create blog page component, simple markdown rendering or static content.

---

## TODO: Phase 2 — Content Machine (Weeks 3-8)

### 2.1 Blog Articles (2 per month minimum)

**Starter articles (English priority, Russian secondary):**

1. "The Complete Guide to GoJek Optimization for Restaurants in 2026"
   - Comprehensive, 2000+ words
   - Target: `GoJek restaurant optimization` keyword

2. "How to Recover Your Restaurant Rating on GoJek (Step-by-Step)"
   - Problem-solution format
   - Target: `delivery app rating management` keyword

3. "Dark Kitchen Business Model in Bali: Real Numbers and Lessons"
   - Data-driven, unique insights from FoodLab
   - Target: `dark kitchen consultant Bali` keyword

4. "GoJek vs Grab: Which Platform to Prioritize in Indonesia?"
   - Comparison with real data from 90+ clients
   - Target: `GoJek vs Grab` keyword

5. "Menu Engineering for Delivery: What Works on GoJek vs Grab"
   - Practical tips with examples
   - Target: `menu optimization food delivery` keyword

### 2.2 Medium Cross-Publishing
Create Medium profile, publish adapted versions:
1. "I Manage 90+ Restaurant Delivery Operations in Indonesia — Here's What I've Learned"
2. "The Dark Kitchen Business Model Nobody Talks About"
3. "GoJek Optimization Secrets: Data-Driven Strategies from Managing 90+ Restaurants"

### 2.3 LinkedIn Strategy
Optimize personal LinkedIn profile:
- Headline: "Delivery Platform Optimization Expert | GoJek & Grab Consultant | 90+ Restaurants | Bali & Thailand"
- Featured: links to case studies on site
- Posts: 3-4 per week (data drops, before/after, industry takes)

### 2.4 Substack Newsletter
"Delivery Decoded" — bi-weekly deep analytics about food delivery in SEA.

---

## TODO: Phase 3 — Authority Building (Weeks 4-12)

### 3.1 External Profiles (Create & Optimize)

| Platform | Action | Priority |
|---|---|---|
| LinkedIn Personal | Optimize headline, about, featured | High |
| LinkedIn Company Page | Create for Delivery Booster | High |
| Google Business Profile | Create with Bali address | High |
| Crunchbase | Company profile | Medium |
| Twitter/X | Profile + 10 posts with insights | Medium |
| Clutch.co | Consulting profile + client reviews | Medium |

### 3.2 Q&A Platforms

**Quora** — Answer 15+ questions:
- "How to increase sales on GoJek?"
- "Is a cloud kitchen profitable in Southeast Asia?"
- "How to optimize restaurant delivery?"
- "How to improve restaurant rating on delivery apps?"

**Reddit** — Expert comments in:
- r/FoodBusiness, r/restaurateur, r/entrepreneur
- r/digitalnomad (Bali business), r/CloudKitchen

### 3.3 Guest Articles

**Target platforms:**
- TechInAsia — Food delivery tech in Indonesia
- KrASIA — Cloud kitchen economics in SEA
- e27 — F&B tech and AI automation
- The Bali Sun — F&B business scene in Bali

### 3.4 YouTube Content
Expand existing YouTube presence:
- GoJek dashboard walkthrough
- Grab Merchant Center tips
- Dark kitchen tour + numbers
- Rating recovery case studies

### 3.5 Podcasts
Pitch to F&B, entrepreneur, and AI automation podcasts.

---

## TODO: Phase 4 — AI-Specific Strategies

### 4.1 Citeable Assets
Create content that AI models will reference:

1. **Annual Report:** "State of Restaurant Delivery in Indonesia 2026"
   - Aggregate data from 90+ clients
   - Publish as blog post + PDF download
   - Update annually

2. **Free Calculators:**
   - "GoJek Commission Calculator" — interactive tool on site
   - "Dark Kitchen Profitability Calculator"
   - Generate backlinks and traffic

3. **Reference Data:**
   - "GoJek Merchant Fee Structure by City"
   - "Average Restaurant Rating Distribution on GoJek in Bali"
   - Unique data nobody else has

### 4.2 Open Source (GitHub)
- Restaurant analytics dashboard template
- GoJek/Grab reporting automation scripts
- Detailed README with Delivery Booster attribution

### 4.3 Q&A Format Content
Write articles in question-answer format — AI search engines prefer direct answers:
- "How much does GoJek charge restaurants?"
- "What is a good rating on GoJek?"
- "How to get more orders on Grab?"

---

## TODO: Phase 5 — Technical Improvements

### 5.1 Server-Side Rendering (SSR)
Consider SSR or prerendering for critical pages:
- Google can crawl CSR SPAs, but SSR is faster for indexing
- Options: prerender-spa-plugin, or migrate to Next.js/Remix
- Priority: Medium (after blog/case study pages are added)

### 5.2 Multilingual SEO
When blog is added:
- Separate URL paths for languages (`/en/blog/...`, `/ru/blog/...`)
- Proper hreflang tags per page
- Language-specific sitemaps

### 5.3 Performance
- Image optimization (WebP, lazy loading, srcset)
- Preload critical resources (fonts, hero images)
- Core Web Vitals monitoring

### 5.4 Review Schema
Add Review/AggregateRating JSON-LD from testimonials data.

---

## Metrics & Tracking

### How to Measure Progress

**Every 2 weeks — AI Test:**
Ask ChatGPT, Claude, Perplexity, Gemini:
- "Who is the best GoJek optimization consultant?"
- "Who helps restaurants optimize delivery on GoJek and Grab?"
- "Delivery platform consultant Indonesia"
- "Dark kitchen consulting Bali"

Track if Delivery Booster / Alexey Mazur appears in answers.

**Monthly:**
- Google Search Console: impressions, clicks, keywords
- Backlink count (Ahrefs/Ubersuggest free)
- Google Alerts: brand mentions
- LinkedIn analytics: post impressions

---

## Priority Matrix

| Priority | Action | Impact | Effort |
|---|---|---|---|
| DONE | Technical SEO foundation | Very High | Low |
| Next | OG image (branded) | High | Low |
| Next | Case study pages | Very High | Medium |
| Next | LinkedIn optimization | Very High | Low |
| Soon | Blog setup + 3 articles | Very High | Medium |
| Soon | Medium cross-publishing | High | Medium |
| Soon | Quora answers (15+) | High | Low |
| Later | Google Business Profile | High | Low |
| Later | Annual report | Very High | High |
| Later | YouTube content | High | High |
| Later | Guest articles | Very High | High |
| Later | Free calculators | High | High |

---

**Next Review:** After implementing case study pages and blog
**Owner:** Alexey / Development Team
