let playerName = "";
let selectedAge = "";
let selectedCategory = "";
let selectedDifficulty = "";
let correctAnswer = 0;
let score = 0;
let highScore = 0;
let correctCount = 0;
let incorrectCount = 0;
let timeLeft = 30;
let timer;

function showAgeSelection() {
    playerName = document.getElementById("player-name").value;
    if (playerName.trim() === "") {
        alert("Please enter your name!");
        return;
    }
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("age-screen").classList.remove("hidden");
}

function selectAge(age) {
    selectedAge = age;
    document.getElementById("age-screen").classList.add("hidden");
    document.getElementById("category-screen").classList.remove("hidden");
}

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById("category-screen").classList.add("hidden");
    document.getElementById("difficulty-screen").classList.remove("hidden");
}

function selectDifficulty(difficulty) {
    selectedDifficulty = difficulty;
    document.getElementById("difficulty-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    startTimer();
    generateQuestion();
}

function startTimer() {
    timeLeft = 30;
    timer = setInterval(() => {
        document.getElementById("timer").innerText = "Time: " + timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            endGame();
        }
        timeLeft--;
    }, 1000);
}

function generateQuestion() {
    let num1 = Math.floor(Math.random() * 5) + 1;
    let num2 = Math.floor(Math.random() * 5) + 1;

    if (selectedDifficulty === "Medium") {
        num1 += 5;
        num2 += 5;
    } else if (selectedDifficulty === "Hard") {
        num1 += 10;
        num2 += 10;
    }

    let questionText = "";

    if (selectedCategory === "Addition") {
        correctAnswer = num1 + num2;
        questionText = `${num1} + ${num2}`;
    } 
    else if (selectedCategory === "Subtraction") {
        if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure num1 is larger
        correctAnswer = num1 - num2;
        questionText = `${num1} - ${num2}`;
    } 
    else if (selectedCategory === "Multiplication") {
        correctAnswer = num1 * num2;
        questionText = `${num1} × ${num2}`;
    } 
    else if (selectedCategory === "Division") {
        num1 = num1 * num2; // Ensure division results in a whole number
        correctAnswer = num1 / num2;
        questionText = `${num1} ÷ ${num2}`;
    }

    document.getElementById("question").innerText = questionText;

    let options = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2];
    options.sort(() => Math.random() - 0.5);

    document.getElementById("options").innerHTML = "";
    options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        document.getElementById("options").appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === correctAnswer) {
        score += 10;
        correctCount++;
    } else {
        incorrectCount++;
    }
    generateQuestion();
}

function endGame() {
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("final-screen").classList.remove("hidden");
    
    document.getElementById("final-score").innerText = `Final Score: ${score}`;
    document.getElementById("correct-incorrect").innerText = `Correct: ${correctCount}, Incorrect: ${incorrectCount}`;
    
    if (score > highScore) {
        highScore = score;
    }
    document.getElementById("high-score").innerText = `High Score: ${highScore}`;

    // Reward system based on score
    let rewardText = "";
    if (score >= 80) {
        rewardText = "🏅 Gold Medal! 🥇";
    } else if (score >= 50) {
        rewardText = "🏅 Silver Medal! 🥈";
    } else if (score >= 30) {
        rewardText = "🏅 Bronze Medal! 🥉";
    } else {
        rewardText = "No Medal 😢 Keep practicing!";
    }

    document.getElementById("reward").innerText = rewardText;
}

function restartGame() {
    score = 0;
    correctCount = 0;
    incorrectCount = 0;
    document.getElementById("final-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
}
