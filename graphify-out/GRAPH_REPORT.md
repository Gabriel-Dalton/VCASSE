# Graph Report - .  (2026-04-11)

## Corpus Check
- Corpus is ~2,687 words - fits in a single context window. You may not need a graph.

## Summary
- 58 nodes · 60 edges · 18 communities detected
- Extraction: 75% EXTRACTED · 25% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `Related Publications Widget Renderer` - 5 edges
2. `renderCalendar()` - 4 edges
3. `renderSelectedDay()` - 4 edges
4. `VCASSE Events Data Store` - 4 edges
5. `Publications Data Store (VCASSE_PUBLICATIONS)` - 4 edges
6. `Participatory Ethics in Municipal AI Decisions` - 4 edges
7. `Pillar: Safety` - 4 edges
8. `Pillar: Ethics` - 4 edges
9. `formatISO()` - 3 edges
10. `parseISO()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Publications Workflow Guide` --references--> `Related Publications Widget Renderer`  [EXTRACTED]
  content/publications/README.md → js/publications-related.js
- `Transparency by Default Value` --rationale_for--> `Energy Footprint Reporting: A Starter Standard`  [INFERRED]
  README.md → js/publications-data.js
- `VCASSE Logo (Green Rounded Square with White V Chevron)` --references--> `VCASSE Organization Overview`  [INFERRED]
  img/logo.svg → README.md
- `Safety & Evaluations Reading Group (Event)` --conceptually_related_to--> `Pillar: Safety`  [INFERRED]
  js/events-data.js → README.md
- `Spring Sustainability & AI Workshop (Event)` --conceptually_related_to--> `Pillar: Sustainability`  [INFERRED]
  js/events-data.js → README.md

## Hyperedges (group relationships)
- **Events System: Data -> Calendar + Cards + Day Panel** — events_data_vcasse_events, events_page_calendar_renderer, events_page_card_renderer, events_page_selected_day_panel, events_data_luma_calendar [EXTRACTED 1.00]
- **Publications Related-Post Widget Pipeline** — publications_data_store, publications_data_get_publications, publications_related_renderer, pillar_data_attribute_system [EXTRACTED 1.00]
- **VCASSE Three Pillars: Safety, Sustainability, Ethics** — readme_pillar_safety, readme_pillar_sustainability, readme_pillar_ethics, readme_safety_ethics_distinction, readme_vcasse_org [EXTRACTED 1.00]

## Communities

### Community 0 - "Events Calendar Engine"
Cohesion: 0.35
Nodes (10): daysInMonth(), escapeHtml(), formatISO(), pad(), parseISO(), renderCalendar(), renderCard(), renderLists() (+2 more)

### Community 1 - "Content Data Pipeline"
Cohesion: 0.27
Nodes (10): Luma Calendar Integration, VCASSE Events Data Store, Events Page Calendar Renderer, Events Page Card/List Renderer, Selected Day Detail Panel, Pillar-Based Data Attribute Filtering System, getPublications() Helper, Publications Data Store (VCASSE_PUBLICATIONS) (+2 more)

### Community 2 - "Ethics & Community Pillar"
Cohesion: 0.47
Nodes (6): Indigenous Data & AI Symposium (Community Event), Responsible AI in the Public Sector Open Forum (Event), Human Oversight Design Patterns That Actually Work, Participatory Ethics in Municipal AI Decisions, Community-Rooted Value, Pillar: Ethics

### Community 3 - "Main UI Controllers"
Cohesion: 0.5
Nodes (2): closeMobileMenu(), closeNavDropdowns()

### Community 4 - "Safety Pillar & Publications"
Cohesion: 0.6
Nodes (5): Safety & Evaluations Reading Group (Event), Incident Reporting Playbook for Responsible AI Teams, Practical AI Safety Evaluations for Public-Interest Teams, Pillar: Safety, Safety vs Ethics Distinction Rationale

### Community 5 - "Sustainability Pillar & Publications"
Cohesion: 0.6
Nodes (5): Spring Sustainability & AI Workshop (Event), Energy Footprint Reporting: A Starter Standard, A Sustainability Checklist for AI Procurement, Pillar: Sustainability, Transparency by Default Value

### Community 6 - "Publications Formatter"
Cohesion: 0.67
Nodes (0): 

### Community 7 - "Brand & Organization"
Cohesion: 0.67
Nodes (3): VCASSE Logo (Green Rounded Square with White V Chevron), Oasis of Change, Inc. (Parent Org), VCASSE Organization Overview

### Community 8 - "Events Data Module"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Publications Data Module"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Mobile Nav Controller"
Cohesion: 1.0
Nodes (1): Mobile Navigation Menu Controller

### Community 11 - "Desktop Dropdown Nav"
Cohesion: 1.0
Nodes (1): Nav Dropdown Controller

### Community 12 - "Scroll Fade Animation"
Cohesion: 1.0
Nodes (1): Fade-In Scroll Animation (IntersectionObserver)

### Community 13 - "Progress Bar Animation"
Cohesion: 1.0
Nodes (1): Progress Bar Fill Animation

### Community 14 - "Metric Counter"
Cohesion: 1.0
Nodes (1): Animated Metric Counter

### Community 15 - "Navbar Scroll Shadow"
Cohesion: 1.0
Nodes (1): Navbar Scroll Shadow Effect

### Community 16 - "Smooth Scroll Handler"
Cohesion: 1.0
Nodes (1): Smooth Scroll for Anchor Links

### Community 17 - "Revert Documentation"
Cohesion: 1.0
Nodes (1): Revert of Merge Commit 42b2e46

## Knowledge Gaps
- **16 isolated node(s):** `Luma Calendar Integration`, `Selected Day Detail Panel`, `Mobile Navigation Menu Controller`, `Nav Dropdown Controller`, `Fade-In Scroll Animation (IntersectionObserver)` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Events Data Module`** (1 nodes): `events-data.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Publications Data Module`** (1 nodes): `publications-data.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Mobile Nav Controller`** (1 nodes): `Mobile Navigation Menu Controller`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Desktop Dropdown Nav`** (1 nodes): `Nav Dropdown Controller`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Scroll Fade Animation`** (1 nodes): `Fade-In Scroll Animation (IntersectionObserver)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Progress Bar Animation`** (1 nodes): `Progress Bar Fill Animation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Metric Counter`** (1 nodes): `Animated Metric Counter`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Navbar Scroll Shadow`** (1 nodes): `Navbar Scroll Shadow Effect`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Smooth Scroll Handler`** (1 nodes): `Smooth Scroll for Anchor Links`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Revert Documentation`** (1 nodes): `Revert of Merge Commit 42b2e46`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Pillar: Ethics` connect `Ethics & Community Pillar` to `Safety Pillar & Publications`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `Safety vs Ethics Distinction Rationale` connect `Safety Pillar & Publications` to `Ethics & Community Pillar`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `Luma Calendar Integration`, `Selected Day Detail Panel`, `Mobile Navigation Menu Controller` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._