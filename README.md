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
BLOB_READ_WRITE_TOKEN="vercel_blob_read_write_token"
RESEND_API_KEY="re_xxxxxxxxx"
CONTACT_TO_EMAIL="hotis@outlook.de"
CONTACT_FROM_EMAIL="Gartenservice Sami & Co. <kontakt@your-domain.de>"
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

## Image Uploads

Admin uploads for hero images and project before/after images use Vercel Blob in production. Set this environment variable in Vercel:

```txt
BLOB_READ_WRITE_TOKEN="..."
```

Uploaded images are stored in Vercel Blob and only the public image URL is saved in Neon/PostgreSQL. Local development falls back to `public/uploads` when `BLOB_READ_WRITE_TOKEN` is not set.

## Email Notifications

Contact form submissions are saved to Neon/PostgreSQL first. After a successful save, the app sends an email notification through Resend. Set these variables in Vercel:

```txt
RESEND_API_KEY="..."
CONTACT_TO_EMAIL="hotis@outlook.de"
CONTACT_FROM_EMAIL="Gartenservice Sami & Co. <kontakt@your-domain.de>"
```

`CONTACT_FROM_EMAIL` must use a sender domain that is verified in Resend. If email delivery fails, the contact request still remains saved in the admin panel.

## Useful Commands

```bash
npm run lint
npm run build
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
```
