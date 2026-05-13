# Saripati ASIA

Marketing site for Saripati ASIA: product categories, product detail pages, contact, and localized content.

## Stack

- [Next.js](https://nextjs.org/) 15 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [next-intl](https://next-intl.dev/) for English and Indonesian

## Prerequisites

- Node.js 18+ (20+ recommended)

## Setup

```bash
npm install
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build` | Production build        |
| `npm run start` | Run production server   |
| `npm run lint`  | ESLint                   |

Dev server: [http://localhost:3000](http://localhost:3000).

## Internationalization

Locales are defined in `src/i18n/routing.ts` (`en`, `id`). The default locale is English; URLs use the `/id` prefix only when needed (`localePrefix: "as-needed"`).

Copy and strings live under `messages/en.json` and `messages/id.json`.

## Environment

Optional:

| Variable                 | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`   | Canonical site URL for metadata and JSON-LD (defaults to `http://localhost:3000` in code when unset) |

## Project layout

- `src/app/` — App Router routes (`[locale]`, category and product segments)
- `src/components/` — UI components
- `src/data/` — Product and category data
- `src/i18n/` — Routing, request config, navigation helpers
- `messages/` — Translation JSON
- `public/` — Static assets (e.g. `public/logo/`)

## License

Private; not published as open source unless you add a license file.
