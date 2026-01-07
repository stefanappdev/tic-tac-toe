"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("../styles/board.css");
//import {Player} from './interfaces/Player.tsx'
const Gameboard = () => {
    let X = {
        symbol: 'X',
        squaresPlayed: [],
    };
    let O = {
        symbol: 'O',
        squaresPlayed: [],
    };
    const [gameStart, setGameStart] = (0, react_1.useState)(false);
    const [gameEnd, setGameEnd] = (0, react_1.useState)(false);
    const [displayMsg, setDisplayMsg] = (0, react_1.useState)(false);
    const [theWinner, setTheWinner] = (0, react_1.useState)(null);
    const [Xplayer, setXPlayer] = (0, react_1.useState)(X);
    const [Oplayer, setOPlayer] = (0, react_1.useState)(O);
    const [currentPlayer, setCurrentPlayer] = (0, react_1.useState)(Xplayer);
    const [squares, setSquares] = (0, react_1.useState)([
        {
            id: 1, data: ''
        },
        {
            id: 2, data: ''
        },
        {
            id: 3, data: ''
        },
        {
            id: 4, data: ''
        },
        {
            id: 5, data: ''
        },
        {
            id: 6, data: ''
        },
        {
            id: 7, data: ''
        },
        {
            id: 8, data: ''
        },
        {
            id: 9, data: ''
        },
    ]);
    let winningSets = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [3, 5, 7],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
    ];
    const handleStart = () => {
        //controls action of game on startup
        setGameStart(true);
        setDisplayMsg(`Its ${currentPlayer.symbol}'s turn`);
    };
    const changePlayerTurn = () => {
        //changes player turns 
        if (theWinner === null) {
            if (currentPlayer.symbol === 'O') {
                setCurrentPlayer(Xplayer);
                setDisplayMsg(`Its X's turn`);
            }
            else if (currentPlayer.symbol === 'X') {
                setCurrentPlayer(Oplayer);
                setDisplayMsg(`Its O's turn`);
            }
        }
    };
    const congratulate = () => {
        //congratulates the winner
        if (theWinner !== null) {
            setDisplayMsg(`${theWinner.symbol} won`);
            setGameEnd(true);
        }
    };
    const gameDraw = () => {
        //checks for draw in a match
        if (squares.every(sq => sq.data !== '')) {
            return true;
        }
        return false;
    };
    const foundAWinner = () => {
        //checks for a winner if theres any
        let foundwinner = false;
        winningSets.forEach(winningSet => {
            let matchedsquares = squares.filter(matchedsq => winningSet.includes(matchedsq.id));
            if (matchedsquares.every(matchedsq => matchedsq.data === 'O')) {
                foundwinner = true;
            }
            else if (matchedsquares.every(matchedsq => matchedsq.data === 'X')) {
                foundwinner = true;
            }
        });
        return foundwinner;
    };
    const handleReset = () => {
        //performs reset of game 
        setGameStart(false);
        setGameEnd(false);
        setDisplayMsg("");
        setCurrentPlayer(Xplayer);
        setTheWinner(null);
        squares.forEach(square => {
            square.data = '';
        });
        setSquares(prevSquares => [...prevSquares]);
    };
    const handleBoardUpdate = (id) => {
        //controls updating of square on tic-tac-toe board
        //allow players to play their symbols while game in progress
        const gameShouldContinue = () => {
            /*stops the game if there's a winner or
            if the game draws or continues until a winner is found*/
            if (!foundAWinner() && gameDraw()) {
                setDisplayMsg("it's a draw");
                setGameEnd(true);
                setTheWinner(null);
                return false;
            }
            else if (foundAWinner()) {
                setDisplayMsg(`${currentPlayer.symbol} wins`);
                setGameEnd(true);
                setTheWinner(currentPlayer);
                return false;
            }
            return true;
        };
        if (gameStart && !gameEnd) {
            let square = squares.find(square => square.id === id);
            if (square.data === '') {
                square.data = currentPlayer.symbol;
                setSquares(prevSquares => [...prevSquares]);
                if (currentPlayer.symbol === 'X') {
                    changePlayerTurn();
                    let newsquaresPlayed = [...currentPlayer.squaresPlayed, square.id];
                    setXPlayer(prevXplayer => {
                        return { ...prevXplayer, squaresPlayed: newsquaresPlayed };
                    });
                }
                else if (currentPlayer.symbol === 'O') {
                    changePlayerTurn();
                    let newsquaresPlayed = [...currentPlayer.squaresPlayed, square.id];
                    setOPlayer(prevOplayer => {
                        return { ...prevOplayer, squaresPlayed: newsquaresPlayed };
                    });
                }
            }
            else {
                return;
            }
            //check if game was won, drawed or if it should continue each time a square is clicked
            if (!gameShouldContinue()) {
                return;
            }
        }
    };
    let boardSquares = squares.map(square => {
        return (0, jsx_runtime_1.jsx)("div", { onClick: () => handleBoardUpdate(square.id), className: 'boardsquare', children: square.data }, square.id);
    });
    return (0, jsx_runtime_1.jsxs)("div", { id: 'gamespace', children: [displayMsg ? (0, jsx_runtime_1.jsx)("h1", { className: 'notification', children: displayMsg }) : '', (0, jsx_runtime_1.jsx)("div", { id: 'gameboard', children: boardSquares }), (0, jsx_runtime_1.jsxs)("div", { id: 'board-controls', children: [gameStart ? (0, jsx_runtime_1.jsx)("button", { className: 'board-btn', id: 'reset-btn', onClick: handleReset, children: "reset" }) : "", !gameStart ? (0, jsx_runtime_1.jsx)("button", { className: 'board-btn', id: 'start-btn', onClick: handleStart, children: "start" }) : ''] })] });
};
exports.default = Gameboard;
