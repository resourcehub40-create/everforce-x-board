# EverForce X — Team AI Context

Drop this file into Claude / Gemini / ChatGPT to give the AI full context on the everflow.io website refresh project. It captures everything an outsider needs: who's doing what, the deadlines, the audit findings, the workflow, the design system rules, and where to find the source of truth.

Last updated: 2026-04-26.

---

## 1. What this project is

**EverForce X** is the Everflow website refresh task force, kicked off Apr 23, 2026. We're refreshing everflow.io (the marketing site, NOT the help desk and NOT the resource hub) to fix fundamental performance problems uncovered by an automated AI audit and to introduce AI-forward messaging on the homepage and pricing page by mid-May.

Two deadlines:

- **May 15, 2026 (hard)** — homepage + pricing page need at least one AI use case reference live. Tied to OpenAPI docs going live May 1 and the first big AI push (newsletter + website) on May 15.
- **June 30, 2026 (target)** — full refresh shipped. Help desk rebuild took 4 months; aiming ≤ 2 months with AI help.

Three site-wide patterns the audit surfaced — every fix should run through these:

1. **FOMO gap (3/10)** — we're feature-listing, not consequence-selling.
2. **Missing AI messaging** — the brand doesn't look cutting-edge yet.
3. **Case study integration (2/10)** — best proof is buried where no one sees it.

Site-wide audit scores: Design 8/10 · FOMO 3/10 · Case study integration 2/10. Grade distribution across 119 graded pages: 11 A · 40 B · 43 C · 8 D · 1 F.

---

## 2. The team

| Person | Role |
|---|---|
| Tony Cohn | Oversight, Michael alignment, About Us + testimonials |
| Jordan Barney | Point person, Jira ticket owner, copy across site, partner pages, ICP pages, AI use case repo |
| Ceno Pant | Webflow / dev lead, Figma admin, CMS, automation |
| Dasha Dagayeva | Audit tool, AI use case repo, customer signal analysis, this board |
| François Rousseau | Design (UX team budget) — main dev-file editor with Ceno + Dasha |
| Brent Barnhart | Partner pages, one-pagers, copy support |
| Frank | Designer (supporting) — note: François is the primary designer, "Frank" is sometimes confusion in transcripts |

Keep in loop: Darriun (events + community), Krista Kellogg (press only), Michael Cole (exec sponsor — was OOO Apr 21–25, back Mon Apr 28).

Design liaison TBD (someone has to coordinate with Karine and the UX team — François volunteered on the kickoff call).

---

## 3. Workflow rules

- **Parallel execution** — copy, dev, design, CMS all run at the same time, no sequential waiting.
- **AI-first** — kickoff transcript → auto-generated Jira tickets. Don't invent manual processes.
- **One-pagers are HTML**, not PDFs. Custom-code blocks on Webflow URLs.
- **Two sides of every page** — visual-first for humans (animated graphics, minimal text), full long-form text in the DOM for AI crawlers (ChatGPT, Gemini, Claude). The AI side is non-negotiable; the human side gets the design love.
- **Brainstorming → FigJam.** Mockups → Figma Design (the "everflow.io 2026" file). Final build → Figma → Webflow plugin.
- **Less-is-more on Figma permissions** for now: edit access only for Ceno, François, Dasha. Comment-only for everyone else. Expand when Michael's back.
- Non-designers should drop competitor inspos from Mobbin into FigJam, not the dev file.

---

## 4. Tools & links

| Resource | URL |
|---|---|
| Audit tool (live grades) | https://ef-website-audit.web.app/ |
| Audit GitHub | https://github.com/resourcehub40-create/everflow-audit |
| This board | https://everforce-x-board.web.app/ |
| Board GitHub | https://github.com/resourcehub40-create/everforce-x-board |
| Marketing Figma project | https://www.figma.com/files/team/945681023634078066/project/591458922 |
| FigJam — Brainstorm | https://www.figma.com/board/BUdY1c1zPtLa3F0pesHBon/Brainstorm |
| Main dev file (everflow.io 2026) | https://www.figma.com/design/8eEGp1j1kxC1xZolrHodxG/everflow.io-2026 |
| Jordan's Epic Doc | https://docs.google.com/document/d/18PJHo7QR0FiL5CG3k3SR11wi_hR7SwvVBooflkCYCC8/edit |
| Page tracker spreadsheet | https://docs.google.com/spreadsheets/d/1ycazU8me4hpAJMzqE2CIVlEUeB7GqQGzYu2P1I92-bM/edit |
| Mobbin (design inspo) | https://mobbin.com/ |
| Slack channel | #everforcex |

The Epic Doc has five tabs — link directly to whichever you need: Strategy / Scope / Design + Build / Copy / Open Questions.

The page tracker spreadsheet has tabs that map 1:1 to the Section field on this board:

- **Design system tabs:** Components, Design (tokens), Forms, Thumbnails
- **Page tabs:** Main, Platform, Features, Solutions, Action Plan, Partner, Resources, CMS, Marketplace, Partners (tech), Legal, Other

---

## 5. Critical fixes (non-negotiables)

These get owners + ETAs at the next sync. None of them require waiting on design.

- **5 broken 404s:** /solutions · /marketplace · /about · /platform · /solutions/ecommerce
- **PartnerStack comparison page** — headline references the wrong competitor (Tune). Audit ALL /compare and /competitor pages — same copy-paste error may exist on Impact and CAKE pages too.
- **Cookie banner blocking hero** — site-wide.
- **Update logos.**
- **Update testimonials.**
- **Remove outdated solutions pages.**
- **About Us — remove ex-employee photos** (Tony has been flagged on this multiple times).
- **Join Referral Program — F grade.** Dead end, no incentives, fails ICP.
- **Case Studies section — D grade.** Hard to find. Stats need to be redistributed onto C-rated product pages.
- **Homepage hero too generic** ("Ready To Scale Your Growth?" C+). Needs outcome-based headline + ROI metrics above the fold.
- **SEO landers — Ecommerce (D) and iGaming (D)** — repetitive, poor UX, compliance issues.
- **Generic CTAs** ("Get Started" too vague for a 6–8 month enterprise nurture cycle).
- **Duplicate competitor pages** — /compare and /competitor both exist with different content. Consolidate.
- **Placeholder content** — enablement decks contain TEMPLATE.png and lorem ipsum.

---

## 6. Architectural changes (not just copy rewrites)

- **Marketplace categories** — current state unclear. Audit, fix, restructure.
- **Separate tech partner pages from integration pages** — currently conflated.
- **Partner page restructure** — new architecture TBD.
- **Media / Press page** — break out from blog into its own page (Krista's recommendation).
- **CMS automation** — when a new blog post / case study / webinar / masterclass / event goes live, distro content + thumbnails should be auto-created. No more Zapier-tape jobs.

---

## 7. Two-sides-of-a-page rule

For every page that gets touched in this refresh:

- **Human side** — visual-first. Animated graphics, minimal text, "brain-zap" elements that signal we're an open-API, AI-forward product without saying it. Less wall-of-text feature listing.
- **AI side** — full long-form, in-depth content present in the DOM so ChatGPT / Gemini / Claude / Perplexity have raw material when they crawl. The text is for the LLMs more than for users at this point.

Krista's LLM-optimized boilerplate (G2/Martech/APMA, Technical/B2B, Social/Bios) is the starting point for homepage and About Us copy.

---

## 8. AI messaging — Michael's strategy (slow roll, 3–6 months)

Why we're not blasting "AI OS" yet:

- **Sales readiness:** Marketing AI now attracts prospects sales can't yet pitch.
- **CS readiness:** Those prospects generate complex integration questions CS can't answer → immediate churn.
- **Playbook:** Same as when Apple's privacy changes wiped out 8 of Everflow's top 10 customers — diversify slowly, watch inbound signals, don't blow up what's working.

Core ICP messaging ("scale affiliates with confidence") stays. Gradually introduce efficiency / visibility / time-saving framing. Shift harder when inbound signals confirm market demand.

The copy framework for every C-rated page:

1. Start with pain point + outcome — what does the customer want to achieve or avoid?
2. Work backwards to the simplest explanation — what's the least they need to understand to act?
3. AI removes the complexity barrier — instead of teaching the UI, surface the 5 names they need to act on.

Example: click-to-conversion time reporting = coupon-poaching detection. Too complex to explain. With AI: "here are your 5 affiliates with high coupon-poaching risk." Same insight, zero learning curve.

---

## 9. May 15 milestone — what's in scope

Hard deadline. Driven by Michael + Jonathan.

| Deliverable | Notes |
|---|---|
| Homepage + Pricing | At least one AI use case reference live. Doesn't have to be fully built. |
| AI Use Case Repository | First 10 use cases live or close. FAQ / Q&A format for AEO + SEO. |
| Newsletter | Week-of coverage of the AI push (Jonathan requesting). |

The story we're telling: *"You can do it today with OpenAPI. MCP is coming soon."*

AI Use Case Repository is owned by Jordan + Dasha + Ceno. Difficulty tiers: easy (postback generation, offer report email) → internal tools (Resource Hub, party attribution) → customer spotlights (Reason Agency: 4,000 creative variations).

---

## 10. Page priority tiers (from the audit)

### 🔴 Critical / broken
404s + F-grade pages (see §5).

### 🟡 Needs work (C-range, in scope)
Homepage (C+) · About Us (404) · Contact (C+) · Customer Value (C+) · Simplify Tasks (C+) · Media Buying Integration (C+) · Amplify pages (C/C+) · Agency Program (C+) · Boost Referral (B-/C+) · SEO landers (C/C+) · Awin vs Everflow (C+) · Careers · Media/Press · /compare + /competitor consolidation · Testimonials.

### 🟢 Performing well — use as standards reference
FAQ (A-) · Everflow Plus (A-) · Impact vs Everflow (A-) · Tune vs Everflow (A-) · Certification (A-) · Share Referrals (A-) · Blog (A-) · SEO Lander Lead Gen (A-) · Traffic Health (B+) · DTC (B+) · Gaming (B+) · Home Services (B+) · Health & Beauty (B+) · Insurance (B+) · Affiliate Network (B+) · Become a Partner (B+) · PartnerStack vs Everflow (B+ but has Tune copy-paste) · Partnerize vs Everflow (B+) · Boost Referral Marketing main (B+) · Pricing (B) · Book Demo (B) · Finance (B) · Marketplace (B).

---

## 11. Brand & language standards

- **Trademark:** Everflow™ logo type is trademarked — include the symbol once or twice per document.
- **Boilerplate (Krista, 4 versions, updated 3.10.26):**
  - **G2 / Martech / APMA:** "Everflow is the leading all-in-one Partner Marketing Platform designed for high-growth brands, agencies and ad networks to track, manage, and optimize every performance channel. Everflow unifies tracking for influencers, content publishers, in-app referrals, and media buying into a single source of truth. With a curated Marketplace for partner discovery, automated global payments via Everflow Pay, and deep integrations with Google Ads, Meta, HubSpot and Salesforce, Everflow empowers 1,200+ brands—including Playtika, JG Wentworth, and Golden Hippo—to scale ROI with granular, real-time analytics. Learn more at everflow.io."
  - **Technical / B2B (LinkedIn):** "Everflow is an enterprise-grade Partner Marketing Platform (PMP) that provides end-to-end infrastructure for tracking and scaling performance partnerships. Engineered for transparency, it offers cookieless tracking, deep-linking, and anti-fraud tools alongside a curated marketplace of premium affiliates. Everflow bridges the gap between marketing spend and revenue by integrating directly with major CRMs and ad platforms, allowing brands to manage unlimited partners and automate complex payout structures with confidence. Join the 1,200+ brands driving growth at everflow.io."
  - **Social / Bios (Facebook, X):** "Everflow is an advanced partner marketing and performance tracking platform that transforms how brands scale through partnerships. By unifying affiliate management, influencer tracking, and multi-channel attribution, Everflow provides the real-time data needed to identify high-ROI traffic sources and automate global partner payments. Trusted by over 1,200 growth-focused brands. Visit everflow.io."

- **Revenue stats are out** — Michael confirmed: shift to visibility, efficiency, time-saving outcomes. Use case studies to imply revenue without promising it. No "+22% clicks" claims in academy/marketing copy.
- **Replace generic CTAs** ("Get Started") with role-specific CTAs ("See ROI demo" / "Book technical walkthrough").

---

## 12. Approval gates

- **Michael approval required** for key pages (homepage, About Us, main product pages) before going live.
- **Jonathan approval required** before engaging Karine + UI team for full Q3 work.
- **Homepage copy process:** Tony records call with Michael → transcribe → use as copy source. Eliminates revision loops.

---

## 13. The board itself — how to use it

This board (everforce-x-board) is the team's task tracker. Auth: any `*@everflow.io` email + the shared password.

**Columns:** Backlog · Next Up · In Progress · In Review · Blocked · Done.

**Card fields:**
- Title + description
- Section — maps 1:1 to the spreadsheet tabs (Components, Design, Forms, Thumbnails, Main, Platform, Features, Solutions, Action Plan, Partner, Resources, CMS, Marketplace, Tech Partners, Legal, Other) plus cross-cutting buckets (Architectural / IA, Automation / CMS pipeline, May 15 AI push, Audit / measurement)
- Page URL — the everflow.io URL for page-level cards
- Audit grade — letter grade from ef-website-audit.web.app
- Labels (work-type tags): critical-fix · 404 · copy · design · dev · cms · content · architectural · automation · ai-messaging · fomo-fix · case-study · action-item
- Assignees: Jordan · Dasha · Ceno · François · Brent · Tony

**Resources tab:** all the canonical links above + a shared file area (Supabase Storage bucket `everforce-x-files`) for transcripts, mocks, briefs, screenshots.

---

## 14. Open questions (still unresolved)

- What does the technical / non-technical toggle look like in Webflow?
- Marketplace categories: what exists, what's broken, what needs rebuilding?
- Tech partner pages vs integration pages: how do we separate them structurally?
- Partner page restructure: what's the new architecture?
- When is the Tony / Michael call for homepage copy?
- Logo wall update: full scope?
- Customer signal analysis (Dasha): which sources do we have access to, who owns the output?
- Jonathan approval: what's the trigger for engaging Karine + UI team?
- Media page: own nav item or sub-page?

These should each become cards on the board with the `action-item` label.

---

## 15. How to use this file with an AI

Paste the whole thing as the first message, then ask your question. Examples:

- "Draft homepage hero copy that fixes the FOMO gap and follows the AI-messaging slow-roll rules."
- "Given the audit grades and the May 15 deadline, what's the minimum scope for homepage + pricing?"
- "Generate 5 cards for the board to fix the 5 broken 404s, with appropriate sections, labels, assignees, and descriptions."
- "Rewrite this product page following the two-sides-of-a-page rule — visual layout for humans, full long-form text for LLM crawlers."

If the AI proposes copy that uses revenue stats, generic CTAs, "Get Started" language, or feature listing without consequence selling — push back and cite this doc.
