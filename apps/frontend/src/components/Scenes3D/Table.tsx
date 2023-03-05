import { Suspense } from "react";
import { Plane } from "@react-three/drei";
import { DEG2RAD } from "three/src/math/MathUtils";

export function Table3D() {
  return (
    <Suspense fallback={null}>
      {/* <Billboard
        follow
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      > */}
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        rotation={[-90 * DEG2RAD, 0, 0]}
      >
        <Plane args={[250, 250]}>
          <meshPhongMaterial color="#15803d" />
        </Plane>
      </mesh>
      {/* </Billboard> */}
    </Suspense>
  );
}
