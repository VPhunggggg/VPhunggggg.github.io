# Portfolio design system

This documents the existing owner-selected design; it does not introduce a new visual direction.

## Identity and assets

- Warm ivory pages, forest-green content and lime emphasis.
- Space Grotesk for display, DM Sans for body, DM Mono for project metadata.
- The owner's portrait stays in the hero and precedes its copy on phones.
- Five LinkedIn Featured covers remain unchanged, fully visible at 2:1.
- Personal facts, project credits and source links stay in `dist/index.html` and `dist/script.js`.

## Shared colors

The `:root` block in `dist/styles.css` owns semantic colors.

| Role | Tokens |
|---|---|
| Reading surfaces | `paper`, `paper2`, `panel`, `strip` |
| Main and secondary text | `ink`, `muted` |
| Brand and focus | `lime`, `accent`, `focus` |
| Featured/contact surfaces | `feature-bg`, `feature-ink`, `feature-line`, `feature-soft` |
| Dark sections | `deep`, `dark-panel`, `dark-hover`, `dark-line`, `on-dark`, `on-dark-muted` |
| Borders and supporting surfaces | `line`, `tag-bg`, `cover-bg`, `header-bg` |

Small text must retain at least 4.5:1 contrast, including hover states. Secondary text uses the appropriate surface's text token. A few one-off decorative alpha colors stay local.

## Components and interaction

- Links and custom controls used on touch screens have a minimum 44 px hit area.
- Opening the phone navigation focuses its first link; Escape returns focus to the toggle.
- Project dialogs use a header grid with a separate 44 px close-button column. Long labels wrap within their own column.
- Native dialog focus containment, Escape handling and focus return remain intact.
- Project filters preserve source numbering, announce counts and adapt the grid to one or two results.
- Scroll progress animates `scaleX`; process-row hover changes its background without shifting layout.
- Reduced motion keeps the same visible states with immediate feedback.

## Project showcase

- The work section uses a 1280 px maximum outer width and a 20 px grid gap. Compact card padding follows a 4 px scale; project text stays at 14 px and interactive hit areas stay at 44 px.
- ThinkMed pairs its full, uncropped cover with its summary in a horizontal desktop row. On phones, or when the language filter shows two projects, it becomes a cover-first vertical card. All five covers preserve their original 2:1 composition with `object-fit: contain`.
- Other cover panels are capped at 200 px high. Card summaries preview up to three lines; the existing details dialog retains the full explanation.
- One 650 ms left-to-right cover reveal introduces ThinkMed when it enters view. Filtering uses a 300 ms result transition with at most 140 ms of stagger; repeated filtering cancels earlier result animations. Project dialogs enter in 240 ms. Pointer hover adds a small lift, while keyboard focus retains a visible border and focus ring.
- Content is visible without animation or JavaScript. Reduced motion skips all scripted movement, and enabling it cancels active project animations. No motion dependency is required.

## Whole-page motion

- The hero's lime mark draws on while the portrait settles into its original angle. This is the focal entrance; a status pulse ends after two cycles (4.4 seconds).
- Supporting sections use distinct cues: a divider traces across the summary strip; toolkit cards settle in with 45 ms spacing; process separators trace in reading order; the education card settles; contact typography and its arrow arrive together. Each entrance runs once when visible.
- The existing animation observer also owns section entrances; visited targets are unobserved. Navigation tracks the section in view via the existing scroll frame, with an animated underline and a restrained header shadow.
- Links, buttons, cards, icons and mobile navigation share the same exponential easing. Touch screens do not depend on hover. No cursor effects, scroll interception, extra animation package, or permanent decorative loop is required.
- Reduced-motion changes cancel project and whole-page scripted animations. CSS supplies an immediate, readable state with movement suppressed. Page content is visible if scripts or observers are unavailable.

## Responsive rules

Desktop, tablet and phone retain the supplied layout. Content-driven breakpoints at 1200, 920, 680, 390 and 350 px preserve the portrait, navigation and typography. Mobile footer links wrap into a full-width row to keep touch targets usable.
