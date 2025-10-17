const quizData = [
    {question: "He is interested ___ learning French.", options: ["in", "on", "at", "for"], answer: "in"},
    {question: "She is good ___ playing the piano.", options: ["at", "in", "on", "for"], answer: "at"},
    {question: "I will meet you ___ the park.", options: ["in", "on", "at", "to"], answer: "at"},
    {question: "He apologized ___ being late.", options: ["for", "to", "at", "on"], answer: "for"},
    {question: "This book belongs ___ me.", options: ["to", "for", "at", "in"], answer: "to"},
    {question: "They are waiting ___ the bus stop.", options: ["in", "at", "on", "for"], answer: "at"},
    {question: "She is married ___ a famous actor.", options: ["to", "with", "at", "for"], answer: "to"},
    {question: "He depends ___ his parents.", options: ["on", "at", "for", "with"], answer: "on"},
    {question: "We were surprised ___ the news.", options: ["at", "by", "on", "in"], answer: "at"},
    {question: "He is responsible ___ managing the team.", options: ["for", "to", "at", "with"], answer: "for"}
];

let currentQuestion = 0;
let score = 0;
let userName = '';
let userMobile = '';

const userForm = document.getElementById('user-form');
const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const quizEl = document.getElementById('quiz');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');
const leaderboardEl = document.getElementById('leaderboard');
const leaderboardList = document.getElementById('leaderboard-list');

// Start Quiz
startBtn.addEventListener('click', () => {
    userName = document.getElementById('name').value.trim();
    userMobile = document.getElementById('mobile').value.trim();
    if(userName === '' || userMobile === ''){
        alert('Please enter your name and mobile number.');
        return;
    }
    userForm.classList.add('hide');
    quizContainer.classList.remove('hide');
    loadQuestion();
});

// Load Question
function loadQuestion(){
    answersEl.innerHTML = '';
    nextBtn.style.display = 'none';
    const current = quizData[currentQuestion];
    questionEl.innerText = current.question;

    current.options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.classList.add('answer-btn');
        btn.addEventListener('click', () => selectAnswer(btn, option));
        answersEl.appendChild(btn);
    });
}

// Select Answer
function selectAnswer(btn, selected){
    const correct = quizData[currentQuestion].answer;
    if(selected === correct){
        btn.style.backgroundColor = '#32cd32';
        score++;
    } else {
        btn.style.backgroundColor = '#ff4c4c';
        Array.from(answersEl.children).forEach(b => {
            if(b.innerText === correct) b.style.backgroundColor = '#32cd32';
        });
    }
    Array.from(answersEl.children).forEach(b => b.disabled = true);
    nextBtn.style.display = 'inline-block';
}

// Next Question
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if(currentQuestion < quizData.length){
        loadQuestion();
    } else {
        showResult();
    }
});

// Show Result & Save in localStorage
function showResult(){
    quizEl.style.display = 'none';
    resultEl.classList.remove('hide');
    scoreEl.innerText = score;

    // Save user info + score in localStorage
    let users = JSON.parse(localStorage.getItem('quizUsers')) || [];
    users.push({name: userName, mobile: userMobile, score: score});
    // Sort descending by score
    users.sort((a,b) => b.score - a.score);
    localStorage.setItem('quizUsers', JSON.stringify(users));

    // Show leaderboard
    showLeaderboard(users);
}

// Restart Quiz
restartBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizEl.style.display = 'block';
    resultEl.classList.add('hide');
    leaderboardEl.classList.add('hide');
    loadQuestion();
});

// Display Leaderboard
function showLeaderboard(users){
    leaderboardEl.classList.remove('hide');
    leaderboardList.innerHTML = '';
    users.slice(0,5).forEach(user => { // show top 5
        const li = document.createElement('li');
        li.innerText = `${user.name} (${user.mobile}) - Score: ${user.score}`;
        leaderboardList.appendChild(li);
    });
}
