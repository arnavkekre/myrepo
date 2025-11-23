# backend/model_inference.py
import torch
from pathlib import Path
from transformers import AutoTokenizer, AutoModelForSequenceClassification

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "roberta-sentiment"

class SentimentAnalyzer:
    def __init__(self):
        print("\n🔍 Loading RoBERTa model from:", MODEL_PATH)

        if not MODEL_PATH.exists():
            print("❌ ERROR: Model folder not found!")
            raise FileNotFoundError(f"Model path does not exist: {MODEL_PATH}")

        self.tokenizer = AutoTokenizer.from_pretrained(
            MODEL_PATH, 
            local_files_only=True
        )

        self.model = AutoModelForSequenceClassification.from_pretrained(
            MODEL_PATH, 
            local_files_only=True
        )

        self.labels = ["negative", "neutral", "positive"]
        print("✅ Model loaded successfully!")

    def predict(self, text: str):
        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            padding=True
        )

        with torch.no_grad():
            outputs = self.model(**inputs)
            scores = torch.nn.functional.softmax(outputs.logits, dim=1)

        pred_label = self.labels[torch.argmax(scores).item()]

        return {
            "sentiment": pred_label,
            "scores": scores.tolist()
        }

"""import torch
from pathlib import Path
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Dynamically resolve absolute path to the model folder
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "roberta-sentiment"

class SentimentAnalyzer:
    def __init__(self):
        print(f"Loading RoBERTa model from: {MODEL_PATH}")
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH, local_files_only=True)
        self.model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH, local_files_only=True)
        self.labels = ["negative", "neutral", "positive"]
        print("Model loaded successfully!")


    def predict(self, text: str):
        inputs = self.tokenizer(text, return_tensors="pt", truncation=True, padding=True)
        with torch.no_grad():
            outputs = self.model(**inputs)
            scores = torch.nn.functional.softmax(outputs.logits, dim=1)
        pred_label = self.labels[torch.argmax(scores).item()]
        return {
            "sentiment": pred_label,
            "scores": scores.tolist()
        }"""

