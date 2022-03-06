/* Variable naming key
html'xxx' = static html
vis'xxx' = procedurally gen html
style'xxx' = CSS visual element
*/
const visBoard = document.querySelector('.htmlGameBoard')
const dropSelection = document.querySelector('select')

const gameState = {
    gameBoard: new Map,
    connect: 4,
    players: ['red', 'yellow'],
    turn: 'red', // define value
    gameStatus: 'playing',
    setGameBoard: function () {
       
        // creates html elements based on selection
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
        // sets the size of the board based on the dropdown selection
        for (let i = 1; i < this.connect + 4; i++) {
            this.gameBoard[`column${i}`] = new Map([
                ["slot1", null],
                ["slot2", null],
                ["slot3", null],
                ["slot4", null],
                ["slot5", null],
                ["slot6", null]
            ])
            createHTMLColumn(i)
        }

    },
    lastClickEvent: {
        column: null,
        slot: null
    },
    placeGameToken: function () {

        //find the first unassigned slot and set its value to player turn -- only effects the "logic half"
        function slotFinder() {
            for (let i = 1; i < 7; i++) {
                // gets the location value for where the last click event *SHOULD* place
                let slotValue = gameState.gameBoard[gameState.lastClickEvent.column].get(`slot${i}`)

                if (slotValue === null) {
                    //assigns the slot value according to the active players turn
                    gameState.gameBoard[gameState.lastClickEvent.column].set(`slot${i}`, gameState.turn)
                    gameState.lastClickEvent.slot = `slot${i}`
                    break;
                }
            }
        }
        // *function call*
        slotFinder()

        //places a token same unassigned slot as slotFinder, *Visually*, assigned to the current player's turn
        function generateGameToken() {
            const slot = document.querySelector(`#` + gameState.lastClickEvent.column + gameState.lastClickEvent.slot)
            const token = document.createElement('div')
            token.classList.add(`${gameState.turn}PlayerToken`, `styleToken`)
            slot.appendChild(token)
        }
        // *function call*
        generateGameToken()
        // console.log(gameState.gameBoard, 'gameboard post click')
    },
    checkForWinner: function () {
        const solutionCounter = {
            verticalCheck: 0,
            leftRowCheck: 0,
            rightRowCheck: 0,
            lowerLeftDiagCheck: 0,
            upperLeftDiagCheck: 0,
            upperRightDiagCheck: 0,
            lowerLeftDiagCheck: 0
        }
        
        //check vertical win
            function checkVertical() {
                for (const entry of gameState.gameBoard[gameState.lastClickEvent.column]) {
                    if (entry[1] !== gameState.turn) {
                        break;
                    } else {
                        solutionCounter.verticalCheck++
                        if (solutionCounter.verticalCheck === gameState.connect) {
                        // placeholder *** add real output
                        console.log(`${gameState.turn} Wins!`)
                        }
                    }
                }
            }
        //*function call*
        checkVertical()
        // check to the left
        function checkLeft (){
            

        }
        //*function call*
        checkLeft()
        console.log(gameState.gameBoard.entries())
        console.log(gameState.lastClickEvent)






    }

}





console.log(gameState.gameBoard)

// **** Set Game Size ****
//dropdown game-size listener
dropSelection.addEventListener("change", function (event) {
       gameState.connect = Number(event.target.value)
    }),
// function call to set game size
gameState.setGameBoard()

// place token click listener
visBoard.addEventListener(`click`, async function (event) {
    //value is the ID of the column at the click event
    // *****************slice band-aid+++++ revisit later
    gameState.lastClickEvent.column = await event.target.parentElement.id.slice(0, 7)
    gameState.placeGameToken()
    gameState.checkForWinner()
    if (gameState.turn === gameState.players[0]) {
        gameState.turn = gameState.players[1]
    } else {
        gameState.turn = gameState.players[0]
    }
});