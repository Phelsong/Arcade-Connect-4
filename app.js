/* Variable naming key
html'xxx' = static html
vis'xxx' = linked html
style'xxx' = CSS visual element
*/
const visBoard = document.querySelector('.htmlGameBoard')
const dropSelection = document.querySelector('#boardSizeDropdown')
const visGameStatus = document.querySelector('.gameStatus')

const gameState = {
    gameBoard: {},
    connect: 4,
    player1Name: 'Red',
    player2Name: 'Yellow',
    players: ['red', 'yellow'],
    turn: 'red',
    gameStatus: 'Game Active!',
    setGameBoard: function () {
        
        // reset game board
        gameState.gameBoard = {}
        visBoard.innerHTML = null
        gameState.gameStatus = 'Game Active!'


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
                                        
                    //----------------------------------------------------------------
                    //places a token same unassigned slot as slotFinder, *Visually*, assigned to the current player's turn
                    function generateGameToken() {
                                
                        const slot = document.querySelector(`#` + gameState.lastClickEvent.column + gameState.lastClickEvent.slot)
                        const token = document.createElement('div')
                        token.id = `${gameState.lastClickEvent.column+gameState.lastClickEvent.slot+'token'}`
                        token.classList.add(`${gameState.turn}PlayerToken`, `styleToken`)
                        slot.appendChild(token)
                    }
                    //------------------------------------------------------------------------------
                    // *function call*
                    generateGameToken()
                    break;
                }
            }
        }
        // *function call*
        slotFinder()

        // console.log(gameState.gameBoard, 'gameboard post click')
    },
    checkForWinner: function () {
        const solutionCounter = {
            verticalCheck: 0,
            leftRowCheck: 1,
            rightRowCheck: 1,
            lowerLeftDiagCheck: 1,
            upperLeftDiagCheck: 1,
            lowerRightDiagCheck: 1,
            upperRightDiagCheck: 1
        }
        const solutionIDXs = {
            toTheLeftIDX: null,
            toTheRightIDX: null,
            verticalIDX: null,
            verticalIDX2: null
        }
        const gameBoardIDX = Array.from(Object.keys(gameState.gameBoard))

        function checkVertical() {
            for (const entry of gameState.gameBoard[gameState.lastClickEvent.column]) {
                if (entry[1] !== gameState.turn) {
                    break;
                } else {
                    solutionCounter.verticalCheck++
                    if (solutionCounter.verticalCheck === gameState.connect) {
                        // placeholder *** add real output
                        gameState.winMessage()
                        break;
                    }
                }
            }
        }
        function checkLeft() {
            for (let i = 1; i < gameState.connect; i++) {
                solutionIDXs.toTheLeftIDX = gameBoardIDX.indexOf(gameState.lastClickEvent.column) - i
                if (solutionIDXs.toTheLeftIDX === -1) {
                    break
                }
                let toTheLeft = gameState.gameBoard[gameBoardIDX[solutionIDXs.toTheLeftIDX]].get(gameState.lastClickEvent.slot)
                // console.log(toTheLeft)
                if (toTheLeft !== gameState.turn) {
                    break
                } else {
                    solutionCounter.leftRowCheck++
                    if (solutionCounter.leftRowCheck === gameState.connect) {
                        gameState.winMessage()
                        break;
                    }
                }

            }
        }
        function checkRight() {
            for (let i = 1; i < gameState.connect; i++) {
                solutionIDXs.toTheRightIDX = gameBoardIDX.indexOf(gameState.lastClickEvent.column) + i
                if (solutionIDXs.toTheRightIDX >= gameState.connect + 3) {
                    break
                }
                let toTheRight = gameState.gameBoard[gameBoardIDX[solutionIDXs.toTheRightIDX]].get(gameState.lastClickEvent.slot)
                if (toTheRight !== gameState.turn) {
                    break
                } else {
                    solutionCounter.rightRowCheck++
                    if (solutionCounter.rightRowCheck === gameState.connect) {
                        gameState.winMessage()
                        break;
                    }
                }

            }
        }
        function checkDiagonalLowerLeft() {
            for (let i = 1; i < gameState.connect; i++) {
                //column to the left of the last placed token
                solutionIDXs.toTheLeftIDX = gameBoardIDX.indexOf(gameState.lastClickEvent.column) - i
                //invalid coordinate check
                if (solutionIDXs.toTheLeftIDX === -1) {
                    break
                }
                //vertical postion of the last placed token
                let verticalIdxArray = Array.from(gameState.gameBoard[gameBoardIDX[solutionIDXs.toTheLeftIDX]].keys())
                // the vertical idx of slot(s) below
                solutionIDXs.verticalIDX = verticalIdxArray.indexOf(gameState.lastClickEvent.slot) - i
                //invalid coordinate check
                if (solutionIDXs.verticalIDX === -1) {
                    break
                }

                // Lower check value
                let toTheLower = gameState.gameBoard[gameBoardIDX[solutionIDXs.toTheLeftIDX]].get(verticalIdxArray[solutionIDXs.verticalIDX])
                // console.log(toTheLower, "to the lower left Diag")
                // Lower left Win Check
                if (toTheLower !== gameState.turn) {
                    break
                } else {
                    solutionCounter.lowerLeftDiagCheck++
                    if (solutionCounter.lowerLeftDiagCheck === gameState.connect) {
                        gameState.winMessage()
                        break;
                    }
                }

            }
        }
        function checkDiagonalUpperLeft() {
            for (let i = 1; i < gameState.connect; i++) {
                //column to the left of the last placed token
                solutionIDXs.toTheLeftIDX = gameBoardIDX.indexOf(gameState.lastClickEvent.column) - i
                //invalid coordinate check
                if (solutionIDXs.toTheLeftIDX === -1) {
                    break
                }
                //vertical postion of the last placed token
                let verticalIdxArray = Array.from(gameState.gameBoard[gameBoardIDX[solutionIDXs.toTheLeftIDX]].keys())
                // the vertical idx of slot(s) above
                solutionIDXs.verticalIDX2 = verticalIdxArray.indexOf(gameState.lastClickEvent.slot) + i
                //invalid coordinate check
                if (solutionIDXs.verticalIDX2 > gameState.connect + 3) {
                    break
                }

                // Upper check value
                let toTheUpper = gameState.gameBoard[gameBoardIDX[solutionIDXs.toTheLeftIDX]].get(verticalIdxArray[solutionIDXs.verticalIDX2])
                // Upper left Win Check
                if (toTheUpper !== gameState.turn) {
                    break
                } else {
                    solutionCounter.upperLeftDiagCheck++
                    if (solutionCounter.upperLeftDiagCheck === gameState.connect) {
                        gameState.winMessage()
                        break;
                    }
                    // console.log(toTheUpper, 'to the upper left Diag')
                }
            }
        }
        function checkDiagonalLowerRight() {
            for (let i = 1; i < gameState.connect; i++) {
                //column to the left of the last placed token
                solutionIDXs.toTheRightIDX = gameBoardIDX.indexOf(gameState.lastClickEvent.column) + i
                
                //invalid coordinate check  
                if (solutionIDXs.toTheRightIDX >= gameState.connect + 3) {
                    break
                }
                //vertical postion of the last placed token
                let verticalIdxArray = Array.from(gameState.gameBoard[gameBoardIDX[solutionIDXs.toTheRightIDX]].keys())
                // the vertical idx of slot(s) below
                solutionIDXs.verticalIDX = verticalIdxArray.indexOf(gameState.lastClickEvent.slot) - i
                //invalid coordinate check
                if (solutionIDXs.verticalIDX === -1) {
                    break
                }

                // Lower check value
                let toTheLower = gameState.gameBoard[gameBoardIDX[solutionIDXs.toTheRightIDX]].get(verticalIdxArray[solutionIDXs.verticalIDX])
                // console.log(toTheLower, "to the lower right Diag")
                // Lower Right Win Check
                if (toTheLower !== gameState.turn) {
                    break
                } else {
                    solutionCounter.lowerRightDiagCheck++
                    if (solutionCounter.lowerRightDiagCheck === gameState.connect) {
                        gameState.winMessage()
                        break;
                    }
                }

            }
        }
        function checkDiagonalUpperRight() {
            for (let i = 1; i < gameState.connect; i++) {
                //column to the left of the last placed token
                solutionIDXs.toTheRightIDX = gameBoardIDX.indexOf(gameState.lastClickEvent.column) + i
                //invalid coordinate check
                if (solutionIDXs.toTheRightIDX > gameState.connect + 2) {
                    break
                }
                //vertical postion of the last placed token
                let verticalIdxArray = Array.from(gameState.gameBoard[gameBoardIDX[solutionIDXs.toTheRightIDX]].keys())
                // the vertical idx of slot(s) above
                solutionIDXs.verticalIDX2 = verticalIdxArray.indexOf(gameState.lastClickEvent.slot) + i
                //invalid coordinate check
                if (solutionIDXs.verticalIDX2 >= gameState.connect + 3) {
                    break
                }

                // Upper check value
                let toTheUpper = gameState.gameBoard[gameBoardIDX[solutionIDXs.toTheRightIDX]].get(verticalIdxArray[solutionIDXs.verticalIDX2])
                // Upper Right Win Check
                if (toTheUpper !== gameState.turn) {
                    break
                } else {
                    solutionCounter.upperRightDiagCheck++
                    if (solutionCounter.upperRightDiagCheck === gameState.connect) {
                        gameState.winMessage()
                        break;
                    }
                    // console.log(toTheUpper, 'to the upper Right Diag')
                }
            }
        }

        // ** function calls
        checkVertical()
        checkLeft()
        checkRight()
        checkDiagonalLowerLeft()
        checkDiagonalUpperLeft()
        checkDiagonalLowerRight()
        checkDiagonalUpperRight()
        
    },
    winMessage: function () {
        if (gameState.turn === 'red'){
         gameState.gameStatus = gameState.player1Name + ' Wins!'               
        } else {
            gameState.gameStatus = gameState.player2Name + ' Wins!'     
        }
        //clear game board
        visBoard.innerHTML = null
        //creates Win Screen and Reset Button
        let visWinScreen = document.createElement('div')
        visWinScreen.classList.add('styleWinScreen')
        visBoard.appendChild(visWinScreen)
        let visWinMessage = document.createElement('div')
        visWinMessage.classList.add('styleWinMessage')
        visWinMessage.innerText = gameState.gameStatus
        visWinScreen.appendChild(visWinMessage)
        visResetButton = document.createElement('button')
        visResetButton.classList.add('styleReset')
        visResetButton.innerText = "New Game?"
        visResetButton.addEventListener ('click', () => gameState.setGameBoard())  
        visWinScreen.appendChild(visResetButton)
    }
    
    
}
// console.log(gameState.gameBoard)

// **** Set Game Size ****
//dropdown game-size listener
dropSelection.addEventListener("change", async function changeList (event) {

        gameState.connect = Number(event.target.value)
        gameState.setGameBoard()
                
}),
    // function call to set game size
    

// place token click listener
visBoard.addEventListener(`click`, async function (event) {
    //value is the ID of the column at the click event
    // *****************slice band-aid+++++ revisit later
    gameState.lastClickEvent.column = await event.target.id.slice(0, 7)
    //--
    gameState.placeGameToken()

    gameState.checkForWinner()
    if (gameState.turn === gameState.players[0]) {
        gameState.turn = gameState.players[1]
        gameState.gameStatus = gameState.player2Name + `'s` + ` turn`
    } else {
        gameState.turn = gameState.players[0]
        gameState.gameStatus = gameState.player1Name + `'s` + ` turn`
    }
        
    visGameStatus.innerText = gameState.gameStatus
})

function player1Input() {

    gameState.player1Name = document.getElementById("Player1").value
    console.log(gameState.player1Name)
    
}

function player2Input() {

    gameState.player2Name = document.getElementById("Player2").value
    console.log(gameState.player2Name)
    
}

