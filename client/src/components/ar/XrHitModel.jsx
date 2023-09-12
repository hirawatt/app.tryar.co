import { OrbitControls } from "@react-three/drei";
import { useHitTest, useInteraction, useXR } from "@react-three/xr";
import { useEffect, useRef } from "react";
import Model from "./Model";
import PropTypes from 'prop-types';

const XrHitModel = ({ itemModel, showOverlayOrNot, modelPosition, placeModel }) => {
  const reticleRef = useRef();
  const { isPresenting } = useXR();

  useEffect(() => showOverlayOrNot(isPresenting), [isPresenting, showOverlayOrNot])
  
  //detecting the intersection of a ray with real-world surfaces
  useHitTest((hitMatrix) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );

    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });

  useInteraction(reticleRef, 'onSelect', (e) => placeModel(e)); //wanted to use this but its not working when testing on webxr api emulator
    
  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting && 
      modelPosition.map(({ position, id }) => {
        return <Model key={id} position={position} itemModel={itemModel} />;
      })
      }
      {isPresenting && (
        <>
          {/*eslint-disable*/}
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}> 
            <ringGeometry args={[0.15, 0.4, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
          {/*eslint-enable*/}
        </>
      )}
    </>
  );
};

XrHitModel.propTypes = {
  itemModel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  showOverlayOrNot: PropTypes.func.isRequired,
  modelPosition: PropTypes.array.isRequired,
  placeModel: PropTypes.func.isRequired
};

export default XrHitModel;