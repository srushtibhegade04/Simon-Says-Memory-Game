
let gameseq = [];
let userseq = [];
let btns = ["red","green","orange","blue"];
let instructions = document.querySelector(".instructions");

//let highest = 0;
let highest = Number(localStorage.getItem("highscore")) || 0;
document.getElementById("highScore").innerText = "⭐ Highest Score : " + highest;

let started = false;
let level = 0;

let h2 = document.getElementById("gameStatus");
/*document.addEventListener("keypress", function () {
    if(started == false)
    {
     //console.log("started");
     started = true;
     levelup();
    }
});*/

let startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click",function(){
     if(!started){
     started=true;
     startBtn.style.display = "none";
     instructions.style.display = "none";
     levelup();
}
});



function gameFlash(btn)
{
     btn.classList.add("flash");
     setTimeout(function (){
     btn.classList.remove("flash");
     },180);
}

function userFlash(btn)
{
     btn.classList.add("userFlash");
     setTimeout(function (){
     btn.classList.remove("userFlash");
     },180);
}

function levelup()
{
     userseq = [];
     level++;

     document.getElementById("levelText").innerText = " 🎯 Level : " + level;

     let randIndx = Math.floor(Math.random()*4);
     let randColor = btns[randIndx];
     let randBtn = document.querySelector(`.${randColor}`);

     gameseq.push(randColor);
     //console.log(gameseq);
     h2.innerText = "👀 Watch the sequence";
     gameFlash(randBtn);
     //console.log(randColor);
    /* console.log(randIndx);
     console.log(randColor);
     console.log(randBtn);*/  
    
}

function checkAns(idx)
{
     //console.log("current level",level);
     //let idx = level - 1;
     if(userseq[idx] === gameseq[idx]){
          //console.log("same value");

          if(userseq.length == gameseq.length)
          {
               setTimeout(levelup,1000);
          }
     }
     else{
          h2.innerHTML = `❌Game Over!<br> 🏆Score : ${level - 1} <br>🎮 Click Start Game to Play Again`;
          if(level - 1 > highest){

               highest = level - 1 ;
               localStorage.setItem("highscore", highest);
               document.getElementById("highScore").innerHTML = "⭐ Highest Score : " + highest;
              
          }
          reset();
          
     }
      
}

function btnPress()
{
     //console.log(this)
     let btn = this;
     userFlash(btn);
     let userColor = btn.getAttribute("id");
     userseq.push(userColor);
     if(userseq.length < gameseq.length){
          h2.innerText = "🖱 Repeat the sequence";
     }
    checkAns(userseq.length-1);
     // console.log(userColor);
     //console.log(userseq);
}


let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
     btn.addEventListener("click",btnPress);
}


function reset(){
     started = false;
     gameseq = [];
     userseq = [];
     level = 0;
     document.getElementById("levelText").innerText ="🎯 Level : 0";
     startBtn.style.display = "inline-block";
     instructions.style.display = "block";
   

}
