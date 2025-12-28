import {useState,useRef} from 'react'
import '../styles/board.css'
//import {Player} from './interfaces/Player.tsx'

const Gameboard=()=>{

 interface Player{
  symbol:string,
  iswinner:boolean,
  squaresPlayed:integer[],
}

const squareRef=useRef(null)

let Oplayer:Player={
	symbol:'O',
	iswinner:false,
	squaresPlayed:[]
}

let Xplayer:Player={
	symbol:'X',
	iswinner:false,
	squaresPlayed:[]

}


const [currentPlayer,setCurrentPlayer]=useState(Xplayer)
const[X_player,setXPlayer]=useState(Xplayer)
const[O_player,setOPlayer]=useState(Oplayer)
const[displayMsg,setDisplayMsg]=useState('')
const [isTheWinner,setIsTheWinner]=useState(null)
const [hasStarted,setHasStarted]=useState(false)
const [boardisFull,setBoardisFull]=useState(false)
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
	setHasStarted(true);
	changePlayerTurn(X_player)
	


}


const changePlayerTurn=(newPlayer:Player):void=>{

	  let boardisFull:boolean=squares.every(sq=>sq.data!=='');

	  if(!boardisFull){
      setCurrentPlayer(newPlayer);
      setDisplayMsg(`it's ${newPlayer.symbol}'s turn`)
      }else if(boardisFull){
      
      		return
      }
}


const checkwhoWon=():void=>{

	
	winningSets.forEach(winningSet=>{
		if (winningSet.every(winningSq=>X_player.squaresPlayed.includes(winningSq))){
			setIsTheWinner(X_player)
			setDisplayMsg('X wins!')
			}
		})	


	winningSets.forEach(winningSet=>{
		if (winningSet.every(winningSq=>O_player.squaresPlayed.includes(winningSq))){
			 setIsTheWinner(O_player)
			 setDisplayMsg('O wins!')
			}
		})	
			
	
	
	if(isTheWinner===null){

		currentPlayer===O_player?changePlayerTurn(X_player):changePlayerTurn(O_player)
	}
	
}



const handleReset=():void=>{
	setHasStarted(false);
	setDisplayMsg('')
	squares.map(sq=>sq.data='');
	setSquares(prevSquares=>[...prevSquares])
	setIsTheWinner(null)
	setOPlayer(prevOplayerState=>{
		return{
			...prevOplayerState,
			squaresPlayed:[]
		}
	})

	setXPlayer(prevXplayerState=>{
		return{
			...prevXplayerState,
			squaresPlayed:[],
		}
	})

}


const handleSquareUpdate=(id:number)=>{
		let target=squares.map(sq=>{
			if(sq.id!==id){
				return
			}else{

			if(sq.data===''){
					sq.data=currentPlayer.symbol;
					
					if(currentPlayer.symbol==='X'){
						
						setXPlayer(prevXplayerState=>{

							let cpy=[...prevXplayerState['squaresPlayed'],sq.id]

							return {...prevXplayerState,squaresPlayed:cpy}
						})

						
					}else{
						
						setOPlayer(prevOplayerState=>{
							let cpy=[...prevOplayerState['squaresPlayed'],sq.id]

							return {...prevOplayerState,squaresPlayed:cpy}
						})

					}

			}else{
				return
			}

			}
		})

	setSquares(prevSquares=>[...prevSquares])
	
	
	checkwhoWon()


}



 let boardSquares=squares.map(square=>{

 	return <div key={square.id} onClick={()=>handleSquareUpdate(square.id)} className='boardsquare'>
 		{square.data}		
		</div>
		
		})






return <div id='gamespace'>

 
 	{displayMsg?<h1 className='notification'>{displayMsg}</h1>:''}

	{hasStarted&& <div id='gameboard'>{boardSquares}</div>}

    {hasStarted?<button onClick={handleReset}>reset</button>:<button onClick={handleStart}>start</button>}
</div>

}	

export default Gameboard;