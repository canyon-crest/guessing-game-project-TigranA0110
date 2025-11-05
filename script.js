// add javascript here
date.textContent = time();

let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

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
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = true;
        if(levelArr[i].checked){
            level = levelArr[i].value; 
        }
    }

    answer = Math.floor(Math.random()*level) + 1;
    msg.textContent = "Guess a name 1-" + level;
    guess.placeholder = answer;
    score = 0;
}

function makeGuess(){
    let userGuess = Number(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = "Invalid, guess a numebr!";
        return;
    }
    score++;
    if(userGuess < answer){
        msg.textContent = "Too low, guess a bit higher"
    }
    else if(userGuess > answer){
        msg.textContent = "Too high, guess a bit lower";
    }
    else{
        msg.textContent = "Correct! It took you " + score + " tries.";
        reset();
        updateScore();
    }
}

function reset(){
    guessBtn.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    guess.disabled = true;
    playBtn.disabled = true;
    for(let i=0; i < levelArr.lenght; i++){
        levelArr[i].disabled = false;
    }
}

function updateScore(){
    scoreArr.push(score);
    wins.textContent = "Total wins: " + scoreArr.lenght;
    let sum = 0;
    scoreArr.sort((a, b) => a - b)
    const lb = document.getElementsByTagName("leaderboard");

    for(let i=0; i < scoreArr.lenght; i++){
        sum += scoreArr[i];
        if(i < lb.lenght){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.lenght;
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
}