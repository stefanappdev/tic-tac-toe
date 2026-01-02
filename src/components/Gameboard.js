"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("../styles/board.css");
//import {Player} from './interfaces/Player.tsx'
var Gameboard = function () {
    var X = {
        symbol: 'X',
        squaresPlayed: [],
    };
    var O = {
        symbol: 'O',
        squaresPlayed: [],
    };
    var _a = (0, react_1.useState)(false), gameStart = _a[0], setGameStart = _a[1];
    var _b = (0, react_1.useState)(false), gameEnd = _b[0], setGameEnd = _b[1];
    var _c = (0, react_1.useState)(false), displayMsg = _c[0], setDisplayMsg = _c[1];
    var _d = (0, react_1.useState)(null), theWinner = _d[0], setTheWinner = _d[1];
    var _e = (0, react_1.useState)(X), Xplayer = _e[0], setXPlayer = _e[1];
    var _f = (0, react_1.useState)(O), Oplayer = _f[0], setOPlayer = _f[1];
    var _g = (0, react_1.useState)(Xplayer), currentPlayer = _g[0], setCurrentPlayer = _g[1];
    var _h = (0, react_1.useState)([
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
    ]), squares = _h[0], setSquares = _h[1];
    var winningSets = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [3, 5, 7],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
    ];
    var handleStart = function () {
        //controls action of game on startup
        setGameStart(true);
        setDisplayMsg("Its ".concat(currentPlayer.symbol, "'s turn"));
    };
    var changePlayerTurn = function () {
        //changes player turns 
        if (theWinner === null) {
            if (currentPlayer.symbol === 'O') {
                setCurrentPlayer(Xplayer);
                setDisplayMsg("Its X's turn");
            }
            else if (currentPlayer.symbol === 'X') {
                setCurrentPlayer(Oplayer);
                setDisplayMsg("Its O's turn");
            }
        }
    };
    var congratulate = function () {
        //congratulates the winner
        if (theWinner !== null) {
            setDisplayMsg("".concat(theWinner.symbol, " won"));
            setGameEnd(true);
        }
    };
    var gameDraw = function () {
        //checks for draw in a match
        if (squares.every(function (sq) { return sq.data !== ''; }) && theWinner !== null) {
            return true;
        }
        return false;
    };
    var foundAWinner = function () {
        //checks for a winner if theres any
        var foundwinner = false;
        winningSets.forEach(function (winningSet) {
            var matchedsquares = squares.filter(function (matchedsq) { return winningSet.includes(matchedsq.id); });
            if (matchedsquares.every(function (matchedsq) { return matchedsq.data === 'O'; })) {
                foundwinner = true;
            }
            else if (matchedsquares.every(function (matchedsq) { return matchedsq.data === 'X'; })) {
                foundwinner = true;
            }
        });
        return foundwinner;
    };
    var handleReset = function () {
        //performs reset of game 
        setGameStart(false);
        setGameEnd(false);
        setDisplayMsg("");
        setCurrentPlayer(Xplayer);
        setTheWinner(null);
        squares.forEach(function (square) {
            square.data = '';
        });
        setSquares(function (prevSquares) { return __spreadArray([], prevSquares, true); });
    };
    var handleBoardUpdate = function (id) {
        //controls updating of square on tic-tac-toe board
        //allow players to play their symbols while game in progress
        var gameShouldContinue = function () {
            if (!foundAWinner() && gameDraw()) {
                setDisplayMsg("it's a draw");
                setGameEnd(true);
                setTheWinner(null);
                return false;
            }
            else if (foundAWinner()) {
                setDisplayMsg("".concat(currentPlayer.symbol, " wins"));
                setGameEnd(true);
                setTheWinner(currentPlayer);
                return false;
            }
            return true;
        };
        if (gameStart && !gameEnd) {
            var square = squares.find(function (square) { return square.id === id; });
            if (square.data === '') {
                square.data = currentPlayer.symbol;
                setSquares(function (prevSquares) { return __spreadArray([], prevSquares, true); });
                if (currentPlayer.symbol === 'X') {
                    changePlayerTurn();
                    var newsquaresPlayed_1 = __spreadArray(__spreadArray([], currentPlayer.squaresPlayed, true), [square.id], false);
                    setXPlayer(function (prevXplayer) {
                        return __assign(__assign({}, prevXplayer), { squaresPlayed: newsquaresPlayed_1 });
                    });
                }
                else if (currentPlayer.symbol === 'O') {
                    changePlayerTurn();
                    var newsquaresPlayed_2 = __spreadArray(__spreadArray([], currentPlayer.squaresPlayed, true), [square.id], false);
                    setOPlayer(function (prevOplayer) {
                        return __assign(__assign({}, prevOplayer), { squaresPlayed: newsquaresPlayed_2 });
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
    var boardSquares = squares.map(function (square) {
        return <div key={square.id} onClick={function () { return handleBoardUpdate(square.id); }} className='boardsquare'>
 		{square.data}		
		</div>;
    });
    return <div id='gamespace'>

 
 	{displayMsg ? <h1 className='notification'>{displayMsg}</h1> : ''}

	{<div id='gameboard'>{boardSquares}</div>}

    {gameStart ? <button onClick={handleReset}>reset</button> : ""}

    {!gameStart ? <button onClick={handleStart}>start</button> : ''}
    </div>;
};
exports.default = Gameboard;
