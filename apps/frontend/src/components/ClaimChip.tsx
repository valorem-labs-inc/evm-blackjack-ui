import { useContext } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { CHIP_ABI, EVM_BLACKJACK_ABI } from "../lib/abis/ABIs";
import { CHIP_ADDR } from "../lib/constants";
import { GameStateContext } from "./providers/GameStateContext";

export const ClaimChip = () => {
  const { config, status } = usePrepareContractWrite({
    address: CHIP_ADDR,
    abi: CHIP_ABI,
    functionName: "claim",
  });

  const { write } = useContractWrite(config);
  // const { gameState } = useContext(GameStateContext);

  return (
    <div
      className={`absolute flex flex-col w-screen h-screen bg-black bg-opacity-25 justify-center items-center top-0 bottom-0 left-0 right-0 ${
        status !== "success" ? "hidden" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => write?.()}
        className="p-5 text-white bg-green-900 rounded-xl border border-white"
      >
        Claim your 1000 $CHIP!
      </button>
    </div>
  );
};
