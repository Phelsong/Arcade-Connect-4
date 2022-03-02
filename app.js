/* Variable naming key
html'xxx' = static html
vis'xxx' = procedurally gen html
style'xxx' = CSS visual element
*/
const visBoard = document.querySelector('.htmlGameBoard')
const gameState = {
    gameBoard : {},
    players : ['red', 'yellow'],
    turn : null,// define value
    gameStatus: 'playing',

}
let userBoardSize = 4

function generateColumns() {
    let map = new Map([
        ["slot1", null],
        ["slot2", null],
        ["slot3", null],
        ["slot4", null],
        ["slot5", null],
        ["slot6", null]
    ]) 
    createColumn()
    return map 
}

function createColumn() {
    let visColumn = document.createElement('div')
    visColumn.classList.add('styleColumn')
    for (let i = 0; i < 6; i++) {
        let visSlot = document.createElement('div')
        visSlot.id = `slot${i+1}`
        visSlot.classList.add('styleSlot')
        visColumn.appendChild(visSlot)
    }
    visBoard.appendChild(visColumn)
}


function setGameBoard (){
    for (let i = 0; i < userBoardSize+3; i ++){
    gameState.gameBoard[`column${i+1}`] = generateColumns()
    }
}
setGameBoard()


function placeGameToken () {
    Object.getOwnPropertyDescriptor(gameState.gameBoard, "@click location@")
    
    Object.definteProperty(gameState, gameBoard, "@click location@", {value : "@turn@"})
    let visToken = document.createElement('div')
    visToken.id = `turn token`
    visToken.classList.add('styleToken')
    visSlot.appendChild(visToken)
}

// function solutionCheck () {
//     for (x of gameState.gameBoard){
//         
//     }
// }

//click thee olde DOM column to drop token

// function updateBoard() {
//     // update board values
// }



