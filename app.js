const PREDEFINED_TOPICS = [
  "Newton's Laws of Motion",
  "Photosynthesis",
  "Object-oriented Programming",
  "Blockchain Technology"
];

function createEl(tag, classNames = "", attrs = {}) {
  const el = document.createElement(tag);
  if (classNames) el.className = classNames;
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

function generateDummy(topic) {
  const lower = topic.trim().toLowerCase();
  if (!lower) return null;
  if (lower.includes("newton")) {
    return {
      summary: "Newton’s laws describe forces and motion: inertia, F=ma, and action–reaction pairs.",
      keypoints: [
        "First Law: Velocity stays constant unless a net external force acts.",
        "Second Law: F = m × a; acceleration scales with force and inversely with mass.",
        "Third Law: Every action has an equal and opposite reaction."
      ],
      quiz: [
        { q: "What does the second law relate?", options: ["Force and energy", "Force, mass, and acceleration", "Mass and velocity", "Energy and momentum"], aIndex: 1 },
        { q: "Which law explains inertia?", options: ["First", "Second", "Third", "Zeroth"], aIndex: 0 },
        { q: "Action–reaction forces act on:", options: ["The same object", "Different objects", "No objects", "Only massless objects"], aIndex: 1 }
      ]
    };
  }
  if (lower.includes("photosynthesis")) {
    return {
      summary: "Photosynthesis is the process plants use to convert sunlight into chemical energy.",
      keypoints: ["Occurs in chloroplasts of plant cells.", "Converts carbon dioxide and water into glucose and oxygen.", "Essential for plant growth and oxygen production."],
      quiz: [
        { q: "Where does photosynthesis occur?", options: ["Mitochondria", "Chloroplasts", "Nucleus", "Ribosomes"], aIndex: 1 },
        { q: "Photosynthesis produces:", options: ["Glucose and oxygen", "Carbon dioxide and water", "Nitrogen and methane", "Sugar and nitrogen"], aIndex: 0 },
        { q: "Photosynthesis requires:", options: ["Sunlight", "Moonlight", "Artificial light only", "Darkness"], aIndex: 0 }
      ]
    };
  }
  if (lower.includes("object-oriented") || lower.includes("oop")) {
    return {
      summary: "Object-oriented programming (OOP) is a paradigm based on objects containing data and logic.",
      keypoints: ["Uses classes and objects to model real-world entities.", "Supports encapsulation, inheritance, and polymorphism.", "Improves code reusability and organization."],
      quiz: [
        { q: "What is an object in OOP?", options: ["A function", "A data structure with properties and methods", "A variable", "An error"], aIndex: 1 },
        { q: "Which is NOT a main OOP concept?", options: ["Encapsulation", "Inheritance", "Polymorphism", "Recursion"], aIndex: 3 },
        { q: "Inheritance allows:", options: ["Sharing properties and methods between classes", "Running code faster", "Creating variables", "Fixing bugs automatically"], aIndex: 0 }
      ]
    };
  }
  if (lower.includes("blockchain")) {
    return {
      summary: "Blockchain is a decentralized, distributed ledger technology used to record transactions securely.",
      keypoints: ["Data is stored in blocks linked in a chain.", "It’s immutable and transparent.", "Widely used in cryptocurrencies like Bitcoin."],
      quiz: [
        { q: "Blockchain stores data in:", options: ["Files", "Blocks", "Databases", "Spreadsheets"], aIndex: 1 },
        { q: "A key property of blockchain is:", options: ["Centralized control", "Immutability", "Easy to edit", "Hidden data"], aIndex: 1 },
        { q: "Blockchain is primarily used in:", options: ["Cryptocurrencies", "Social media", "Online shopping", "Email"], aIndex: 0 }
      ]
    };
  }
  return {
    summary: `${topic}: definition, significance, and real-world applications.`,
    keypoints: ["Core definition and scope.", "Main mechanisms or components.", "Typical use cases and examples."],
    quiz: [
      { q: `Which best describes ${topic}?`, options: ["Historical figure", "Mathematical constant", "Scientific principle", "Programming language"], aIndex: 2 },
      { q: `A common use of ${topic} is:`, options: ["Art curation", "Scientific modeling", "Culinary recipes", "Astrology"], aIndex: 1 },
      { q: `${topic} concerns:`, options: ["Fiction", "Observation and theory", "Gossip", "Music"], aIndex: 1 }
    ]
  };
}

const app = createEl("div", "min-h-screen bg-gray-50 text-gray-900 p-4 max-w-3xl mx-auto space-y-6");
document.body.appendChild(app);

const nav = createEl("nav", "bg-white shadow sticky top-0");
const navInner = createEl("div", "max-w-3xl mx-auto flex items-center justify-between p-4");
const navTitle = createEl("h1", "text-xl font-semibold");
navTitle.textContent = "AI Study Buddy";
const themeBtn = createEl("button", "px-3 py-1 rounded border");
themeBtn.textContent = "Toggle theme";
navInner.append(navTitle, themeBtn);
nav.appendChild(navInner);
app.appendChild(nav);

const hero = createEl("section", "text-center space-y-2");
hero.append(
  Object.assign(createEl("h2", "text-2xl font-semibold"), { textContent: "Learn Anything in Seconds with AI" }),
  Object.assign(createEl("p", "text-gray-600"), { textContent: "Select a topic or type your own to get a summary, key points, and a quiz." })
);
app.appendChild(hero);

const formSec = createEl("section", "bg-white rounded-lg shadow p-4 space-y-3");
const selectLabel = createEl("label", "block text-sm font-medium", { for: "topicSelect" });
selectLabel.textContent = "Or select a preset topic";
const topicSelect = createEl("select", "w-full border rounded p-2 mb-2", { id: "topicSelect" });
topicSelect.appendChild(createEl("option", "", { value: "" })).textContent = "--- Choose topic ---";
PREDEFINED_TOPICS.forEach(topic => {
  const opt = createEl("option", "");
  opt.value = topic;
  opt.textContent = topic;
  topicSelect.appendChild(opt);
});
const label = createEl("label", "block text-sm font-medium", { for: "topic" });
label.textContent = "Type a topic below";
const topicInput = createEl("input", "w-full border rounded p-2", {
  id: "topic",
  type: "text",
  placeholder: "e.g., Newton’s Laws of Motion"
});
const btnWrap = createEl("div", "flex items-center gap-2");
const generateBtn = createEl("button", "bg-blue-600 text-white px-4 py-2 rounded");
generateBtn.textContent = "Generate Summary";
const statusEl = createEl("p", "text-sm text-gray-500");
btnWrap.append(generateBtn);
formSec.append(selectLabel, topicSelect, label, topicInput, btnWrap, statusEl);
app.appendChild(formSec);

topicSelect.addEventListener("change", () => {
  topicInput.value = topicSelect.value;
});

const resultsSec = createEl("section", "space-y-4 hidden");
const summaryCard = createEl("div", "bg-white rounded-lg shadow p-4");
const summaryTitle = createEl("h3", "text-lg font-semibold");
summaryTitle.textContent = "Summary";
const summaryText = createEl("p", "text-gray-700 mt-2");
summaryCard.append(summaryTitle, summaryText);
const keyPointsCard = createEl("div", "bg-white rounded-lg shadow p-4");
const keyPointsTitle = createEl("h3", "text-lg font-semibold");
keyPointsTitle.textContent = "Key Points";
const keyPointsList = createEl("ul", "list-disc pl-5 mt-2 space-y-1");
keyPointsCard.append(keyPointsTitle, keyPointsList);
const quizCard = createEl("div", "bg-white rounded-lg shadow p-4");
const quizTitle = createEl("h3", "text-lg font-semibold");
quizTitle.textContent = "Quiz";
const quizList = createEl("ol", "list-decimal pl-5 mt-2 space-y-3");
quizCard.append(quizTitle, quizList);
resultsSec.append(summaryCard, keyPointsCard, quizCard);
app.appendChild(resultsSec);

const progressSec = createEl("section", "text-sm text-gray-600");
progressSec.innerHTML = `Topics practiced today: <span id="topicCount">0</span>`;
app.appendChild(progressSec);
const topicCountEl = progressSec.querySelector("#topicCount");

themeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  document.body.classList.toggle("bg-gray-900");
  document.body.classList.toggle("text-gray-100");
});

function incrProgress() {
  const key = "studyBuddyCount";
  const today = new Date().toDateString();
  const raw = JSON.parse(localStorage.getItem(key) || "{}");
  if (raw.date !== today) {
    raw.date = today;
    raw.count = 0;
  }
  raw.count = (raw.count || 0) + 1;
  localStorage.setItem(key, JSON.stringify(raw));
  topicCountEl.textContent = raw.count;
}

(function initProgress() {
  const key = "studyBuddyCount";
  const today = new Date().toDateString();
  const raw = JSON.parse(localStorage.getItem(key) || "{}");
  topicCountEl.textContent = raw.date === today ? raw.count || 0 : 0;
})();

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function renderQuiz(quizData) {
  quizList.innerHTML = "";
  let numCorrect = 0;
  let totalSubmitted = 0;
  const submitFlags = Array(quizData.length).fill(false);

  function maybeShowScore() {
    if (totalSubmitted === quizData.length) {
      const scoreDiv = createEl("div", "quiz-score");
      scoreDiv.textContent = `Your Score: ${numCorrect} / ${quizData.length}`;
      quizList.appendChild(scoreDiv);
    }
  }

  (quizData || []).forEach((item, qIndex) => {
    const li = createEl("li", "quiz-item");
    const container = createEl("div", "space-y-2");

    const qP = createEl("p", "font-medium");
    qP.textContent = item.q;
    container.appendChild(qP);

    const optionsWrap = createEl("div");
    let selectedIndex = null;
    let locked = false;
    const optionNodes = [];

    (item.options || []).forEach((opt, i) => {
      const row = createEl("div", "mcq-row");
      const circle = createEl("div", "mcq-circle");
      const pill = createEl("div", "mcq-pill");

      circle.textContent = "";
      pill.textContent = opt;

      row.append(circle, pill);

      row.onclick = () => {
        if (locked) return;
        selectedIndex = i;
        optionNodes.forEach(n => n.row.classList.remove("selected"));
        row.classList.add("selected");
      };

      optionsWrap.appendChild(row);
      optionNodes.push({ pill, row });
    });

    container.appendChild(optionsWrap);

    const actions = createEl("div", "quiz-actions");
    const submitBtn = createEl("button", "quiz-submit");
    submitBtn.textContent = "Submit";
    const resetBtn = createEl("button", "quiz-reset");
    resetBtn.textContent = "Reset";
    const feedback = createEl("span", "quiz-feedback");

    submitBtn.onclick = () => {
      if (locked) return;
      if (selectedIndex == null) {
        feedback.textContent = "Select an option first.";
        return;
      }
      locked = true;
      optionNodes.forEach((n, i) => {
        n.row.classList.remove("selected");
        n.pill.classList.remove("selected");
        if (i === item.aIndex) n.pill.classList.add("correct");
        if (i === selectedIndex && i !== item.aIndex) n.pill.classList.add("incorrect");
      });
      const correct = selectedIndex === item.aIndex;
      feedback.textContent = correct ? "Correct ✅" : `Incorrect ❌ (Correct: ${item.options[item.aIndex]})`;
      if (!submitFlags[qIndex]) {
        if (correct) numCorrect += 1;
        totalSubmitted += 1;
        submitFlags[qIndex] = true;
      }
      submitBtn.disabled = true;
      maybeShowScore();
    };

    resetBtn.onclick = () => {
      locked = false;
      selectedIndex = null;
      optionNodes.forEach(n => {
        n.row.classList.remove("selected");
        n.pill.classList.remove("selected", "correct", "incorrect");
      });
      feedback.textContent = "";
      submitBtn.disabled = false;
      if (submitFlags[qIndex]) {
        submitFlags[qIndex] = false;
        totalSubmitted -= 1;
        if (feedback.textContent.startsWith("Correct")) numCorrect -= 1;
        if (quizList.querySelector(".quiz-score")) {
          quizList.querySelector(".quiz-score").remove();
        }
      }
    };

    actions.append(submitBtn, resetBtn, feedback);
    container.appendChild(actions);

    li.appendChild(container);
    quizList.appendChild(li);
  });
}

function renderOutput(data) {
  resultsSec.classList.remove("hidden");
  summaryText.textContent = data.summary || "";
  keyPointsList.innerHTML = "";
  (data.keypoints || []).forEach((k) => {
    const li = createEl("li");
    li.textContent = k;
    keyPointsList.appendChild(li);
  });
  renderQuiz(data.quiz);
}

generateBtn.addEventListener("click", () => {
  const topic = topicInput.value.trim();
  if (!topic) return alert("Please enter a topic.");
  statusEl.textContent = "Generating...";
  try {
    const data = generateDummy(topic);
    renderOutput(data);
    incrProgress();
    statusEl.textContent = "Done.";
  } catch (e) {
    statusEl.textContent = "Error: " + e.message;
  }
});

topicInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") generateBtn.click();
});
