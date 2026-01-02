import {useState,useRef} from 'react'
import '../styles/board.css'
//import {Player} from './interfaces/Player.tsx'

const Gameboard=()=>{

 interface Player{
  symbol:string,
  squaresPlayed:number[],
}


	let X:Player={
		symbol:'X',
		squaresPlayed:[],
	}


	let O:Player={
		symbol:'O',
		squaresPlayed:[],

	}

const[gameStart,setGameStart]=useState(false)
const [gameEnd,setGameEnd]=useState(false)
const[displayMsg,setDisplayMsg]=useState(false)
const[theWinner,setTheWinner]=useState(null)
const[Xplayer,setXPlayer]=useState(X)

const[Oplayer,setOPlayer]=useState(O)

const [currentPlayer,setCurrentPlayer]=useState(Xplayer)

const [squares,setSquares]=useState([
{
	id:1,data:''
},
{
	id:2,data:''
},
{
	id:3,data:''
},
{
	id:4,data:''
},
{
	id:5,data:''
},
{
	id:6,data:''
},
{
	id:7,data:''
},
{
	id:8,data:''
},
{
	id:9,data:''
},

])



let winningSets=[

	[1,2,3],
	[4,5,6],
	[7,8,9],
	[1,5,9],
	[3,5,7],
	[1,4,7],
	[2,5,8],
	[3,6,9]
]



const handleStart=():void=>{

//controls action of game on startup

setGameStart(true)
setDisplayMsg(`Its ${currentPlayer.symbol}'s turn`)


}


const changePlayerTurn=():void=>{

	//changes player turns 
    if(theWinner===null){
		  if(currentPlayer.symbol==='O'){
		  	 setCurrentPlayer(Xplayer)
		  	setDisplayMsg(`Its X's turn`)
		  }else if(currentPlayer.symbol==='X'){
		  	setCurrentPlayer(Oplayer)
		  	setDisplayMsg(`Its O's turn`)
		  }
	} 



}


	
const congratulate=():void=>{
	//congratulates the winner
	if(theWinner!==null){
	setDisplayMsg(`${theWinner.symbol} won`)
	setGameEnd(true)
	}

}


 const gameDraw=():boolean=>{
  	//checks for draw in a match

  	if( squares.every(sq=>sq.data!=='') ){
  		return true
  	}

  	return false
  } 




const foundAWinner=():boolean=>{
  
 //checks for a winner if theres any
 let foundwinner:boolean=false;





  	winningSets.forEach(winningSet=>{

  		let matchedsquares=squares.filter(matchedsq=>winningSet.includes(matchedsq.id))
  		if( matchedsquares.every(matchedsq=>matchedsq.data==='O') ){
  			
  			foundwinner=true
  			
  			
  		}else if( matchedsquares.every(matchedsq=>matchedsq.data==='X') ){
  		
  			foundwinner=true
  			
  		}
  	})

    return foundwinner
}



const handleReset=():void=>{

	//performs reset of game 
	setGameStart(false)
	setGameEnd(false)
	setDisplayMsg("")
	setCurrentPlayer(Xplayer)
	setTheWinner(null)
	squares.forEach(square=>{
		square.data='';
	})
	setSquares(prevSquares=>[...prevSquares])
}


const handleBoardUpdate=(id:number)=>{
		
		//controls updating of square on tic-tac-toe board
	    //allow players to play their symbols while game in progress



	const gameShouldContinue=():boolean=>{

		/*stops the game if there's a winner or
		if the game draws or continues until a winner is found*/

		if (!foundAWinner()&&gameDraw()){
				
				setDisplayMsg("it's a draw")
	  			setGameEnd(true)
	  			setTheWinner(null)
	  			return false
				
			}

		else if(foundAWinner()){
  
				setDisplayMsg(`${currentPlayer.symbol} wins`)
	  			setGameEnd(true)
	  			setTheWinner(currentPlayer)
	  			return false

			}


		return true
	}

    

	if(gameStart&&!gameEnd){
	
	let square=squares.find(square=>square.id===id)

      
	if(square.data===''){

					square.data=currentPlayer.symbol;
					setSquares(prevSquares=>[...prevSquares])
					if (currentPlayer.symbol==='X'){

						changePlayerTurn()
						let newsquaresPlayed=[...currentPlayer.squaresPlayed,square.id]
						setXPlayer(prevXplayer=>{
							return {...prevXplayer,squaresPlayed:newsquaresPlayed}

						})

						

						
					}else if (currentPlayer.symbol==='O'){
						changePlayerTurn()
						let newsquaresPlayed=[...currentPlayer.squaresPlayed,square.id]
						
						setOPlayer(prevOplayer=>{
							return {...prevOplayer,squaresPlayed:newsquaresPlayed}
						})
						
						

					}

		}else{return}	



     //check if game was won, drawed or if it should continue each time a square is clicked

		if (!gameShouldContinue()){
			return
		}


	}


}



 let boardSquares=squares.map(square=>{

 	return <div key={square.id} onClick={()=>handleBoardUpdate(square.id)} className='boardsquare'>
 		{square.data}		
		</div>
		
		})






return <div id='gamespace'>

 
 	{displayMsg?<h1 className='notification'>{displayMsg}</h1>:''}

	{<div id='gameboard'>{boardSquares}</div>}



	<div id='board-controls'>
	    {gameStart?<button className='board-btn' id='reset-btn' onClick={handleReset}>reset</button>:""}

	    {!gameStart?<button className='board-btn' id='start-btn' onClick={handleStart}>start</button>:''}
   </div>
</div>

}	

export default Gameboard;