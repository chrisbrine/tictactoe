import OIcon from "../tictactoe/oicon";
import XIcon from "../tictactoe/xicon";

export default function Turn({
  winner,
  inGame,
  player,
  resetGame
}: {
  winner: -0 | 1 | 2 | null,
  inGame: boolean,
  player: 1 | 2,
  resetGame: () => void
}) {
  return (
    <div className="h-20">
      {winner === 0 && !inGame && <h1 className="text-3xl font-bold text-[#f0f0f0]">It&apos;s a draw!</h1>}
      {winner === 1 && !inGame &&
        <h1 className="text-3xl flex font-bold text-[#f0f0f0]"><XIcon /><span>&nbsp;&nbsp;wins!</span></h1>
      }
      {winner === 2 && !inGame && 
        <h1 className="text-3xl flex font-bold text-[#f0f0f0]"><OIcon /><span>&nbsp;&nbsp;wins!</span></h1>
        }
      {inGame && <h1 className="text-3xl flex font-bold text-[#f0f0f0]">
        {player === 1 ? <XIcon /> : <OIcon />}
        <span>&apos;s turn</span>
      </h1>}
      {/* {!inGame &&
        <button onClick={resetGame} className="px-4 py-2 my-4 bg-[#1f3540] rounded-xl shadow-md text-[#f0f0f0] font-bold text-lg active:scale-95 transition duration-200 ease-in hover:bg-[#18272e]">
          Play again
        </button>} */}
    </div>
  );
}