import * as THREE from "three";
import { Box, useTexture } from "@react-three/drei";
import { FC, PropsWithChildren, Suspense, useRef, useState } from "react";
import React from "react";
import { CardDecks } from "ui";
import { DEG2RAD } from "three/src/math/MathUtils";
import { useFrame } from "@react-three/fiber";

const FCBack = CardDecks.Flashy["2B"];
export const Shoe: FC<PropsWithChildren> = () => {
  const meshRef = useRef<typeof Box>();
  const cardBack = useTexture({
    map: "/card-styles/flashy/2B.svg",
  });
  cardBack.map.wrapS = cardBack.map.wrapT = THREE.ClampToEdgeWrapping;

  // useFrame(({ clock }) => {
  //   meshRef.current.rotation.x = clock?.getElapsedTime();
  // });

  return (
    <Suspense fallback={null}>
      <Box
        castShadow
        ref={meshRef}
        position={[-15, 0.7, -10]}
        args={[2.03, 3.15, 1]} // Width, height, depth. Default is [1, 1, 1]
        scale={1.5}
        rotation={[-90 * DEG2RAD, 0, 0]}
      >
        <meshPhongMaterial {...cardBack} opacity={1} />
      </Box>
    </Suspense>
  );
};
