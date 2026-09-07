# VoiceHalla — the Halla website

Marketing/download site for the [Halla](https://github.com/GroupHalla) voice
communication ecosystem. Built with Next.js (App Router, static export),
Tailwind CSS and Framer Motion. Published to GitHub Pages.

## Languages

The site ships in **English by default** with a built-in **EN / PT / ES**
switcher (navbar and footer). The choice is persisted in `localStorage`
(`halla-lang`) and applied right after hydration — the static HTML is always
rendered in English for SEO and consistency.

- `src/i18n/dict-en.ts` — canonical dictionary (the `Dict` type derives from it)
- `src/i18n/dict-pt.ts`, `src/i18n/dict-es.ts` — translations, type-checked
  against the English shape
- `src/i18n/provider.tsx` — external-store provider (`useSyncExternalStore`)
- `src/components/site/language-switcher.tsx` — the EN/PT/ES control

To edit site copy: change the dictionaries, not the components.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Structure

- `src/components/site/` — landing page sections (hero, ecosystem, features,
  security, protocol, downloads, gallery, CTA, footer)
- `src/data/screenshots.ts` — auto-discovers `public/screenshots/` at build
  time (optional `meta.json` for labels/captions)
- `src/hooks/use-latest-release.ts` — latest release tags/asset lists from the
  public GitHub API (cached ~1h in `localStorage`)

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml` (GitHub Pages).
