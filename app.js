/* Variable naming key
html'xxx' = static html
vis'xxx' = procedurally gen html
style'xxx' = CSS visual element
*/
const visBoard = document.querySelector('.htmlGameBoard')
const dropSelection = document.querySelector('select')

const gameState = {
    gameBoard : {},
    connect: 4,
    players : ['red', 'yellow'],
    turn : 'red', // define value
    gameStatus: 'playing',
    setGameBoard: function() {
        // sets the size of the board based on the dropdown selection
        function generateColumnMap() {
            let map = new Map([
                ["slot1", null], 
                ["slot2", null],
                ["slot3", null],
                ["slot4", null],
                ["slot5", null],
                ["slot6", null]
            ]) 
            return map 
        }
        function createHTMLColumn(counter) {
            let column = document.createElement('div')
            column.classList.add(`htmlColumn`, 'styleColumn')
            column.id = `column${counter}`
            for (let i = 1; i < 7; i++) {
                gameState.gameBoard[`column${i}`] 
                let slot = document.createElement('div')
                slot.classList.add(`htmlSlot`, 'styleSlot')
                slot.id = `column${counter}slot${i}`
                column.appendChild(slot)
            }
            visBoard.appendChild(column)
        }
        for (let i = 1; i < this.connect+4; i ++){
        createHTMLColumn(i)
        this.gameBoard[`column${i}`] = generateColumnMap()
        }
   
    },
    placeGameToken: function (columnClicked) {
    
        //find the first unassigned slot and set its value to player turn
        let slotId = null
        function slotFinder () {
            for (let i = 1; i < 7; i++) {
       
            let slotValue = gameState.gameBoard[columnClicked].get(`slot${i}`)

                if (slotValue === null){
                gameState.gameBoard[columnClicked].set(`slot${i}`, gameState.turn)
                slotId = `slot${i}`
                break;
                }
            }
        }   
        //function call
        slotFinder()

        //place visual token in the first to the same unassigned slot
        function generateGameToken () {
            const slot = document.querySelector(`#` +columnClicked+slotId)
            const token = document.createElement('div')
            token.classList.add (`playerToken`, `styleToken`)
            slot.appendChild(token)
        }
        // function call
        generateGameToken()
        console.log(gameState.gameBoard, 'gameboard post click')
    },
    checkForWinner: function (){}
    
}
console.log(gameState.gameBoard)

// **** Set Game Size ****
//dropdown game-size listener
dropSelection.addEventListener("change", function(event){
    gameState.connect = Number(event.target.value)
}),
// function call to set game size
gameState.setGameBoard()

// place token click listener
visBoard.addEventListener(`click`, function(event) {
    //value is the ID of the column at the click event
    // *****************band-aid+++++ revisit later
    const columnClicked = event.target.parentElement.id.slice(0,7)
    gameState.placeGameToken(columnClicked)
    if(gameState.turn === gameState.players[0]){
        gameState.turn = gameState.players[1]
    } else {
        gameState.turn = gameState.players[0]
    }
    gameState.checkForWinner()
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



