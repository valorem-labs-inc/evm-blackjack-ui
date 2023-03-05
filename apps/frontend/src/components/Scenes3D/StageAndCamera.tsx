import { FC, PropsWithChildren, Suspense, useRef } from "react";
import {
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Stage,
  ContactShadows,
  SoftShadows,
  BakeShadows,
} from "@react-three/drei";
import { DEG2RAD } from "three/src/math/MathUtils";

export const StageAndCamera: FC<PropsWithChildren> = ({ children }) => {
  console.log("");
  return (
    <>
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault
          position={[0, 2.5, 2.5]}
          fov={35}
          zoom={10}
          // target={[0, 0, 0]}
          // rotateX={-45 * DEG2RAD}
          // rotateY={-10 * DEG2RAD}
        />
        <Stage
          intensity={0.45}
          preset="portrait"
          castShadow
          receiveShadow
          shadows="accumulative"
          environment="city"
        >
          <group>
            {/* <ContactShadows */}
            {children}
            {/* <AccumulativeShadows
              temporal
              frames={100}
              color="black"
              colorBlend={5}
              alphaTest={0.9}
              opacity={0.9}
              scale={250}
            >
              <RandomizedLight
                amount={12}
                radius={20}
                ambient={0.5}
                intensity={0.9}
                position={[-12, 1, -13]}
                bias={0.001}
              />
            </AccumulativeShadows> */}
            {/* </ContactShadows> */}
            <SoftShadows />
            {/* <BakeShadows /> */}
            <RandomizedLight
              amount={12}
              radius={20}
              ambient={0.5}
              intensity={0.9}
              position={[-12, 1, -13]}
              bias={0.001}
            />
          </group>
        </Stage>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          minAzimuthAngle={0.0}
          maxAzimuthAngle={1.0}
          minPolarAngle={0}
          maxPolarAngle={0.2617994}
        />
        <Environment preset="city" />
      </Suspense>
    </>
  );
};
