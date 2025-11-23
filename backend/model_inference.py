import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# ✔ Load model directly from HuggingFace (no LFS required)
MODEL_NAME = "distilbert-base-uncased-finetuned-sst-2-english"
# If you have your own uploaded model, replace with:
# MODEL_NAME = "your-username/your-model"

class SentimentAnalyzer:
    def __init__(self):
        print(f"\n🔍 Loading model from HuggingFace: {MODEL_NAME}\n")

        # 👇 THESE THREE LINES GO RIGHT HERE
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        self.model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

        # This model has 2 labels, so we define them
        self.labels = ["negative", "positive"]

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

        # Pick the label with the highest probability
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

