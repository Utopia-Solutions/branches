This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```
branches
├─ .eslintrc.json
├─ .vscode
│  └─ extensions.json
├─ README.md
├─ actions
│  ├─ auth.ts
│  ├─ email.ts
│  └─ magic-link.ts
├─ app
│  ├─ absences
│  │  └─ page.tsx
│  ├─ api
│  │  └─ auth
│  │     ├─ magic-link
│  │     │  └─ route.ts
│  │     ├─ sign-out
│  │     │  └─ route.ts
│  │     └─ sync-data
│  │        └─ route.ts
│  ├─ classes
│  │  └─ page.tsx
│  ├─ event-tracker
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ itinerary
│  │  ├─ _components
│  │  │  ├─ date-carousel.tsx
│  │  │  ├─ itinerary-card-list.tsx
│  │  │  └─ user-select.tsx
│  │  └─ page.tsx
│  ├─ layout.tsx
│  ├─ middleware.ts
│  ├─ page.tsx
│  ├─ semesters
│  │  └─ page.tsx
│  └─ sign-in
│     ├─ _components
│     │  └─ sign-in-form-card.tsx
│     └─ page.tsx
├─ components
│  ├─ header
│  │  ├─ index.tsx
│  │  └─ nav-menu.tsx
│  ├─ sign-out-button.tsx
│  └─ ui
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ carousel.tsx
│     ├─ dropdown-menu.tsx
│     ├─ form.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ select.tsx
│     ├─ sonner.tsx
│     └─ table.tsx
├─ components.json
├─ cron
│  ├─ fetch-data-from-ftp.ts
│  ├─ process-data.ts
│  └─ update-database.ts
├─ docs
│  └─ CRON_CONFIG.md
├─ drizzle
│  ├─ 0000_tense_justice.sql
│  ├─ 0001_unusual_doctor_faustus.sql
│  ├─ envConfig.ts
│  └─ meta
│     ├─ 0000_snapshot.json
│     ├─ 0001_snapshot.json
│     └─ _journal.json
├─ drizzle.config.ts
├─ lib
│  ├─ auth
│  │  ├─ adapter.ts
│  │  └─ index.ts
│  ├─ db
│  │  ├─ index.ts
│  │  ├─ queries
│  │  │  └─ family.ts
│  │  └─ schema.ts
│  └─ utils.ts
├─ next.config.mjs
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  └─ logo.png
├─ tailwind.config.ts
├─ tsconfig.json
└─ types
   └─ index.ts

```
