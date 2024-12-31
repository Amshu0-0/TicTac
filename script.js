// access the buttons
let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#resetBtn');
let newBtn = document.querySelector('#newBtn');
let msgContainer = document.querySelector('.msg-container')
let msg = document.querySelector('#msg');

// tracking which player turn
let turnO = true; //playerX, playerO

//storing winning patterns in the form of 2d array
const winPatterns = [
    // horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal wins
    [0, 4, 8],
    [2, 4, 6]
]

// reset gane function
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide")

}

// adding event listener for buttons on what happens when the button is clicked
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log("box was clicked");
        if (turnO === true) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; // disabled button after clicking once

        checkWinner()
    })
})

// disbale the boxes so that the game doesnot continue after we have found a winner
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

// enable the boxes so that the game starts once clicked new game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
// show winner function
const showWinner = (winner) => {
    msg.innerText = `${winner} Wins`;
    msgContainer.classList.remove("hide")
    disableBoxes();
}

// checking for the winner
const checkWinner  = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log(pos1Val, 'wins');
                showWinner(pos1Val)
            }
        } 
    }
};

newBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);