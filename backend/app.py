from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model_inference import SentimentAnalyzer

app = FastAPI(title="Quiz Sentiment API")

# Allow all origins (or place only frontend origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class Feedback(BaseModel):
    text: str

# global model instance
analyzer = None

@app.on_event("startup")
def load_model():
    global analyzer
    analyzer = SentimentAnalyzer()

@app.get("/ping")
def ping():
    return {"status": "alive"}

@app.post("/predict")
def predict(feedback: Feedback):
    text = feedback.text
    result = analyzer.predict(text)
    return result
