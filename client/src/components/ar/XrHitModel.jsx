import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useRef, useState } from "react";
import Model from "./Model";
import PropTypes from 'prop-types';

const XrHitModel = ({ itemModel }) => {
  const reticleRef = useRef(null);
  const isPresenting = useXR(state => state.isPresenting);
  const referenceSpace = useXR(state => state.referenceSpace);
  const [modelPosition, setModelPosition] = useState([]);

  //detecting the intersection of a ray with real-world surfaces
  useHitTest((hitMatrix) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );
  
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  }, referenceSpace);
    
  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    setModelPosition([{ position, id }]);
  }

  return (
    <>
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
            <ringGeometry args={[0.15, 0.4, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
          {/*eslint-enable*/}
        </Interactive>
      )}
    </>
  );
};

XrHitModel.propTypes = {
  itemModel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
};

export default XrHitModel;