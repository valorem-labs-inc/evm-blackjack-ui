/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ethers } from "ethers";
import { FC, PropsWithChildren, useContext, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import {
  GameStateActions,
  GameStateContext,
  GAME_STATES,
  PLAYER_ACTIONS,
} from "../providers/GameStateContext";
import { CHIP_ABI, EVM_BLACKJACK_ABI } from "../../lib/abis/ABIs";
import { ADDRESSES_BY_NETWORK } from "../../lib/constants";
import { getRandomCard } from "../../lib/utils";

// export const PlayerActions: FC<PropsWithChildren> = ({ children }) => {
export const PlayerActions = () => {
  const { chain } = useNetwork();

  // const [selectedAction, setSelectedAction] =
  //   useState<keyof typeof PLAYER_ACTIONS>("hit");
  // const { config } = usePrepareContractWrite({
  //   address: EVM_BLACKJACK_ADDR,
  //   abi: EVM_BLACKJACK_ABI,
  //   functionName: "takeAction",
  //   args: [PLAYER_ACTIONS[selectedAction]],
  // });

  const { address } = useAccount();

  const { gameState, dispatch } = useContext(GameStateContext);
  const [betSize, setBetSize] = useState(ethers.utils.parseEther("10"));
  const [reqId, setReqId] = useState<string>(
    "0x00000000000000000000000011CDFCB54576D5990219C426BF2C630115A2012A"
  );

  const { data: chipApproval, isSuccess } = useContractRead({
    abi: CHIP_ABI,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    address: ADDRESSES_BY_NETWORK?.[chain?.id]?.CHIP,
    functionName: "allowance",
    args: [address!, ADDRESSES_BY_NETWORK?.[chain?.id]?.BJ],
    watch: true,
  });

  const { config: approveConfig } = usePrepareContractWrite({
    address: ADDRESSES_BY_NETWORK?.[chain?.id]?.CHIP,
    abi: CHIP_ABI,
    functionName: "approve",
    args: [
      ADDRESSES_BY_NETWORK?.[chain?.id]?.BJ,
      ethers.utils.parseEther("100000000000000"),
    ],
  });
  const { write: writeApprove } = useContractWrite(approveConfig);

  const { config: takeInsuranceConfig } = usePrepareContractWrite({
    address: ADDRESSES_BY_NETWORK?.[chain?.id]?.BJ,
    abi: EVM_BLACKJACK_ABI,
    functionName: "takeInsurance",
    args: [true],
  });
  const { write: writeTakeInsurance } = useContractWrite(takeInsuranceConfig);

  const { config: placeBetConfig } = usePrepareContractWrite({
    address: ADDRESSES_BY_NETWORK?.[chain?.id]?.BJ,
    abi: EVM_BLACKJACK_ABI,
    functionName: "placeBet",
    args: [betSize],
  });

  const { writeAsync: writePlaceBet, data } = useContractWrite(placeBetConfig);
  const handlePlaceBet = async () => {
    const tx = await writePlaceBet?.();
    const receipt = await tx?.wait();
    if (receipt) {
      // setReqId(receipt.logs[-1].topics[-1]);
    }
  };

  const { config: hitConfig } = usePrepareContractWrite({
    address: ADDRESSES_BY_NETWORK?.[chain?.id]?.BJ,
    abi: EVM_BLACKJACK_ABI,
    functionName: "takeAction",
    args: [PLAYER_ACTIONS.hit],
  });
  const { write: writeHit } = useContractWrite(hitConfig);

  const { config: splitConfig } = usePrepareContractWrite({
    address: ADDRESSES_BY_NETWORK?.[chain?.id]?.BJ,
    abi: EVM_BLACKJACK_ABI,
    functionName: "takeAction",
    args: [PLAYER_ACTIONS.split],
  });
  const { write: writeSplit } = useContractWrite(splitConfig);

  const { config: doubleDownConfig } = usePrepareContractWrite({
    address: ADDRESSES_BY_NETWORK?.[chain?.id]?.BJ,
    abi: EVM_BLACKJACK_ABI,
    functionName: "takeAction",
    args: [PLAYER_ACTIONS.double],
  });
  const { write: writeDD } = useContractWrite(doubleDownConfig);

  const { config: standConfig } = usePrepareContractWrite({
    address: ADDRESSES_BY_NETWORK?.[chain?.id]?.BJ,
    abi: EVM_BLACKJACK_ABI,
    functionName: "takeAction",
    args: [PLAYER_ACTIONS.stand],
  });
  const { write: writeStand } = useContractWrite(standConfig);

  return (
    <div className="flex z-50 flex-col p-4 text-center rounded-lg border-2 border-white">
      Actions
      <div
        className={`grid grid-rows-auto ${
          !gameState ||
          gameState.state === GAME_STATES.readyForBet ||
          gameState.state === GAME_STATES.payouts
            ? "grid-cols-1"
            : "grid-cols-2"
        }`}
      >
        {(!gameState ||
          gameState.state === GAME_STATES.readyForBet ||
          gameState.state === GAME_STATES.payouts ||
          gameState.state === GAME_STATES.dealerAction ||
          gameState.state === GAME_STATES.waitingForRandomness) && (
          <div className="flex flex-col">
            <p>Place Your Bet</p>

            {isSuccess && // && (
            Number(ethers.utils.formatEther(chipApproval!)) >= 100.0 ? (
              <>
                <label className="flex flex-col justify-center items-center">
                  Bet Size. Min: 10, Max: 100
                  <input
                    className="w-1/4"
                    type="number"
                    min={10}
                    max={100}
                    value={Number(ethers.utils.formatEther(betSize))}
                    onChange={(e) => {
                      setBetSize(
                        ethers.utils.parseEther(e.currentTarget.value)
                      );
                    }}
                  />
                </label>

                <button
                  type="button"
                  className="p-1 m-1 text-black bg-white rounded border border-black cursor-pointer"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    handlePlaceBet();
                  }}
                >
                  Deal
                </button>
              </>
            ) : (
              <button
                type="button"
                className="p-1 m-1 text-black bg-white rounded border border-black cursor-pointer"
                onClick={() => writeApprove?.()}
              >
                Approve $CHIP
              </button>
            )}
          </div>
        )}
        {gameState?.state === GAME_STATES.readyForInsurance && (
          <div className="p-1 m-1 text-black bg-white rounded border border-black cursor-pointer">
            <button
              name="insurance"
              type="button"
              onClick={() => {
                writeTakeInsurance?.();
              }}
            >
              Take Insurance?
            </button>
          </div>
        )}
        {gameState?.state === GAME_STATES.readyForPlayerAction ||
          (gameState?.state === GAME_STATES.dealerAction && (
            <>
              <button
                className="p-1 m-1 text-black bg-white rounded border border-black cursor-pointer"
                name="hit"
                type="button"
                onClick={() => {
                  writeHit?.();
                }}
              >
                Hit
              </button>
              <button
                className="p-1 m-1 text-black bg-white rounded border border-black cursor-pointer"
                name="stand"
                type="button"
                onClick={() => {
                  writeStand?.();
                }}
              >
                Stand
              </button>
              <button
                className="p-1 m-1 text-black bg-white rounded border border-black cursor-pointer"
                name="double"
                type="button"
                onClick={() => {
                  writeDD?.();
                }}
              >
                Double-Down
              </button>
              <button
                className="p-1 m-1 text-black bg-white rounded border border-black cursor-pointer"
                name="split"
                type="button"
                onClick={() => {
                  writeSplit?.();
                }}
              >
                Split
              </button>
            </>
          ))}
      </div>
    </div>
  );
};
