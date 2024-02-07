import OIcon from "./oicon";
import XIcon from "./xicon";
import BlankIcon from "./blankicon";

const selectableClasses = "flex h-[90px] w-[90px] md:h-[100px] md:w-[100px] items-center justify-center bg-[#1f3540] rounded-2xl shadow-md active:scale-125 transition duration-200 ease-in hover:bg-[#18272e] shadow-gray-400/30";
const notSelectableClasses = "flex h-[90px] w-[90px] md:h-[100px] md:w-[100px] items-center justify-center bg-[#1f3540] rounded-2xl shadow-md";

export default function TicTacToeSlot({
  value,
  inGame,
  move,
  isUser,
}: Readonly<{
  value: 0 | 1 | 2,
  inGame: boolean,
  move: () => void,
  isUser: boolean,
}>) {
  const classes = value === 0 && inGame ? selectableClasses : notSelectableClasses;
  const setMove = () => {
    if (inGame && isUser) {
      move();
    }
  }
  return (
    <div className={classes} onClick={setMove}>
      {value === 1 ? <XIcon /> : value === 2 ? <OIcon /> : <BlankIcon />}
    </div>
  );
}
