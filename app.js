/* Variable naming key
html'xxx' = static html
vis'xxx' = procedurally gen html
style'xxx' = CSS visual element
*/
// Var dump
const visBoard = document.querySelector('.htmlGameBoard')
const dropSelection = document.querySelector('select')
let chosenSize = 4
//var dump



const gameState = {
    gameBoard : {},
    players : ['red', 'yellow'],
    turn : 'red',// define value
    gameStatus: 'playing',
    
}
console.log(gameState.gameBoard)

function generateColumns() {
    let map = new Map([
        ["slot1", null], //red
        ["slot2", null],
        ["slot3", null],
        ["slot4", null],
        ["slot5", null],
        ["slot6", null]
    ]) 
    createColumn()
    return map 
}




// **** Set Game Size

dropSelection.addEventListener("change", function(event){
    chosenSize = Number(event.target.value)
  });



function createColumn() {
    let visColumn = document.createElement('div')
    visColumn.classList.add('styleColumn')
    for (let i = 0; i < 6; i++) {
        let visSlot = document.createElement('div')
        visSlot.classList.add(`slot${i+1}`)
        visSlot.classList.add('styleSlot')
        visColumn.appendChild(visSlot)
    }
    visBoard.appendChild(visColumn)
}

function setGameBoard (){
    for (let i = 0; i < chosenSize+3; i ++){
    gameState.gameBoard[`column${i+1}`] = generateColumns()
    }
}
setGameBoard()



visBoard.addEventListener(`click`, function(event) {
    function placeGameToken () {
        //Object.getOwnPropertyDescriptor(
        console.log(event.target)
      
        Object.defineProperty(gameState.gameBoard, event.target.value, {value : gameState.turn})



    




        let visToken = document.createElement('div')
        visToken.classList.add (`playerToken`)
        visToken.classList.add('styleToken')
        event.target.appendChild(visToken)
    }
    placeGameToken()
  }, {passive:true});




// function solutionCheck () {
//     for (x of gameState.gameBoard){
//         
//     }
// }

//click thee olde DOM column to drop token

// function updateBoard() {
//     // update board values
// }



