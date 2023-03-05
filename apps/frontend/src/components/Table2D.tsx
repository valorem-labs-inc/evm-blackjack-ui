import { FC, PropsWithChildren, useContext } from "react";
import { useAccount } from "wagmi";
import { GameStateContext } from "./providers/GameStateContext";
import { PlayerActions } from "./PlayerActions/PlayerActions";

export const Table2D: FC<PropsWithChildren> = ({ children }) => {
  const { isConnected } = useAccount();
  const { gameState } = useContext(GameStateContext);

  return (
    <>
      {!isConnected && (
        <div className="flex absolute z-10 justify-center items-center w-screen h-screen">
          <div className="flex flex-col justify-center items-center w-1/2 h-1/3 text-center text-white bg-black bg-opacity-75 rounded-lg border border-white">
            Please Connect Your Wallet
          </div>
        </div>
      )}
      <div className="flex relative flex-col w-full h-full bg-green-700">
        {/* Dealer's Half */}
        <div className="absolute border-2 border-red-500">SHOE</div>
        <div className="h-1/2 text-center align-middle border-2 border-black">
          DEALERS HAND
        </div>
        {/* Player's Half */}
        {/* <div className="absolute right-0 bottom-0 m-1"> */}
        <div className="absolute right-[5%] bottom-[5%] z-20">
          <PlayerActions />
        </div>
        {/* </div> */}
        <div className="flex justify-center items-end h-1/2 text-center border-2 border-blue-500">
          PLAYERS HAND
        </div>

        {/* delete prolly */}
        <div className="absolute opacity-75 left-[50%] bottom-[50%] flex">
          {children}
        </div>
      </div>
    </>
  );
};
