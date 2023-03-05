import { ethers } from "ethers";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Card } from "ui/dist/card-decks/types";
import { useAccount, useContractEvent, useContractRead } from "wagmi";
import { EVM_BLACKJACK_ABI } from "../../lib/abis/ABIs";
import { EVM_BLACKJACK_ADDR } from "../../lib/constants";
import { cardChoices } from "../../lib/utils";

// export const GAME_STATES_TEXT = {
//   readyForBet: "READY_FOR_BET",
//   waitingForRandomness: "WAITING_FOR_RANDOMNESS",
//   readyForInsurance: "READY_FOR_INSURANCE",
//   readyForPlayerAction: "READY_FOR_PLAYER_ACTION",
//   dealerAction: "DEALER_ACTION",
//   payouts: "PAYOUTS",
// };

export const GAME_STATES = {
  readyForBet: 0,
  waitingForRandomness: 1,
  readyForInsurance: 2,
  readyForPlayerAction: 3,
  dealerAction: 4,
  payouts: 5,
};

export const PLAYER_ACTIONS = {
  noAction: 0,
  split: 1,
  double: 2,
  hit: 3,
  stand: 4,
};

export type Hand = { cards: Card[]; betSize: number };

export interface ReactGameState {
  state: number; // typeof GAME_STATES_TEXT;
  shoeCount: number;
  dealerCards: Card[];
  insurance: number;
  lastAction: number;
  totalPlayerHands: number;
  activePlayerHand: number;
  playerHands: Hand[];
}

const initialState: ReactGameState = {
  state: GAME_STATES.readyForBet,
  shoeCount: 6,
  dealerCards: [],
  insurance: 0,
  lastAction: 0,
  totalPlayerHands: 0,
  activePlayerHand: 0,
  playerHands: [],
};

export enum GameStateActions {
  SET = "SET",
  RESET = "RESET",
}

export interface GameStateCtx {
  gameState: ReactGameState;
  dispatch: Dispatch<{
    type: GameStateActions;
    payload: Partial<ReactGameState>;
  }>;
}

const gameStateReducer = (
  state: ReactGameState,
  action: { type: GameStateActions; payload: ReactGameState }
) => {
  switch (action.type) {
    case GameStateActions.SET:
      return { ...state, ...action.payload };
    case GameStateActions.RESET:
      console.log("Reset");
      return initialState;

    default:
      console.log("Does Not Exist", { action });
      return { ...state };
  }
};

export const GameStateContext = createContext<GameStateCtx>({
  gameState: initialState,
  dispatch: () => {},
});

export const GameStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialState);
  const value = useMemo(() => ({ gameState, dispatch }), [gameState]);

  const { address } = useAccount();
  const { data: chainGameState } = useContractRead({
    abi: EVM_BLACKJACK_ABI,
    address: EVM_BLACKJACK_ADDR,
    functionName: "getGame",
    args: [
      address ?? (ethers.BigNumber.from(0).toHexString() as `0x${string}`),
    ],
    watch: true,
  });

  // useEffect(() => {
  //   if (chainGameState?.state) {
  //     dispatch({
  //       type: GameStateActions.SET,
  //       payload: {
  //         ...(chainGameState as unknown as Partial<ReactGameState>),
  //         dealerCards: chainGameState.dealerCards.map(
  //           (card) => cardChoices[card]
  //         ),
  //         playerHands: chainGameState.playerHands.map((hand) => {
  //           const cds = hand.cards.map((card) => cardChoices[card]);
  //           return { cards: [...cds], betSize: hand.betSize };
  //         }),
  //       },
  //     });
  //   }
  // }, [chainGameState]);

  // const [reactGameState, setReactGameState] = useState();

  useContractEvent({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    eventName: "BetPlaced",
    listener(playerAddr, betSize) {
      if (playerAddr === address) {
        console.log(betSize);
      }
    },
  });

  useContractEvent({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    eventName: "PlayerCardDealt",
    listener(playerAddr, card, handIndex) {
      if (playerAddr === address) {
        console.log(card, handIndex);
      }
    },
  });

  useContractEvent({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    eventName: "DealerCardDealt",
    listener(playerAddr, card) {
      if (playerAddr === address) {
        console.log(card);
      }
    },
  });

  useContractEvent({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    eventName: "InsuranceTaken",
    listener(playerAddr, taken) {
      if (playerAddr === address) {
        console.log(taken);
      }
    },
  });

  useContractEvent({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    eventName: "PlayerActionTaken",
    listener(playerAddr, action) {
      if (playerAddr === address) {
        console.log(action);
      }
    },
  });

  useContractEvent({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    eventName: "PlayerBust",
    listener(playerAddr) {
      if (playerAddr === address) {
        console.log(playerAddr);
      }
    },
  });

  useContractEvent({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    eventName: "DealerBust",
    listener(playerAddr) {
      if (playerAddr === address) {
        console.log(playerAddr);
      }
    },
  });

  useContractEvent({
    address: EVM_BLACKJACK_ADDR,
    abi: EVM_BLACKJACK_ABI,
    eventName: "PayoutsHandled",
    listener(playerAddr, playerPayout, dealerPayout) {
      if (playerAddr === address) {
        console.log(playerPayout, dealerPayout);
      }
    },
  });

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

// interface UseGameStateProps {}
// export const useGameState = ({  }: UseGameStateProps) => {
// export const useGameState = () => {
//   const { address, status } = useAccount();
//   const { data: gameState } = useContractRead({
//     abi: EVM_BLACKJACK_ABI,
//     address: EVM_BLACKJACK_ADDR,
//     functionName: "getGame",
//     args: [
//       address ?? (ethers.BigNumber.from(0).toHexString() as `0x${string}`),
//     ],
//     watch: true,
//   });

//   const [reactGameState, setReactGameState] = useState();

//   useContractEvent({
//     address: EVM_BLACKJACK_ADDR,
//     abi: EVM_BLACKJACK_ABI,
//     eventName: "BetPlaced",
//     listener(playerAddr, betSize) {
//       if (playerAddr === address) {
//         console.log(betSize);
//       }
//     },
//   });

//   useContractEvent({
//     address: EVM_BLACKJACK_ADDR,
//     abi: EVM_BLACKJACK_ABI,
//     eventName: "PlayerCardDealt",
//     listener(playerAddr, card, handIndex) {
//       if (playerAddr === address) {
//         console.log(card, handIndex);
//       }
//     },
//   });

//   useContractEvent({
//     address: EVM_BLACKJACK_ADDR,
//     abi: EVM_BLACKJACK_ABI,
//     eventName: "DealerCardDealt",
//     listener(playerAddr, card) {
//       if (playerAddr === address) {
//         console.log(card);
//       }
//     },
//   });

//   useContractEvent({
//     address: EVM_BLACKJACK_ADDR,
//     abi: EVM_BLACKJACK_ABI,
//     eventName: "InsuranceTaken",
//     listener(playerAddr, taken) {
//       if (playerAddr === address) {
//         console.log(taken);
//       }
//     },
//   });

//   useContractEvent({
//     address: EVM_BLACKJACK_ADDR,
//     abi: EVM_BLACKJACK_ABI,
//     eventName: "PlayerActionTaken",
//     listener(playerAddr, action) {
//       if (playerAddr === address) {
//         console.log(action);
//       }
//     },
//   });

//   useContractEvent({
//     address: EVM_BLACKJACK_ADDR,
//     abi: EVM_BLACKJACK_ABI,
//     eventName: "PlayerBust",
//     listener(playerAddr) {
//       if (playerAddr === address) {
//         console.log(playerAddr);
//       }
//     },
//   });

//   useContractEvent({
//     address: EVM_BLACKJACK_ADDR,
//     abi: EVM_BLACKJACK_ABI,
//     eventName: "DealerBust",
//     listener(playerAddr) {
//       if (playerAddr === address) {
//         console.log(playerAddr);
//       }
//     },
//   });

//   useContractEvent({
//     address: EVM_BLACKJACK_ADDR,
//     abi: EVM_BLACKJACK_ABI,
//     eventName: "PayoutsHandled",
//     listener(playerAddr, playerPayout, dealerPayout) {
//       if (playerAddr === address) {
//         console.log(playerPayout, dealerPayout);
//       }
//     },
//   });

//   return {
//     gameState,
//   };
// };
