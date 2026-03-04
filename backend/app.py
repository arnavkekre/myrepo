# backend/app.py
# backend/app.py

from fastapi import FastAPI
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.model_inference import SentimentAnalyzer
from pathlib import Path
import os

# ------------------------
# Paths and App Setup
# ------------------------
BASE_DIR = Path(__file__).resolve().parent.parent  # parent of backend/
PUBLIC_DIR = BASE_DIR / "public"

app = FastAPI(title="Quiz Sentiment API")

# ------------------------
# CORS (allow frontend to talk to backend)
# ------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# Serve static files
# ------------------------
app.mount("/public", StaticFiles(directory=PUBLIC_DIR, html=True), name="public")

# ------------------------
# Redirect root to landing page
# ------------------------
@app.get("/")
def root():
    return RedirectResponse(url="/public/index.html")

# ------------------------
# API Endpoints
# ------------------------
analyzer = None  # lazy-load model

class Feedback(BaseModel):
    text: str

@app.on_event("startup")
def load_model():
    global analyzer
    analyzer = SentimentAnalyzer()

@app.get("/ping")
def ping():
    return {"status": "alive"}

@app.post("/predict")
def predict(feedback: Feedback):
    result = analyzer.predict(feedback.text)
    return result

# ------------------------
# Optional: direct HTML endpoints
# ------------------------
@app.get("/breeds.html")
def breeds():
    return FileResponse(PUBLIC_DIR / "breeds.html")

@app.get("/furryfriends.html")
def furryfriends():
    return FileResponse(PUBLIC_DIR / "furryfriends.html")

@app.get("/dogcare.html")
def dogcare():
    return FileResponse(PUBLIC_DIR / "dogcare.html")

@app.get("/dogfood.html")
def dogfood():
    return FileResponse(PUBLIC_DIR / "dogfood.html")

# ------------------------
# Run server locally
# ------------------------
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))  # default for local dev
    uvicorn.run("backend.app:app", host="0.0.0.0", port=port, reload=True)
