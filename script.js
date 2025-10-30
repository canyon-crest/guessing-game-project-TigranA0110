// add javascript here
date.textContent = time();

let score, answer, level;
const levelArr = document.getElementsByName("level");
const scoreArr = [];

playBtn.addEventListener("click", play);
guessBtn.addEventListener("click", makeGuess);

function time() {
    let d = new Date();
    let str = d.getMonth()+1 + "/" + d.getDate() + "/" + d.getFullYear()
    return str;
}

function play(){
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    for(let i=0; i<levelArr.length; i--){
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
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = "Invalid, guess a numebr!";
        return;
    }
    score++
    if(userGuess < answer){
        MessageChannel.textContent = "Too low, guess a bit higher"
    }
    else if(userGuess > answer){
        msg.textContent = "Too high, guess again";
    }
    else{
        msg.textContent = "Correct! It took you " + score + "tries.";
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
        levelArr[i.disabled] = false;
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