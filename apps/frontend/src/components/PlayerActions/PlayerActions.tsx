/* eslint-disable jsx-a11y/label-has-associated-control */
import { ethers } from "ethers";
import { FC, PropsWithChildren, useContext, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import {
  GameStateActions,
  GameStateContext,
  GAME_STATES,
  PLAYER_ACTIONS,
} from "../providers/GameStateContext";
import { CHIP_ABI, EVM_BLACKJACK_ABI } from "../../lib/abis/ABIs";
import { CHIP_ADDR, EVM_BLACKJACK_ADDR } from "../../lib/constants";
import { getRandomCard } from "../../lib/utils";

// export const PlayerActions: FC<PropsWithChildren> = ({ children }) => {
export const PlayerActions = () => {
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
    address: CHIP_ADDR,
    functionName: "allowance",
    args: [address!, EVM_BLACKJACK_ADDR],
    watch: true,
  });

  const { config: approveConfig } = usePrepareContractWrite({
    address: CHIP_ADDR,
    abi: CHIP_ABI,
    functionName: "approve",
    args: [EVM_BLACKJACK_ADDR, ethers.utils.parseEther("100000000000000")],
  });
  const { write: writeApprove } = useContractWrite(approveConfig);

  const { config: takeInsuranceConfig } = usePrepareContractWrite({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    functionName: "takeInsurance",
    args: [true],
  });
  const { write: writeTakeInsurance } = useContractWrite(takeInsuranceConfig);

  const { config: placeBetConfig } = usePrepareContractWrite({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    functionName: "placeBet",
    args: [betSize],
    overrides: { gasLimit: ethers.BigNumber.from(10000000) },
    onError(err) {},
  });

  const { writeAsync: writePlaceBet, data } = useContractWrite(placeBetConfig);
  const handlePlaceBet = async () => {
    const tx = await writePlaceBet?.();
    const receipt = await tx?.wait();
    if (receipt) {
      // setReqId(receipt.logs[-1].topics[-1]);
    }
  };

  // const { config: fulfillConfig } = usePrepareContractWrite({
  //   address: EVM_BLACKJACK_ADDR,
  //   abi: EVM_BLACKJACK_ABI,
  //   functionName: "fulfillRandomness",
  //   args: [
  //     reqId, // requestId
  //     ethers.utils.formatBytes32String("STACK_TOO_DEEP") as `0x${string}`,
  //   ],
  //   // overrides: { gasLimit: ethers.BigNumber.from(10000000) },
  //   onError(err) {
  //     console.log({ err });
  //   },
  // });
  // const { write: writeFulfill } = useContractWrite(fulfillConfig);

  const { config: hitConfig } = usePrepareContractWrite({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    functionName: "takeAction",
    args: [PLAYER_ACTIONS.hit],
  });
  const { write: writeHit } = useContractWrite(hitConfig);

  const { config: splitConfig } = usePrepareContractWrite({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    functionName: "takeAction",
    args: [PLAYER_ACTIONS.split],
  });
  const { write: writeSplit } = useContractWrite(splitConfig);

  const { config: doubleDownConfig } = usePrepareContractWrite({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    functionName: "takeAction",
    args: [PLAYER_ACTIONS.double],
  });
  const { write: writeDD } = useContractWrite(doubleDownConfig);

  const { config: standConfig } = usePrepareContractWrite({
    address: EVM_BLACKJACK_ADDR,
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
            {/* <button
              type="button"
              className="p-1 m-1 text-black bg-white rounded border border-black cursor-pointer"
              onClick={() => writeFulfill?.()}
            >
              Fulfill Random
            </button> */}
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
                    // writeFulfill?.();
                    // option 1
                    // dispatch({
                    //   type: GameStateActions.SET,
                    //   payload: {
                    //     ...gameState,
                    //     state: 3,
                    //     shoeCount: 6,
                    //     dealerCards: [
                    //       "TS",
                    //       // "8H"
                    //     ],
                    //     insurance: 1,
                    //     lastAction: PLAYER_ACTIONS.noAction,
                    //     totalPlayerHands: 1,
                    //     activePlayerHand: 0,
                    //     playerHands: [
                    //       {
                    //         cards: ["9D", "4C"],
                    //         betSize: 10,
                    //       },
                    //     ],
                    //   },
                    // });
                    // option 2
                    // dispatch({
                    //   type: GameStateActions.SET,
                    //   payload: {
                    //     ...gameState,
                    //     state: 3,
                    //     shoeCount: 6,
                    //     dealerCards: [
                    //       "3H",
                    //       // "8H"
                    //     ],
                    //     insurance: 1,
                    //     lastAction: PLAYER_ACTIONS.noAction,
                    //     totalPlayerHands: 1,
                    //     activePlayerHand: 0,
                    //     playerHands: [
                    //       {
                    //         cards: ["5D", "6H"],
                    //         betSize: 10,
                    //       },
                    //     ],
                    //   },
                    // });
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
                  // option 1
                  // dispatch({
                  //   type: GameStateActions.SET,
                  //   payload: {
                  //     ...gameState,

                  //     insurance: 1,
                  //     lastAction: PLAYER_ACTIONS.noAction,
                  //     totalPlayerHands: 1,
                  //     activePlayerHand: 0,
                  //     playerHands: [
                  //       {
                  //         cards: [...gameState.playerHands[0].cards, "3H"],
                  //         betSize: 10,
                  //       },
                  //     ],
                  //   },
                  // });
                  // option 3
                  // dispatch({
                  //   type: GameStateActions.SET,
                  //   payload: {
                  //     ...gameState,
                  //     state: 3,
                  //     shoeCount: 6,
                  //     dealerCards: [
                  //       "TS",
                  //       // "8H"
                  //     ],
                  //     insurance: 1,
                  //     lastAction: PLAYER_ACTIONS.noAction,
                  //     totalPlayerHands: 1,
                  //     activePlayerHand: 0,
                  //     playerHands: [
                  //       {
                  //         cards: [...gameState.playerHands[0].cards, "3H"],
                  //         betSize: 10,
                  //       },
                  //     ],
                  //   },
                  // });
                  // option 3
                  // dispatch({
                  //   type: GameStateActions.SET,
                  //   payload: {
                  //     ...gameState,
                  //     state: 3,
                  //     shoeCount: 6,
                  //     dealerCards: [
                  //       ...gameState.dealerCards,
                  //       // "TS",
                  //       // "8H"
                  //     ],
                  //     insurance: 1,
                  //     lastAction: PLAYER_ACTIONS.hit,
                  //     totalPlayerHands: 1,
                  //     activePlayerHand: 0,
                  //     playerHands: [
                  //       {
                  //         cards: [
                  //           ...gameState.playerHands[0].cards,
                  //           getRandomCard(),
                  //         ],
                  //         betSize: 10,
                  //       },
                  //     ],
                  //   },
                  // });
                }}
              >
                Hit
              </button>
              <button
                className="p-1 m-1 text-black bg-white rounded border border-black cursor-pointer"
                name="stand"
                type="button"
                onClick={() => {
                  // writeStand?.();
                  dispatch({
                    type: GameStateActions.SET,
                    payload: {
                      ...gameState,
                      state: 5,
                      shoeCount: 6,
                      dealerCards: [...gameState.dealerCards, "8H", "8C"],
                      insurance: 1,
                      lastAction: PLAYER_ACTIONS.stand,
                      totalPlayerHands: 1,
                      activePlayerHand: 0,
                      playerHands: [
                        {
                          cards: [...gameState.playerHands[0].cards],
                          betSize: 10,
                        },
                      ],
                    },
                  });
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
                  // option 2
                  // dispatch({
                  //   type: GameStateActions.SET,
                  //   payload: {
                  //     ...gameState,
                  //     state: 3,
                  //     shoeCount: 6,
                  //     dealerCards: [
                  //       "3H",
                  //       // "8H"
                  //     ],
                  //     insurance: 1,
                  //     lastAction: PLAYER_ACTIONS.double,
                  //     totalPlayerHands: 1,
                  //     activePlayerHand: 0,
                  //     playerHands: [
                  //       {
                  //         cards: [...gameState.playerHands[0].cards, "TH"],
                  //         betSize: 10,
                  //       },
                  //     ],
                  //   },
                  // });
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
