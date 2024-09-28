document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const statusText = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = Array(9).fill('');

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    board.addEventListener('click', (e) => {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (cell.classList.contains('cell') && gameActive && boardState[index] === '') {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }
    });

    resetButton.addEventListener('click', resetGame);

    function updateStatus() {
        if (gameActive) {
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWinner() {
        let roundWon = false;

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (!boardState.includes('')) {
            statusText.textContent = `It's a draw!`;
            gameActive = false;
        }
    }

    function resetGame() {
        boardState = Array(9).fill('');
        gameActive = true;
        currentPlayer = 'X';
        statusText.textContent = `Player X's turn`;
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    }
});