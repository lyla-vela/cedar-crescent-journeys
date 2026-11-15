# Cedar & Crescent Journeys — LAX Travel Packages

Web app for Cedar & Crescent Journeys, a Los Angeles travel agency showcasing travel packages from LAX to destinations around the world, including Turkey, Lebanon, and Dubai — with a dashboard to manage those packages and the inquiries behind them.

## Stack

- **Frontend:** React + Next.js (App Router, JavaScript)
- **Backend:** Python + FastAPI (used where a backend is needed — API routes for packages and inquiries)
- **Data:** Supabase — tables in `supabase/schema.sql`; the FastAPI backend (`backend/supabase_client.py`) reads/writes Supabase when configured and falls back to the in-memory seed lists when not. No secrets are committed; see `.env.example`.

## Features

- Browse travel packages from LAX, filterable by destination
- Package detail pages (destination, description, highlights)
- Inquiry form (name, email, destination, message) saved via the FastAPI API
- Admin dashboard: packages and inquiries, plus add-package form (via the FastAPI API)

Note: no prices, dates, airlines, or flight details are included in the seed data — those are for the agency to add per package.

## Run locally

### Backend (FastAPI)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API docs: http://localhost:8000/docs
```

### Frontend (Next.js)

```bash
cd frontend
npm install
cp .env.example .env.local   # or set NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
# http://localhost:3000
```

Set `NEXT_PUBLIC_API_URL` to the FastAPI URL. If the API is unreachable, the frontend falls back to the bundled seed data in `frontend/lib/seed.js` so pages still render.

## Wire Supabase

No Supabase project exists yet — this is code-only wiring. To go live:

1. Create a free project at supabase.com (one project per repo, or one project with both sets of tables).
2. In the Supabase dashboard, open **SQL Editor → New query**, paste `supabase/schema.sql`, and run it. This creates `packages` and `inquiries` with RLS enabled (starter-only permissive anon read/insert policies — see the comments in the SQL file) and inserts the sample seed rows.
3. Copy the project URL and keys from **Settings → API**:
   - Backend — create `backend/.env` with `SUPABASE_URL=`, `SUPABASE_ANON_KEY=`, and `SUPABASE_SERVICE_ROLE_KEY=` (server only; never expose it to the frontend).
   - Frontend — create `frontend/.env.local` with `NEXT_PUBLIC_SUPABASE_URL=` and `NEXT_PUBLIC_SUPABASE_ANON_KEY=`, plus `NEXT_PUBLIC_API_URL=http://localhost:8000`.
4. Restart the backend (`uvicorn main:app --reload --port 8000`) and frontend (`npm run dev`).
5. Verify: `curl http://localhost:8000/health` should return `"supabase_configured": true` and `"data_source": "supabase"`. Then `curl http://localhost:8000/api/packages` and `/api/inquiries` should return the Supabase rows. Without keys, `/health` reports `"supabase_configured": false` / `"data_source": "in-memory"` and the same routes return the seed lists.

## API (FastAPI)

- `GET /health`
- `GET /api/packages` — list packages
- `POST /api/packages` — add a package `{destination, country, title, description, highlights}`
- `GET /api/inquiries` — list inquiries
- `POST /api/inquiries` — submit an inquiry `{name, email, destination, message}`

## Seed data

All sample packages are clearly marked as sample data in `backend/main.py` and `frontend/lib/seed.js`. Destinations included: Turkey, Lebanon, and Dubai. No real agency name, prices, dates, or airlines are used.
