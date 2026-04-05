# bpwcislo.com

Personal portfolio site for **Brian Patrick Wcislo** — app architect and operations builder with 23+ years in digital.

**Live site**: [bpwcislo.com](https://bpwcislo.com)

## What This Is

A single-page portfolio built to sell operational leverage and custom app development. The site itself is a case study in building something fast, iterative, and intentional — every commit in this repo is part of that story.

No frameworks. No build step. Just `index.html` with inline CSS and vanilla JS.

## Stack

- **HTML / CSS / JS** — single-file architecture, no dependencies
- **Sora + Inter** — Google Fonts
- **Netlify** — hosting, forms, deploy
- **Cursor + Claude** — AI-assisted development

## Features

- Scroll-driven animations (blur-reveal headings, stat counters, staggered service cards)
- Horizontal-scroll project galleries with snap, dots, and arrows
- Multi-step lead qualification form (FlowForm) with Netlify Forms integration
- Point-based gamification system tracking engagement
- Magnetic buttons, 3D card tilt, cursor spotlight effects
- `loading="lazy"` on all below-fold assets (~280KB initial load)
- JSON-LD structured data, `robots.txt`, `sitemap.xml`, `llms.txt` for SEO and AI indexability

## Run Locally

```bash
npx live-server --port=8081
```

Then open [http://localhost:8081](http://localhost:8081).

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Main portfolio — hero, services, work, testimonials, about, contact |
| Uses | `/uses.html` | Tools, tech, and setup behind the work |

## Project Structure

```
├── index.html            # Everything — HTML, CSS, JS
├── uses.html             # /uses page
├── robots.txt            # Crawler permissions (search + AI)
├── sitemap.xml           # Sitemap
├── llms.txt              # Plain-text summary for AI models
├── og-share.jpg          # 1200×630 social share image
├── favicon.svg / .ico    # Favicons
├── apple-touch-icon.png  # iOS icon
└── *.png / *.jpg         # Portfolio images
```

## License

All content, design, and code © 2026 Brian Patrick Wcislo. This repo is public for transparency — not for reuse.
