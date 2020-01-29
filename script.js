//vars
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let circleTurn
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMessageElement = document.getElementById('playerWinsMessage')
const winMessageTxtElement = document.querySelector('[data-player-wins-text]')
const newGameButton = document.getElementById('newGameButton')

startGame()

newGameButton.addEventListener('click', startGame)

function startGame() {
    //x player starts first
    circleTurn = false

    //check for where player wants to place mark
    //can only do so once
    cellElements.forEach(cell => {
        //if new game -- clean board
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', mouseClick)
        cell.addEventListener('click', mouseClick, {once : true})
    })
    
    //if new game remove previous result show
    winMessageElement.classList.remove('show')
}


function mouseClick(e) {
    /*
    1. place player mark
    2. check for win conditions
    3. check for draw
    4. switch to next player
    */
   const cell = e.target
   const currClass = circleTurn ? CIRCLE_CLASS : X_CLASS
   markCell(cell, currClass)
   if (checkWin(currClass)) {
        endGame(false)
   } else if (isDraw()) {
        endGame(true)
   } else {
        switchPlayers()
   }   
}


function markCell(cell, currClass) {
    //mark current cell with the current class mark (x or circle)
    cell.classList.add(currClass)
}


function switchPlayers() {
    circleTurn = !circleTurn
}

function checkWin(currClass) {
    //check if every cell inside combo is off the currClass
    //if so -> return true, else -> return false
    return winCombos.some(combo => {
        return combo.every(index => {
            return cellElements[index].classList.contains(currClass)
        })
    })
}

function endGame(draw) {
    //end the game under draw or win condition
    if (draw) {
        winMessageTxtElement.innerText = 'Draw!'
    } else {
        winMessageTxtElement.innerText = `${circleTurn ? "O's" : "X's"} Win!` 
    }
    winMessageElement.classList.add('show')
}

function isDraw() {
    //check if every cell if contained by x or circle class
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}