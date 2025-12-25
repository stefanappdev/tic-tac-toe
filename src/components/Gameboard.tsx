import {useState} from 'react'
import '../styles/board.css'

const Gameboard=()=>{

interface Player{
	symbol:string,
	iswinner:boolean
}


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




 let boardSquares=squares.map(square=>{

 	return <div key={square.id} className='boardsquare'>
 		{square.data}		
		</div>
		
		})


const handleStart=()=>{
	setHasStarted(true)
}

const handleReset=()=>{
	setHasStarted(false)
}

let displayMsg=''

if(player.myturn){
	displayMsg=`Current player turn: ${player.symbol}`
}

return <div id='gamespace'>

 
 	{hasStarted&&<h1 className='notification'>{displayMsg}</h1>}

	{hasStarted&& <div id='gameboard'>{boardSquares}</div>}

    {hasStarted?<button onClick={handleReset}>reset</button>:<button onClick={handleStart}>start</button>}
</div>

}	

export default Gameboard;