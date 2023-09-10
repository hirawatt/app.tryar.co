import { OrbitControls } from "@react-three/drei";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import Model from "./Model";
import PropTypes from 'prop-types';

const XrHitModel = ({ itemModel, showOverlayOrNot }) => {
  const reticleRef = useRef();
  const [modelPosition, setModelPosition] = useState([]);
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

  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    setModelPosition([{ position, id }]);
  };
    
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
        <Interactive onSelect={placeModel}>
          {/*eslint-disable*/}
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}> 
            <ringGeometry args={[0.15, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
          {/*eslint-enable*/}
        </Interactive>
      )}

      {/* {isPresentingOrNot(isPresenting)} */}

    </>
  );
};

XrHitModel.propTypes = {
  itemModel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  showOverlayOrNot: PropTypes.func.isRequired
};

export default XrHitModel;