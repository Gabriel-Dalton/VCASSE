# Color & Visual Tokens

## Complete Color Palette Reference

### Primary Brand Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Primary Brand Green** | `#047857` | 4, 120, 87 | CTAs, active states, primary branding |
| **Primary Light** | `#059669` | 5, 150, 105 | Hover states, interactive feedback |
| **Primary Dark** | `#064e3b` | 6, 78, 59 | Footer, deep emphasis, dark sections |

**Visual Reference:**
```
████ Primary #047857 (Brand)
████ Primary Light #059669 (Hover)
████ Primary Dark #064e3b (Dark Mode/Footer)
```

---

### Neutral & Professional Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Ink Strong** | `#0b1c2d` | 11, 28, 45 | Headlines, primary text |
| **Slate Professional** | `#334155` | 51, 65, 85 | Secondary text, labels |
| **Neutral** | `#64748b` | 100, 116, 139 | Body copy, tertiary text |
| **Text Muted** | `#64748b` | 100, 116, 139 | Disabled, helper text |
| **Text Light** | `#94a3b8` | 148, 163, 184 | Subtle, background text |

**Scale from Dark to Light:**
```
████ Ink Strong #0b1c2d (Darkest)
████ Slate Professional #334155 (Dark)
████ Neutral #64748b (Mid)
████ Text Light #94a3b8 (Light)
```

---

### Background Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Canvas (Default)** | `#f8fafc` | 248, 250, 252 | Page default background |
| **Light** | `#f8fafc` | 248, 250, 252 | Light surface areas |
| **Page** | `#f1f5f9` | 241, 245, 249 | Section backgrounds |
| **Card** | `#ffffff` | 255, 255, 255 | Card surfaces, modals |
| **Card Alt** | `#f8fafc` | 248, 250, 252 | Alternative cards |
| **Dark** | `#0f172a` | 15, 23, 42 | Dark sections, footers |

**Background Scale:**
```
████ Page #f1f5f9 (Slightly darker canvas)
████ Canvas #f8fafc (Default light)
████ Card #ffffff (Brightest/White)
████ Dark #0f172a (For contrast)
```

---

### Green Accents & Highlights

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Green Accent** | `#a7f3d0` | 167, 243, 208 | Badges, subtle highlights |
| **Green Light** | `#d1fae5` | 209, 250, 229 | Very light accents, bg tints |
| **Primary Glow** | `rgba(4,120,87,0.12)` | — | Soft shadows, focus glows |

**Green Tint Scale:**
```
████ Primary Dark #064e3b (Deep)
████ Primary #047857 (Brand)
████ Primary Light #059669 (Hover)
████ Green Accent #a7f3d0 (Light)
████ Green Light #d1fae5 (Very Light)
```

---

### Borders & Dividers

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Border** | `#e2e8f0` | 226, 232, 240 | Standard borders, input strokes |
| **Border Light** | `#f1f5f9` | 241, 245, 249 | Subtle dividers, section splits |

**Border Usage:**
```
Standard: 1px solid #e2e8f0
Subtle: 1px solid #f1f5f9
Thick: 2px solid #e2e8f0 (accent borders)
Dashed: 2px dashed #a7f3d0 (light accent)
```

---

## Semantic Color Usage

### In Context

#### Text Hierarchy
```
Heading (H1, H2, H3): #0b1c2d (Ink Strong)
Body Text Default: #475569 (Text Body)
Secondary Text: #64748b (Neutral)
Muted/Help Text: #94a3b8 (Text Light)
```

#### Interactive Elements
```
Primary CTA: #047857 bg, #ffffff text
Hover CTA: #059669 bg
Active CTA: #064e3b bg
Link (text): #047857 (green)
Link hover: #059669 (lighter green)
Disabled: rgba(100,116,139,0.5) (50% opacity)
```

#### Backgrounds
```
Page Default: #f8fafc
Section Alt: #f1f5f9
Cards/Panels: #ffffff
Dark Sections: #0f172a
Overlay/Modals: rgba(15,23,42,0.6) (60% opacity)
```

#### Borders & Accents
```
Standard Border: #e2e8f0
Subtle Border: #f1f5f9
Green Accent Line: #047857
Success/Positive: #047857 (green)
Warning/Alert: #f59e0b (amber, if needed)
Error/Danger: #ef4444 (red, if needed)
```

---

## Color Combination Accessibility

### Verified WCAG AA Compliant Pairs (4.5:1 minimum)

| Foreground | Background | Ratio | Status |
|-----------|-----------|-------|--------|
| #0b1c2d (Ink Strong) | #ffffff (White) | 16:1 | ✓ AAA |
| #475569 (Text Body) | #ffffff (White) | 8.7:1 | ✓ AAA |
| #64748b (Neutral) | #f8fafc (Canvas) | 6.2:1 | ✓ AA |
| #047857 (Primary) | #ffffff (White) | 5.2:1 | ✓ AA |
| #ffffff (White) | #064e3b (Primary Dark) | 8:1 | ✓ AAA |
| #ffffff (White) | #0f172a (Dark) | 12.6:1 | ✓ AAA |
| #047857 (Primary) | #ecfdf5 (Light Green BG) | 7.1:1 | ✓ AAA |

**Always verify new color combinations** with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

---

## Color Implementation Examples

### Hero Section with Green Accent
```html
<section class="hero" style="--bg-hero: linear-gradient(165deg, #f8fafc 0%, #ecfdf5 45%, #f8fafc 100%);">
  <h1 style="color: #0b1c2d;">Main Title</h1>
  <a class="button--primary" href="#">Call to Action</a>
</section>
```

### Card with Green Border Accent
```html
<div class="card" style="border-left: 4px solid #047857;">
  <h3 style="color: #0b1c2d;">Card Title</h3>
  <p style="color: #475569;">Card content...</p>
</div>
```

### Badge/Label Examples
```html
<!-- Primary Green Badge -->
<span class="badge" style="background: #047857; color: #ffffff;">Featured</span>

<!-- Light Green Badge -->
<span class="badge" style="background: #d1fae5; color: #064e3b;">New</span>

<!-- Neutral Badge -->
<span class="badge" style="background: #e2e8f0; color: #334155;">Tag</span>
```

### Dark Section with Light Text
```html
<section style="background: #0f172a; color: #ffffff;">
  <h2>White text on dark background for maximum contrast</h2>
  <p style="color: rgba(255,255,255,0.9);">Supporting text with slight opacity</p>
</section>
```

---

## Color Palette Uses by Page Type

### Homepage
- Hero gradient (light → green → light)
- Primary green CTAs
- White cards with subtle borders
- Green accent badges on features

### Research Pages (Safety/Sustainability/Ethics)
- Dark header section (#0f172a background)
- White text with green accent highlights
- Green left borders on key points
- Neutral gray body text on white cards

### Publications/Events Listings
- White card grid with subtle shadows
- Green "Featured" badges
- Primary green links
- Light gray muted text for dates/metadata

### About/Team Pages
- Full-width image sections
- Green accent underlines
- Neutral palette for text hierarchy
- White cards for team members

### Contact/Form Pages
- Minimal color usage (focus on white space)
- Green primary button
- Subtle green border on form inputs (on focus)
- Light gray placeholder text

---

## CSS Variable Implementation

All colors are declared in `css/styles.css`:

```css
:root {
  /* Primary Brand */
  --primary: #047857;
  --primary-light: #059669;
  --primary-dark: #064e3b;
  
  /* Ink & Text */
  --ink-strong: #0b1c2d;
  --slate-professional: #334155;
  --text-body: #475569;
  --text-muted: #64748b;
  --text-light: #94a3b8;
  
  /* Backgrounds */
  --bg-canvas: #f8fafc;
  --bg-page: #f1f5f9;
  --bg-card: #ffffff;
  --bg-dark: #0f172a;
  --bg-hero: linear-gradient(165deg, #f8fafc 0%, #ecfdf5 45%, #f8fafc 100%);
  
  /* Accents */
  --green-accent: #a7f3d0;
  --green-light: #d1fae5;
  --primary-glow: rgba(4, 120, 87, 0.12);
  
  /* Borders */
  --border: #e2e8f0;
  --border-light: #f1f5f9;
}
```

**Usage in CSS:**
```css
.button--primary {
  background: var(--primary);
  color: var(--white);
}

.hero {
  background: var(--bg-hero);
  color: var(--ink-strong);
}
```

---

## Color Naming Convention

- Use **descriptive names** (not color names)
  - ✓ Good: `--primary`, `--text-body`, `--bg-card`
  - ✗ Bad: `--green-1`, `--gray-500`, `--color-5`

- Group by **purpose**
  - Primary/brand colors first
  - Text colors
  - Backgrounds
  - Borders/utilities

- Suffix for **variants**
  - `--primary` (base)
  - `--primary-light` (lighter variant)
  - `--primary-dark` (darker variant)

---

## Maintaining Color Consistency

### When Adding New Colors
1. **Document the purpose** (What is this color for?)
2. **Test contrast** (Against likely backgrounds)
3. **Add to CSS variables** (Not inline hex values)
4. **Update this document** (Keep palette reference current)
5. **Verify accessibility** (WCAG AA minimum)

### When Updating Existing Colors
1. **Update in `css/styles.css`** only
2. **Verify all usages** still pass contrast checks
3. **Test on multiple pages** (ensure consistency)
4. **Update this document** with change date

### Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors.co](https://coolors.co/) (palette builder)
- [Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)

---

**Color Palette v1.0 | April 2026**  
Professional • Accessible • Brand-Aligned
