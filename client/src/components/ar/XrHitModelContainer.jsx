import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";

const XrHitModelContainer = () => {
  return (
    <div className="h-screen w-screen">
      <ARButton
        sessionInit={{
          requiredFeatures: ["hit-test"],
        }}
      />
      <Canvas className="h-full w-full">
        <XR>
          <XrHitModel />
        </XR>
      </Canvas>
    </div>
  );
};

export default XrHitModelContainer;