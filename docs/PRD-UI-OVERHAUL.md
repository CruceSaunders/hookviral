# HookViral UI Overhaul PRD
*Product Requirements Document*
*Version 1.0 | January 30, 2026*

---

## 1. Overview

### 1.1 Purpose
Transform HookViral's UI from a functional MVP to a distinctive, polished product that stands out in the creator tools market. The overhaul focuses on brand identity, visual hierarchy, user delight, and professional polish.

### 1.2 Goals
1. **Distinctive Brand:** Memorable logo, consistent visual language, unique aesthetic
2. **Improved UX:** Intuitive navigation, clear feedback, reduced friction
3. **Professional Polish:** Modern design patterns, smooth animations, refined details
4. **Performance:** Fast loading, responsive across devices, accessible

### 1.3 Success Metrics
- User time-on-site increase (engagement)
- Reduced bounce rate on landing page
- Higher conversion to signup
- Positive feedback on aesthetics
- Accessibility compliance (WCAG AA)

---

## 2. Brand Identity

### 2.1 Logo Design

**Primary Logo Concept: Hook + Spark**
- A stylized fishing hook with a spark/flame at the tip
- Represents: catching attention + viral energy
- Works as: Full logo, icon, favicon

**Logo Requirements:**
- Primary: Full color on dark background
- Secondary: Monochrome white version
- Icon: Simplified for 32x32 favicon
- Minimum size: 24px height

**Color Variations:**
1. Gradient (Pink → Purple): Primary use
2. Solid Pink: Secondary use
3. White: Dark backgrounds
4. Black: Light backgrounds (print)

### 2.2 Color System

**Primary Palette:**
```
Pink (Primary):     #EC4899 → #DB2777 (hover)
Purple (Secondary): #8B5CF6 → #7C3AED (hover)
Cyan (Accent):      #06B6D4 → #0891B2 (hover)
```

**Semantic Colors:**
```
Success:  #10B981
Warning:  #F59E0B  
Error:    #EF4444
Info:     #3B82F6
```

**Dark Theme Surfaces:**
```
Background:   #0A0A0A (was #000000)
Surface 1:    #141414 (cards)
Surface 2:    #1F1F1F (elevated)
Surface 3:    #292929 (popovers)
Border:       rgba(255,255,255,0.1)
```

### 2.3 Typography

**Font Stack:**
- Primary: Inter (current) ✓
- Display: Inter with variable weight
- Mono: JetBrains Mono (code/hooks)

**Scale:**
```
Display:  48px / 56px (landing hero)
H1:       36px / 40px
H2:       24px / 32px
H3:       20px / 28px
Body:     16px / 24px
Small:    14px / 20px
Tiny:     12px / 16px
```

### 2.4 Iconography
- Style: Lucide icons (current) ✓
- Size: 16px (inline), 20px (buttons), 24px (nav)
- Stroke: 1.5px (default), 2px (emphasis)

---

## 3. Component Redesign

### 3.1 Buttons

**Primary Button:**
```tsx
// Gradient with glow effect
className="bg-gradient-to-r from-pink-500 to-purple-500 
           hover:shadow-lg hover:shadow-pink-500/25
           transition-all duration-200
           font-medium rounded-xl px-6 py-3"
```

**Secondary Button:**
```tsx
// Glass effect
className="bg-white/5 border border-white/10 
           hover:bg-white/10 hover:border-white/20
           backdrop-blur-sm rounded-xl"
```

**Ghost Button:**
```tsx
className="hover:bg-white/5 rounded-lg transition-colors"
```

### 3.2 Cards

**Standard Card:**
```tsx
// Subtle gradient border on hover
className="bg-[#141414] border border-white/5 rounded-2xl
           hover:border-white/10 transition-all duration-300
           hover:shadow-lg hover:shadow-black/20"
```

**Featured Card (for hooks):**
```tsx
// Glassmorphism with gradient accent
className="bg-gradient-to-br from-white/10 to-white/5
           backdrop-blur-xl border border-white/10 rounded-2xl
           relative overflow-hidden"
// Add gradient glow element behind
```

**Bento Card (dashboard):**
- Small: 1x1 grid unit
- Medium: 2x1 or 1x2
- Large: 2x2
- Hero: Full width

### 3.3 Input Fields

**Text Input:**
```tsx
className="bg-white/5 border border-white/10 rounded-xl
           focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20
           placeholder:text-white/30 transition-all"
```

**Textarea (for topic input):**
- Taller default (120px min)
- Character count indicator
- Resize handle styled
- Auto-grow option

### 3.4 Navigation

**Sidebar Redesign:**
```
┌─────────────────────────┐
│  🎣 HookViral          │  ← Logo + wordmark
├─────────────────────────┤
│  ✨ Generate     [NEW]  │  ← Primary action highlighted
│  📚 Library             │
│  💾 Saved               │
│  📜 History             │
│  ✏️ Rewrite             │
├─────────────────────────┤
│  ⚙️ Settings            │
│  💎 Upgrade to Pro      │  ← Upgrade CTA
└─────────────────────────┘
```

**Active State:** Pink left border + pink/purple gradient background
**Hover State:** Subtle white/5 background

### 3.5 Badges & Tags

**Niche Badge:**
```tsx
// Colored based on niche
className="px-3 py-1 rounded-full text-xs font-medium
           bg-gradient-to-r from-[color]/20 to-[color]/10
           border border-[color]/30 text-[color]"
```

**Niche Colors:**
- Fitness: Green (#10B981)
- Business: Blue (#3B82F6)
- Comedy: Yellow (#F59E0B)
- Education: Purple (#8B5CF6)
- Lifestyle: Pink (#EC4899)
- Beauty: Rose (#F43F5E)
- Tech: Cyan (#06B6D4)
- Food: Orange (#F97316)

### 3.6 Modals & Dialogs

**Modal Container:**
- Backdrop: blur + dark overlay
- Content: Surface 2 background (#1F1F1F)
- Border: Gradient or white/10
- Animation: Scale + fade (spring physics)
- Close: X button + click outside + Escape

---

## 4. Page-by-Page Redesign

### 4.1 Landing Page

**Hero Section:**
```
┌─────────────────────────────────────────────────────┐
│                    [Animated gradient background]    │
│                                                      │
│     🎣 HookViral                                    │
│                                                      │
│     Stop Losing Views in the                        │
│     First 3 Seconds                                 │
│                                                      │
│     [Animated hook demo widget]                     │
│                                                      │
│     [Get Started Free →]  [See Demo]               │
│                                                      │
│     ✓ No credit card  ✓ 5 free hooks/day           │
└─────────────────────────────────────────────────────┘
```

**Changes:**
- Add animated gradient mesh background
- Hook demo widget with typing animation
- Floating badges showing social proof
- Scroll-triggered animations for sections

**Features Section:**
- Bento grid layout (not 3-column)
- Mix of large and small feature cards
- Icons with gradient fills
- Hover reveals more detail

**Testimonials (new section):**
- Carousel with creator avatars
- Star ratings
- "X hooks generated" counter
- Gradient quote marks

### 4.2 Generate Page

**Layout Redesign:**
```
┌──────────────┬─────────────────────────────────────┐
│              │                                      │
│   CONTROLS   │         GENERATED HOOKS             │
│              │                                      │
│  Topic       │  ┌────────────────────────────┐     │
│  [        ]  │  │ "Hook text here..."        │     │
│              │  │  🔥 Spicy  ★★★★☆           │     │
│  Niche       │  │  [📝][✂️][📋][💾][↗️]      │     │
│  [badges]    │  └────────────────────────────┘     │
│              │                                      │
│  Style       │  ┌────────────────────────────┐     │
│  [options]   │  │ "Another hook..."          │     │
│              │  └────────────────────────────┘     │
│  🌶️ Spicy    │                                      │
│  [--●----]   │         ... more hooks ...          │
│              │                                      │
│  [Generate]  │  [Copy All]  [Save All]             │
│              │                                      │
└──────────────┴─────────────────────────────────────┘
```

**Changes:**
- Controls panel with glass effect
- Hook cards with gradient borders on hover
- Action buttons revealed on hover (cleaner default)
- Loading: Skeleton cards + shimmer
- Empty: Animated illustration + prompt

**Hook Card Redesign:**
- Larger typography for hook text
- Spicy indicator as flame bar (visual, not just text)
- Action bar appears on hover
- Save animation (heart fill)
- Script expander as slide-out panel (not modal)

### 4.3 Library Page

**Changes:**
- Masonry grid for varied content
- Filter chips with counts
- Infinite scroll with "Back to top"
- Quick preview on hover
- Sort by: Popular, Recent, Niche

### 4.4 Saved Page

**Changes:**
- Folders/collections feature (visual placeholder)
- Grid view option (in addition to list)
- Bulk actions toolbar
- Export to CSV/JSON option
- Empty state: Illustrated graphic

### 4.5 History Page

**Changes:**
- Timeline view with dates
- Collapsible groups by day
- Re-generate button per entry
- Compare feature (select 2 generations)
- Stats: Total generated, favorites ratio

### 4.6 Pricing Page

**Changes:**
- Feature comparison table
- Annual/monthly toggle with savings badge
- Popular plan highlighted with glow
- FAQ accordion below
- Money-back guarantee badge

---

## 5. Animation Specifications

### 5.1 Micro-interactions

| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Button | Hover | Scale 1.02 + glow | 150ms |
| Button | Click | Scale 0.98 | 100ms |
| Card | Hover | Lift + border glow | 200ms |
| Copy | Click | Check icon + tooltip | 300ms |
| Save | Click | Heart fill + bounce | 400ms |
| Tab | Switch | Underline slide | 200ms |

### 5.2 Page Transitions

**Route changes:**
- Fade out: 150ms ease-in
- Fade in: 200ms ease-out
- Stagger children: 50ms delay

**Modal:**
- Backdrop: Fade 200ms
- Content: Scale 0.95→1 + fade, spring physics

### 5.3 Loading States

**Hook Generation:**
1. Button → spinner
2. Results area → 10 skeleton cards
3. Cards animate in sequentially (50ms stagger)
4. Confetti burst on first generation (new user)

**Page Load:**
- Logo pulse while loading
- Skeleton for all data-dependent content
- Progressive reveal (nav → sidebar → content)

---

## 6. Responsive Design

### 6.1 Breakpoints

```css
/* Mobile first */
@media (min-width: 640px) { /* sm: Tablet */ }
@media (min-width: 1024px) { /* lg: Desktop */ }
@media (min-width: 1280px) { /* xl: Large */ }
```

### 6.2 Mobile Adaptations

**Navigation:**
- Bottom tab bar (Generate, Library, Saved, History, More)
- Sidebar becomes slide-out drawer
- Top bar: Logo + user avatar only

**Generate Page:**
- Controls above results (not side)
- Full-width hook cards
- Sticky generate button at bottom

**Touch Optimizations:**
- 48px minimum touch targets
- Swipe to delete saved hooks
- Pull to refresh history

---

## 7. Accessibility

### 7.1 Color Contrast
All text meets WCAG AA (4.5:1 minimum)
- Pink on dark: 5.2:1 ✓
- White/87 on dark: 12.6:1 ✓

### 7.2 Keyboard Navigation
- Tab order follows visual order
- Focus visible on all interactive elements
- Escape closes modals/popovers
- Enter activates buttons/links

### 7.3 Screen Readers
- Semantic HTML (nav, main, section, article)
- ARIA labels for icon-only buttons
- Live regions for dynamic content
- Skip to main content link

---

## 8. Implementation Phases

### Phase 1: Foundation (This PR)
- [x] Logo design and integration
- [x] Color system update (softer dark)
- [x] Button redesign with glow effects
- [x] Card hover animations
- [x] Basic micro-interactions

### Phase 2: Components
- [ ] Input field redesign
- [ ] Sidebar redesign
- [ ] Badge/tag system
- [ ] Modal animations
- [ ] Toast notifications

### Phase 3: Pages
- [ ] Landing page hero animation
- [ ] Generate page layout polish
- [ ] Library masonry grid
- [ ] Empty states with illustrations

### Phase 4: Polish
- [ ] Page transitions
- [ ] Loading skeletons everywhere
- [ ] Mobile bottom nav
- [ ] Keyboard shortcuts
- [ ] Performance optimization

---

## 9. File Changes Required

### New Files
- `public/logo.svg` - New vector logo
- `public/logo-icon.svg` - Favicon/icon version
- `public/og-image.png` - Social share image
- `src/components/ui/logo.tsx` - Logo component
- `src/lib/animations.ts` - Animation presets

### Modified Files
- `src/app/globals.css` - Color variables
- `src/app/layout.tsx` - Updated metadata, favicon
- `src/app/page.tsx` - Landing page redesign
- `src/app/(dashboard)/layout.tsx` - Sidebar redesign
- `src/app/(dashboard)/generate/page.tsx` - New layout
- `src/components/ui/button.tsx` - Glow effects
- `src/components/ui/card.tsx` - Hover animations
- `tailwind.config.ts` - Extended theme colors

---

## 10. Success Criteria

### Launch Checklist
- [ ] Logo renders correctly at all sizes
- [ ] Colors meet contrast requirements
- [ ] Animations perform at 60fps
- [ ] Mobile layout works on iPhone SE → iPad Pro
- [ ] All interactive elements keyboard accessible
- [ ] Loading states for all async operations
- [ ] Error states styled consistently
- [ ] Build passes with no warnings

### Post-Launch Metrics
- Lighthouse Performance: >90
- Lighthouse Accessibility: 100
- First Contentful Paint: <1.5s
- Time to Interactive: <3s

---

*This PRD guides the UI overhaul implementation for HookViral.*
