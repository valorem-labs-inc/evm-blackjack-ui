import { FC, PropsWithChildren, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { EVM_BLACKJACK_ABI } from "../../lib/abis/EVMBlackjack";
import { EVM_BLACKJACK_ADDRESS } from "../../lib/constants";

export const PlayerActions: FC<PropsWithChildren> = ({ children }) => {
  const [selectedAction, setSelectedAction] = useState("hit");
  const { config, error } = usePrepareContractWrite({
    address: EVM_BLACKJACK_ADDRESS,
    abi: EVM_BLACKJACK_ABI,
    functionName: "",
  });
  const { write } = useContractWrite(config);

  return (
    <div className="flex flex-col border-2 border-white">
      Actions
      <button type="button" onClick={() => {}}>
        Insurance
      </button>
      <button type="button" onClick={() => {}}>
        Hit
      </button>
      <button type="button" onClick={() => {}}>
        Stand
      </button>
      <button type="button" onClick={() => {}}>
        Double-Down
      </button>
      <button type="button" onClick={() => {}}>
        Split
      </button>
    </div>
  );
};
