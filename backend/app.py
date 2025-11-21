# backend/app.py

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from .model_inference import SentimentAnalyzer

app = FastAPI(title="Quiz Sentiment API")

# Allow frontend (e.g. running in browser) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


if __name__ == "__main__":
    import uvicorn
    print("Server starting... 🚀")
    print("👉 http://127.0.0.1:8000")
    print("👉 http://localhost:8000")
    uvicorn.run("backend.app:app", host="127.0.0.1", port=8000)
