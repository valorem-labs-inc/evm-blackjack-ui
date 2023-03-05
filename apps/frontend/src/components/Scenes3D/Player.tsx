import { FC, PropsWithChildren, useContext } from "react";
import { Card } from "ui/dist/card-decks/types";
import { GameStateContext } from "../providers/GameStateContext";
import { Hand } from "./Hand";

export const Player: FC<PropsWithChildren> = ({ children }) => {
  const {
    gameState: { playerHands },
  } = useContext(GameStateContext);
  console.log(playerHands);
  const firstHand = playerHands?.[0]?.cards;

  let cards: Card[] = [];
  if (firstHand) {
    cards = [...firstHand];
  }

  if (cards.length < 10) {
    while (cards.length < 10) {
      cards.push("1B");
    }
  }

  const scales = cards.map((card) => {
    if (card !== "1B") {
      return 1.5;
    } else return 0;
  });
  return (
    <>
      <Hand
        cards={cards}
        isPlayer
        positions={[
          [0, 0, 8],
          [0.6, 0.1, 7.4],
          [1.2, 0.2, 6.8],
          [1.8, 0.3, 6.2],
          [2.4, 0.4, 5.6],
          [3.0, 0.5, 5.0],
        ]}
        scales={scales}
      />
    </>
  );
};
