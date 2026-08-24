# Contrast audit — HeartSnap marketing page

Every text-colour-on-background-colour pair the page actually renders, in both themes.
Ratios are WCAG 2.1 relative-luminance contrast. Target: **4.5:1** for body text, 3:1 for large text.
Every pair below is held to the 4.5:1 bar regardless of type size, so large text passes with margin.

Alpha layers — the translucent sticky header and the hero bloom gradient — are **composited against
the surface behind them** and audited at their worst case: the header over both the page and the warm
section background, and the bloom at full overlap of both of its radial layers.

| Theme | Text token | Hex | Background | Hex | Ratio | AA 4.5:1 |
|---|---|---|---|---|---|---|
| light | `--ink` | `#16212A` | page background | `#FFFBF7` | 15.87 | PASS |
| light | `--muted` | `#525E6A` | page background | `#FFFBF7` | 6.44 | PASS |
| light | `--coral-text` | `#B02E20` | page background | `#FFFBF7` | 6.26 | PASS |
| light | `--ink` | `#16212A` | warm section | `#FBEDE6` | 14.29 | PASS |
| light | `--muted` | `#525E6A` | warm section | `#FBEDE6` | 5.79 | PASS |
| light | `--coral-text` | `#B02E20` | warm section | `#FBEDE6` | 5.64 | PASS |
| light | `--ink` | `#16212A` | card surface | `#FFFFFF` | 16.34 | PASS |
| light | `--muted` | `#525E6A` | card surface | `#FFFFFF` | 6.63 | PASS |
| light | `--coral-text` | `#B02E20` | card surface | `#FFFFFF` | 6.45 | PASS |
| light | `--ink` | `#16212A` | hero bloom, worst-case full overlap | `#FFD8CF` | 12.43 | PASS |
| light | `--muted` | `#525E6A` | hero bloom, worst-case full overlap | `#FFD8CF` | 5.04 | PASS |
| light | `--coral-text` | `#B02E20` | hero bloom, worst-case full overlap | `#FFD8CF` | 4.90 | PASS |
| light | `--ink` | `#16212A` | sticky header over page background | `#FFFBF7` | 15.87 | PASS |
| light | `--muted` | `#525E6A` | sticky header over page background | `#FFFBF7` | 6.44 | PASS |
| light | `--coral-text` | `#B02E20` | sticky header over page background | `#FFFBF7` | 6.26 | PASS |
| light | `--ink` | `#16212A` | sticky header over warm section | `#FEF8F4` | 15.52 | PASS |
| light | `--muted` | `#525E6A` | sticky header over warm section | `#FEF8F4` | 6.30 | PASS |
| light | `--coral-text` | `#B02E20` | sticky header over warm section | `#FEF8F4` | 6.12 | PASS |
| light | button label `--on-coral` | `#FFFFFF` | coral button fill `--coral-btn` | `#C93A2C` | 5.09 | PASS |
| dark | `--ink` | `#F3EEE9` | page background | `#101418` | 16.05 | PASS |
| dark | `--muted` | `#A3AEB8` | page background | `#101418` | 8.20 | PASS |
| dark | `--coral-text` | `#FF8E7F` | page background | `#101418` | 8.30 | PASS |
| dark | `--ink` | `#F3EEE9` | warm section | `#1E1917` | 15.10 | PASS |
| dark | `--muted` | `#A3AEB8` | warm section | `#1E1917` | 7.71 | PASS |
| dark | `--coral-text` | `#FF8E7F` | warm section | `#1E1917` | 7.81 | PASS |
| dark | `--ink` | `#F3EEE9` | card surface | `#191F25` | 14.41 | PASS |
| dark | `--muted` | `#A3AEB8` | card surface | `#191F25` | 7.36 | PASS |
| dark | `--coral-text` | `#FF8E7F` | card surface | `#191F25` | 7.46 | PASS |
| dark | `--ink` | `#F3EEE9` | hero bloom, worst-case full overlap | `#532F2D` | 10.05 | PASS |
| dark | `--muted` | `#A3AEB8` | hero bloom, worst-case full overlap | `#532F2D` | 5.13 | PASS |
| dark | `--coral-text` | `#FF8E7F` | hero bloom, worst-case full overlap | `#532F2D` | 5.20 | PASS |
| dark | `--ink` | `#F3EEE9` | sticky header over page background | `#101418` | 16.05 | PASS |
| dark | `--muted` | `#A3AEB8` | sticky header over page background | `#101418` | 8.20 | PASS |
| dark | `--coral-text` | `#FF8E7F` | sticky header over page background | `#101418` | 8.30 | PASS |
| dark | `--ink` | `#F3EEE9` | sticky header over warm section | `#131518` | 15.87 | PASS |
| dark | `--muted` | `#A3AEB8` | sticky header over warm section | `#131518` | 8.10 | PASS |
| dark | `--coral-text` | `#FF8E7F` | sticky header over warm section | `#131518` | 8.21 | PASS |
| dark | button label `--on-coral` | `#241110` | coral button fill `--coral-btn` | `#FF6B5E` | 6.47 | PASS |

**Result: 38 of 38 pairs pass. Failures: 0.**

## Where each text token is used

- `--ink` — `h1`, `h2`, `h3`, step text, plan feature items, wordmark, Insights terms
- `--muted` — hero lede, fineprint, section paragraphs, figcaption, the 0s/15s axis labels, nav links, plan per/alt/foot lines, footer text
- `--coral-text` — eyebrows, step numerals, focus ring, the pulse trace in the fifteen-second graphic

## Fixes made during the audit

The first pass failed on exactly the trap this check exists to catch. `--muted` and `--coral-text`
were sized against the plain and warm backgrounds (5.62 and 5.28, both comfortable) and then also
rendered over the light hero bloom, where they dropped to **3.90** and **3.66**. Three changes fixed it:

1. Light bloom alphas reduced from `0.30 / 0.16` to `0.20 / 0.10`, moving the worst-case blend from `#FFC7BC` to `#FFD8CF`.
2. `--muted` darkened `#5A6774` → `#525E6A`.
3. `--coral-text` darkened `#C0392B` → `#B02E20`. The focus ring uses the same token, so it gained contrast too.

The dark theme passed unchanged; its bloom is already much weaker relative to its background.

## Non-text elements

- **Focus ring** `#B02E20` (light) / `#FF8E7F` (dark) measures 4.90–8.30 against every background it
  can appear on, above the 3:1 bar for non-text UI indicators.
- **Hairlines, card borders, the bloom and the pulse trace** are decorative and carry no information
  that is not also in text, so the 3:1 UI-component bar does not apply to them.
- **No body text is laid over the pulse trace.** Above 900px the trace is masked clear of the copy
  column (the mask is fully transparent until 42% of the trace's width). Below 900px the trace sits
  entirely inside the device area — measured at a 390px viewport, the trace occupies y 857–930 while
  the last hero text ends at y 568.
