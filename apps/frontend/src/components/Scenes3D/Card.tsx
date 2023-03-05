import * as THREE from "three";
import { Box, RoundedBox, useCubeTexture, useTexture } from "@react-three/drei";
import { FC, PropsWithChildren, Suspense, useContext, useRef } from "react";
import React from "react";
import { Card as CardType } from "ui/dist/card-decks/types";
import { useFrame, Vector3 } from "@react-three/fiber";
import { Mesh } from "three";
import { GameStateContext } from "../providers/GameStateContext";

export const Card: FC<
  PropsWithChildren & {
    cardType: CardType;
    pos: number[];
    rot: number[];
    scale: number;
  }
> = ({ cardType, pos, rot, scale }) => {
  // const cardTexture = useCubeTexture(
  //   [
  //     // `1B.svg`,
  //     // `1B.svg`,
  //     `${cardType}.svg`,
  //     // `1B.svg`,
  //     // `1B.svg`,
  //     // `1B.svg`,
  //     `${cardType}.svg`,
  //     `${cardType}.svg`,
  //     `${cardType}.svg`,
  //     `${cardType}.svg`,
  //     `${cardType}.svg`,
  //   ],
  //   { path: "/card-styles/flashy/" }
  // );

  const [
    _1B,
    _2S,
    _4H,
    _6D,
    _8C,
    _9S,
    _JD,
    _QC,
    _TS,
    _1J,
    _3C,
    _4S,
    _6H,
    _8D,
    _AC,
    _JH,
    _QD,
    _2B,
    _3D,
    _5C,
    _6S,
    _8H,
    _AD,
    _JS,
    _QH,
    _2C,
    _3H,
    _5D,
    _7C,
    _8S,
    _AH,
    _KC,
    _QS,
    _2D,
    _3S,
    _5H,
    _7D,
    _9C,
    _AS,
    _KD,
    _TC,
    _2H,
    _4C,
    _5S,
    _7H,
    _9D,
    _KH,
    _TD,
    _2J,
    _4D,
    _6C,
    _7S,
    _9H,
    _JC,
    _KS,
    _TH,
  ] = useTexture([
    `/card-styles/flashy/1B.svg`,
    `/card-styles/flashy/2S.svg`,
    `/card-styles/flashy/4H.svg`,
    `/card-styles/flashy/6D.svg`,
    `/card-styles/flashy/8C.svg`,
    `/card-styles/flashy/9S.svg`,
    `/card-styles/flashy/JD.svg`,
    `/card-styles/flashy/QC.svg`,
    `/card-styles/flashy/TS.svg`,
    `/card-styles/flashy/1J.svg`,
    `/card-styles/flashy/3C.svg`,
    `/card-styles/flashy/4S.svg`,
    `/card-styles/flashy/6H.svg`,
    `/card-styles/flashy/8D.svg`,
    `/card-styles/flashy/AC.svg`,
    `/card-styles/flashy/JH.svg`,
    `/card-styles/flashy/QD.svg`,
    `/card-styles/flashy/2B.svg`,
    `/card-styles/flashy/3D.svg`,
    `/card-styles/flashy/5C.svg`,
    `/card-styles/flashy/6S.svg`,
    `/card-styles/flashy/8H.svg`,
    `/card-styles/flashy/AD.svg`,
    `/card-styles/flashy/JS.svg`,
    `/card-styles/flashy/QH.svg`,
    `/card-styles/flashy/2C.svg`,
    `/card-styles/flashy/3H.svg`,
    `/card-styles/flashy/5D.svg`,
    `/card-styles/flashy/7C.svg`,
    `/card-styles/flashy/8S.svg`,
    `/card-styles/flashy/AH.svg`,
    `/card-styles/flashy/KC.svg`,
    `/card-styles/flashy/QS.svg`,
    `/card-styles/flashy/2D.svg`,
    `/card-styles/flashy/3S.svg`,
    `/card-styles/flashy/5H.svg`,
    `/card-styles/flashy/7D.svg`,
    `/card-styles/flashy/9C.svg`,
    `/card-styles/flashy/AS.svg`,
    `/card-styles/flashy/KD.svg`,
    `/card-styles/flashy/TC.svg`,
    `/card-styles/flashy/2H.svg`,
    `/card-styles/flashy/4C.svg`,
    `/card-styles/flashy/5S.svg`,
    `/card-styles/flashy/7H.svg`,
    `/card-styles/flashy/9D.svg`,
    `/card-styles/flashy/KH.svg`,
    `/card-styles/flashy/TD.svg`,
    `/card-styles/flashy/2J.svg`,
    `/card-styles/flashy/4D.svg`,
    `/card-styles/flashy/6C.svg`,
    `/card-styles/flashy/7S.svg`,
    `/card-styles/flashy/9H.svg`,
    `/card-styles/flashy/JC.svg`,
    `/card-styles/flashy/KS.svg`,
    `/card-styles/flashy/TH.svg`,
  ]);
  const textures = {
    "1B": _1B,
    "2S": _2S,
    "4H": _4H,
    "6D": _6D,
    "8C": _8C,
    "9S": _9S,
    JD: _JD,
    QC: _QC,
    TS: _TS,
    "1J": _1J,
    "3C": _3C,
    "4S": _4S,
    "6H": _6H,
    "8D": _8D,
    AC: _AC,
    JH: _JH,
    QD: _QD,
    "2B": _2B,
    "3D": _3D,
    "5C": _5C,
    "6S": _6S,
    "8H": _8H,
    AD: _AD,
    JS: _JS,
    QH: _QH,
    "2C": _2C,
    "3H": _3H,
    "5D": _5D,
    "7C": _7C,
    "8S": _8S,
    AH: _AH,
    KC: _KC,
    QS: _QS,
    "2D": _2D,
    "3S": _3S,
    "5H": _5H,
    "7D": _7D,
    "9C": _9C,
    AS: _AS,
    KD: _KD,
    TC: _TC,
    "2H": _2H,
    "4C": _4C,
    "5S": _5S,
    "7H": _7H,
    "9D": _9D,
    KH: _KH,
    TD: _TD,
    "2J": _2J,
    "4D": _4D,
    "6C": _6C,
    "7S": _7S,
    "9H": _9H,
    JC: _JC,
    KS: _KS,
    TH: _TH,
  };
  // const cardBack = useTexture({
  //   map: `/card-styles/flashy/${cardType}.svg`,
  //   colorMap: `/card-styles/flashy/${cardType}.svg`,
  //   bumpMap: `/card-styles/flashy/${cardType}.svg`,
  //   alphaMap: `/card-styles/flashy/${cardType}.svg`,
  //   luminanceMap: `/card-styles/flashy/${cardType}.svg`,
  // });
  // cardBack.map.wrapS = cardBack.map.wrapT = THREE.ClampToEdgeWrapping;
  // cardBack.map.wrapS = cardBack.map.wrapT = THREE.ClampToEdgeWrapping;
  // cardBack.map.repeat.set(0.5, 0.3255);

  const meshRef = useRef<Mesh>();
  // useFrame(({}) => {
  //   meshRef.current.position.x = pos[0];
  //   meshRef.current.position.y = pos[1];
  //   meshRef.current.position.x = pos[2];
  //   meshRef.current.scale.x = scale;
  //   meshRef.current.scale.y = scale;
  //   meshRef.current.scale.z = scale;
  // });

  return (
    <Suspense fallback={null}>
      {/* @ts-ignore */}
      <mesh position={pos} rotation={rot}>
        {/* <RoundedBox
          args={[2.03, 3.15, 0.01]} // Width, height, depth. Default is [1, 1, 1]
          castShadow
          receiveShadow
          scale={1.5}
          radius={0.1} // Radius of the rounded corners. Default is 0.05
          // radius={0.05} // Radius of the rounded corners. Default is 0.05
          smoothness={4} // The number of curve segments. Default is 4
        >
          <meshPhongMaterial
            color="white"
            // map={cardTexture}
            // {...cardTexture}
            {...cardBack}
            // map={cardBack.colorMap}
            opacity={0.1}
          />
        </RoundedBox> */}
        <Box
          castShadow
          ref={meshRef}
          args={[2.03, 3.15, 0.05]} // Width, height, depth. Default is [1, 1, 1]
          scale={scale}
        >
          <meshPhongMaterial map={textures[cardType]} opacity={0.1} />
        </Box>
      </mesh>
    </Suspense>
  );
};
