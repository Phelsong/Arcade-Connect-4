/* Variable naming key
html'xxx' = static html
vis'xxx' = procedurally gen html
style'xxx' = CSS visual element
*/
const visBoard = document.querySelector('.htmlGameBoard')
const dropSelection = document.querySelector('select')
let chosenSize = 4

const gameState = {
    gameBoard : {},
    players : ['red', 'yellow'],
    turn : 'red',// define value
    gameStatus: 'playing',
    
}
console.log(gameState.gameBoard)

// **** Set Game Size ****

dropSelection.addEventListener("change", function(event){
    chosenSize = Number(event.target.value)
    console.log(event.target.value)
});

function setGameBoard (){
    function generateColumns() {
        let map = new Map([
            ["slot1", null], //red
            ["slot2", null],
            ["slot3", null],
            ["slot4", null],
            ["slot5", null],
            ["slot6", null]
        ]) 
        return map 
    }
    function createColumn(counter) {
        let column = document.createElement('div')
        column.classList.add(`htmlColumn`, 'styleColumn')
        column.id = `column${counter+1}`
        for (let i = 0; i < 6; i++) {
            let slot = document.createElement('div')
            slot.classList.add(`htmlSlot`, 'styleSlot')
            slot.id = `column${counter+1}slot${i+1}`
            column.appendChild(slot)
        }
        visBoard.appendChild(column)
    }
    for (let i = 0; i < chosenSize+3; i ++){
    createColumn(i)
    gameState.gameBoard[`column${i+1}`] = generateColumns()
    }
}
setGameBoard()


const visColumn = document.querySelector('.styleColumn')

visBoard.addEventListener(`click`, function(event) {

    const columnClicked = event.target.parentElement.id

    let slotId = null
    function slotFinder () {
        for (let i = 1; i < 7; i++) {
       
        let slotValue = gameState.gameBoard[columnClicked].get(`slot${i}`)

            if (slotValue === null){
            gameState.gameBoard[columnClicked].set(`slot${i}`, 'red')
            slotId = `slot${i}`
            break;
            }
        }
    }   
    slotFinder()

    // console.log(gameState.gameBoard, 'gameboard post click')
   
    function placeGameToken () {
        const slot = document.querySelector(`#` +columnClicked+slotId)
        const token = document.createElement('div')
        token.classList.add (`playerToken`, `styleToken`)
        slot.appendChild(token)
    }
    placeGameToken()
});




// function solutionCheck () {
//     for (x of gameState.gameBoard){
//         
//     }
// }

//click thee olde DOM column to drop token

// function updateBoard() {
//     // update board values
// }






// function findASlot234() {
//     let outValue = null
//     //gameState.gameBoard[columnClicked]
    
//     gameState.gameBoard[columnClicked]
//     console.log(gameState.gameBoard[columnClicked].entries())   
//     return outValue
//   }

    // if (visColumn.firstChild.nodeValue !== 'red') {
    //   t2.firstChild.nodeValue = "two";
    // } else {
    //   t2.firstChild.nodeValue = "three";
    //   controller.abort();

// console.log(Object.defineProperty(gameState.gameBoard, columnClicked, firstFreeSlot {value : gameState.turn}))



