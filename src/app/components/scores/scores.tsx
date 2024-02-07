import XIcon from "../tictactoe/xicon";
import OIcon from "../tictactoe/oicon";

export default function scores({
  scores,
} : {
  scores: [number, number, number]
}) {
  const [draws, player1, player2] = scores;
  return (
    <div className="flex items-center py-12 justify-center h-16 w-full bg-[#0b3d3a] text-[#ffffff] text-4xl font-bold">
      <h1 className='flex'><XIcon />: {player1} |&nbsp;<OIcon />: {player2} | Tie: {draws}</h1>
    </div>
  )
}