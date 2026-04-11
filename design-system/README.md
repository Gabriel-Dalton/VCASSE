# VCASSE Design System Documentation

**Version 1.1 | April 2026**
Professional • Editorial • Sustainable • Accessible

---

## Overview

This folder contains comprehensive design documentation for the Vancouver Centre for AI, Safety, Sustainability & Ethics (VCASSE) website template. All future VCASSE sites and deployments should follow these guidelines to maintain visual consistency, brand integrity, and professional presentation.

### What's Included

| File | Purpose | For Whom |
|------|---------|----------|
| [DESIGN.md](../DESIGN.md) | Master design guide with philosophy, tokens, and standards | Everyone (reference) |
| [COLORS.md](COLORS.md) | Complete color palette with accessibility verification | Developers, Designers |
| [COMPONENTS.md](COMPONENTS.md) | Reusable component patterns with code examples | Developers |
| [LAYOUTS.md](LAYOUTS.md) | Page templates and content section patterns | Developers, Content Teams |

---

## Quick Reference

### For Designers & Creative Direction
1. Start with [DESIGN.md](../DESIGN.md) — philosophy, brand guidelines, and overall vision
2. Reference [COLORS.md](COLORS.md) — approved color palette with accessibility verified
3. Use [LAYOUTS.md](LAYOUTS.md) — common page patterns to maintain consistency

### For Front-End Developers
1. Read [COMPONENTS.md](COMPONENTS.md) — HTML/CSS patterns for buttons, forms, cards, etc.
2. Reference [COLORS.md](COLORS.md) — color tokens and CSS variables
3. Follow [LAYOUTS.md](LAYOUTS.md) — page structure and responsive behavior
4. Check [DESIGN.md](../DESIGN.md) — typography scale and spacing rules

### For Code Agents (Codex 5.4, etc.)
1. Read **this entire folder** before generating new pages
2. Prioritize [COMPONENTS.md](COMPONENTS.md) for exact HTML/CSS structure
3. Reference [COLORS.md](COLORS.md) for color usage (use CSS variables, not hex)
4. Follow [LAYOUTS.md](LAYOUTS.md) for page sections and responsive behavior
5. Maintain heading hierarchy and accessibility standards from [DESIGN.md](../DESIGN.md)

---

## Design System Philosophy

### Core Principles
✓ **Professional & Posh** — Clean, institutional aesthetic with premium presentation  
✓ **Industrial Modern** — Purposeful design with precision and clarity  
✓ **Green Sustainability** — Primary green (#047857) reinforces commitment to ethics  
✓ **Responsive & Accessible** — Works flawlessly across all devices, WCAG AA compliant
✓ **Image-Led First Impression** — The homepage opens with a civic image hero and operating-model strip, not a generic split-card hero

---

## Key Design Tokens At a Glance

### Colors
```
Primary Green:  #047857 (brand CTA, links, accents)
Dark:           #0f172a (footer, dark sections)
Text:           #0b1c2d (headings), #475569 (body)
Light BG:       #f8fafc (default page bg)
White:          #ffffff (cards, modals)
```

### Typography
```
Display:  IBM Plex Sans (headings, 700 weight)
Body:     Inter (copy, 400 weight)
Serif:    DM Serif Display (editorial, accent)
```

### Spacing (Base Unit: 4px)
```
Small: 8px
Base:  16px
Medium: 24px
Large: 32px
XL:    48px
```

### Radius
```
Small:  6px (buttons, minor)
Medium: 8px (cards)
Large:  8px (large cards)
XL:     8px (hero sections)
```

---

## File Structure

```
/VCASSE/
├── DESIGN.md                    ← Master design system document
├── design-system/
│   ├── README.md               (this file)
│   ├── COLORS.md               ← Complete color palette & usage
│   ├── COMPONENTS.md           ← Reusable components & patterns
│   └── LAYOUTS.md              ← Page templates & section patterns
├── css/
│   └── styles.css              ← All CSS tokens & component styles
├── [HTML pages]
└── [Other site folders]
```

---

## How to Use This Documentation

### Scenario 1: Creating a New Page

1. **Choose a layout pattern** from [LAYOUTS.md](LAYOUTS.md)
   - Determine which sections you need (hero, cards grid, alternating, etc.)

2. **Reference component patterns** from [COMPONENTS.md](COMPONENTS.md)
   - Copy HTML structure from appropriate component
   - Use class names as-is for styling consistency

3. **Use the correct colors** from [COLORS.md](COLORS.md)
   - Always use CSS variables (e.g., `var(--primary)`)
   - Never hardcode hex values except in exceptional cases
   - Verify contrast ratios (4.5:1 minimum for body text)

4. **Follow spacing rules** from [DESIGN.md](../DESIGN.md)
   - Use multiples of 4px (8, 12, 16, 24, 32, 48, 64px)
   - Container padding: 48px desktop, 24px tablet, 16px mobile
   - Section gaps: 80–120px

5. **Test responsive behavior** using [LAYOUTS.md](LAYOUTS.md) breakpoints
   - Mobile: 320–767px
   - Tablet: 768–1024px
   - Desktop: 1025px+

### Scenario 2: Adding a New Component

1. **Design in component system first**
   - Determine purpose and reusability
   - Sketch responsive behavior at multiple breakpoints

2. **Verify color accessibility**
   - Use [COLORS.md](COLORS.md) verified pairs
   - Test with contrast checker if new combinations

3. **Document in [COMPONENTS.md](COMPONENTS.md)**
   - Add pattern name and purpose
   - Include HTML example
   - Include CSS styling block
   - Add usage guidelines

4. **Update [COLORS.md](COLORS.md)** if new colors needed
   - Verify WCAG AA contrast (4.5:1 minimum)
   - Add to palette table
   - Document usage context

5. **Test across browsers and devices**
   - Chrome, Safari, Firefox, Edge latest
   - Mobile (iOS/Android), tablet, desktop
   - Keyboard navigation (Tab key)

### Scenario 3: Responsive Design Issue

1. **Check [LAYOUTS.md](LAYOUTS.md)** for the section pattern
   - Find your layout type (grid, alternating, timeline, etc.)
   - Review responsive CSS code

2. **Verify breakpoints** are correctly applied
   - Mobile-first: Default styles for mobile
   - 768px media query for tablet
   - 1025px media query for desktop

3. **Test with real devices** or viewport emulation
   - Use Chrome DevTools device emulation
   - Or test on actual mobile/tablet if possible

4. **Check touch targets** are 44×44px minimum
   - Buttons, links, and interactive elements

---

## CSS Variable Reference

All design tokens are CSS variables. Use these throughout your code:

### Colors
```css
var(--primary)
var(--primary-light)
var(--primary-dark)
var(--ink-strong)
var(--slate-professional)
var(--text-body)
var(--text-muted)
var(--bg-canvas)
var(--bg-page)
var(--bg-card)
var(--bg-dark)
var(--border)
var(--green-light)
```

### Sizing
```css
var(--max-width)        /* 1280px */
var(--nav-height)       /* 72px */
var(--radius-sm)        /* 6px */
var(--radius-md)        /* 8px */
var(--radius-lg)        /* 8px */
var(--shadow-sm)        /* subtle */
var(--shadow-md)        /* medium */
var(--shadow-lg)        /* large */
```

### Fonts
```css
var(--font-sans)        /* Inter, system fallback */
var(--font-display)     /* IBM Plex Sans */
var(--font-serif)       /* DM Serif Display */
```

**Location:** All variables defined in `css/styles.css` under `:root {}`

---

## Accessibility Checklist

Every page should pass these checks:

- [ ] **Contrast**: Body text 4.5:1, large text 3:1 (WCAG AA minimum)
- [ ] **Headings**: Proper hierarchy (H1 → H2 → H3, no skips)
- [ ] **Alt Text**: All images have descriptive alt text
- [ ] **Keyboard**: All interactive elements accessible via Tab key
- [ ] **Focus**: Visible focus indicators on all focusable elements
- [ ] **Semantic HTML**: Proper use of nav, main, aside, footer
- [ ] **Color**: Info conveyed by more than color alone (use icons, patterns)
- [ ] **Language**: lang attribute on html element
- [ ] **Links**: Descriptive link text (not "click here")
- [ ] **Touch**: 44×44px minimum touch targets

**Test with:** WAVE, Axe DevTools, or WCAG Contrast Checker

---

## Naming Conventions

### CSS Classes (BEM Format)
```
.navbar          /* Block */
.navbar__logo    /* Element */
.button--primary /* Modifier */

.hero-title      /* Alternative: kebab-case with semantic naming */
.card--featured
```

### Color Names (Semantic)
```
--primary        /* Not: --green-1 */
--text-body      /* Not: --gray-500 */
--bg-card        /* Not: --color-bg-5 */
--border-light   /* Not: --border-2 */
```

### Spacing (Multiples of 4px)
```
8px, 12px, 16px, 24px, 32px, 48px, 64px
NOT: 10px, 15px, 20px, 25px, etc.
```

---

## Common Mistakes to Avoid

❌ **Don't:**
- Use colors outside the approved palette
- Mix font families beyond the three specified
- Deviate from spacing units (use non-4px multiples)
- Create custom color shades (use CSS variables instead)
- Skip keyboard navigation or focus indicators
- Rely on color alone for information
- Auto-play videos or media without user consent
- Create heading hierarchy gaps (H1 → H3 skips H2)

✓ **Do:**
- Use CSS variables for all design tokens
- Test responsiveness at all breakpoints
- Maintain consistent spacing (4px multiples)
- Verify color contrast before shipping
- Apply proper heading hierarchy
- Include descriptive alt text on images
- Use semantic HTML (nav, main, section, etc.)
- Keep animations subtle (0.2–0.4s duration)

---

## Testing & Validation

### Device Testing
- [ ] Desktop (1440px width)
- [ ] Tablet (768px width)
- [ ] Mobile (375px width)
- [ ] iPhone/iPad (real device, if possible)
- [ ] Android device (real device, if possible)

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### Accessibility Testing
- [ ] WAVE (webaim.org/wave)
- [ ] Axe DevTools browser extension
- [ ] Lighthouse (Chrome DevTools)
- [ ] Keyboard navigation (Tab through entire page)
- [ ] Screen reader testing (VoiceOver, NVDA, JAWS)

### Performance
- [ ] Page Load: < 3 seconds (on 4G)
- [ ] No console errors
- [ ] Optimized images (WebP with JPG fallback)
- [ ] No render-blocking resources

---

## Updating This Documentation

### When to Update
- New component added to site
- Color palette changed or expanded
- Typography scale modified
- Responsive breakpoints adjusted
- New page layout pattern established

### How to Update
1. Edit the relevant file (COLORS.md, COMPONENTS.md, etc.)
2. Update the table of contents in this README
3. Date your changes (at bottom of each file)
4. Communicate changes to the team
5. Version the update if major

### Version History
- **v1.1** (April 2026) — Added image-led homepage hero, operating-model strip, tighter radii, and fixed breakpoint typography guidance
- **v1.0** (April 2026) — Initial design system documentation

---

## Quick Links

- **Master Design System:** [DESIGN.md](../DESIGN.md)
- **Color Palette:** [COLORS.md](COLORS.md)
- **Component Library:** [COMPONENTS.md](COMPONENTS.md)
- **Page Layouts:** [LAYOUTS.md](LAYOUTS.md)
- **Stitch Project:** [VCASSE Design System](https://www.designstitch.io)

---

## Questions or Feedback?

If you have questions about the design system:
1. Check the relevant documentation file
2. Review examples in [LAYOUTS.md](LAYOUTS.md) or [COMPONENTS.md](COMPONENTS.md)
3. Test in code to verify approach
4. Document learning for future reference
5. Update documentation if gap identified

---

**VCASSE Design System v1.1**
Professional • Institutional • Sustainable • Accessible  
*Ready for all future VCASSE sites and deployments*
