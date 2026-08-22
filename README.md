# MIBORO — web

Portfolio/reference web stavební firmy MIBORO. Cíl: důvěryhodnost a ověřitelnost pro investory, tendrové komise a partnery — ne lead-gen.

## Tech stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS
- Sanity CMS (`/studio`)
- Framer Motion (jemné fade-in při scrollu)
- Vercel hosting
- `next/image`, `next-sitemap`

## Spuštění

```bash
cp .env.local.example .env.local
# doplň NEXT_PUBLIC_SANITY_PROJECT_ID
npm install
npm run dev
```

Web: [http://localhost:3000](http://localhost:3000)  
Studio: [http://localhost:3000/studio](http://localhost:3000/studio)

## Sanity setup

1. Vytvoř projekt na [sanity.io](https://www.sanity.io)
2. Zkopíruj Project ID do `.env.local`
3. Otevři `/studio` a vytvoř dokument **Firemní údaje** (singleton)
4. Přidej realizace (`project`) a služby (`service`)

## Struktura

```
src/
  app/(site)/          # veřejné stránky
  app/studio/          # Sanity Studio
  components/          # UI + layout
  lib/sanity/          # client, queries, fallback data
  sanity/schemas/      # CMS schémata
```

## Co web neobsahuje

- Poptávkový formulář
- CRM / newsletter / live chat
- Lead scoring

## Editační workflow

1. Nová zakázka → `project`, status `ongoing`
2. Dokončení → status `completed`, doplnit `outcome` a galerii
3. Roční update → `companyInfo` (obrat, počet zaměstnanců)
