# Component Library & Patterns

## Navigation Component

### Usage
The navbar is sticky and persists at the top of all pages. It includes:
- Logo/branding on the left
- Horizontal navigation links center/right
- Responsive mobile toggle (hamburger)

### Desktop Layout
```
[VCASSE Logo] [Home] [Research ▼] [Events] [Pubs] [About] [Contact]
```

### Mobile Layout
```
[VCASSE] [☰]
  Stacked menu below toggle
```

### Styles
- Height: 72px
- Background: Glassmorphic white with blur
- Border: 1px solid rgba(15, 23, 42, 0.08)
- Font Size: 14px nav links
- Active Link: Primary green with underline
- Hover: Primary green text

### Code Structure
```html
<nav class="navbar">
  <div class="container">
    <a href="/" class="nav-logo nav-logo-mark">
      <img src="logo.svg" alt="VCASSE" />
      VCASSE
    </a>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li class="nav-dropdown">
        <button class="nav-dropdown-trigger">Research ▼</button>
        <ul class="nav-dropdown-menu">
          <li><a href="/safety">Safety</a></li>
          <li><a href="/sustainability">Sustainability</a></li>
          <li><a href="/ethics">Ethics</a></li>
        </ul>
      </li>
      <!-- More links -->
    </ul>
  </div>
</nav>
```

---

## Hero Section

### Purpose
Large, striking introduction to a page. Establishes visual hierarchy and mood.

### Variations

#### Hero: Title + Subtitle + CTA
- Left editorial alignment
- H1 title (max 2 lines)
- Subtitle text (max 2 lines)
- 1–2 action buttons
- Homepage uses a full-width civic image with a deep green overlay
- Padding: 120–160px top/bottom
- Content should sit directly on the hero image/overlay, never inside a decorative card

#### Hero: With Image/Video
- Use image-led background treatment for homepage-level heroes
- Responsive: Stacked on mobile
- Dark overlay required for readability

#### Hero: Minimal
- Large H1 only
- Subtle accent color or gradient
- Used for secondary pages

### CSS Classes
```
.hero              /* Container */
.hero-content      /* Wrapper for text */
.hero-title        /* H1 element */
.hero-description  /* Subtitle */
.hero--[page]      /* Variant modifier */
```

### Background Gradients
- Default: Linear 165deg from `#f8fafc` → `#ecfdf5` → `#f8fafc`
- Dark: From `#0f172a` to `#1a2a3a`
- Custom: Use brand colors, avoid harsh transitions

---

## Card Components

### Standard Card
- White background
- 24–32px padding
- 8px border-radius
- Medium shadow
- Max-width: 400px (typical)

### Featured Card
- Green accent border or banner
- Slightly elevated shadow
- Bold typography
- Used for highlighted content

### Minimal Card
- No shadow, subtle border
- Light background fill
- Used for grid listings

### Hover States
- Subtle shadow increase
- Slight scale (1.02–1.04)
- Color shift on text links
- Smooth 0.2s transition

---

## Button Styles

### Primary Button
```css
.button--primary {
  background: #047857;
  color: #ffffff;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.button--primary:hover {
  background: #059669;
}

.button--primary:active {
  background: #064e3b;
}
```

### Secondary Button
```css
.button--secondary {
  background: transparent;
  color: #047857;
  border: 1px solid #047857;
  font-weight: 500;
  padding: 11px 23px; /* Account for border */
  border-radius: 6px;
}

.button--secondary:hover {
  background: #f1f5f9;
}
```

### Text Link / Ghost Button
```css
.button--text {
  background: transparent;
  color: #047857;
  text-decoration: underline;
  padding: 8px 0;
}

.button--text:hover {
  color: #059669;
}
```

### Button Sizes
- **Small**: 10px v / 16px h, 14px font
- **Medium**: 12px v / 24px h, 16px font (default)
- **Large**: 14px v / 32px h, 18px font

### Disabled State
```css
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

---

## Form Elements

### Input Field
```css
.input {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 16px;
  font-family: inherit;
  background: #ffffff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  border-color: #047857;
  outline: none;
  box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.12);
}
```

### Label
- Font: Inter, 14px, 500 weight
- Color: `#0b1c2d`
- Margin-bottom: 6px
- Always paired with `<label for="id">`

### Text Area
- Same border/radius as input
- Min-height: 120px
- Resize: vertical only

### Checkbox & Radio
- Custom styled using pseudo-elements or icon font
- Focus state: Green border/outline
- Size: 18×18px minimum

### Select Dropdown
- Same border/radius as input
- Custom arrow icon (right-aligned)
- Hover: Slight shadow/background shift

### Form Layout
- Vertical alignment preferred (label above input)
- Gap between fields: 16–24px
- Max-width per field: 400px
- Group related fields with lighter background

---

## Typography & Headings

### Heading Hierarchy
```
H1 → 48–56px, IBM Plex Sans 700
H2 → 32–40px, IBM Plex Sans 600–700
H3 → 24–28px, IBM Plex Sans 600
H4 → 18–22px, IBM Plex Sans 600
Body → 16px, Inter 400
Caption → 14px, Inter 400
```

### Text Emphasis
- **Bold**: Weight 600–700, sparingly
- *Italic*: DM Serif Display for editorial accent
- Underline: Links only, via text-decoration or border-bottom
- All Caps: Spaced (letter-spacing: 1.2px), IBM Plex Sans

### Line Length
- Optimal: 45–75 characters per line
- Max: 85 characters (readability suffers beyond)
- Responsive: Adjust font size or width on mobile

---

## Colors in Context

### When to Use Green
- Primary CTAs
- Active states
- Links (body copy)
- Accent badges/labels
- Border accents
- Icon highlights

### When to Use Slate/Gray
- Body copy
- Supporting text
- Disabled states
- Borders
- Placeholder text

### When to Use Dark/Ink
- Headlines
- Primary titles
- Emphasis text
- Footer backgrounds

### Dark Mode Considerations
- If implementing dark mode, invert backgrounds
- Text: Light gray instead of dark
- Green remains primary, but may adjust tint
- Ensure 4.5:1 contrast ratio in both modes

---

## Spacing Patterns

### Vertical Spacing
- Between sections: 80–120px
- Between content blocks: 48–64px
- Between elements: 16–32px
- Between text lines: 1.6 line-height

### Horizontal Spacing
- Container padding: 48px (desktop), 24px (tablet), 16px (mobile)
- Card padding: 24–32px
- Text spacing: 0 (headings), 12px (labels), 6px (supporting)

### Grid Gaps
- Multi-column layout: 24–32px
- Feature grid: 32px
- Image gallery: 16–24px

---

## Icons & Media

### Icon Set
- Font: Feather Icons (or similar minimal set)
- Stroke: 2px
- Size: 16px, 24px, 32px (no other sizes)
- Color: Inherit or primary green

### Images
- Format: WebP (with JPG fallback)
- Compression: Optimized for web
- Alt text: Descriptive, concise
- Aspect ratios: 16:9, 1:1, 4:3 (maintain consistency)
- Max-width: Image native size

### Video
- No autoplay
- Show controls
- Poster image required
- Max-width: 100% of container
- Responsive: Use `<video>` with `<source>` tags

---

## Responsive Breakpoints & Adjustments

### Mobile (320–767px)
- Single column layouts
- Full-width cards
- Font sizes: -2px from desktop
- Padding: Reduced (16px container)
- Nav: Hamburger menu
- Buttons: Full width or stacked

### Tablet (768–1024px)
- Two-column grids
- Intermediate font sizes
- Container padding: 24px
- Nav: Horizontal or hybrid
- Adjust spacing slightly

### Desktop (1025px+)
- Full three+ column grids
- Max-width container: 1280px
- Full typography scale
- Generous spacing/padding
- Dropdowns visible on hover

---

## Accessibility Specifics

### Focus Indicators
```css
.button:focus,
.link:focus,
.input:focus {
  outline: 2px solid #047857;
  outline-offset: 2px;
}
```

### Skip to Content
Add hidden skip link:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### ARIA Labels
```html
<button aria-label="Open menu" aria-expanded="false">☰</button>
<nav aria-label="Main navigation">...</nav>
<section aria-labelledby="section-title">...</section>
```

### Color Contrast
- Body text on light bg: #475569 on #ffffff → 8.7:1 ✓
- Body text on light bg: #64748b on #f8fafc → 6.2:1 ✓
- Primary green: #047857 on white → 5.2:1 ✓

Always verify with WAVE or Axe DevTools.

---

## Common Mistakes to Avoid

1. **Mixing border-radius**: Use consistent radius (6px for buttons, 8px for cards and panels)
2. **Inconsistent spacing**: Always use multiples of 4px
3. **Font size chaos**: Stick to defined scale (14, 16, 18, 24, 32, 40, 48, 56px)
4. **Color variations**: Use exact hex values, no custom derivations
5. **Shadows without use**: Shadow is for depth; apply intentionally
6. **Long line length**: Wrap at ~75 characters
7. **Skipping alt text**: Every image needs descriptive alt
8. **Auto-playing media**: Respect user autonomy
9. **Keyboard inaccessible**: Test with Tab key throughout
10. **Weak contrast**: Test with WCAG validator before launch

---

## Testing Your Components

### Checklist
- [ ] Desktop (1440px width) looks correct
- [ ] Tablet (768px) layout adjusts properly
- [ ] Mobile (375px) is touch-friendly (44px min targets)
- [ ] All buttons have visible focus state
- [ ] Text is readable (size, contrast, line-height)
- [ ] Images have alt text
- [ ] No layout shifts (CLS)
- [ ] Mobile dropdown works
- [ ] Form submits without errors
- [ ] Links have descriptive text (not "click here")

---

**Last Updated**: April 2026  
**Component Library v1.1**
