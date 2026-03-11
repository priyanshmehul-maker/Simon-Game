let userSeq=[];
let gameSeq=[];

let count=[];
let max=0;

let btns=["red","blue","green","yellow"];

let h2=document.querySelector("h2");

let started=false;
let level=0;

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game Started");
        started=true;
        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },100);
    gameSeq.push(btn.id);
    console.log(gameSeq);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },100);
    userSeq.push(btn.id);
    // console.log(userSeq);
    checkAns(userSeq.length-1);
}
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            setTimeout(levelUp(),100);
        }
    }
    else {
        count.push(level);
        for(let i=0;i<count.length;i++){
            if(count[i]>max){
                max=count[i];
            }
        }
        h2.innerHTML=`Game Over...!<br>Your score for this round was : <b>${level}</b><br>Total attempts : ${count.length}<br>Max Score Till Now: ${max}<br>Press Any Key to Restart....!`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="grey";
        },200);
        reset();
    }
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
}

let btn=document.querySelectorAll(".btn");
for(let btns of btn){
    btns.addEventListener("click",function(){
        console.log("clicked");
        userFlash(btns);
    })
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
}