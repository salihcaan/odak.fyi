---
name: Odak
description: A keyboard-driven project launcher for developers on macOS 26 Tahoe.
colors:
  bg: "#0f0f0f"
  bg-2: "#161618"
  bg-3: "#1c1c1f"
  surface: "rgba(255,255,255,0.03)"
  surface-2: "rgba(255,255,255,0.06)"
  border: "rgba(255,255,255,0.08)"
  border-2: "rgba(255,255,255,0.14)"
  fg: "#ffffff"
  fg-2: "rgba(255,255,255,0.78)"
  dim: "rgba(255,255,255,0.55)"
  mute: "rgba(255,255,255,0.38)"
  faint: "rgba(255,255,255,0.18)"
  accent: "oklch(76% 0.16 60)"
  accent-2: "oklch(66% 0.16 55)"
  accent-glow: "oklch(76% 0.18 60 / 0.28)"
  accent-ink: "#161210"
  prod-blue: "#2B5AAA"
  prod-blue-2: "#3d70c4"
typography:
  display:
    fontFamily: "Inter, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(48px, 8vw, 112px)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Inter, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(28px, 3.4vw, 40px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.024em"
  title:
    fontFamily: "Inter, -apple-system, system-ui, sans-serif"
    fontSize: "clamp(32px, 3.4vw, 44px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Inter, -apple-system, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Inter, -apple-system, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.005em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.12em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "22px"
  xl: "26px"
  pill: "999px"
spacing:
  gutter: "32px"
  section: "clamp(80px, 11vw, 128px)"
  head: "clamp(40px, 5vw, 64px)"
components:
  button-primary:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  button-primary-hero:
    backgroundColor: "{colors.fg}"
    textColor: "{colors.bg}"
    rounded: "10px"
    padding: "12px 18px"
  button-buy:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "12px"
    padding: "14px 22px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    padding: "12px 6px"
  eyebrow:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
    typography: "{typography.label}"
  price-card:
    backgroundColor: "{colors.bg-2}"
    textColor: "{colors.fg}"
    rounded: "{rounded.lg}"
    padding: "44px 40px"
  faq-item:
    backgroundColor: "#0a0a0a"
    textColor: "{colors.fg}"
    padding: "20px 24px"
  nav-cta-icon:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.fg-2}"
    rounded: "{rounded.sm}"
    size: "32px 32px"
---

# Design System: Odak

## 1. Overview

**Creative North Star: "The Warm Terminal."**

A senior developer's tool, photographed at 2am in a dim room. Warm charcoal shell. One single amber light source. Type that's confident enough to stop selling and just sit there. Everything answers to two questions: *does this prove the two-keystroke claim?* and *does this feel like a tool a senior macOS developer would respect?*

Odak's marketing site lives in the same visual register as the macOS app it sells. Backgrounds are tinted warm-neutral (`#0f0f0f`, not `#000`), borders are translucent white rather than opaque gray, and a single saffron accent (`oklch(76% 0.16 60)`) carries every moment of emphasis on the page. The product layer is also visible: when the in-page palette mockup demonstrates the launcher, it shifts to the real app's blue selection accent (`#2B5AAA`). The marketing system and the in-product system are siblings, not strangers.

This system explicitly rejects: the SaaS hero-metric template, identical icon-grid feature sections, gradient hue text, terminal-green-on-black cyber cosplay, purple-to-cyan gradients, and decorative glassmorphism. The one glass moment on the page (the nav at scroll-top) is functional, not decorative, and it disappears the moment the page scrolls (when the blur would compete with scroll smoothness for compositor budget).

**Key Characteristics:**
- Single saffron accent. Used on roughly 8 percent of any given screen. Its rarity is the entire point.
- Warm dark, never black. The shell is `#0f0f0f` with bg-2 and bg-3 stepped up from it; pure `#000` is forbidden.
- Translucent borders. `rgba(255,255,255,.08)` for default, `.14` for emphasis. Solid gray borders are never used.
- Tahoe-glass functional moments. Backdrop blur only at scroll-top on the nav, only to read as a translucent OS panel. Disabled below 760px and after the first scroll tick.
- Inter for everything, JetBrains Mono for labels and shortcuts. Instrument Serif appears only inside the in-page MacBook stage titlecards as an editorial accent.
- A custom motion vocabulary mirrored from `AppAnimation.swift` in the macOS app: `smooth`, `snappy`, `bouncy`. The same easings power the website that power the product.

## 2. Colors

A warm-charcoal shell with one saffron voice and one disciplined product-blue reserved for demo surfaces.

### Primary
- **Saffron Amber** (`oklch(76% 0.16 60)`, `var(--accent)`): The one voice. Used on the eyebrow dot, the section eyebrow pills, the buy-button gradient (alongside `accent-2`), the FAQ open chevron, the price-card border specular ring on hover, the price-fine link underline, and the ambient halo behind the hero stage. Never decorative.
- **Saffron Deep** (`oklch(66% 0.16 55)`, `var(--accent-2)`): The lower stop of the buy-button gradient and the hover state of `.btn-link`. Lives only as a depth-or-hover partner to the primary accent.
- **Accent Ink** (`#161210`, `var(--accent-ink)`): The text color on the saffron buy button. A warm near-black, not pure black, so the contrast against the amber reads as confident, not harsh.
- **Accent Glow** (`oklch(76% 0.18 60 / 0.28)`, `var(--accent-glow)`): Used inside box-shadow to throw a halo around saffron elements. Most visible on the price-card buy button (`0 12px 32px -8px var(--accent-glow)`) and on the hero CTA's rotating conic halo.

### Tertiary
- **Product Blue** (`#2B5AAA`, `var(--prod-blue)`): The real macOS app's "Classic" selection accent. Reserved exclusively for in-page demonstration surfaces: the selected row in the palette mockup, the caret in the search bar, the focused IDE indicator. Never used in marketing chrome. The line between marketing and product is held by color.
- **Product Blue Light** (`#3d70c4`, `var(--prod-blue-2)`): The upper stop of the selected-row gradient.

### Neutral
- **Warm Charcoal Shell** (`#0f0f0f`, `var(--bg)`): The page background. Warmer and lighter than `#000`. Pure black is banned.
- **Warm Charcoal Lift** (`#161618`, `var(--bg-2)`): One step up. Used for the palette mockup top, price-card lower gradient stop, segmented control track.
- **Warm Charcoal Crest** (`#1c1c1f`, `var(--bg-3)`): The highest tonal step. Used for emphasized surfaces.
- **Surface Frost** (`rgba(255,255,255,0.03)`, `var(--surface)`): Translucent overlay for tags, chips, kbd hints, eyebrow pills. Always layered, never solid.
- **Surface Frost 2** (`rgba(255,255,255,0.06)`, `var(--surface-2)`): Slightly emphasized variant.
- **Border Line** (`rgba(255,255,255,0.08)`, `var(--border)`): The default divider. Always translucent white, never a solid gray hex.
- **Border Emphasis** (`rgba(255,255,255,0.14)`, `var(--border-2)`): The emphasis variant for cards, tabs, kbd chips.
- **Foreground** (`#ffffff`, `var(--fg)`): Display headlines and primary text. The only place where pure white is allowed.
- **Foreground Mute** (`rgba(255,255,255,0.78)`, `var(--fg-2)`): Body copy.
- **Dim** (`rgba(255,255,255,0.55)`, `var(--dim)`): Secondary copy.
- **Mute** (`rgba(255,255,255,0.38)`, `var(--mute)`): Footnotes, kbd captions, hero-fine row.
- **Faint** (`rgba(255,255,255,0.18)`, `var(--faint)`): Separator dots, decorative hairlines.

### Named Rules

**The One Voice Rule.** Saffron appears on a maximum of ~10% of any given screen. If you're about to add a second saffron element, ask whether one of the existing ones can be desaturated to fg-2 first. Two saffron beats become noise, one stays a voice.

**The No-Pure-Black Rule.** `#000` is forbidden as a background or fill anywhere on the page. The warm charcoal trio (`#0f0f0f` / `#161618` / `#1c1c1f`) is the entire dark range. The single exception is `#0a0a0a` for FAQ item backgrounds, which is darker than `--bg` on purpose to read as "stacked blocks settled into the page".

**The Product/Marketing Color Boundary.** Saffron belongs to the marketing layer. Product blue (`#2B5AAA`) belongs to the in-product demo. Never use product blue in chrome (nav, buttons, eyebrows). Never use saffron inside the palette mockup as a selection color. The boundary is what makes the demo read as the real product, not as a styled placeholder.

## 3. Typography

**Display + Body Font:** Inter (variable woff2, self-hosted from `/assets/bundled/`).
**Label + Code Font:** JetBrains Mono (variable woff2, self-hosted).
**Editorial Accent:** Instrument Serif (only inside the MacBook stage titlecards in the carousel).

**Character:** Inter at -0.05em letter-spacing and 0.82 line-height for the hero is the entire identity. Tight, dense, confident, sans-serif. JetBrains Mono carries every label, shortcut, eyebrow, kbd hint, and footer caption — the page's grammar lives in mono caps. Together they read as "a developer's tool that knows how to typeset itself."

### Hierarchy

- **Display** (`h1.hero-h`, Inter 800, `clamp(48px, 8vw, 112px)`, line-height 0.82, letter-spacing -0.05em): Exactly one per page, on the home hero. Never used elsewhere.
- **Title** (`.f-copy h3` and feature headers, Inter 700, `clamp(32px, 3.4vw, 44px)`, line-height 1.02, letter-spacing -0.03em): Headlines inside feature blocks paired with a sticky text column.
- **Headline** (`h2.section-h`, Inter 700, `clamp(28px, 3.4vw, 40px)`, line-height 1.12, letter-spacing -0.024em, max-width 22ch): One per section.
- **Lead** (`.hero-sub`, `.price-aside p.lead`, Inter 400, 18px, line-height 1.55, max-width 60ch): The single supporting sentence below a Display or Headline.
- **Body** (Inter 400, 15px, line-height 1.55, letter-spacing -0.005em): The default paragraph. Max line length is 50–65ch; never run wider.
- **Label** (JetBrains Mono 500, 10.5–11px, letter-spacing 0.12–0.16em, uppercase): All eyebrows, kbd hints, foot-col headings, hero-fine captions, price-card tier, and trial badges. Mono caps is the page's accent-color-of-typography.

### Named Rules

**The Eyebrow Rule.** Every section eyebrow uses JetBrains Mono 10.5px at letter-spacing 0.14em, uppercase, in `var(--accent)`, wrapped in a translucent pill with a `var(--accent)` dot prefix and a hairline border in `color-mix(in oklch, var(--accent) 32%, var(--border))`. This pattern is non-negotiable: it is how the page tags a section without using a heavy banner.

**The Tight-Track Rule.** Display and headline type runs at negative letter-spacing (-0.024em to -0.05em). Body runs at -0.005em. Label runs at *positive* 0.12em to 0.16em. The contrast between tight headline and loose label is what gives the hierarchy its character. Never run a headline at 0 letter-spacing or a label at 0.

**The Gradient-Headline Exception.** There is exactly one gradient-clipped headline in the codebase: the second line of `h1.hero-h .accent` runs a vertical white→20%-white luminance fade. It is a documented one-off, justified as a "lit from above" treatment, and never to be extended. No hue gradients anywhere. No other heading uses background-clip:text.

## 4. Elevation

The page is mostly flat. Depth is conveyed in three coordinated ways: tonal layering across the warm-charcoal trio (`bg` → `bg-2` → `bg-3`), translucent borders that read as glass edges, and a small vocabulary of inset highlights (`inset 0 1px 0 color-mix(in oklch, var(--fg) 6%, transparent)`) that sit at the top edge of elevated surfaces to read like macOS Tahoe panels lit from above. Drop shadows exist but are reserved: only the price card, the palette mockup, the in-page MacBook frame, and the rotating hero-CTA halo carry real shadow depth. Everything else is flat.

### Shadow Vocabulary

- **Panel Lift** (`0 24px 48px -12px rgba(0,0,0,.35), inset 0 1px 0 color-mix(in oklch, var(--fg) 4%, transparent)`): Default price-card depth. A wide soft drop with a top-edge highlight.
- **Panel Lift Hover** (`0 40px 80px -20px rgba(0,0,0,.55), 0 12px 28px -8px rgba(0,0,0,.35), inset 0 1px 0 color-mix(in oklch, var(--fg) 7%, transparent), 0 0 0 1px color-mix(in oklch, var(--accent) 18%, transparent)`): Price-card tilt-on-hover state, with an accent ring revealing the warm voice on interaction.
- **Palette Mockup Float** (`0 0 0 1px color-mix(in oklch, var(--fg) 4%, transparent), 0 2px 4px rgba(0,0,0,.1), 0 40px 80px -20px rgba(0,0,0,.5), 0 20px 40px -10px rgba(0,0,0,.3), inset 0 1px 0 color-mix(in oklch, var(--fg) 6%, transparent)`): The signature multi-stop shadow on the demo palette. The single largest depth moment on the page.
- **Accent Halo** (`0 12px 32px -8px var(--accent-glow)`): The buy button's saffron underglow. Communicates that this CTA is the warm one.
- **Tahoe Edge** (`inset 0 1px 0 color-mix(in oklch, var(--fg) 6%, transparent)`): The signature top-edge highlight. Used standalone on the nav, on tabs, on kbd hints, and stacked into every panel shadow.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Drop shadows appear only on (a) the price card, (b) the palette mockup, (c) the in-page MacBook chrome, and (d) the rotating hero CTA halo. Anywhere else, depth is achieved through tonal layering (`bg-2` over `bg`) and a top-edge inset highlight. Never use a drop shadow to "lift a card" decoratively.

**The Functional Glass Rule.** Backdrop blur is allowed only on the nav (`backdrop-filter: blur(18px) saturate(150%)`) and only at scrollY=0. The moment the page scrolls, the nav drops to an opaque tinted bar. Below 760px viewport, the glass is disabled entirely. Glassmorphism as a decorative card style is forbidden.

## 5. Components

### Buttons

- **Shape:** 8px radius for tight nav/secondary buttons, 10–12px for hero and price-card CTAs.
- **Primary (white):** `var(--fg)` background, `var(--bg)` text, 8px radius, 8/14 padding (nav) or 12/18 padding (hero). On hover, lifts 1px and reveals a `rgba(218,84,39,0.5)` saffron underglow ring. The nav and hero use this exact CTA so the page has a consistent "white button = primary action" signal.
- **Buy (saffron gradient):** `linear-gradient(180deg, var(--accent), var(--accent-2))` background, `var(--accent-ink)` text, 12px radius, 14/22 padding. Always carries a `0 12px 32px -8px var(--accent-glow)` underglow and an `inset 0 1px 0 rgba(255,255,255,.3)` top-edge highlight. Used only on the price-card and the /buy form.
- **Link (text):** `var(--accent)` colored text, no background, animated chevron arrow that translates toward its destination (right for "Learn more", down for "See how it works"). Hover deepens to `var(--accent-2)`.
- **Icon (32px square):** `var(--surface)` background, 8px radius, used in the nav for compact secondary actions (Download, GitHub).

### Eyebrow

The page's signature small typographic moment. Inline-flex pill in `var(--surface)` with a hairline border in `color-mix(in oklch, var(--accent) 32%, var(--border))`. Contains a 5px `var(--accent)` dot with an `0 0 8px color-mix(in oklch, var(--accent) 70%, transparent)` glow, followed by JetBrains Mono 10.5px caps at 0.14em letter-spacing in `var(--accent)`. Sits 20px above every section headline.

### Chips and Tags

- **Hero Tag** (`.hero-bar .tag`): JetBrains Mono 9.5px caps in `var(--accent)`, on a 25%-accent-tinted background, with a 35%-accent border. Rounded pill.
- **Trial Badge** (`.price-card .trial-badge`): JetBrains Mono 10px caps in `var(--accent)`, on a 20%-accent background, with a 40%-accent border.
- **Lang Chip** (in the palette mockup): 28×28 grid-placed square, 7px radius, language-specific muted hue (TS blue, Swift orange, Go cyan, Python yellow, Ruby red), 18% saturated background and ~60% lightness color text.
- **Kbd Hint** (`.kbd-hint`, `kbd` everywhere): JetBrains Mono 10.5px, `var(--surface)` background, 1px `var(--border-2)` border, 4–5px radius, 3px vertical padding.

### Price Card (Signature Component)

The visual centerpiece of the conversion section. A 22px-radius warm-charcoal panel (`linear-gradient(180deg, var(--bg-2), var(--bg))`) with a saffron radial-gradient pre-paint in the top-right corner (`radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 60%)`). Inset 1px top-edge highlight plus a panel-lift drop shadow.

Distinctive behaviors: a pointer-tracked 3D tilt (rotateX/rotateY driven from `/legacy/index-runtime.js`), a cursor-following specular highlight (`radial-gradient` painted in `::after` with `mix-blend-mode: screen`), and a saffron border-ring that appears only while the card is being hovered. Disabled under `prefers-reduced-motion`. This component carries the most depth on the page.

### Inputs (Buy form)

44px tall, 8px radius, `var(--surface)` background, 1px `var(--border)` border. Focus: border shifts to `var(--accent)` with a 3px `color-mix(in oklch, var(--accent) 30%, transparent)` ring, no outline. Placeholders run at `var(--mute)`.

### Navigation

Sticky at top, max-width 1200, 14/32 padding. At scrollY=0: `backdrop-filter: blur(18px) saturate(150%)` over a 62%-bg tint plus the Tahoe top-edge highlight (`inset 0 1px 0 color-mix(in oklch, var(--fg) 6%, transparent)`). Once scrolling starts, JS toggles `.scrolled`, the blur drops, and the bar becomes an opaque 92%-bg tint. Links: JetBrains Mono not used here — they sit in Inter 500 at 13.5px in `var(--dim)`, with hover state lifting to `var(--fg)` over a `var(--surface)` background.

### FAQ Item

A Bridgemind-style flat block stacked edge-to-edge with its siblings inside a single 14px-radius container with a 1px `var(--border)` outline. Each item background is `#0a0a0a` (one step darker than `--bg` on purpose) and lifts by +2% white on `[open]`. Summary uses Inter 500 at 16px. The leading icon (`+`) sits in a 20px slot on the left, rotates 45° to `×` on `[open]` with a 380ms snappy easing, and turns `var(--accent)` when open. Answer body is indented to 60px so question and answer align on the same text axis.

### Palette Mockup (Signature Component)

The macOS-app-mimicking demo card in the hero. Max-width 560px, 26px radius, layered shadow (see Elevation), with an absolutely-positioned search bar pinned to the top edge (out-of-flow so the list below cannot nudge the search Y). Selected row uses `var(--prod-blue)` gradient with a 6/18 saffron-tinted glow, white-90% chip recoloring, and a 1.25× transform on the focused IDE icon. This component is where the marketing layer hands off to the product layer; respect the color boundary (see Rules above).

### IDE Marquee

Full-bleed translateX infinite scroll at 32s linear duration, with a `linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)` mask on both edges. Each IDE wordmark sits at 28×28 in JetBrains Mono 13px label color `var(--dim)`. Hover dims siblings to 50% and lifts the hovered item to white. Disabled animation under `prefers-reduced-motion` (falls back to wrapped centered layout).

### Footer

Max-width 1200, 4-column grid (`1.6fr 1fr 1fr 1fr`). Column headings: JetBrains Mono 10.5px caps in `var(--mute)`. Links: Inter 14px in `var(--fg-2)`, hover to `var(--accent)`. Bottom row: divider hairline, JetBrains Mono 11px, copyright in `var(--mute)`.

## 6. Do's and Don'ts

### Do:

- **Do** use `var(--accent)` (`oklch(76% 0.16 60)`) as the only voice for emphasis. One accent. ~10% of any screen. Eyebrow dot, buy button, FAQ open chevron, hover halos — that's the entire roster.
- **Do** lead every section with the eyebrow pattern: JetBrains Mono 10.5px caps + saffron dot + 0.14em letter-spacing, inside a translucent pill with an accent-tinted border.
- **Do** use the warm-charcoal trio (`#0f0f0f` / `#161618` / `#1c1c1f`) for all backgrounds. Pure `#000` is banned (single exception: `#0a0a0a` for FAQ item blocks).
- **Do** keep borders translucent (`rgba(255,255,255,.08)` or `.14`). Never a solid gray hex.
- **Do** honor `prefers-reduced-motion` on every motion you add. The codebase already does this in `Index.tsx`, the IDE marquee, the price-card tilt, the FAQ reveal, the hero-CTA halo, and the MacBook carousel pin. Match the pattern.
- **Do** pair tight negative-letter-spacing headlines (-0.024em to -0.05em) with loose positive-letter-spacing mono labels (0.12em to 0.16em). The contrast is the identity.
- **Do** use the motion vocabulary from the codebase: `--ease-smooth` (iOS ease-out) for entrances, `--ease-snappy` (mild overshoot) for selection and focus, `--ease-out` for hovers. Mirror `AppAnimation.swift` in the macOS app.
- **Do** keep saffron and product-blue separated by surface. Saffron in chrome, product-blue inside demo surfaces only.
- **Do** use line-height 1.55 for body and lead, 0.82–1.12 for display and headline. The compressed line-height on display type is signature.

### Don't:

- **Don't** use the SaaS hero-metric template (big number + small label + supporting stats). PRODUCT.md bans this; the site doesn't ship it.
- **Don't** lay out features as identical icon-grid cards (icon + heading + paragraph, repeated). Use the sticky `.f-split` two-column pattern instead, with a single live demo on one side and a sticky text column on the other.
- **Don't** use gradient text. The hero's single luminance fade (white→20% white) is a documented one-off; do not add a second instance and do not introduce hue gradients on any heading.
- **Don't** use purple-to-cyan gradients, neon-on-black, terminal-green-on-black, or any "cyber" developer-tool cosplay. The warm-amber-on-warm-dark palette is the antidote.
- **Don't** use glassmorphism decoratively. Backdrop blur is allowed only on the scroll-top nav, only at scrollY=0, and only above 760px. Anywhere else, it pays compositor cost for no functional gain.
- **Don't** use `#000`, `#fff`-on-`#000` raw, or solid gray borders. Always tint into the warm-charcoal range with translucent overlays.
- **Don't** add a drop shadow to a card to "lift it". Use tonal layering (`bg-2` over `bg`) and an inset top-edge highlight. Shadows are reserved for the price card, palette mockup, MacBook chrome, and hero-CTA halo.
- **Don't** animate layout properties. Animate `transform` and `opacity` only. The codebase already follows this; new motion must match.
- **Don't** use border-left or border-right as a colored stripe accent on cards, callouts, or alerts. (Absolute ban from the impeccable shared design laws.)
- **Don't** use em dashes in copy. PRODUCT.md bans them. Use commas, colons, semicolons, or periods.
