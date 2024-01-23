// JavaScript code for 2048 game
window.addEventListener('load', startGame);
// The main board of our game
let board = new Array(4).fill(0).map(() => new Array(4).fill(0));

// Function to start the game / restart the game
function startGame() {
    // Print all the cells as empty
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            board[i][j] = 0;
        }
    }
    
    // Randomly initialize two cells with 2 at the start of the game
    generateOneCell();
    generateOneCell();
    showBoard();
}

// Function to generate one cell
function generateOneCell() {
    while(true) {
        let row = randomGenerator(4);
        let col = randomGenerator(4);
        if(board[row][col] === 0) {
            board[row][col] = Math.random() < 0.5 ? 2 : 4;
            break;
        }
    }
}

// Function to generate a random number in the given size of board
function randomGenerator(size) {
    return Math.floor(Math.random() * size);
}

// Function to display the board on console
function showBoard() {
    const colors = {
        0: 'cell-value-0',
        2: '.value-2',
        4: 'cell value-4',
        8: 'cell value-8',
        16: 'cell value-16',
        32: 'cell value-32',
        64: 'cell value-64',
        128: 'cell value-128',
        256: 'cell value-256',
        512: 'cell value-512',
        1024: 'cell value-1024',
        2048: 'cell value-2048',
    };

    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            let cell = document.getElementById(`cell-${i}-${j}`);
            cell.textContent = board[i][j] ? board[i][j] : '';
            cell.className = colors[board[i][j]];
        }
    }
}

// Function to check whether cells are empty or not
function checkEmptyCells() {
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            if(board[i][j] == 0) {
                return true;
            }
        }
    }
    return false;
}

// Function to compress the board after every step before and after merging cells
function compressBoard() {
    // Empty grid
    let newBoard = new Array(4).fill(0).map(() => new Array(4).fill(0));

    // Here we shift entries of each cell to the extreme left row by row
    for(let i=0; i<4; i++) {
        let pos = 0;  // Current empty position

        // Traverse the board
        for(let j=0; j<4; j++) {
            if(board[i][j] != 0) {
                newBoard[i][pos] = board[i][j];
                pos++;
            }
        }
    }
    board = newBoard;
}

// Function to merge the cells in matrix after compressing
function mergeCells() {
    for(let i=0; i<4; i++) {
        for(let j=0; j<3; j++) {
            // If current cell has same value as next cell in the row and they are non empty then
            if(board[i][j] == board[i][j+1] && board[i][j] != 0) {
                board[i][j] = board[i][j] * 2;
                board[i][j+1] = 0;
            }
        }
    }
}

// Function to reverse the board means reversing the content of each row (reversing the sequence)
function reverseBoard() {
    for(let i=0; i<4; i++) {
        board[i].reverse();
    }
}

// Function to get the transpose of matrix means interchanging rows and column
function transposeBoard() {
    for(let i=0; i<4; i++) {
        for(let j=i; j<4; j++) {
            let temp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = temp;
        }
    }
}

// Function to update the board after every operation
function updateBoard() {
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            if(board[i][j] == 0) {
                document.getElementById(i*4+j).innerHTML = "";
            } else {
                document.getElementById(i*4+j).innerHTML = board[i][j];
            }
        }
    }
}

// Function to copy the original board to a new board
function copyBoard(board) {
    let newBoard = new Array(4).fill(0).map(() => new Array(4).fill(0));
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            newBoard[i][j] = board[i][j];
        }
    }
    return newBoard;
}

// Function to compare a board with another
function compareBoard(board1, board2) {
    for(let i=0; i<4; i++) {
        for(let j=0; j<4; j++) {
            if(board1[i][j] != board2[i][j]) {
                return false;
            }
        }
    }
    return true;
}

// Function to check whether a move is possible or not
function movePossible() {
    for(let i=0; i<4; i++) {
        for(let j=0; j<3; j++) {
            if(board[i][j] == board[i][j+1]) {
                return true;
            }
        }
    }

    for(let i=0; i<3; i++) {
        for(let j=0; j<4; j++) {
            if(board[i+1][j] == board[i][j]) {
                return true;
            }
        }
    }
    return false;
}

// Function to check whether the game is over or not
function isGameOver() {
    if(!checkEmptyCells() && !movePossible()) {
        return true;
    }
    return false;
}

// Function to add a new cell with a number in it (2 or 4)
function addNewNumber() {
    let x = randomGenerator(4), y = randomGenerator(4);
    while(board[x][y] != 0) {
        x = randomGenerator(4);
        y = randomGenerator(4);
    }
    let num = randomGenerator(3);
    board[x][y] = (num % 2 == 0) ? 2 : 4;
}

// Function to do the operations when a key is pressed
function keyDownHandler(event) {
    if(event.keyCode == '37') {  // Left key
        moveLeft();
    } else if(event.keyCode == '38') {  // Up key
        moveUp();
    } else if(event.keyCode == '39') {  // Right key
        moveRight();
    } else if(event.keyCode == '40') {  // Down key
        moveDown();
    }
    updateBoard();
}

// Function to move left
function moveLeft() {
    let temp = copyBoard(board);
    compressBoard();
    mergeCells();
    compressBoard();
    if(!compareBoard(board, temp)) {
        addNewNumber();
    }
    showBoard();
}

// Function to move right
function moveRight() {
    let temp = copyBoard(board);
    reverseBoard();
    compressBoard();
    mergeCells();
    compressBoard();
    reverseBoard();
    if(!compareBoard(board, temp)) {
        addNewNumber();
    }
    showBoard();
}

// Function to move up
function moveUp() {
    let temp = copyBoard(board);
    transposeBoard();
    compressBoard();
    mergeCells();
    compressBoard();
    transposeBoard();
    if(!compareBoard(board, temp)) {
        addNewNumber();
    }
    showBoard();
}

// Function to move down
function moveDown() {
    let temp = copyBoard(board);
    transposeBoard();
    reverseBoard();
    compressBoard();
    mergeCells();
    compressBoard();
    reverseBoard();
    transposeBoard();
    if(!compareBoard(board, temp)) {
        addNewNumber();
    }
    showBoard();
}

// Adding event listener for key press
window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
});
// Starting the game
startGame();