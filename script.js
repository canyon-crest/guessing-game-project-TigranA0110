// add javascript here
let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

// --- Added global tracking ---
let totalGameTime = 0;
let totalGamesPlayed = 0;
let fastestTime = null;
let roundStartTime = null;
let userName = "";
const userNameInput = document.getElementById("name");
const nameBtn = document.getElementById("nameBtn");
const giveUpBtn = document.getElementById("giveUpBtn");
const savedTheme = localStorage.getItem("guessTheme");


nameBtn.addEventListener("click", setUserName);
giveUpBtn.addEventListener("click", giveUp);

// ------------------------------

function time() {
    let d = new Date();
    let day = d.getDate();
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = monthNames[d.getMonth()];
    let year = d.getFullYear();
    let suffix;

    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";
    else suffix = "th";

    let hours = String(d.getHours()).padStart(2, "0");
    let minutes = String(d.getMinutes()).padStart(2, "0");
    let seconds = String(d.getSeconds()).padStart(2, "0");

    return month + " " + day + suffix + ", " + year + " " + hours + ":" + minutes + ":" + seconds;
}

function updateTime() {
    date.innerHTML = time();
}

updateTime();
setInterval(updateTime, 1000);

function setUserName() {
    userName = userNameInput.value.trim();
    if (userName === "") {
        alert("Please enter your name.");
        return;
    }
    userName = userName[0].toUpperCase() + userName.slice(1).toLowerCase(); // Convert to title case
    msg.innerHTML = "Hello, " + userName + "! Click a level to start.";
}

function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUpBtn.disabled = false; // enable give up button
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = true;
        if(levelArr[i].checked){
            level = levelArr[i].value; 
        }
    }

    answer = Math.floor(Math.random()*level) + 1;
    msg.textContent = "Guess a number 1-" + level + ", " + userName + "!";
    guess.placeholder = "";
    score = 0;

    // start round timer
    roundStartTime = new Date().getTime();
}

function makeGuess(){
    let userGuess = Number(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = "Invalid, guess a number!";
        return;
    }
    score++;

    const diff = Math.abs(userGuess - answer);
    let hint = "";
    if (diff >= level / 2) hint = "You're freezing cold!";
    else if (diff >= level / 4) hint = "You're cold!";
    else if (diff >= level / 10) hint = "You're warm!";
    else if (diff > 0) hint = "You're hot!";
    
    if(userGuess < answer){
        msg.textContent = hint + " Too low, guess a bit higher, " + userName + ".";
    }
    else if(userGuess > answer){
        msg.textContent = hint + " Too high, guess a bit lower, " + userName + ".";
    }
    else{
        const roundEndTime = new Date().getTime();
        const roundDuration = (roundEndTime - roundStartTime) / 1000;
        totalGamesPlayed++;
        totalGameTime += roundDuration;

        if (fastestTime === null || roundDuration < fastestTime) {
            fastestTime = roundDuration;
        }

        let performance = "";
        if (score <= 3) performance = "Excellent job, " + userName + "!";
        else if (score <= 6) performance = "Good work, " + userName + "!";
        else performance = "You got it, " + userName + ", but you can do better!";

        msg.textContent = "Correct, " + userName + "! It took you " + score + " tries (" + roundDuration.toFixed(2) + " seconds). " + performance;

        reset();
        updateScore();
        updateTimeStats();
    }
}

function giveUp() {
    msg.textContent = "You gave up, " + userName + "! The number was " + answer + ". Your score was set to the range.";
    score = Number(level);
    totalGamesPlayed++;
    totalGameTime += (new Date().getTime() - roundStartTime) / 1000;
    reset();
    updateScore();
    updateTimeStats();
}

function reset(){
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    guess.disabled = true;
    playBtn.disabled = false; // fixed, allow playing again
    for(let i=0; i < levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}

function updateScore(){
    scoreArr.push(score);
    wins.textContent = "Total wins: " + scoreArr.length;
    let sum = 0;
    scoreArr.sort((a, b) => a - b);
    const lb = document.getElementsByName("leaderboard");

    for(let i=0; i < scoreArr.length; i++){
        sum += scoreArr[i];
        if(i < lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum / scoreArr.length;
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
}

function updateTimeStats() {
    let avgTime = totalGameTime / totalGamesPlayed;
    avgGameTimeDisplay.textContent = "Average game time: " + avgTime.toFixed(2) + " seconds";
    fastestTimeDisplay.textContent = "Fastest game time: " + (fastestTime ? fastestTime.toFixed(2) : 0) + " seconds";
}

if (savedTheme === "dark") document.documentElement.classList.add("dark-theme");

themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-theme");
    const active = document.documentElement.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("guessTheme", active);
});

const themeStyle = document.createElement("style");
themeStyle.innerHTML = `
  :root {
    --bg: #ffffff;
    --fg: #111111;
    --accent: #0b61ff;
  }
  .dark-theme {
    --bg: #121212;
    --fg: #ffffff;
    --accent: #68a0ff;
  }
  body {
    background: var(--bg);
    color: var(--fg);
    transition: background 0.25s, color 0.25s;
  }
  button { cursor: pointer; }
  #themeToggle {
    margin-top: 12px;
    padding: 6px 10px;
  }
`;
document.head.appendChild(themeStyle);