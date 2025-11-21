// public/quiz.js

document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("sendFeedback");
  const feedbackInput = document.getElementById("feedbackInput");
  const sentimentResult = document.getElementById("sentimentResult");

  if (sendButton) {
    sendButton.addEventListener("click", async () => {
      const feedbackText = feedbackInput.value.trim();
      if (!feedbackText) {
        sentimentResult.textContent = "⚠️ Please enter some feedback first!";
        return;
      }

      sentimentResult.textContent = "⏳ Analyzing your feedback...";

      try {
       const response = await fetch("https://letusq.onrender.com/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: feedbackText })
});


        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const sentiment = data.sentiment;
        const confidence = Math.max(...data.scores[0]) * 100;

        let color = "white";
        if (sentiment === "positive") color = "#00ff88";
        else if (sentiment === "negative") color = "#ff4b4b";
        else color = "#ffcc00";

        sentimentResult.innerHTML = `
          🧠 Sentiment: <strong style="color:${color};">${sentiment.toUpperCase()}</strong><br>
          🔢 Confidence: ${confidence.toFixed(2)}%
        `;
      } catch (err) {
        console.error(err);
        sentimentResult.textContent = "❌ Error analyzing feedback. Make sure backend is running!";
      }
    });
  }
});
