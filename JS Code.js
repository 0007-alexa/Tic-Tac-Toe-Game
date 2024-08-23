let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgBox = document.querySelector(".msg-box");
let msg = document.querySelector("#msg");
let draw = document.querySelector("#draw");

let turnO = true; //playerX, playerO
let count = 0; //To track draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgBox.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
       if(turnO === true){
        box.innerText = "O";
        box.classList.add("O");
        turnO = false;
        }else{ 
            box.innerText = "X";
            box.classList.add("X");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = winner();

        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
   
});
const gameDraw = () =>{
    msg.innerText = "Game was a Draw :')";
    msgBox.classList.remove("hide");
    disabledBoxes();
};

const disabledBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) =>{
    msg.innerText = `Congratulations!, Winner is ${winner}`;
    msgBox.classList.remove("hide");
    disabledBoxes();
};
const winner = () =>{
    for (let patterns of winPatterns) {
        let p1val = boxes[patterns[0]].innerText;
        let p2val = boxes[patterns[1]].innerText;
        let p3val = boxes[patterns[2]].innerText;

        if(p1val != "" && p2val != "" && p3val != ""){
            if(p1val===p2val && p2val===p3val){
                showWinner(p1val);
            }
        }
       
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
