# Graph Report - .  (2026-04-26)

## Corpus Check
- 47 files · ~92,040 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 132 nodes · 249 edges · 16 communities detected
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Site Pages & Brand|Site Pages & Brand]]
- [[_COMMUNITY_Publications & Research|Publications & Research]]
- [[_COMMUNITY_Events Data & Nav Behavior|Events Data & Nav Behavior]]
- [[_COMMUNITY_Responsive Nav Breakpoints|Responsive Nav Breakpoints]]
- [[_COMMUNITY_Site State Captures|Site State Captures]]
- [[_COMMUNITY_Events Calendar Renderers|Events Calendar Renderers]]
- [[_COMMUNITY_Publications Page Renderers|Publications Page Renderers]]
- [[_COMMUNITY_Coming-Soon Landing|Coming-Soon Landing]]
- [[_COMMUNITY_Safety Evaluations Brief|Safety Evaluations Brief]]
- [[_COMMUNITY_VCASSE Logo Mark|VCASSE Logo Mark]]
- [[_COMMUNITY_Energy Footprint Illustration|Energy Footprint Illustration]]
- [[_COMMUNITY_Human Oversight Illustration|Human Oversight Illustration]]
- [[_COMMUNITY_Incident Reporting Illustration|Incident Reporting Illustration]]
- [[_COMMUNITY_Participatory Ethics Illustration|Participatory Ethics Illustration]]
- [[_COMMUNITY_Safety Evaluations Illustration|Safety Evaluations Illustration]]
- [[_COMMUNITY_Sustainability Procurement Illustration|Sustainability Procurement Illustration]]

## God Nodes (most connected - your core abstractions)
1. `Dev Home Page` - 19 edges
2. `Contact Page` - 15 edges
3. `Events Page` - 15 edges
4. `About Page` - 14 edges
5. `Publications Index Page` - 14 edges
6. `AI Safety Pillar Page` - 12 edges
7. `AI Sustainability Pillar Page` - 12 edges
8. `AI Ethics and Policy Pillar Page` - 12 edges
9. `Privacy Policy Page` - 11 edges
10. `Terms of Service Page` - 11 edges

## Surprising Connections (you probably didn't know these)
- `VCASSE Coming Soon Landing` --semantically_similar_to--> `Dev Home Page`  [INFERRED] [semantically similar]
  index.html → dev/index.html
- `Revert merge 42b2e46 doc` --ambiguous_context--> `VCASSE README (Mission/Vision/Values)`  [AMBIGUOUS]
  REVERT_42b2e46.md → README.md
- `VCASSE Coming Soon Landing` --describes--> `VCASSE Organization`  [INFERRED]
  index.html → dev/index.html
- `VCASSE_EVENTS_DATA` --semantically_similar_to--> `VCASSE_PUBLICATIONS data`  [INFERRED] [semantically similar]
  dev/js/events-data.js → dev/js/publications-data.js
- `Publications Workflow README` --documents--> `VCASSE_PUBLICATIONS data`  [EXTRACTED]
  dev/content/publications/README.md → dev/js/publications-data.js

## Hyperedges (group relationships)
- **Three pillar focus-area pages share layout and nav structure** — dev_safety_html, dev_sustainability_html, dev_ethics_html [INFERRED 0.90]
- **Legal pages share layout and footer pattern** — dev_privacy_html, dev_terms_html [INFERRED 0.85]
- **Pages share global VCASSE navbar and footer template** — dev_index_html, dev_about_html, dev_contact_html, dev_events_html, dev_publications_html, dev_safety_html, dev_sustainability_html, dev_ethics_html, dev_privacy_html, dev_terms_html [INFERRED 0.95]
- **VCASSE research catalog (6 publications)** —  [INFERRED 0.95]
- **VCASSE three pillars taxonomy** —  [EXTRACTED 1.00]
- **Publications rendering pipeline** —  [EXTRACTED 1.00]
- **Publication illustration set** —  [INFERRED 0.90]
- **Responsive nav breakpoint set** —  [EXTRACTED 1.00]
- **Desktop Site Capture Set** —  [INFERRED 1.00]
- **Mobile Site Capture Set** —  [INFERRED 1.00]
- **Verification Screenshots** —  [INFERRED 1.00]
- **Publications-related Views (cross-device)** —  [INFERRED 0.95]
- **Research Dropdown Open States** —  [INFERRED 1.00]

## Communities

### Community 0 - "Site Pages & Brand"
Cohesion: 0.23
Nodes (22): Ethics Pillar, Safety Pillar, Sustainability Pillar, Three Pillars of Responsible AI, VCASSE Briefing Newsletter, info@vcasse.org, media@vcasse.org, research@vcasse.org (+14 more)

### Community 1 - "Publications & Research"
Cohesion: 0.13
Nodes (22): AI Evaluations Loop, Five-Field Quarterly Energy Disclosure, Four Procurement Questions (energy/grid/water/lifecycle), Three-Tier Incident Severity, Confidence-tiered Review / Two-pane / I-don't-know affordance, Three Participatory Practices (use-case brief, listening, deliberation trail), GHG Protocol / ISO 14064 / CDP, window.getPublications() (+14 more)

### Community 2 - "Events Data & Nav Behavior"
Cohesion: 0.2
Nodes (12): VCASSE_EVENTS_DATA, events-page.js (Calendar renderer), Luma Calendar (lu.ma/vcasse), canScrollMenu(), closeMobileMenu(), closeNavDropdowns(), finalizeMobileMenuClose(), isMobileMenuActive() (+4 more)

### Community 3 - "Responsive Nav Breakpoints"
Cohesion: 0.46
Nodes (14): Nav at 1024px, Nav at 1280px, Nav at 1440px, Nav at 1920px, Nav at 820px, VCASSE logo + wordmark, View publications (CTA button), Hamburger menu icon (+6 more)

### Community 4 - "Site State Captures"
Cohesion: 0.26
Nodes (12): Homepage Newsletter Screenshot — VCASSE Briefing newsletter signup section with Coming Soon badge, email field, and Notify me button, Home Page (VCASSE), Publications Index Page, Mobile Navigation Drawer, VCASSE Briefing Newsletter Signup Section, Research Navigation Dropdown (Safety, Sustainability, Ethics), Desktop Research Dropdown Screenshot — Publications page with Research nav item expanded showing Safety/Sustainability/Ethics submenu, Desktop Home Screenshot — VCASSE landing hero (Safety, Sustainability, & Ethics) with Home active in nav (+4 more)

### Community 5 - "Events Calendar Renderers"
Cohesion: 0.35
Nodes (10): daysInMonth(), escapeHtml(), formatISO(), pad(), parseISO(), renderCalendar(), renderCard(), renderLists() (+2 more)

### Community 6 - "Publications Page Renderers"
Cohesion: 0.32
Nodes (3): buildCard(), escapeHtml(), formatDate()

### Community 7 - "Coming-Soon Landing"
Cohesion: 0.33
Nodes (6): Oasis of Change Inc parent org, Responsible AI, VCASSE Organization, Google Fonts (Space Grotesk), oasisofchange.com, VCASSE Coming Soon Landing

### Community 9 - "Safety Evaluations Brief"
Cohesion: 1.0
Nodes (2): Publication Detail Page (Practical AI Safety Evaluations for Public-Interest Teams), Desktop Publication Detail Screenshot — Practical AI Safety Evaluations for Public-Interest Teams article with Safety tag and key takeaways sidebar

### Community 12 - "VCASSE Logo Mark"
Cohesion: 1.0
Nodes (1): VCASSE Logo (checkmark/V mark)

### Community 13 - "Energy Footprint Illustration"
Cohesion: 1.0
Nodes (1): Energy Footprint illustration (bar chart + trend line)

### Community 14 - "Human Oversight Illustration"
Cohesion: 1.0
Nodes (1): Human Oversight illustration (abstract eye + review flow)

### Community 15 - "Incident Reporting Illustration"
Cohesion: 1.0
Nodes (1): Incident Reporting illustration (signal waveform)

### Community 16 - "Participatory Ethics Illustration"
Cohesion: 1.0
Nodes (1): Participatory Ethics illustration (network of connected nodes)

### Community 17 - "Safety Evaluations Illustration"
Cohesion: 1.0
Nodes (1): Safety Evaluations illustration (concentric shield rings)

### Community 18 - "Sustainability Procurement Illustration"
Cohesion: 1.0
Nodes (1): Sustainability Procurement illustration (procurement checklist tiles)

## Ambiguous Edges - Review These
- `VCASSE README (Mission/Vision/Values)` → `Revert merge 42b2e46 doc`  [AMBIGUOUS]
  REVERT_42b2e46.md · relation: ambiguous_context

## Knowledge Gaps
- **23 isolated node(s):** `Responsible AI`, `VCASSE Briefing Newsletter`, `info@vcasse.org`, `media@vcasse.org`, `research@vcasse.org` (+18 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Safety Evaluations Brief`** (2 nodes): `Publication Detail Page (Practical AI Safety Evaluations for Public-Interest Teams)`, `Desktop Publication Detail Screenshot — Practical AI Safety Evaluations for Public-Interest Teams article with Safety tag and key takeaways sidebar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `VCASSE Logo Mark`** (1 nodes): `VCASSE Logo (checkmark/V mark)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Energy Footprint Illustration`** (1 nodes): `Energy Footprint illustration (bar chart + trend line)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Human Oversight Illustration`** (1 nodes): `Human Oversight illustration (abstract eye + review flow)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Incident Reporting Illustration`** (1 nodes): `Incident Reporting illustration (signal waveform)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Participatory Ethics Illustration`** (1 nodes): `Participatory Ethics illustration (network of connected nodes)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Safety Evaluations Illustration`** (1 nodes): `Safety Evaluations illustration (concentric shield rings)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Sustainability Procurement Illustration`** (1 nodes): `Sustainability Procurement illustration (procurement checklist tiles)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `VCASSE README (Mission/Vision/Values)` and `Revert merge 42b2e46 doc`?**
  _Edge tagged AMBIGUOUS (relation: ambiguous_context) - confidence is low._
- **Why does `VCASSE_PUBLICATIONS data` connect `Publications & Research` to `Events Data & Nav Behavior`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `Dev Home Page` connect `Site Pages & Brand` to `Coming-Soon Landing`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `VCASSE_EVENTS_DATA` connect `Events Data & Nav Behavior` to `Publications & Research`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Dev Home Page` (e.g. with `Three Pillars of Responsible AI` and `VCASSE Briefing Newsletter`) actually correct?**
  _`Dev Home Page` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Responsible AI`, `VCASSE Briefing Newsletter`, `info@vcasse.org` to the rest of the system?**
  _23 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Publications & Research` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._