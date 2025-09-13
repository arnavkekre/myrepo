/*const http =require ('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
const home = fs.readFileSync('index.html');
const furryfriends= fs.readFileSync('furryfriends.html');
const dogfood = fs.readFileSync('dogfood.html');
const dogcare = fs.readFileSync('dogcare.html');
const breeds = fs.readFileSync('breeds.html');
const server = http.createServer((req, res) => {
    console.log(req.url);
    url= req.url;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if (req.url === '/') {
        res.end(home);
    } else if (req.url === '/furryfriends') {
        res.end(furryfriends); 
    } else if (req.url === '/dogfood') {
        res.end(dogfood);
    } else if (req.url === '/dogcare') {
        res.end(dogcare);
    } else if (req.url === '/breeds') {
        res.end(breeds);
    } else {
        res.statusCode = 404;
        res.end('<h1>404 Not Found</h1>');
    }
})
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/
/*console.log("hey")
function search(value) {
    const input = document.getElementById("bar");

    // Replace 'x' with '*' for JS evaluation
    if (value === 'x') {
        input.value += '*';
    } 
    // Replace 'π' with Math.PI
    else if (value === 'π') {
        input.value += Math.PI;
    } 
    // Replace 'e' with Math.E
    else if (value === 'e') {
        input.value += Math.E;
    } 
    // Add math functions correctly
    else if (value === 'sin()') {
        input.value += 'Math.sin(';
    } 
    else if (value === 'cos()') {
        input.value += 'Math.cos(';
    } 
    else if (value === 'tan()') {
        input.value += 'Math.tan(';
    } 
    else if (value === 'log()') {
        input.value += 'Math.log10(';
    } 
    else if (value === 'ln()') {
        input.value += 'Math.log(';
    } 
    else if (value === '√()') {
        input.value += 'Math.sqrt(';
    } 
    else if (value === 'x!') {
        input.value += '!'; // handled separately below
    } 
    else if (value === '=') {
        try {
            let expression = input.value;

            // Handle factorial
            expression = expression.replace(/(\d+)!/g, (_, num) => {
                return factorial(parseInt(num));
            });

            const result = eval(expression);
            input.value = result;
        } catch (e) {
            input.value = "Error";
        }
    } 
    else {
        input.value += value;
    }
}
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
}

function deletelast(){
    const input = document.getElementById("bar");
    input.value = input.value.slice(0,-1);
}
function allclear(){
    document.getElementById("bar").value="";
}*/
/*
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('boxtoauth');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('Please fill in both email and password!');
      return;
    }

    try {
      await login(email, password);
      window.location.href = "/furryfriends.html";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });
});

function menu(){
    window.location.href="/furryfriends.html";
}
function leader(){
    window.location.href="/dogfood.html";
}
function dropdown(btn) {
    let drop = btn.nextElementSibling;
    if (drop && drop.classList.contains("drop")) {
        if (drop.style.display === "none" || drop.style.display === "") {
            drop.style.display = "block";
        } else {
            drop.style.display = "none";
        }
    }
}
function checksub(){
    const subbut= document.querySelector('.submit');
    const maxques= Number(localStorage.getItem("numofques"));
    if (isNaN(maxques) || maxques <= 0) {
        console.warn("Invalid max questions in localStorage:", localStorage.getItem("numofques"));
        subbut.style.display = "none";
        return;
    }
    if (i===maxques){
        subbut.style.display="block"
    }
    else{
        subbut.style.display="none"
    }
}
let i=1;
function updatenum(){
    let box= document.getElementById('num');
    box.textContent = i;
}
function increment() {
    const max= Number(localStorage.getItem("numofques"));
    if (i<max){
    i++;
    updatenum();
    checksub();
    renderQuestion(i);
}}
function decrement() {
    if(i>1){i--
    updatenum();
    checksub();
    renderQuestion(i);}
}
function dostuff(){
    const queschosen= document.querySelector('input[name="chosen"]:checked');
if (queschosen){
    localStorage.setItem("numofques", queschosen.value);
    window.location.href="/breeds.html";
}
else{
    alert("select the number of ques");
}
    
}
window.onload = function() {
let box = document.getElementById("num");
let sub= document.querySelector(".submit");
box.style.backgroundColor = "#580aa1";
box.style.color = "white";
box.style.position= "absolute";
box.style.width = "50px";
box.style.height = "50px";
box.style.top = "32px";
box.style.left = "205px";
box.style.fontSize = "50px";

const storedNum = Number(localStorage.getItem("numofques"));
    if (isNaN(storedNum)) {
        console.warn("No valid number of questions found. Defaulting to 1.");
        localStorage.setItem("numofques", "1");
    } else {
        console.log("Number of questions loaded:", storedNum);
    }
updatenum();
checksub();
fetchQuestions();
}; // use your existing config here
let questions = [];

async function fetchQuestions() {
  const { data, error } = await supabase
    .from('questions')
    .select('*');

  if (error) {
    console.error('Error fetching questions:', error.message);
    return;
  }

  questions = data;
  renderQuestion(i); // show the first question
}

function renderQuestion(index) {
  const container = document.querySelector('.quespart');
  container.innerHTML = ''; // clear previous content

  const question = questions[index - 1]; // 1-based indexing

  if (!question) {
    container.innerHTML = '<p>No question found</p>';
    return;
  }

  // Question Text
  const qText = document.createElement('div');
  qText.textContent = question.question_text; // make sure column is named like this
  qText.style.fontSize = '30px';
  qText.style.margin = '10px 0';
  container.appendChild(qText);

  // Assuming options are stored in the question row like: option1, option2, option3, option4
  for (let j = 1; j <= 4; j++) {
    const optText = question[`option${j}`];
    if (!optText) continue;

    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.marginBottom = '8px';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'chosen';
    radio.value = optText;

    label.appendChild(radio);
    label.append(` ${optText}`);
    container.appendChild(label);
  }}*/
 // Replace with your actual URL and anon key
/* import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.42.3/+esm';

const supabase = createClient(
  'https://ztnldcowmuhldurztvad.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bmxkY293bXVobGR1cnp0dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODE0OTksImV4cCI6MjA3MDA1NzQ5OX0.6U_BxibjiCK6p1xMgFyCd1nokaCUoetU_qWwEQ_YkQE'
);

let userAnswers = {};  // key = questionId, value = selected option

let questions = [];
let currentIndex = 1;
let correct = Number(localStorage.getItem("correct")) || 0;
let incorrect = Number(localStorage.getItem("incorrect")) || 0;
let unanswered = Number(localStorage.getItem("unanswered")) || 0;

const { data: { user }, error: authError } = await supabase.auth.getUser();

if (!authError && user) {
  const { error: rpcError } = await supabase.rpc('increment_profile_stats', {
    user_id_param: user.id,
    correct_add: correct,
    incorrect_add: incorrect,
    unanswered_add: unanswered,
    difficulty_param: localStorage.getItem("level")  // 'easy', 'moderate', or 'hard'
  });

  if (rpcError) {
    console.error("❌ Failed to update stats via RPC:", rpcError.message);
  } else {
    console.log("✅ Stats updated via RPC");
  }
}

window.onload = async () => {
  setupUI();
  await fetchQuestions();
  updateUI();
  if (document.getElementById("username") && document.getElementById("score")) {
    await loadProfile();
  }
};

function setupUI() {
  const box = document.getElementById('num');
  box.style.backgroundColor = "#580aa1";
  box.style.color = "white";
  box.style.position = "absolute";
  box.style.width = "100px";
  box.style.height = "50px";
  box.style.top = "32px";
  box.style.left = "220px";
  box.style.fontSize = "50px";
  box.style.textAlign = "center";
  box.style.lineHeight = "50px";
  box.style.fontWeight = "bold";

  const storedNum = Number(localStorage.getItem("numofques"));
  if (isNaN(storedNum) || storedNum <= 0) {
    localStorage.setItem("numofques", "1");
  }
}

/*async function fetchQuestions() {
  console.log("Fetching questions...");

  const { data, error } = await window.supabase.from('questions').select('*');

  if (error) {
    console.error('❌ Error fetching questions:', error.message);
    alert('Failed to load questions');
    return;
  }

  console.log("✅ Questions fetched:", data);
  questions = data;
}*/
/*async function fetchQuestions() {
  console.log("Fetching questions...");

  const selectedLevel = localStorage.getItem("level");  // 🟢 Grab from storage

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('difficulty_level', selectedLevel);  // 🟢 Filter by difficulty

  if (error) {
    console.error('❌ Error fetching questions:', error.message);
    alert('Failed to load questions');
    return;
  }

  if (!data || data.length === 0) {
    alert(`No questions found for "${selectedLevel}" level.`);
    return;
  }

  console.log(`✅ Questions fetched (${data.length}) for level: ${selectedLevel}`);
  questions = data;
}*/
/*async function fetchQuestions() {
  console.log("Fetching questions...");

  const selectedLevel = localStorage.getItem("level");
  console.log("Selected level from localStorage:", selectedLevel);

  if (!selectedLevel) {
    alert("No difficulty level selected.");
    return;
  }

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('difficulty_level', selectedLevel);

  if (error) {
    console.error('❌ Error fetching questions:', error.message);
    alert('Failed to load questions');
    return;
  }

  if (!data || data.length === 0) {
    alert(`No questions found for "${selectedLevel}" level.`);
    return;
  }

  console.log(`✅ Questions fetched (${data.length}) for level: ${selectedLevel}`);
  questions = data;
}

function updateUI() {
  document.getElementById('num').textContent = currentIndex;
  document.getElementById('question-number').textContent = currentIndex;
  checkSubmitButton();

  renderQuestion(currentIndex);
}

function renderQuestion(index) {
  const questionBox = document.querySelector('.quespart');
  const optionsBox = document.querySelector('.optionspart');

  questionBox.innerHTML = '';
  optionsBox.innerHTML = '';

  if (questions.length === 0) {
    questionBox.innerHTML = '<p>No questions available.</p>';
    return;
  }

  const question = questions[index - 1];
  if (!question) {
    questionBox.innerHTML = '<p>No question found.</p>';
    return;
  }

  // Show the question text
  const qText = document.createElement('div');
  qText.textContent = question.question_text;
  qText.style.fontSize = '30px';
  qText.style.margin = '10px 0';
  questionBox.appendChild(qText);

  // Show the options
  for (let j = 1; j <= 4; j++) {
    const optText = question[`opt${j}`];
    if (!optText) continue;

    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.marginBottom = '10px';
    label.style.fontSize = '20px';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = `chosen-${question.id}`;
    radio.value = optText;

    // ✅ Restore selected answer if available
    if (userAnswers[question.id] === optText) {
      radio.checked = true;
    }

    // ✅ Save answer when selected
    radio.addEventListener('change', () => {
      userAnswers[question.id] = radio.value;
    });

    label.appendChild(radio);
    label.append(` ${optText}`);
    optionsBox.appendChild(label);
  }
}


function dropdown(btn) {
    let drop = btn.nextElementSibling;
    if (drop && drop.classList.contains("drop")) {
        if (drop.style.display === "none" || drop.style.display === "") {
            drop.style.display = "block";
        } else {
            drop.style.display = "none";
        }
    }
}
function checkSubmitButton() {
  const subbut = document.querySelector('.submit');
  const maxques = Number(localStorage.getItem("numofques"));
  if (isNaN(maxques) || maxques <= 0) {
    console.warn("Invalid max questions in localStorage");
    subbut.style.display = "none";
    return;
  }
  if (currentIndex === maxques) {
    subbut.style.display = "block";
  } else {
    subbut.style.display = "none";
  }
}
function dostuff(){
  const selectedLevel = document.querySelector('input[name="level"]:checked').value;
    const topic= document.querySelector('input[name="topic"]:checked');
    const level= document.querySelector('input[name="level"]:checked');
    const queschosen= document.querySelector('input[name="chosen"]:checked');
    const time= document.querySelector('input[name="time"]:checked');

  if (!topic) {
    alert("Please select a topic.");
    return;
  }

  if (!level) {
    alert("Please select a level.");
    return;
  }

  if (!queschosen) {
    alert("Please select the number of questions.");
    return;
  }

  if (!time) {
    alert("Please select a time.");
    return;
  }
  localStorage.setItem("subject", topic.value);
  localStorage.setItem("level", level.value);
  
  localStorage.setItem("numofques", queschosen.value);
  localStorage.setItem("time", time.value);

  // Proceed to next page
  window.location.href = "/breeds.html";
    
}
function increment() {
  const max = Number(localStorage.getItem("numofques"));
  if (currentIndex < max && currentIndex < questions.length) {
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
console.log("localStorage before setting:", {
  score: localStorage.getItem("score"),
  correct: localStorage.getItem("correct"),
  incorrect: localStorage.getItem("incorrect"),
  unanswered: localStorage.getItem("unanswered")
});

/*async function pro() {
  const results = [];

  let score = 0;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  for (let q of questions) {
    const userAnswer = userAnswers[q.id];
    const correctAnswer = q.correct_opt;

    let status = "Not Given";
    let marks = 0;

    if (userAnswer) {
      if (userAnswer === correctAnswer) {
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

    results.push({
      questionId: q.id,
      userAnswer: userAnswer || null,
      correctAnswer: correctAnswer,
      result: status,
      marks: marks
    });
  }

  console.log("✅ Final Results:", results);
  console.log("🏆 Score:", score);
  console.log("✔️ Correct:", correct);
  console.log("❌ Incorrect:", incorrect);
  console.log("⏳ Unanswered:", unanswered);

  // Save summary in localStorage for dogcare.html
  localStorage.setItem("score", score);
  localStorage.setItem("correct", correct);
  localStorage.setItem("incorrect", incorrect);
  localStorage.setItem("unanswered", unanswered);

  // (Optional) Save answers in Supabase
  const user = await window.supabase.auth.getUser();
  const userId = user?.data?.user?.id;

  if (userId) {
    const inserts = results.map(r => ({
      user_id: userId,
      question_id: r.questionId,
      user_answer: r.userAnswer,
      correct_answer: r.correctAnswer,
      result: r.result,
      marks: r.marks
    }));

    const { error } = await supabase.from("user_answers").insert(inserts);

    if (error) {
      console.error("❌ Failed to save answers:", error.message);
    } else {
      console.log("✅ Answers saved to Supabase");
    }

    // (Optional) Update user score in profiles table
    await supabase
      .from("profiles")
      .update({ score: score })
      .eq("id", userId);
  }

  // Go to results page
  window.location.href = "/dogcare.html";
}*/
/*async function pro() {
  const results = [];

  let score = 0;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  for (let q of questions) {
  const userAnswer = userAnswers[q.id];
  const correctAnswer = q[`opt${q.correct_opt}`];
  console.log(`\n--- Q${q.id} Evaluation ---`);
  console.log(`Raw userAnswer: "${userAnswer}"`);
  console.log(`Raw correctAnswer: "${correctAnswer}"`);

  let status = "Not Given";
  let marks = 0;

  if (userAnswer) {
    const normUser = userAnswer.trim().toLowerCase();
    const normCorrect = correctAnswer.trim().toLowerCase();

    console.log(`Normalized user: "${normUser}"`);
    console.log(`Normalized correct: "${normCorrect}"`);

    if (normUser === normCorrect) {
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

  console.log(`Result: ${status} (Marks: ${marks})`);
  results.push({
    questionId: q.id,
    userAnswer: userAnswer || null,
    correctAnswer,
    result: status,
    marks
  });
}
console.table(results);

console.log(`\nFinal Score: ${score}`);
console.log(`Correct: ${correct}, Incorrect: ${incorrect}, Unanswered: ${unanswered}`);

  


 console.log(`Final totals — Score: ${score}, Correct: ${correct}, Incorrect: ${incorrect}, Unanswered: ${unanswered}`);



  // Save to localStorage
  localStorage.setItem("score", score);
  localStorage.setItem("correct", correct);
  localStorage.setItem("incorrect", incorrect);
  localStorage.setItem("unanswered", unanswered);

  console.log("localStorage saved:", {
    score,
    correct,
    incorrect,
    unanswered
  });
  // ✅ Add this just before redirect
const { data: { user }, error: authError } = await supabase.auth.getUser();

if (!authError && user) {
  const difficulty = localStorage.getItem("level"); // 'easy', 'moderate', 'hard'

  // 🟢 Call RPC to update profile stats
  const { error: rpcError } = await supabase.rpc("increment_profile_stats", {
    user_id_param: user.id,
    correct_add: correct,
    incorrect_add: incorrect,
    unanswered_add: unanswered,
    difficulty_param: difficulty
  });

  if (rpcError) {
    console.error("❌ Failed to update stats via RPC:", rpcError.message);
  } else {
    console.log("✅ Stats updated via RPC");
  }
}

  setTimeout(() => {
    window.location.href = "/dogcare.html";
  }, 100);
  const difficulty = localStorage.getItem("level"); // 'easy', 'moderate', or 'hard'

let updateFields = {};
if (difficulty === 'easy') {
  updateFields = {
    easy_correct: correct,
    easy_incorrect: incorrect
  };
} else if (difficulty === 'moderate') {
  updateFields = {
    moderate_correct: correct,
    moderate_incorrect: incorrect
  };
} else if (difficulty === 'hard') {
  updateFields = {
    hard_correct: correct,
    hard_incorrect: incorrect
  };
}

// 🔒 Prevent updating if user not logged in
if (!authError && user) {
  // 🟢 Increment fields in Supabase
  const { error: profileUpdateError } = await supabase.rpc('increment_profile_stats', {
    user_id_param: user.id,
    correct_add: correct,
    incorrect_add: incorrect,
    difficulty_param: difficulty
  });

  if (profileUpdateError) {
    console.error("❌ Failed to update profile stats:", profileUpdateError.message);
  } else {
    console.log("✅ Profile stats updated successfully");
  }
}

}

  // Save to localStorage
  localStorage.setItem("score", score);
  localStorage.setItem("correct", correct);
  localStorage.setItem("incorrect", incorrect);
  localStorage.setItem("unanswered", unanswered);

  // ✅ Only one Supabase user fetch
  if (!authError && user) {
    const difficulty = localStorage.getItem("level");

    // ✅ Save individual answer results to DB
    const inserts = results.map(r => ({
      user_id: user.id,
      question_id: r.questionId,
      user_answer: r.userAnswer,
      correct_answer: r.correctAnswer,
      result: r.result,
      marks: r.marks
    }));

    const { error: insertError } = await supabase.from("user_answers").insert(inserts);
    if (insertError) {
      console.error("❌ Failed to save answers:", insertError.message);
    }

    // ✅ Update profile stats via RPC
    const { error: statsError } = await supabase.rpc('increment_profile_stats', {
      user_id_param: user.id,
      correct_add: correct,
      incorrect_add: incorrect,
      unanswered_add: unanswered,
      difficulty_param: difficulty
    });

    if (statsError) {
      console.error("❌ Failed to update profile stats:", statsError.message);
    }
  }

  // ✅ Redirect after short delay
  setTimeout(() => {
    window.location.href = "/dogcare.html";
  }, 100);


async function loadProfile() {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("❌ User not logged in:", authError?.message);
    return;
  }

  console.log("✅ Logged in user:", user);

  const { data, error } = await supabase
    .from("profiles")
    .select("username, score")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("❌ Failed to fetch profile from Supabase:", error.message);
    return;
  }

  console.log("✅ Profile fetched:", data);

  const usernameEl = document.getElementById("username");
  const scoreEl = document.getElementById("score");

  if (usernameEl) usernameEl.textContent = data.username;
  if (scoreEl) scoreEl.textContent = data.score;
  
}
async function updateAndDisplayProfileFromQuiz() {
  const localScore = Number(localStorage.getItem("score") || 0);
  const correct = Number(localStorage.getItem("correct") || 0);
  const incorrect = Number(localStorage.getItem("incorrect") || 0);
  const unanswered = Number(localStorage.getItem("unanswered") || 0);
  const attempted = correct + incorrect;

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("Not logged in:", authError?.message);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username, score")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError.message);
      return;
    }

    let updatedScore = profile.score;

    if (localScore > 0) {
      updatedScore += localScore;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ score: updatedScore })
        .eq("id", user.id);

      if (updateError) {
        console.error("Failed to update score:", updateError.message);
        return;
      }

      // prevent duplicate adding
      localStorage.setItem("score", "0");
    }

    // update DOM
    document.getElementById("username").textContent = profile.username;
    document.getElementById("score").textContent = updatedScore;
    document.getElementById("attempted").textContent = attempted;
    document.getElementById("correctWrong").textContent = `${correct} / ${incorrect}`;
    document.getElementById("unansweredProfile").textContent = unanswered;
  } catch (e) {
    console.error("Unexpected error:", e.message);
  }
}




function leader() {
  // Your submit logic or redirect here
  window.location.href = "/dogfood.html";
}
window.addEventListener("DOMContentLoaded", () => {
  // Update overview stats
  const presentDivs = document.querySelectorAll(".present > div");
  const keys = ["score", "correct", "incorrect", "unanswered"];
  keys.forEach((key, i) => {
    const value = localStorage.getItem(key);
    presentDivs[i].textContent = value !== null ? value : "N/A";
  });

  // Then call the profile update
  updateAndDisplayProfileFromQuiz();
});
*/
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.42.3/+esm';

const supabase = createClient(
  'https://ztnldcowmuhldurztvad.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bmxkY293bXVobGR1cnp0dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODE0OTksImV4cCI6MjA3MDA1NzQ5OX0.6U_BxibjiCK6p1xMgFyCd1nokaCUoetU_qWwEQ_YkQE'
);

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

async function fetchQuestions() {
  const selectedLevel = localStorage.getItem("level");
  if (!selectedLevel) return alert("No difficulty level selected.");

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('difficulty_level', selectedLevel);

  if (error) return alert('Error loading questions');

  if (!data || data.length === 0) {
    alert(`No questions found for "${selectedLevel}" level.`);
    return;
  }

  questions = data;
}

function updateUI() {
  document.getElementById('num').textContent = currentIndex;
  document.getElementById('question-number').textContent = currentIndex;
  checkSubmitButton();
  renderQuestion(currentIndex);
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

    results.push({
      questionId: q.id,
      userAnswer: userAnswer || null,
      correctAnswer,
      result: status,
      marks
    });
  }

  localStorage.setItem("score", score);
  localStorage.setItem("correct", correct);
  localStorage.setItem("incorrect", incorrect);
  localStorage.setItem("unanswered", unanswered);

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!error && user) {
      const difficulty = localStorage.getItem("level");

      await supabase.from("user_answers").insert(results.map(r => ({
        user_id: user.id,
        question_id: r.questionId,
        user_answer: r.userAnswer,
        correct_answer: r.correctAnswer,
        result: r.result,
        marks: r.marks
      })));

      await supabase.rpc('increment_profile_stats', {
        user_id_param: user.id,
        correct_add: correct,
        incorrect_add: incorrect,
        unanswered_add: unanswered,
        difficulty_param: difficulty
      });
    }
  } catch (e) {
    console.error("Unexpected error submitting quiz:", e.message);
  }

  window.location.href = "/dogcare.html";
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


