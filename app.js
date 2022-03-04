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
            slot.id = `slot${i+1}`
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

    let columnClicked = event.target.parentElement.id
    console.log(columnClicked)
    let columnLookup = gameState.gameBoard[columnClicked]
    console.log(columnLookup)
    const findASlot = columnLookup.find((slot) => slot.value === 'slot1')
        console.log(findASlot)
    function placeGameToken () {
        
        function findASlot234() {
            let outValue = null
            //gameState.gameBoard[columnClicked]
            
            gameState.gameBoard[columnClicked]
            console.log(gameState.gameBoard[columnClicked].entries())   
            return outValue
          }
       
            // if (visColumn.firstChild.nodeValue !== 'red') {
            //   t2.firstChild.nodeValue = "two";
            // } else {
            //   t2.firstChild.nodeValue = "three";
            //   controller.abort();
      
        // console.log(Object.defineProperty(gameState.gameBoard, columnClicked, firstFreeSlot {value : gameState.turn}))



    




        let token = document.createElement('div')
        token.classList.add (`playerToken`)
        token.classList.add('styleToken')
        event.target.appendChild(token)
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



