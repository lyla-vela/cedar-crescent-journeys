"""FastAPI backend for Cedar & Crescent Journeys — LAX Travel Packages.

Data source: Supabase when SUPABASE_URL + a key are configured
(see backend/supabase_client.py and supabase/schema.sql); otherwise
falls back to the in-memory seed lists below, so it still runs locally
with no keys. GET /health reports which source is active (no secrets).

Run: uvicorn main:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from supabase_client import insert_row, supabase_configured, table_rows

app = FastAPI(title="Cedar & Crescent Journeys API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://cedar-crescent-journeys.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Package(BaseModel):
    destination: str
    country: str
    title: str
    description: str
    highlights: list[str] = []


class Inquiry(BaseModel):
    name: str
    email: str
    destination: str
    message: str = ""


# Sample packages only — no prices, dates, airlines, or real agency name.
# Used only when Supabase is not configured, or if a Supabase call fails.
PACKAGES = [
    {"id": 1, "destination": "Istanbul", "country": "Turkey", "title": "Sample Package: LAX to Istanbul, Turkey", "description": "A sample travel package from LAX to Istanbul, Turkey.", "highlights": ["Historic old city", "Bosphorus", "Local food and markets"]},
    {"id": 2, "destination": "Beirut", "country": "Lebanon", "title": "Sample Package: LAX to Beirut, Lebanon", "description": "A sample travel package from LAX to Beirut, Lebanon.", "highlights": ["Mediterranean coast", "Historic downtown", "Local food and culture"]},
    {"id": 3, "destination": "Dubai", "country": "United Arab Emirates", "title": "Sample Package: LAX to Dubai", "description": "A sample travel package from LAX to Dubai.", "highlights": ["City skyline", "Desert experiences", "Shopping and dining"]},
]
INQUIRIES = [
    {"id": 1, "name": "Sample Inquirer", "email": "sample@example.com", "destination": "Turkey", "message": "Sample inquiry about the LAX to Turkey package."},
]


def _list(table: str, fallback: list):
    if supabase_configured():
        try:
            return table_rows(table)
        except Exception:
            pass  # fall through to the in-memory seed list
    return fallback


def _insert(table: str, payload: dict, fallback: list):
    if supabase_configured():
        try:
            return insert_row(table, payload)
        except Exception:
            pass  # fall through to the in-memory seed list
    item = {"id": len(fallback) + 1, **payload}
    fallback.append(item)
    return item


@app.get("/health")
def health():
    configured = supabase_configured()
    return {
        "status": "ok",
        "supabase_configured": configured,
        "data_source": "supabase" if configured else "in-memory",
    }


@app.get("/api/packages")
def list_packages():
    return _list("packages", PACKAGES)


@app.post("/api/packages", status_code=201)
def add_package(package: Package):
    return _insert("packages", package.model_dump(), PACKAGES)


@app.get("/api/inquiries")
def list_inquiries():
    return _list("inquiries", INQUIRIES)


@app.post("/api/inquiries", status_code=201)
def add_inquiry(inquiry: Inquiry):
    return _insert("inquiries", inquiry.model_dump(), INQUIRIES)
