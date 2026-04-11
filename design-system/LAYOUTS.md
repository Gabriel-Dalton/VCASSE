# Page Layout Patterns & Templates

## Standard VCASSE Page Structure

Every page follows this general structure for consistency:

```
┌─────────────────────────────────────────────────┐
│  Navigation (sticky, 72px height)               │
├─────────────────────────────────────────────────┤
│                                                  │
│  Image-led or institutional hero               │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  Content Sections (alternating patterns)       │
│  - Features/Cards Grid                         │
│  - Text + Image                                │
│  - Timeline/Steps                              │
│  - Testimonials/Quotes                         │
│                                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  CTA / Newsletter Section (green footer band)  │
│                                                  │
├─────────────────────────────────────────────────┤
│  Footer (dark background)                       │
└─────────────────────────────────────────────────┘
```

---

## Hero Section Patterns

### Pattern 1: Image-Led Homepage Hero
**Best for**: VCASSE homepage and primary template entry screens

```html
<section class="hero hero--home">
  <div class="container">
    <div class="hero-content">
      <p class="hero-eyebrow">Public-interest AI guidance for Vancouver</p>
      <h1 class="hero-title">
        Safety, Sustainability,
        <span class="italic-accent">&amp; Ethics</span>
      </h1>
      <p class="hero-description">
        Supporting description, max 2–3 lines. Explain what this page is about.
      </p>
      <div class="hero-actions">
        <a href="#" class="btn btn-white btn-uppercase">Explore Research</a>
        <a href="#" class="btn btn-outlined btn-uppercase">Work With Us</a>
      </div>
    </div>
  </div>
</section>

<section class="home-impact-strip" aria-label="VCASSE operating model">
  <div class="container">
    <div class="impact-item">
      <span>01</span>
      <strong>Research</strong>
      <p>Plain-language briefs and field notes for responsible AI decisions.</p>
    </div>
    <!-- Education, Policy, Community -->
  </div>
</section>
```

**Layout Details:**
- Text left-aligned over a full-width civic image with deep green overlay
- Content is never placed in a decorative card
- Title: large H1, white text with green accent emphasis
- Description: Body text, 18px desktop / 16px mobile
- The operating-model strip follows immediately after the hero so the first viewport hints at the next section
- Use fixed font sizes per breakpoint; do not use viewport-width font scaling

---

### Pattern 2: Institutional Subpage Hero
**Best for**: About page, research pages, events, publications

```html
<section class="page-hero">
  <div class="container">
    <div class="page-hero-content">
      <div class="section-label">PILLAR 01</div>
      <h1 class="page-hero-title">AI Safety <span class="italic-accent">&amp; Robustness</span></h1>
      <p class="page-hero-description">Supporting text explaining the page.</p>
    </div>
    <div class="page-hero-visual" aria-hidden="true">
      <!-- Optional supporting visual, never required for the content to make sense -->
    </div>
  </div>
</section>
```

**Layout Details:**
- Light institutional gradient: white → mint → pale civic blue
- Optional visual is supporting material, not a boxed hero card competing with the copy
- Stack on mobile
- Padding: 80–120px top/bottom
- Border radius remains 8px or less

---

### Pattern 3: Minimal Hero
**Best for**: Secondary pages, section headers

```html
<section class="hero hero--minimal">
  <div class="container">
    <div class="hero-content hero-minimal">
      <h1 class="hero-title">Just a Title</h1>
    </div>
  </div>
</section>
```

**Layout Details:**
- Title only, no subtitle
- Smaller padding: 80–100px
- Subtle background or plain white
- Often paired with breadcrumbs above

---

## Content Section Patterns

### Pattern 1: Three-Column Feature Grid
**Best for**: Showcase pillars, services, or key features

```html
<section class="section-features">
  <div class="container">
    <h2 class="section-title">Our Three Pillars</h2>
    
    <div class="features-grid">
      <article class="feature-card">
        <div class="feature-icon">
          <svg><!-- icon --></svg>
        </div>
        <h3>Safety</h3>
        <p>Description of this pillar or feature...</p>
        <a href="/safety" class="link-with-arrow">Learn more →</a>
      </article>
      
      <article class="feature-card">
        <!-- Similar structure -->
      </article>
      
      <article class="feature-card">
        <!-- Similar structure -->
      </article>
    </div>
  </div>
</section>
```

**CSS Styling:**
```css
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 48px;
}

.feature-card {
  background: var(--bg-card);
  padding: 32px;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

**Layout Details:**
- 3 columns on desktop, responsive fewer on tablet
- Card padding: 24–32px
- Gap: 24–32px
- Feature icon: 48×48px, primary green
- Title: H3, Ink Strong
- Description: Body text, max 3 lines

---

### Pattern 2: Alternating Text/Image Section
**Best for**: Case studies, detailed explanations, before/after stories

```html
<section class="section-alternating">
  <div class="container">
    
    <!-- Block 1: Text Left, Image Right -->
    <div class="alternating-block alternating-text-left">
      <div class="alternating-text">
        <h2>Section Title</h2>
        <p>Body text explaining the content...</p>
        <p>More details, insights, or narrative...</p>
        <a href="#" class="button--primary">Call to action</a>
      </div>
      <div class="alternating-media">
        <img src="image-1.webp" alt="alt text" />
      </div>
    </div>
    
    <!-- Block 2: Image Left, Text Right -->
    <div class="alternating-block alternating-image-left">
      <div class="alternating-media">
        <img src="image-2.webp" alt="alt text" />
      </div>
      <div class="alternating-text">
        <h2>Next Section Title</h2>
        <p>More content...</p>
      </div>
    </div>
    
  </div>
</section>
```

**CSS Styling:**
```css
.alternating-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 80px;
}

.alternating-image-left {
  grid-auto-flow: dense; /* Reverse image position */
}

@media (max-width: 768px) {
  .alternating-block {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

**Layout Details:**
- 50/50 split on desktop
- Full-width stack on mobile
- Image max-width: 500px
- Vertical gap: 48px between blocks
- Title: H2, supporting text: Body

---

### Pattern 3: Cards with Icon + Text (Horizontal)
**Best for**: Process steps, benefits list, checklist

```html
<section class="section-cards-horizontal">
  <div class="container">
    <h2 class="section-title">How It Works</h2>
    
    <div class="cards-horizontal-list">
      <div class="card-horizontal">
        <div class="card-icon">
          <svg><!-- Icon --></svg>
        </div>
        <div class="card-content">
          <h3>Step 1: Research</h3>
          <p>We conduct thorough research...</p>
        </div>
      </div>
      
      <div class="card-horizontal">
        <!-- Similar structure -->
      </div>
      
      <div class="card-horizontal">
        <!-- Similar structure -->
      </div>
    </div>
  </div>
</section>
```

**CSS Styling:**
```css
.cards-horizontal-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 48px;
}

.card-horizontal {
  display: flex;
  gap: 24px;
  padding: 32px;
  background: var(--bg-card);
  border-radius: 8px;
  border-left: 4px solid var(--primary);
}

.card-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(4, 120, 87, 0.1);
  border-radius: 8px;
}
```

**Layout Details:**
- Full-width cards with left border accent
- Icon: 48×48px with light background
- Gap between icon/content: 24px
- Padding: 24–32px
- Border-left: 4px solid primary green

---

### Pattern 4: Timeline (Vertical)
**Best for**: History, milestones, events chronology

```html
<section class="section-timeline">
  <div class="container">
    <h2 class="section-title">Our Journey</h2>
    
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>2020: Founding</h3>
          <p>VCASSE was established to address AI ethics concerns...</p>
        </div>
      </div>
      
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <h3>2021: First Research</h3>
          <p>Published our first major research paper on...</p>
        </div>
      </div>
      
      <!-- More timeline items -->
    </div>
  </div>
</section>
```

**CSS Styling:**
```css
.timeline {
  position: relative;
  padding: 48px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.timeline-item {
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
  position: relative;
}

.timeline-dot {
  width: 40px;
  height: 40px;
  background: var(--primary);
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  margin-top: 4px;
}

.timeline-content h3 {
  margin-bottom: 8px;
  color: var(--ink-strong);
}
```

**Layout Details:**
- Vertical line connecting dots
- Circle markers: 40×40px, primary green
- Content alignment: Left of line
- Responsive: Hide line on mobile, stack vertically

---

## Full Page Layout Example: About Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About VCASSE</title>
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body>

  <!-- NAVIGATION (included via template) -->
  <nav class="navbar"><!-- ... --></nav>

  <!-- HERO -->
  <section class="hero hero--centered">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">About VCASSE</h1>
        <p class="hero-description">
          We're a dedicated research centre advancing AI safety, sustainability, 
          and ethics across Canada.
        </p>
      </div>
    </div>
  </section>

  <!-- MISSION SECTION -->
  <section class="section" style="background: var(--bg-canvas);">
    <div class="container">
      <h2>Our Mission</h2>
      <p>Body text about our mission...</p>
    </div>
  </section>

  <!-- THREE PILLARS (Feature Grid) -->
  <section class="section-features" style="background: var(--bg-page);">
    <div class="container">
      <h2 class="section-title text-center">Our Three Pillars</h2>
      <div class="features-grid">
        <!-- Cards as shown in Pattern 1 -->
      </div>
    </div>
  </section>

  <!-- TEAM SECTION (Alternating Pattern) -->
  <section class="section-alternating">
    <div class="container">
      <!-- Alternating blocks as shown in Pattern 2 -->
    </div>
  </section>

  <!-- CTA SECTION -->
  <section class="section-cta" style="background: var(--primary-dark); color: white;">
    <div class="container">
      <h2>Ready to Collaborate?</h2>
      <p>Learn more about our research initiatives</p>
      <a href="/contact" class="button--primary" style="background: white; color: var(--primary);">
        Get in Touch
      </a>
    </div>
  </section>

  <!-- FOOTER (included via template) -->
  <footer><!-- ... --></footer>

</body>
</html>
```

---

## Common Section Styling Classes

### Section Containers
```css
.section {
  padding: 80px 0;
}

.section.section--small {
  padding: 48px 0;
}

.section.section--large {
  padding: 120px 0;
}

.section.section--dark {
  background: var(--bg-dark);
  color: var(--white);
}

.section.section--alt {
  background: var(--bg-page);
}
```

### Text Alignment
```css
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--ink-strong);
  margin-bottom: 32px;
}

.section-title.text-center { text-align: center; }
```

---

## Responsive Behavior by Pattern

### Three-Column Grid
```
Desktop (1025px+): 3 columns, 32px gap
Tablet (768–1024px): 2 columns, 24px gap
Mobile (< 768px): 1 column, 16px gap
```

### Alternating Blocks
```
Desktop: 50/50 split, 48px gap
Mobile: Stacked 100%, 32px gap
Image position: Always visible, order adjusted with grid-auto-flow
```

### Timeline
```
Desktop: Line visible, horizontal spacing 32px
Mobile: Line hidden, text full width, margin-left: 20px
Touch: Larger timeline dots (48px), improved tap targets
```

---

## Accessibility in Layouts

### Landmarks
```html
<nav aria-label="Main navigation"><!-- ... --></nav>
<main id="main-content"><!-- All main content --></main>
<aside aria-label="Sidebar"><!-- If applicable --></aside>
<footer aria-label="Site footer"><!-- ... --></footer>
```

### Heading Hierarchy
- Use H1 once per page (hero/title)
- H2 for major sections
- H3 for subsections
- Never skip levels (H1 → H3 is bad)

### Focus Management
- All interactive elements must have visible focus state
- Tab order: Left to right, top to bottom
- Skip links at top of page

### Color Contrast
- All text on background meets 4.5:1 minimum
- Links distinguishable by more than color alone
- Test critical sections with WAVE/Axe tools

---

## Testing Your Layout

### Desktop Testing
- [ ] Content displays properly at 1440px width
- [ ] Max-width container (1280px) centers correctly
- [ ] Sections have proper spacing (80–120px)
- [ ] Images responsive and not distorted

### Tablet Testing (768px)
- [ ] Grid columns reduce to 2
- [ ] Alternating blocks stack nicely
- [ ] Touch targets are 44×44px minimum
- [ ] No horizontal scroll

### Mobile Testing (375px)
- [ ] Single column layout
- [ ] Hero section height reasonable
- [ ] Buttons/links easily tappable
- [ ] Text is readable
- [ ] Images don't overflow

### Cross-Browser
- [ ] Chrome/Safari/Firefox/Edge latest versions
- [ ] Print styles (if applicable)
- [ ] Dark mode (if implemented)

---

**Page Layouts v1.1 | April 2026**
Professional • Responsive • Accessible
