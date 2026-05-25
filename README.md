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

Production and local development use PostgreSQL through Prisma. For Vercel, set `DATABASE_URL` to your Neon PostgreSQL connection string in the Vercel project environment variables.

Local development can use either a local PostgreSQL server or a Neon development branch:

```txt
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gartenservice_premium?schema=public"
```

For Neon, use the pooled connection string for the runtime `DATABASE_URL` in Vercel. Apply migrations with a PostgreSQL `DATABASE_URL` before deploying or through your deployment workflow:

```bash
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
```

For local schema changes against a local PostgreSQL database or Neon development branch:

```bash
npm run prisma:migrate -- --name your_migration_name
```

## Useful Commands

```bash
npm run lint
npm run build
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```
