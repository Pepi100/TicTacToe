import React, {useState} from "react";
import './App.css';

import {Board} from './Components/Board';
import { ScoreBoard } from "./Components/ScoreBoard";

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(false);
  const [scores, setScores] = useState({xScore: 0, oScore: 0});

  const handeBoxClick = (boxIdx) => {

    const updatedBoard = board.map((value, idx) => {
      if(idx === boxIdx && value === null ){
        setXPlaying(!xPlaying);
        return xPlaying === true ? "X" : "O";
      }else{
        return value;
      }
    })

    const win = checkWinner(updatedBoard);

    if(win){
      if(win === "O"){
        setScores(prevScores => ({
          ...prevScores,       // Keep the existing properties of scores
          oScore: prevScores.oScore + 1  // Increment oScore by 1
        }));
        
      }else{
        setScores(prevScores => ({
          ...prevScores,       // Keep the existing properties of scores
          xScore: prevScores.xScore + 1  // Increment oScore by 1
        })); 
      }

      //clear table

    }

    setBoard(updatedBoard);
    

  }

  const checkWinner = () => {
    // check diagonals
    if((board[0] === board[4] && board[4] === board[8]) || (board[2] === board[4] && board[4] === board[6]))
      return board[4];
    
    //check columns
    for(let i = 0; i<=2; i++){
      if(board[i] === board[i+3] && board[i+3] === board[i+6])
        return board[i];
    }

    //check rows
    for(let i = 0; i<=6; i+=3){
      if(board[i] === board[i+1] && board[i+1] === board[i+2])
        return board[i];
    }

      return null;
  }

  return (
    <div className="App">
      <ScoreBoard xPlaying = {xPlaying} scores = {scores}></ScoreBoard>
      <Board board = {board} onClick={handeBoxClick}> </Board>
    </div>
  );
}

export default App;
