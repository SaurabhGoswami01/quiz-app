
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: 1
    },
    {
        question: "Which language makes web pages interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: 2
    },
    {
        question: "Which tag is used for the largest heading in HTML?",
        options: ["<h6>", "<head>", "<h1>", "<heading>"],
        answer: 2
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [".", "#", "*", "&"],
        answer: 1
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        options: ["int", "var", "define", "string"],
        answer: 1
    },
    {
        question: "Which HTML tag is used to insert an image?",
        options: ["<image>", "<img>", "<pic>", "<src>"],
        answer: 1
    },
    {
        question: "Which method selects an element by ID?",
        options: [
            "getElementById()",
            "getClass()",
            "queryById()",
            "selectId()"
        ],
        answer: 0
    },
    {
        question: "Which property changes text color in CSS?",
        options: ["background", "font-size", "color", "text-style"],
        answer: 2
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    }
];

console.log(questions);
console.log("Total Questions:", questions.length);




let currentQuestion = 0;
let score = 0;
let answered = false;
let userAnswers = [];

// HTML elements select karna
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const progress = document.getElementById("progress");

// Question display karna
function showQuestion() {

    answered = false;

    let q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    optionsElement.innerHTML = "";
    feedback.textContent = "";

    q.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        optionsElement.appendChild(button);
    });
}

// Answer check karna
function checkAnswer(selected, button) {

    if (answered) return;

    answered = true;

    userAnswers[currentQuestion] = selected;

    const correct = questions[currentQuestion].answer;

    if (selected === correct) {

        score++;
        button.classList.add("correct");
        feedback.textContent = "Correct Answer! 🎉";
        feedback.style.color = "green";

    } else {

        button.classList.add("wrong");
        feedback.textContent = "Wrong Answer!";
        feedback.style.color = "red";
    }

    // Correct answer highlight karna
    const allButtons = optionsElement.querySelectorAll("button");

    allButtons[correct].classList.add("correct");

    // Score update karna
    scoreElement.textContent = `Score: ${score}`;
}

// Next question
nextButton.addEventListener("click", () => {

    if (!answered) {
        feedback.textContent = "Please select an answer first!";
        feedback.style.color = "orange";
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
});

// Result show karna


function showResult() {

    questionElement.classList.add("hidden");
    optionsElement.classList.add("hidden");
    nextButton.classList.add("hidden");
    feedback.classList.add("hidden");

    document.getElementById("result").classList.remove("hidden");

    let percentage = (score / questions.length) * 100;

    document.getElementById("final-score").textContent =
        `Your Score: ${score}/10 (${percentage}%)`;

    const review = document.getElementById("review");

    review.innerHTML = "<h3>Answer Review</h3>";

    questions.forEach((q, index) => {

        const item = document.createElement("div");

        item.innerHTML = `
            <p><strong>Q${index + 1}. ${q.question}</strong></p>
            <p>Your Answer: ${q.options[userAnswers[index]]}</p>
            <p>Correct Answer: ${q.options[q.answer]}</p>
            <hr>
        `;

        review.appendChild(item);
    });
}


// Quiz start karna
showQuestion();




// Restart quiz
document.getElementById("restart-btn").addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    answered = false;

    // Quiz elements wapas show karna
    questionElement.classList.remove("hidden");
    optionsElement.classList.remove("hidden");
    nextButton.classList.remove("hidden");
    feedback.classList.remove("hidden");

    // Result hide karna
    document.getElementById("result").classList.add("hidden");

    // Quiz dobara start karna
    showQuestion();
});

    // Dark and Light Mode

const themeButton = document.getElementById("theme-toggle");

// Previously saved theme check karna
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "☀️ Light Mode";
}

// Theme change karna
themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");
        themeButton.textContent = "☀️ Light Mode";

    } else {

        localStorage.setItem("theme", "light");
        themeButton.textContent = "🌙 Dark Mode";

    }
});



