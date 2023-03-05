/* eslint-disable @typescript-eslint/no-misused-promises */
import { useContext, useState } from "react";
import {
  useChainId,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { CHIP_ABI, EVM_BLACKJACK_ABI } from "../lib/abis/ABIs";
import { ADDRESSES_BY_NETWORK } from "../lib/constants";
import { GameStateContext } from "./providers/GameStateContext";

export const ClaimChip = () => {
  const [claimed, setClaimed] = useState(false);
  const { chain } = useNetwork();
  const { config, status } = usePrepareContractWrite({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
    address: ADDRESSES_BY_NETWORK[`${chain?.id as number}`]?.CHIP,
    abi: CHIP_ABI,
    functionName: "claim",
  });

  const { writeAsync } = useContractWrite(config);

  return (
    <div
      className={`absolute flex flex-col w-screen h-screen bg-black bg-opacity-25 justify-center items-center top-0 bottom-0 left-0 right-0 ${
        status !== "success" || claimed ? "hidden" : ""
      }`}
    >
      <button
        type="button"
        onClick={async () => {
          const tx = await writeAsync?.();
          const receipt = await tx?.wait();
          if (receipt) setClaimed(true);
        }}
        className="p-5 text-white bg-green-900 rounded-xl border border-white"
      >
        Claim your 1000 $CHIP!
      </button>
    </div>
  );
};
