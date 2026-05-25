# Gartenservice Premium

Premium Next.js App Router website with an admin panel for a German garden service business.

## Local Development

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin login defaults are configured in `.env`:

```txt
ADMIN_EMAIL="admin@gartenservice.de"
ADMIN_PASSWORD="change-me-now"
```

## Database

Local development uses SQLite:

```txt
DATABASE_URL="file:./dev.db"
```

The Prisma models are intentionally provider-portable. For a later Vercel production switch to PostgreSQL/Neon, change the datasource provider in `prisma/schema.prisma` back to `postgresql`, set `DATABASE_URL` to the Neon connection string in Vercel, and create a production PostgreSQL migration from the same models.

## Useful Commands

```bash
npm run lint
npm run build
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```
