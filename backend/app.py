# backend/app.py
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from backend.model_inference import SentimentAnalyzer
import os

app = FastAPI(title="Quiz Sentiment API")

# Allow frontend (e.g. running in browser) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve frontend under /public
app.mount("/public", StaticFiles(directory="public", html=True), name="static")

# Lazy-load model when server starts
analyzer = None

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

# -----------------------------
# Minimal addition for frontend URLs
# -----------------------------
@app.get("/")
def root():
    return FileResponse(os.path.join("public", "index.html"))

@app.get("/furryfriends.html")
def furryfriends():
    return FileResponse(os.path.join("public", "furryfriends.html"))

# -----------------------------
# End of addition
# -----------------------------

if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8000))  # default 8000 locally
    uvicorn.run("backend.app:app", host="0.0.0.0", port=port)
