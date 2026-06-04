# StoreTrace

Shopify Store Intelligence Platform — detect themes, apps, and store metadata for any Shopify store.

**Domain:** [storetrace.org](https://storetrace.org)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| Database | MySQL 8 + Drizzle ORM |
| Deployment | Vercel (frontend), VPS MySQL (Docker), Cloudflare (CDN/R2) |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start MySQL (Docker)

```bash
docker compose up -d
```

### 3. Configure environment

```bash
cp .env.example .env.local
```

Default `DATABASE_URL`:

```
mysql://storetrace:storetrace@localhost:3306/storetrace
```

### 4. Run database migrations

```bash
npm run db:push
# or apply SQL manually:
# mysql -u storetrace -p storetrace < drizzle/0000_init.sql
```

### 5. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/scan/           # Store scan API
│   ├── tools/              # Theme/App/Store analyzer tools
│   ├── stores/[domain]/    # Store analysis results
│   ├── themes/             # Theme database (Phase 4)
│   └── apps/               # App database (Phase 5)
├── components/             # UI components
└── lib/
    ├── db/                 # Drizzle schema & repositories
    └── shopify/            # Theme detection engine
```

## MVP Features (P0)

- [x] Homepage with store URL input
- [x] Theme Detector (`/tools/theme-detector`)
- [x] Theme identification engine
- [x] Store result page (`/stores/[domain]`)
- [x] MySQL schema + Drizzle ORM
- [x] Store persistence on scan
- [x] SEO: meta tags, sitemap, robots, JSON-LD

## Roadmap

| Phase | Feature |
|-------|---------|
| 1 (MVP) | Theme Detector |
| 2 | App Detector |
| 3 | Store Analyzer |
| 4 | Theme Database |
| 5 | App Database |
| 6 | Store Database |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:push` | Push schema to MySQL |
| `npm run db:studio` | Open Drizzle Studio |
