/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2, 3],
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
    [7, 8, 9, 10],
    [8, 9, 10, 11],
    [9, 10, 11, 12],
    [10, 11, 12, 13],
    [14, 15, 16, 17],
    [15, 16, 17, 18],
    [16, 17, 18, 19],
    [17, 18, 19, 20],
    [21, 22, 23, 24],
    [22, 23, 24, 25],
    [23, 24, 25, 26],
    [24, 25, 26, 27],
    [28, 29, 30, 31],
    [29, 30, 31, 32],
    [30, 31, 32, 33],
    [31, 32, 33, 34],
    [35, 36, 37, 38],
    [36, 37, 38, 39],
    [37, 38, 39, 40],
    [38, 39, 40, 41],
    [0, 7, 14, 21],
    [7, 14, 21, 28],
    [14, 21, 28, 35],
    [1, 8, 15, 22],
    [8, 15, 22, 29],
    [15, 22, 29, 36],
    [2, 9, 16, 23],
    [9, 16, 23, 30],
    [16, 23, 30, 37],
    [3, 10, 17, 24],
    [10, 17, 24, 31],
    [17, 24, 31, 38],
    [4, 11, 18, 25],
    [11, 18, 25, 32],
    [18, 25, 32, 39],
    [5, 12, 19, 26],
    [12, 19, 26, 33],
    [19, 26, 33, 40],
    [6, 13, 20, 27],
    [13, 20, 27, 34],
    [20, 27, 34, 41],
    [14, 22, 30, 38],
    [7, 15, 23, 31],
    [15, 23, 31, 39],
    [0, 8, 16, 24],
    [8, 16, 24, 32],
    [16, 24, 32, 40],
    [1, 9, 17, 25],
    [9, 17, 25, 33],
    [17, 25, 33, 41],
    [2, 10, 18, 26],
    [10, 18, 26, 34],
    [3, 11, 19, 27],
    [20, 26, 32, 38],
    [13, 19, 25, 31],
    [19, 25, 31, 37],
    [6, 12, 18, 24],
    [12, 18, 24, 30],
    [18, 24, 30, 36],
    [5, 11, 17, 23],
    [11, 17, 23, 29],
    [17, 23, 29, 35],
    [4, 10, 16, 22],
    [10, 16, 22, 28],
    [3, 9, 15, 21]
]

/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner, tie


/*------------------------ Cached Element References ------------------------*/

const circleEls = document.querySelectorAll('.circle')
const messageEl = document.getElementById('message')
const resetBtnEl = document.getElementById('reset')
const winningSound = new Audio(`../assets/winning-trumpet.wav`)

/*----------------------------- Event Listeners -----------------------------*/

document.querySelector('.board').addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', coinJingle)
/*-------------------------------- Functions --------------------------------*/

init()
function init() {
    board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
    turn = 1
    winner = false
    tie = false
    render()
}

function render () {
    updateBoard()
    updateMessage()
}

function updateBoard() {
    board.forEach((element, idx) => {
        if (element === 1) {
            circleEls[idx].innerText = '🔴'
        } else if (element === -1) {
            circleEls[idx].innerText = '🔵'
        } else {
            circleEls[idx].innerText = ''
        }
    })
}

function updateMessage() {
    if (winner === false && tie === false) {
        messageEl.textContent = (turn === 1 ? 'Player 1 turn: 🔴' : 'Player 2 turn: 🔵')
    } else if (winner === false && tie === true) {
        messageEl.textContent = "You Tied!"
    } else {
        messageEl.textContent = (turn === 1 ? 'Player 1 Wins! 🔴' : 'Player 2 Wins! 🔵')
        winningSound.play()
    }
}

function handleClick(evt) {
    if (evt.target.id.includes('cir')) {
        let sqIdx = +evt.target.id.replace('cir', '')
        if (winner === true) {
            return
        }
        const open = placePiece(sqIdx)
        if (open === undefined) return
        board[open] = turn
        checkForTie()
        checkForWinner()
        switchPlayerTurn()
        playSound()
        render()
    } 
}

function placePiece(idx) {
    for (let i = (idx + 35); i > -1; i-=7) {
        if (board[i] === null) {
            return i
        }
    }
}

function checkForTie() {
    if (board.includes(null)) return
    tie = true
}

function checkForWinner() {
    winningCombos.forEach(function(arr) {
        let sum = 0
        arr.forEach(function(idx) {
            sum += board[idx]
        })
        if (sum === 4 || sum === -4) {
            winner = true
        }
    })
}

function switchPlayerTurn() {
    if (!winner) turn *= -1
}

function playSound() {
    const audioElement = new Audio(`../assets/click-sound.wav`)
    audioElement.volume = .5
    audioElement.play()
}

function coinJingle() {
    const audioElement = new Audio(`../assets/coin-jingle.mp3`)
    audioElement.volume = .5
    audioElement.play()
    init()
}