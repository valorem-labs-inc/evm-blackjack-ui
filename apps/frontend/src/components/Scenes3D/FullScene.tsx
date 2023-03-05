import {
  AdaptiveDpr,
  AsciiRenderer,
  Bounds,
  Center,
  Html,
  Preload,
  useContextBridge,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC, PropsWithChildren, Suspense } from "react";
import { PlayerActions } from "../PlayerActions/PlayerActions";
import { GameStateContext } from "../providers/GameStateContext";
import { Dealer } from "./Dealer";
import { Player } from "./Player";
import { Shoe } from "./Shoe";
import { StageAndCamera } from "./StageAndCamera";
import { Table3D } from "./Table";

export const FullScene: FC<PropsWithChildren> = ({ children }) => {
  const ContextBridge = useContextBridge(GameStateContext);

  return (
    <div className="relative w-full h-full">
      <Canvas shadows>
        <Suspense fallback={null}>
          {/* <AsciiRenderer
            fgColor="white"
            bgColor="transparent"
            resolution={0.2}
            renderIndex={2}
          /> */}
          <ContextBridge>
            <Preload all />
            <AdaptiveDpr pixelated />
            <StageAndCamera>
              {/* <Bounds fit clip observe damping={6} margin={1.5}>
                <Center disableX disableY right> */}
              <Shoe />
              <Dealer />
              <Player />
              {/* </Center>
              </Bounds> */}
              <Table3D />
              {/* <Html args={[]} castShadow receiveShadow>
                <div className="absolute right-[5%] bottom-[5%] z-20">
                  <PlayerActions />
                </div>
              </Html> */}
            </StageAndCamera>
          </ContextBridge>
        </Suspense>
      </Canvas>
    </div>
  );
};
