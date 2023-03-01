"use client";

/* eslint-disable react/no-unknown-property */
/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/media-has-caption */

import { Suspense } from "react";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export function Table3D() {
  return (
    <div className="">
      <Canvas camera={{ position: [0, 0, -15], fov: 55 }}>
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          <group rotation={[0, Math.PI, 0]} position={[0, 1, 0]}>
            <p>HI</p>
          </group>
          <Environment preset="city" />
        </Suspense>
        <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
        <OrbitControls
          enablePan={false}
          enableZoom
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
