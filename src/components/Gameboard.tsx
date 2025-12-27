import {useState,useRef} from 'react'
import '../styles/board.css'
//import {Player} from './interfaces/Player.tsx'

const Gameboard=()=>{

 interface Player{
  symbol:string,
  iswinner:boolean
}

const squareRef=useRef(null)

let Oplayer:Player={
	symbol:'O',
	iswinner:false,
	myturn:false
}

let Xplayer:Player={
	symbol:'X',
	iswinner:false,
	myturn:true
}


const [player,setPlayer]=useState(Xplayer)
const [hasStarted,setHasStarted]=useState(false)
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



let winningSquares={
	across:[[1,2,3],[4,5,6],[7,8,9]],
	diagonal:[[1,5,9],[3,5,7]],
}


const handleStart=():void=>{
	
	setHasStarted(true);
	
}




const handleReset=():void=>{
	setHasStarted(false);
	squares.map(sq=>sq.data='');
	setSquares(prevSquares=>[...prevSquares])
	setPlayer(Xplayer)
}


const handleSquareUpdate=(id:number)=>{
		let target=squares.map(sq=>{
			if(sq.id!==id){
				return
			}else{

			if(sq.data===''){
					sq.data=player.symbol;
					
					if(player.symbol==='X'){
						player.myturn=false;
						setPlayer(Oplayer)
					}else{
						setPlayer(Xplayer)
					}

			}else{
				return
			}

			}
		})
	
	setSquares(prevSquares=>[...prevSquares])


}



 let boardSquares=squares.map(square=>{

 	return <div key={square.id} onClick={()=>handleSquareUpdate(square.id)} className='boardsquare'>
 		{square.data}		
		</div>
		
		})


let displayMsg=''

displayMsg=`Current player turn: ${player.symbol==='X'?'X':'O'}`


return <div id='gamespace'>

 
 	{hasStarted&&<h1 className='notification'>{displayMsg}</h1>}

	{hasStarted&& <div id='gameboard'>{boardSquares}</div>}

    {hasStarted?<button onClick={handleReset}>reset</button>:<button onClick={handleStart}>start</button>}
</div>

}	

export default Gameboard;