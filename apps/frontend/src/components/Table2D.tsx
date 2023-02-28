import { FC, PropsWithChildren } from "react";
import { PlayerActions } from "./PlayerActions/PlayerActions";

export const Table2D: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex relative flex-col w-full h-full bg-green-700">
    {/* Dealer's Half */}
    <p className="absolute border-2 border-red-500">SHOE</p>
    <p className="h-1/2 text-center align-middle border-2 border-black">
      DEALERS HAND
    </p>
    {/* Player's Half */}
    <div className="absolute right-[25%] bottom-[10%]">
      <PlayerActions />
    </div>
    <p className="h-1/2 text-center align-middle border-2 border-blue-500">
      PLAYERS HAND
    </p>

    {/* delete prolly */}
    <div className="absolute opacity-75 left-[50%] bottom-[50%] flex">
      {children}
    </div>
  </div>
);
