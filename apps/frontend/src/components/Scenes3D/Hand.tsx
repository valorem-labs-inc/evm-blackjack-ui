import { FC, PropsWithChildren, useContext } from "react";
import React from "react";
import { Card as CardType } from "ui/dist/card-decks/types";
import { Vector3 } from "@react-three/fiber";
import { DEG2RAD } from "three/src/math/MathUtils";
import { Card } from "./Card";
import {
  GameStateActions,
  GameStateContext,
} from "../providers/GameStateContext";

export const Hand: FC<
  PropsWithChildren & {
    cards: CardType[];
    isPlayer: boolean;
    positions: number[][];
    scales: number[];
  }
> = ({ cards, isPlayer, positions, scales }) => {
  if (!positions[0]) {
    positions = [[0, 0, isPlayer ? 8 : -10]];
  }

  const { gameState } = useContext(GameStateContext);
  console.log(gameState.lastAction);

  return (
    <>
      {cards.map((card, i) => {
        const rot =
          gameState.lastAction === 2 &&
          i === gameState.playerHands[0].cards.length - 1
            ? 90 * DEG2RAD
            : 0;
        const pos =
          gameState.lastAction === 2 &&
          i === gameState.playerHands[0].cards.length - 1
            ? [2.4, 0.3, 5.3]
            : positions[i];
        return (
          <Card
            cardType={card}
            pos={pos}
            scale={scales[i]}
            rot={[
              -90 * DEG2RAD,
              0,
              rot,
              // gameState.lastAction === 2 && i === cards.length - 1
              //   ? 0
              //   : 90 * DEG2RAD,
            ]}
          />
        );
      })}
    </>
  );
};
