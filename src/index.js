import {React,useState,useRef} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import sound from './bloop.mp3';


//Square comp for board - body/Board/Square
const Square = (props) => {
  const audio = new Audio();
  audio.src = sound;
  function playSoundOnClick() {
    audio.play();
  }
  return (
    <div >
    <button className='Square' onClick={props.onClickEvent} >
      {props.value}{playSoundOnClick()}
    </button>
    </div>

    
  )
}


//Board Of App - body/Board
const Board = () => {
  const audioRef = useRef(null);
  const initialSquares =Array(9).fill(null)
  const [squares,setSquares] = useState(initialSquares);
  const [xIsNext,setxIsNext] = useState(true);  


  const handleClickEvent = (i) => {
    const newSquares = [...squares];      //1. Make a copy of square state array

    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squareFilled){
        return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';                  //2. Update the copy, setting the i-th element to 'x'
    setSquares(newSquares);               //3. Call the set Squares function with the updated copy
    setxIsNext(!xIsNext);


  }

  //To Render and get Index of the Square
  const renderSquare = (i) => {
    return (
      <div>
        <Square value={squares[i]} onClickEvent={ () => handleClickEvent(i) } />
      </div>
    )
  }

  const winner = calculateWinner(squares);
        // winner = setSquares(initialSquares);
  const status = winner ?
  `Winner: ${winner}` :
  `Next Player:  ${+ xIsNext ? 'X' : 'O'}`;

  return  (
    <div className='status glow'>
     <div>
         {status}
     </div>
      <div className='boardRow'>
          {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className='boardRow'>
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className='boardRow'>
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
      <button onClick={() => setSquares(initialSquares)} className='game-button orange'>Restart</button>
    </div>
  )
}

//Body Of App
const Game = () => {
  return (
    <div className='Game'>
       Tic-Tac-Toe 
      <Board />
    </div>
  );
};

ReactDOM.render (
  <Game />,
  document.getElementById('root')
)
function calculateWinner(squares) {
  const lines = [
    [0,1,3],[3,4,5],[6,7,8], //rows
    [0,3,6],[1,4,7],[2,5,8], //columns
    [0,4,8],[2,4,6],[,,]  //diagonals
  ];

  for (let line of lines) {
    const [ a, b, c ] = line;
    if ( squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]; // 'X' or 'O'
    }
  }

  return null;
}
