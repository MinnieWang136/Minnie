# Qimiao Wang — Portfolio

Complete bilingual static portfolio with two clickable project case studies:

- `zen.html` — ZEN, bilingual wiki-style editorial book (five original images).
- `nyu.html` — NYU Shanghai Orientation Week 2026 (five original images).

## Open in VS Code

Open this folder in VS Code, then open `index.html` with Live Server. Or open `index.html` directly in a browser.

The `images/` directory is required and included; do not move or rename its files. `styles.css` and `script.js` are shared by all pages. No build step or dependencies.

## Notes

The remaining homepage concept cards are placeholders. Replace them with actual work before publishing. Confirm project dates, captions, and scope before public launch.


## SUZHOU — editorial case study
The SUZHOU card opens `suzhou.html`, styled separately with `suzhou.css`. Eight original book mockup photos are provided as `images/suzhou-01.webp` through `suzhou-08.webp`. The page shares the same bilingual switch as the rest of the site.


## Biostate.AI
`biostate.html` / `biostate.css` contain the case study. All 14 supplied pitch-deck images are in the `images` directory as optimized WebP files. Confirm image and proprietary content publication permissions before deploying.


## Personal dog identity
- `images/dog-symbol.png` — original monochrome dog face with transparent background, used in navigation and hero
- `images/dog-art-00.webp` through `dog-art-10.webp` — transparent original hand-painted artwork
- `dog-identity.css` — shared branding and image layout styles
- `dogs.html` — personal illustration project gallery
- Biostate thumbnail, NYU, ZEN, SUZHOU, and existing interactions retained.


## Hero collage & project stickers (new)

- Homepage hero now uses original `images/dog-art-00.webp` as the full combined artwork, positioned beside the hero heading on desktop and below it on mobile.
- Six cut-out heads are applied as decorative stickers at project card corners. They never intercept clicks.
- Edit placement, size, or rotation in the last section of `dog-identity.css` (`ORIGINAL ART EDITION`).
- No changes to ZEN, NYU, SUZHOU, Biostate detail page layouts.


## Background dog decorations (update)
Small hand-painted heads now decorate the **background of Selected Work** only, at reduced opacity. They do not overlap project cards, images or text. The large group illustration in the hero is unchanged. Edit the final block in `dog-identity.css` to adjust opacity/positions.


### Selected Work gradient update
The work section now transitions from coral-pink through peach and cool aqua into lavender to visually bridge the hero and About sections. Original dog heads remain as very faint background decoration and never overlap project content.


## Sticker update

Removed the black outline dog from the homepage headline. Colorful dogheads are now separate foreground decorations along the side margins of the Selected Work gradient, underneath all project content and outside card/image regions. The navigation logo and large hero dog collage are preserved.


Selected Work cleanup: Removed all floating and background doghead decorations while preserving the gradient, hero collage, navigation symbol, and Dogheads project card.


### Selected Work background cleanup (v2)
- Removed all dog background-image declarations and project sticker rules from dog-identity.css (not just hidden).
- Selected Work now uses only the pink-to-violet CSS gradient.
- Added cache-busting version tags to the homepage stylesheet links.
- The main colorful dog collage in Hero, navigation icon, and Dogheads project card remain intentionally.


## Clean Gradient V3
This version has no dog decoration elements or dog image backgrounds inside Selected Work. The Dogheads portfolio project CARD remains because it is one of the actual projects; it is not a background sticker. Open this newly extracted directory, not an older Live Server tab. You can confirm the browser tab title contains Clean Gradient V3.


V5: About section large dog illustration preserved. No free-floating dog graphics in Selected Work; Hero collage and Dogheads portfolio project preserved.


## Manifesto Poster

Added manifesto.html and four original images (two print compositions and two environmental mockups), with a bilingual project page. The homepage project card replaces the old digital placeholder.


## UNDERFLOW — Book & Motion Poster

New clickable editorial/visual project card in `index.html` opens `underflow.html`. Original uploaded book mockups are optimized in `images/underflow-*.webp`. The original 30.8-second vertical motion poster is included as `underflow-motion.mp4` and plays with native browser controls, muted autoplay and loop. Keep the MP4 next to `underflow.html` when moving the site.
