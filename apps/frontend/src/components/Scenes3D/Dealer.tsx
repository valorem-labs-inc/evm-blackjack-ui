import { FC, PropsWithChildren, useContext } from "react";
import { GameStateContext } from "../providers/GameStateContext";
import { Hand } from "./Hand";

export const Dealer: FC<PropsWithChildren> = ({ children }) => {
  const {
    gameState: { dealerCards },
  } = useContext(GameStateContext);
  // const { dealerCards } = gameState;
  console.log({ dealerCards });

  const cards = [...dealerCards];
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

  // <Card cardType="AC" pos={[-2, 0, -10]} />
  // <Card cardType="QS" pos={[2, 0, -10]} />
  return (
    <>
      <Hand
        cards={cards}
        isPlayer
        positions={[
          [0, 0, -10],
          [0.6, 0.1, -10.6],
          [1.2, 0.2, -11.2],
          [1.8, 0.3, -11.8],
          [2.4, 0.4, -12.4],
          [3.0, 0.5, -13],
          [3.6, 0.6, -13.6],
        ]}
        scales={scales}
      />
    </>
  );
};
