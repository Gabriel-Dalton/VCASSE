# VCASSE Design System
**Vancouver Centre for AI, Safety, Sustainability & Ethics**

*Version 1.0 | Last Updated: April 2026*

## Quick Start

This design system defines the visual language for all VCASSE digital properties. All new pages, components, and interfaces should follow these guidelines to maintain consistency, professionalism, and brand integrity.

### Core Design Philosophy
- **Professional & Posh**: Clean, institutional aesthetic with premium presentation
- **Industrial Modern**: Purposeful design with precision and clarity
- **Green Sustainability**: Primary green theme (#047857) reinforces our commitment to ethics and sustainability
- **Responsive & Accessible**: Works flawlessly across all devices and accessibility standards

---

## Design Tokens

### Color Palette

#### Primary Colors
- **Primary Brand Green**: `#047857` (RGB: 4, 120, 87) — Main action color, CTAs, accents
- **Primary Light**: `#059669` (RGB: 5, 150, 105) — Hover states, interactive elements
- **Primary Dark**: `#064e3b` (RGB: 6, 78, 59) — Deep footer bands, strong emphasis

#### Neutral & Professional
- **Ink Strong** (Text): `#0b1c2d` (RGB: 11, 28, 45) — Primary text, headings
- **Slate Professional**: `#334155` (RGB: 51, 65, 85) — Secondary text, labels
- **Neutral**: `#64748b` (RGB: 100, 116, 139) — Body copy, tertiary text
- **Text Muted**: `#64748b` — Disabled states, helper text
- **Text Light**: `#94a3b8` (RGB: 148, 163, 184) — Subtle, background text

#### Backgrounds
- **Canvas (Default BG)**: `#f8fafc` — Page background
- **Light**: `#f8fafc` — Lighter surfaces
- **Page**: `#f1f5f9` — Section backgrounds
- **Card**: `#ffffff` — Card surfaces, modals
- **Card Alt**: `#f8fafc` — Alternative card surfaces
- **Dark**: `#0f172a` (RGB: 15, 23, 42) — Dark sections, contrast
- **Hero Gradient**: Linear 165deg from `#f8fafc` → `#ecfdf5` → `#f8fafc`

#### Accents & Highlights
- **Green Accent**: `#a7f3d0` — Subtle highlights, badges
- **Green Light**: `#d1fae5` — Very light accents, backgrounds
- **Primary Glow**: `rgba(4, 120, 87, 0.12)` — Soft shadow/glow effects

#### Borders & Dividers
- **Border**: `#e2e8f0` (RGB: 226, 232, 240) — Standard borders
- **Border Light**: `#f1f5f9` — Subtle dividers

---

## Typography

### Font Families

| Purpose | Family | Usage |
|---------|--------|-------|
| **Display/Headlines** | IBM Plex Sans, Fallback: Inter | H1, H2, H3, large titles (Weight: 600–700) |
| **Body & UI** | Inter | Body copy, buttons, labels, UI text |
| **Serif Display** | DM Serif Display | Editorial, accent statements, pull quotes |
| **System Fallback** | -apple-system, BlinkMacSystemFont, sans-serif | Fallback for all sans-serif |

### Type Scale & Hierarchy

#### Headings
- **H1** (Hero/Page Title)
  - Font: IBM Plex Sans
  - Weight: 700
  - Size: 48–56px (responsive)
  - Line Height: 1.2
  - Letter Spacing: -0.5px
  - Used for: Main hero titles, page headers

- **H2** (Section Title)
  - Font: IBM Plex Sans
  - Weight: 600–700
  - Size: 32–40px
  - Line Height: 1.3
  - Used for: Major section headings

- **H3** (Subsection Title)
  - Font: IBM Plex Sans
  - Weight: 600
  - Size: 24–28px
  - Line Height: 1.4
  - Used for: Subsection headers, card titles

#### Body Text
- **Body Default**
  - Font: Inter
  - Weight: 400
  - Size: 16px
  - Line Height: 1.6
  - Color: `--text-body` (#475569)
  - Used for: Standard paragraph text

- **Body Small**
  - Font: Inter
  - Weight: 400
  - Size: 14px
  - Line Height: 1.5
  - Color: `--text-muted`
  - Used for: Supporting text, captions

#### UI Text
- **Button/Label**
  - Font: Inter
  - Weight: 500–600
  - Size: 14–16px
  - Letter Spacing: ±0
  - Used for: Button labels, navigation links

- **Caption/Helper**
  - Font: Inter
  - Weight: 400
  - Size: 12–13px
  - Color: `--text-light` (#94a3b8)
  - Used for: Form hints, timestamped info

---

## Spacing & Layout

### Base Unit
All spacing is based on **4px units**:
- Minimal: 4px
- XSmall: 8px
- Small: 12px
- Base: 16px
- Medium: 24px
- Large: 32px
- XLarge: 48px
- 2XL: 64px
- 3XL: 80px

### Container & Widths
- **Max Content Width**: 1280px
- **Container Padding** (desktop): 48px left/right
- **Container Padding** (tablet): 24px left/right
- **Container Padding** (mobile): 16px left/right
- **Container Margin**: 0 auto (centered)

### Navigation Height
- **Nav Height**: 72px (includes padding)

### Section Spacing
- **Hero Section**: 120–160px top/bottom padding
- **Content Sections**: 80–120px top/bottom padding
- **Card/Component Gap**: 16–24px (internal)
- **Grid Gap**: 24–32px (multi-column layouts)

---

## Border Radius

| Size | Value | Usage |
|------|-------|-------|
| **Small** | 6px | Small buttons, minor UI elements |
| **Medium** | 12px | Cards, moderate components |
| **Large** | 16px | Large cards, modal corners |
| **XLarge** | 24px | Hero sections, full-bleed containers |

---

## Shadows & Depth

| Level | Value | Usage |
|-------|-------|-------|
| **Shadow Small** | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation, fine details |
| **Shadow Medium** | `0 4px 12px rgba(0,0,0,0.08)` | Card shadows, moderate elevation |
| **Shadow Large** | `0 8px 30px rgba(0,0,0,0.1)` | Modals, dropdown shadows |

**Brand Band Shadow** (Primary Dark): Deep visual anchor for CTAs and footer

---

## Component Patterns

### Navigation
- **Style**: Sticky header with glassmorphic blur effect
- **Background**: `rgba(255, 255, 255, 0.94)` with `backdrop-filter: blur(20px)`
- **Border**: 1px solid `rgba(15, 23, 42, 0.08)`
- **Height**: 72px
- **Active State**: Green underline (primary color), bold text
- **Hover State**: Primary green text
- **Mobile**: Hamburger toggle, stacked menu

### Hero Sections
- **Background**: Gradient hero (light → soft green → light)
- **Padding**: 120–160px top/bottom
- **Content Alignment**: Center or left-aligned based on layout
- **Typography**:
  - Title: H1, primary color emphasis possible
  - Subtitle: Body default, max 2 lines
  - CTA Button: Primary green background, white text

### Cards
- **Background**: White (`#ffffff`)
- **Border**: None or `1px solid #e2e8f0`
- **Padding**: 24–32px
- **Border Radius**: 12–16px
- **Shadow**: Medium shadow
- **Hover**: Subtle lift, enhanced shadow (optional)

### Buttons
- **Primary Button**
  - Background: Primary green (#047857)
  - Text: White (#ffffff), Weight: 600
  - Padding: 12–16px horizontal, 10–14px vertical
  - Border Radius: 6–8px
  - Hover: Primary Light (#059669)
  - Active: Primary Dark (#064e3b)

- **Secondary Button**
  - Background: Transparent or light (_#f1f5f9_)
  - Text: Primary green or slate professional
  - Border: 1px solid border color
  - Hover: Slight background shift

- **Text Link**
  - Color: Primary green
  - Underline: None (hover underline optional)
  - Hover: Primary light, possible underline

### Forms
- **Input Fields**
  - Border: 1px solid `#e2e8f0`
  - Border Radius: 8px
  - Padding: 10–12px
  - Background: White or light
  - Focus: Green border, subtle glow

### Badges & Labels
- **Primary Badge**: Green background, white text
- **Secondary Badge**: Green light background, green text
- **Neutral Badge**: Slate background, white or dark text

---

## Responsive Design

### Breakpoints
- **Mobile**: 320px–767px
- **Tablet**: 768px–1024px
- **Desktop**: 1025px+

### Responsive Rules
- **Mobile**: Single column, full-width cards, stacked navigation
- **Tablet**: Two-column layouts, adjusted font sizes, optimized spacing
- **Desktop**: Three+ column grids, full typography scale, generous spacing

### Mobile-First Approach
Build for mobile first, then enhance for larger screens. Prioritize:
1. Touch targets (min 44×44px)
2. Readable text sizes (min 16px)
3. Clear visual hierarchy
4. Simplified navigation

---

## Accessibility Standards

### WCAG 2.1 Compliance
- **Contrast Ratio**: Minimum 4.5:1 for body text, 3:1 for large text
- **Focus States**: Visible keyboard navigation (green border or outline)
- **Alt Text**: All images require descriptive alt text
- **Semantic HTML**: Proper heading hierarchy (H1 → H2 → H3, no H1 skips)

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order: Left to right, top to bottom
- Focus indicators: Clear and visible

### Color & Contrast
- Never rely on color alone to convey meaning
- Use patterns, icons, or text alongside colors
- Test with color blindness simulators

---

## Brand Voice & Imagery

### Tone
- Professional yet approachable
- Editorial and authoritative (research-backed)
- Inclusive and inclusive language
- Solutions-oriented

### Imagery Style
- High-quality, professional photography
- Abstract patterns or data visualization for research content
- Minimize stock imagery; prefer original content
- Maintain consistent color grading (lean toward cool/neutral tones)

### Icons
- Clean, minimal icon set (Feather or similar)
- Stroke weight: 2px
- Color: Primary green for brand alignment
- Size: Scale consistently (16px, 24px, 32px)

---

## Page Structure & Layouts

### Standard Page Layout
1. **Navigation** (72px sticky header)
2. **Hero Section** (120–160px padding)
3. **Content Sections** (80–120px section spacing)
4. **Newsletter/CTA** (120px padding, green footer band)
5. **Footer** (primary-dark background, full width)

### Hero Variations
- **Hero with Text**: Title + subtitle + CTA
- **Hero with Image/Gradient**: Text overlay on visual
- **Hero Minimal**: Large title only

### Content Section Patterns
- **Feature Grid**: 1–3 columns, card-based
- **Timeline**: Vertical or horizontal, green accents
- **Case Study**: Multi-section layout with alternating text/image
- **Form Section**: Centered, generous spacing

---

## Do's & Don'ts

### Do ✓
- Use consistent spacing (4px base unit)
- Maintain green as primary action color
- Apply proper heading hierarchy
- Test on mobile, tablet, and desktop
- Use semantic HTML
- Implement accessible color contrasts
- Keep animations subtle (0.2s–0.4s)
- Group related content with whitespace

### Don't ✗
- Create custom color variations outside the palette
- Mix fonts beyond the three approved families
- Skip keyboard navigation support
- Use blur effects excessively
- Nest more than 3 levels of dropdown menus
- Deviate from spacing units (use multiples of 4px)
- Auto-play videos or media
- Rely on color alone for information

---

## Animation & Interaction

### Transitions
- **Standard Duration**: 0.2s–0.3s ease
- **Hover States**: 0.15s ease
- **Page Transitions**: 0.4s cubic-bezier(0.77, 0, 0.175, 1)
- **Easing**: `ease`, `ease-in-out`, or cubic-bezier for custom motion

### Special Effects
- **Glassmorphism**: Used sparingly for navigation background
- **Gradient Overlays**: Hero sections, accent elements
- **Glow Effects**: Primary-glow for subtle highlights
- **Transforms**: Rotate, scale (max 2–3% for subtle effects)

---

## Implementation Notes

### CSS Variables
All design tokens are defined as CSS custom properties:
```css
:root {
  --primary: #047857;
  --primary-light: #059669;
  --text-body: #475569;
  --radius-md: 12px;
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  /* ... all tokens listed in styles.css */
}
```

Use these variables consistently in all components.

### Naming Conventions
Follow BEM (Block-Element-Modifier) for CSS classes:
- Block: `.navbar`, `.hero`, `.card`
- Element: `.navbar__logo`, `.hero__title`
- Modifier: `.button--primary`, `.card--featured`

### Testing Checklist
Before launch, verify:
- [ ] All pages tested on mobile, tablet, desktop
- [ ] Keyboard navigation works throughout
- [ ] Color contrasts pass WCAG AA standards
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] Responsive images load correctly
- [ ] Performance: Page load < 3 seconds
- [ ] No console errors

---

## Resources & References

- **CSS Variables**: Defined in `css/styles.css`
- **Fonts**: Google Fonts (IBM Plex Sans, Inter, DM Serif Display)
- **Color Palette**: [View on Coolors](#)
- **Accessibility**: [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- **Responsive Design**: Mobile-first approach, test on real devices

---

## Questions or Updates?

If guidelines need updates or clarifications, please:
1. Document the change with reasoning
2. Update this file and related design docs
3. Communicate across the team
4. Version and date all changes

---

**VCASSE Design System v1.0**  
Professional | Institutional | Sustainable | Accessible
