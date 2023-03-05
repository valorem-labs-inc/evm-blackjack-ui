import { useContext } from "react";
import { GameStateContext } from "./providers/GameStateContext";

export const Payouts = () => {
  const { gameState } = useContext(GameStateContext);

  return (
    <div
      className={`absolute flex flex-col w-screen h-screen bg-black bg-opacity-25 justify-center items-center top-0 bottom-0 left-0 right-0 ${
        gameState.state !== 5 ? "hidden" : ""
      }`}
    >
      <p className="p-5 text-white bg-green-900 rounded-xl border border-white">
        YOU WON 20 $CHIP!
      </p>
    </div>
  );
};
