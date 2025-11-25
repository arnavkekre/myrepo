import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.42.3/+esm';

const supabase = createClient(
  'https://ztnldcowmuhldurztvad.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bmxkY293bXVobGR1cnp0dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODE0OTksImV4cCI6MjA3MDA1NzQ5OX0.6U_BxibjiCK6p1xMgFyCd1nokaCUoetU_qWwEQ_YkQE'
);
// ---------- START: App-wide Time Tracking ----------

// ---------- END: App-wide Time Tracking ----------

/**
/**
 * Update user stats per subtopic
 * @param {string} userId - UUID of the user
 * @param {string} subTopic - the subtopic of the question
 * @param {boolean} isCorrect - whether user answered correctly
 */
async function updateUserSubtopicStats(username, subTopic, isCorrect) {
  try {
    await supabase.rpc('increment_user_subtopic_stats', {
      p_username: username,
      p_sub_topic: subTopic,
      p_is_correct: isCorrect
    });
  } catch (err) {
    console.error('Error updating subtopic stats:', err.message);
  }
}
/*PS C:\Users\Arnav\quiz> python -m uvicorn backend.app:app --host 127.0.0.1 --port 8000*/ 


let userAnswers = {};  // questionId => selected option
let questions = [];
let currentIndex = 1;

// LocalStorage-based scores
let correct = Number(localStorage.getItem("correct")) || 0;
let incorrect = Number(localStorage.getItem("incorrect")) || 0;
let unanswered = Number(localStorage.getItem("unanswered")) || 0;

window.onload = async () => {
  setupUI();
  await fetchQuestions();
  updateUI();
  createQuestionNav();
  starTimer();
  if (document.getElementById("username") && document.getElementById("score")) {
    await loadProfile();
  }
};
document.getElementById("prev")?.addEventListener("click", decrement);
document.getElementById("next")?.addEventListener("click", increment);


function setupUI() {
  const box = document.getElementById('num');
  box.style.cssText = `
    background-color: #580aa1;
    color: white;
    position: absolute;
    width: 100px;
    height: 50px;
    top: 32px;
    left: 220px;
    font-size: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
  `;
  if (!localStorage.getItem("numofques") || Number(localStorage.getItem("numofques")) <= 0) {
    localStorage.setItem("numofques", "1");
  }
}
function createQuestionNav() {
  const nav = document.getElementById("question-nav");
  nav.innerHTML = ""; // clear existing

  questions.forEach((q, idx) => {
    const btn = document.createElement("button");
    btn.textContent = idx + 1;
    btn.style.width = "40px";
    btn.style.height = "40px";
    btn.style.fontSize = "18px";
    btn.style.cursor = "pointer";

    // highlight current question
    if (idx + 1 === currentIndex) {
      btn.style.backgroundColor = "#580aa1";
      btn.style.color = "white";
    }

    btn.addEventListener("click", () => {
      currentIndex = idx + 1;
      updateUI();
      createQuestionNav(); // refresh highlight
    });

    nav.appendChild(btn);
  });
}


async function fetchQuestions() {
  const selectedLevel = localStorage.getItem("level");
  const selectedTopic = localStorage.getItem("subject");

  if (!selectedLevel || !selectedTopic) {
    return alert("Please select both a topic and a difficulty level.");
  }

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('difficulty_level', selectedLevel)
    .eq('topic', selectedTopic);

  if (error) {
    console.error(error);
    alert("Error loading questions");
    return;
  }

  if (!data || data.length === 0) {
    alert(`No questions found for topic "${selectedTopic}" and level "${selectedLevel}".`);
    return;
  }

  const numQues = Number(localStorage.getItem("numofques")) || data.length;

  // Shuffle array in JS
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  questions = shuffleArray(data).slice(0, numQues);
}

function startTimer() {
  const timeChoice = localStorage.getItem("time");

  // convert label → minutes
  let minutes = 0;
  if (timeChoice === "easy") minutes = 15;
  else if (timeChoice === "moderate") minutes = 30;
  else if (timeChoice === "hard") minutes = 60;
  else minutes = 15; // fallback

  const totalMs = minutes * 60 * 1000;

  // Optional: show countdown on page
  const timerEl = document.getElementById("timer");
  let remaining = totalMs;

  const interval = setInterval(() => {
    remaining -= 1000;
    const m = Math.floor(remaining / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    if (timerEl) timerEl.textContent = `${m}:${s.toString().padStart(2, "0")}`;

    if (remaining <= 0) {
      clearInterval(interval);
      alert("Time’s up! Auto-submitting your quiz…");
      pro(); // ⏰ call your existing submit function
    }
  }, 1000);
}



function updateUI() {
  document.getElementById('num').textContent = currentIndex;
  document.getElementById('question-number').textContent = currentIndex;
  checkSubmitButton();
  renderQuestion(currentIndex);
   createQuestionNav();
}

function renderQuestion(index) {
  const q = questions[index - 1];
  const questionBox = document.querySelector('.quespart');
  const optionsBox = document.querySelector('.optionspart');

  questionBox.innerHTML = '';
  optionsBox.innerHTML = '';

  if (!q) {
    questionBox.innerHTML = '<p>No question found.</p>';
    return;
  }

  const qText = document.createElement('div');
  qText.textContent = q.question_text;
  qText.style.fontSize = '30px';
  qText.style.margin = '10px 0';
  questionBox.appendChild(qText);

  for (let j = 1; j <= 4; j++) {
    const opt = q[`opt${j}`];
    if (!opt) continue;

    const label = document.createElement('label');
    label.style.cssText = 'display:block;margin-bottom:10px;font-size:20px;';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = `chosen-${q.id}`;
    radio.value = opt;
    if (userAnswers[q.id] === opt) radio.checked = true;

    radio.addEventListener('change', () => {
      userAnswers[q.id] = radio.value;
    });

    label.appendChild(radio);
    label.append(` ${opt}`);
    optionsBox.appendChild(label);
  }
}

function dropdown(btn) {
  const drop = btn.nextElementSibling;
  if (drop && drop.classList.contains("drop")) {
    drop.style.display = (drop.style.display === "none" || !drop.style.display) ? "block" : "none";
  }
}

function checkSubmitButton() {
  const maxques = Number(localStorage.getItem("numofques"));
  document.querySelector('.submit').style.display =
    (currentIndex === maxques) ? "block" : "none";
}

function dostuff() {
  const topic = document.querySelector('input[name="topic"]:checked');
  const level = document.querySelector('input[name="level"]:checked');
  const queschosen = document.querySelector('input[name="chosen"]:checked');
  const time = document.querySelector('input[name="time"]:checked');

  if (!topic || !level || !queschosen || !time) {
    alert("Please fill in all fields.");
    return;
  }

  localStorage.setItem("subject", topic.value);
  localStorage.setItem("level", level.value);
  localStorage.setItem("numofques", queschosen.value);
  localStorage.setItem("time", time.value);

  window.location.href = "/breeds.html";
}
function increment() {
  const max = Number(localStorage.getItem("numofques") || questions.length);
  if (currentIndex < Math.min(max, questions.length)) {
    currentIndex++;
    updateUI();
  }
}

function decrement() {
  if (currentIndex > 1) {
    currentIndex--;
    updateUI();
  }
}

async function pro() {
  const results = [];
  let score = 0, correct = 0, incorrect = 0, unanswered = 0;

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("No logged-in user found.");
    return;
  }

  for (let q of questions) {
    const userAnswer = userAnswers[q.id];
    const correctAnswer = q[`opt${q.correct_opt}`];
    let status = "Not Given", marks = 0;

    if (userAnswer) {
      if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
        status = "Correct";
        marks = 4;
        score += 4;
        correct++;
      } else {
        status = "Incorrect";
        marks = -1;
        score -= 1;
        incorrect++;
      }
    } else {
      unanswered++;
    }

    // Update user_subtopic_stats for each question
    if (q.sub_topic) {
  const isCorrect = status === "Correct";
  await updateUserSubtopicStats(user.username, q.sub_topic, isCorrect);
}


    results.push({
      question_id: q.id,
      user_answer: userAnswer || null,
      correct_answer: correctAnswer,
      result: status,
      marks
    });
  }

  localStorage.setItem("score", score);
  localStorage.setItem("correct", correct);
  localStorage.setItem("incorrect", incorrect);
  localStorage.setItem("unanswered", unanswered);

  try {
    const difficulty = localStorage.getItem("level");

    // Insert into user_answers table
    await supabase.from("user_answers").insert(results.map(r => ({
      user_id: user.id,
      question_id: r.question_id,
      user_answer: r.user_answer,
      correct_answer: r.correct_answer,
      result: r.result,
      marks: r.marks
    })));

    // Call RPC to update profile stats
    await supabase.rpc('increment_profile_stats', {
      user_id_param: user.id,
      correct_add: correct,
      incorrect_add: incorrect,
      unanswered_add: unanswered,
      difficulty_param: difficulty
    });

  } catch (e) {
    console.error("Error submitting quiz:", e.message);
  }

  window.location.href = "dogcare.html";
}


async function loadProfile() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username, score")
    .eq("id", user.id)
    .single();

  if (profile && !profileError) {
    document.getElementById("username").textContent = profile.username;
    document.getElementById("score").textContent = profile.score;
  }
}

async function updateAndDisplayProfileFromQuiz() {
  const score = Number(localStorage.getItem("score") || 0);
  const correct = Number(localStorage.getItem("correct") || 0);
  const incorrect = Number(localStorage.getItem("incorrect") || 0);
  const unanswered = Number(localStorage.getItem("unanswered") || 0);
  const attempted = correct + incorrect;

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return;

    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("username, score")
      .eq("id", user.id)
      .single();

    if (profile && !fetchError) {
      let updatedScore = profile.score + score;

      if (score > 0) {
        await supabase
          .from("profiles")
          .update({ score: updatedScore })
          .eq("id", user.id);
                localStorage.setItem("score", "0");
      }

      document.getElementById("username").textContent = profile.username;
      document.getElementById("score").textContent = updatedScore;
      document.getElementById("attempted").textContent = attempted;
      document.getElementById("correctWrong").textContent = `${correct} / ${incorrect}`;
      document.getElementById("unansweredProfile").textContent = unanswered;
    }
  } catch (err) {
    console.error("Unexpected error updating profile:", err.message);
  }
}



// When results page loads
window.addEventListener("DOMContentLoaded", () => {
  const presentDivs = document.querySelectorAll(".present > div");
  const keys = ["score", "correct", "incorrect", "unanswered"];
  keys.forEach((key, i) => {
    const value = localStorage.getItem(key);
    presentDivs[i].textContent = value !== null ? value : "N/A";
  });

  updateAndDisplayProfileFromQuiz();
});
window.increment = increment;
window.decrement = decrement;
window.pro = pro;
window.leader = leader;




