 // Vriables Initialize  
let gameSeq = [];
let userSeq = [];
let btns = ["yellow","red","purple","green"];
let started = false;
let level =0;

const Spacebar = document.querySelector("#startButton");
let h2 = document.querySelector("h2");

//  Start the game on start Button usign Event listener
Spacebar.addEventListener("click", startgame);
document.addEventListener("keydown", function (event) {
    if (!started && (event.key === " " || event.key === "Spacebar")) {
      startgame();
    }
});

function startgame(){
    if(started == false){
        started =true;
        levelUp();
    }
}
// Flash effect on Game Buttons
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

// Increase Level up & Generate new sequence
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else {
        const gameOverSound = document.getElementById("gameOverSound");
        gameOverSound.play();
        h2.innerHTML = `Game Over!<br> Your Score Was <b>${level}</b> `;
        document.querySelector("h2").style.backgroundColor = "red";
        document.querySelector("h2").style.color = "red";
        setTimeout(function(){
            document.querySelector("h2").style.backgroundColor = "#34495e";
            document.querySelector("h2").style.color = "white";
        },150);
        reset();
    }
}


// Check user's sequence
function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

// Button click Event listener
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}

 // Game Reset
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

