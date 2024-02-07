'use client';
import Title from "./components/title/title";
import Board from "./components/tictactoe/board";
import Turn from "./components/turn/turn";
import Scores from "./components/scores/scores";
import {
  TicTacToeBoard,
  startBoard,
  checkWinner,
  checkDraw,
  miniMaxSelectAI,
} from "@/app/types/tictactoe";
import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [board, setBoard] = useState<TicTacToeBoard>(startBoard);
  const [winner, setWinner] = useState<-0 | 1 | 2 | null>(null);
  const [playerScore, setPlayerScore] = useState<[number, number, number]>([0, 0, 0]);
  const [playerAI, setPlayerAI] = useState<[boolean, boolean]>([false, false]);
  const [inGame, setInGame] = useState<boolean>(true);
  const [player, setPlayer] = useState<1 | 2>(1);

    const togglePlayer = useCallback(() => {
      const newPlayer = player === 1 ? 2 : 1;
      setPlayer(newPlayer);
      // if (playerAI[newPlayer - 1]) {
      //   aiMove(newPlayer);
      // }
  }, [player]); // Add an empty array as the second argument to useCallback.

  const checkGame = useCallback((board: TicTacToeBoard) => {
    const winner = checkWinner(board);
    if (winner !== null) {
      setWinner(winner);
      setPlayerScore((prev) => {
        const newScore: [number, number, number] = [...prev];
        newScore[winner]++;
        return newScore;
      });
      setInGame(false);
    } else if (checkDraw(board)) {
      setWinner(0);
      setPlayerScore((prev) => {
        const newScore: [number, number, number] = [...prev];
        newScore[0]++;
        return newScore;
      });
      setInGame(false);
    }
  }, []);

  const move = async (row: number, col: number) => {
    if (board[row][col] === 0) {
      const newBoard: TicTacToeBoard = [...board];
      newBoard[row] = [...newBoard[row]];
      newBoard[row][col] = player;
      await setBoard(newBoard);
      togglePlayer();
      checkGame(newBoard);
    }
  };

  const resetGame = () => {
    setBoard(startBoard);
    setWinner(null);
    setInGame(true);
    setPlayer(1);
  }

  const aiMove = (player: 1 | 2) => {
    const [row, col] = miniMaxSelectAI(board, player);
    const newBoard: TicTacToeBoard = [...board];
    newBoard[row] = [...newBoard[row]];
    newBoard[row][col] = player;
    setBoard(newBoard);
    togglePlayer();
    checkGame(newBoard);

  }

  const togglePlayerAI = (currentPlayer: 1 | 2) => {
    const newPlayerAI: [boolean, boolean] = [...playerAI];
    newPlayerAI[currentPlayer - 1] = !newPlayerAI[currentPlayer - 1];
    setPlayerAI(newPlayerAI);
    // if (currentPlayer === player) {
    //   aiMove(currentPlayer);
    // }
  };

  useEffect(() => {
    if (inGame && winner === null && playerAI[player - 1]) {
      // aiMove(player);
      const [row, col] = miniMaxSelectAI(board, player);
      const newBoard: TicTacToeBoard = [...board];
      newBoard[row] = [...newBoard[row]];
      newBoard[row][col] = player;
      setBoard(newBoard);
      togglePlayer();
      checkGame(newBoard);
    }
  }, [board, togglePlayer, playerAI, player, inGame, winner, checkGame]);

  return (
    <main className='flex min-h-screen flex-col items-center bg-[#1e1f29]'>
      <Title />
      <Scores scores={playerScore} />
      <div className="h-4">
        <button onClick={resetGame} className="px-4 py-2 my-2 bg-[#1f3540] rounded-xl shadow-md text-[#f0f0f0] font-bold text-lg active:scale-95 transition duration-200 ease-in hover:bg-[#18272e]">
          Reset Game
        </button>
      </div>
      {/* Select AI */}
      <Board board={board} inGame={inGame} move={move} isUser={true} />
      <Turn winner={winner} inGame={inGame} player={player} resetGame={resetGame} />
      <div className="h-4">
        <button onClick={() => togglePlayerAI(1)} className="px-4 py-2 my-4 mx-4 bg-[#1f3540] rounded-xl shadow-md text-[#f0f0f0] font-bold text-lg active:scale-95 transition duration-200 ease-in hover:bg-[#18272e]">
          {playerAI[0] ? 'Disable' : 'Enable'} Computer for X
        </button>
        <button onClick={() => togglePlayerAI(2)} className="px-4 py-2 my-4 mx-4 bg-[#1f3540] rounded-xl shadow-md text-[#f0f0f0] font-bold text-lg active:scale-95 transition duration-200 ease-in hover:bg-[#18272e]">
          {playerAI[1] ? 'Disable' : 'Enable'} Computer for O
        </button>
      </div>
    </main>
  );
}
