let gameSeq = [];
let userSeq = [];

let btns =["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", startGame);
document.addEventListener("click", startGame);

function startGame() {
    if (started == false) {
        console.log("Game is started");
        started = true;
        levelUp();

        // Remove event listeners so game doesn’t restart randomly
        document.removeEventListener("keypress", startGame);
        document.removeEventListener("click", startGame);
    }
}

function playSound() {
    let audio = new Audio("music.mp3");
    
    audio.play().catch(error => {
        console.error("Audio play error:", error);
        
    });
}

function gameFlash(btn){
    playSound();
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

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    //random button choose
    let randIdx = Math.floor(Math.random() *3 );
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns() {
    // let idx = level - 1;
    let idx = userSeq.length - 1;

    if(userSeq[idx]  === gameSeq[idx]){
        if (userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br> Press any key to Start`;
        reset();
    }
}

function btnPress() {
    let btn = this; 
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    console.log(userColor);

    userSeq.push(userColor);

    playSound();

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}   

function reset(){
    started = false;
    gameSeq =[];
    userSeq =[];
    level = 0;

    
}
