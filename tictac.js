let currentPlayer = 'X';
let player1, player2;
let gameActive = false;
let gameState = ['', '', '', '', '', '', '', '', ''];
let player1Score = 0;
let player2Score = 0;

document.getElementById('startGame').addEventListener('click', startGame);
const cells = document.querySelectorAll('.grid-cell');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

document.getElementById('playAgain').addEventListener('click', playAgain);
document.getElementById('restartGame').addEventListener('click', restartGame);

// Shifts cursor from Player 1 to Player 2 after hitting enter
document.getElementById('player1').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim().length > 0) {
        document.getElementById('player2').focus();
    }
});

// Starts game automatically after Player 2 enters name and hits enter
document.getElementById('player2').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value.trim().length > 0) {
        startGame(); // Automatically starts the game
    }
});

function startGame() {
    player1 = document.getElementById('player1').value.trim() || 'Player 1';
    player2 = document.getElementById('player2').value.trim() || 'Player 2';

    // Prevents empty or space-only names
    if (player1.length === 0 || player2.length === 0) {
        alert('Both players must enter a valid name!');
        return;
    }

    document.getElementById('turnDisplay').innerText = `${player1}'s Turn`;

    document.getElementById('player1Name').innerText = `${player1}: `;
    document.getElementById('player2Name').innerText = `${player2}: `;
    gameActive = true;
    gameState.fill(''); // Resets game state
    updateGrid();
}

function handleCellClick(index) {
    if (gameActive && gameState[index] === '') {
        gameState[index] = currentPlayer;
        updateGrid();
        if (checkWin()) {
            displayResult(`${currentPlayer === 'X' ? player1 : player2} Wins!`);
            updateScore(currentPlayer);
            gameActive = false;
        } else if (gameState.every(cell => cell !== '')) {
            displayResult('It\'s a Tie!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('turnDisplay').innerText = `${currentPlayer === 'X' ? player1 : player2}'s Turn`;
        }
    }
}

function updateGrid() {
    cells.forEach((cell, index) => {
        cell.innerText = gameState[index];
        cell.classList.remove('x', 'o', 'winner');
        if (gameState[index] === 'X') {
            cell.classList.add('x'); 
        } else if (gameState[index] === 'O') {
            cell.classList.add('o'); 
        }
        // Resets background color
        cell.style.backgroundColor = ''; 
    });
}

let lastWinner = ''; // New variable to store the last winner

function checkWin() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            highlightWinningCells(condition);
            return true;
        }
    }
    return false;
}

function highlightWinningCells(winningCondition) {
    winningCondition.forEach(index => {
        cells[index].classList.add('winner'); // Highlights winning cells
    });
}

function displayResult(message) {
    document.getElementById('resultDisplay').innerText = message;
}

function updateScore(winner) {
    if (winner === 'X') {
        player1Score++;
        document.getElementById('player1Score').innerText = player1Score;
    } else {
        player2Score++;
        document.getElementById('player2Score').innerText = player2Score;
    }
}

function playAgain() {
    gameState.fill(''); // Resets game 
    gameActive = true;
    updateGrid();
    document.getElementById('resultDisplay').innerText = ''; // Clears result message
    currentPlayer = lastWinner === 'X' ? 'O' : 'X'; // Lets the winner player start
    document.getElementById('turnDisplay').innerText = `${currentPlayer === 'X' ? player1 : player2}'s Turn`;
}

function restartGame() {
    player1Score = 0;
    player2Score = 0;
    document.getElementById('player1Score').innerText = player1Score;
    document.getElementById('player2Score').innerText = player2Score;
    playAgain();
    document.getElementById('turnDisplay').innerText = `New Game: ${player1}'s Turn`;
}
