import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { Suspense, forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import Model from "./Model";
import PropTypes from 'prop-types';

const XrHitModel = ({ itemModel }, ref) => { //eslint-disable-line
  const reticleRef = useRef(null);
  const isPresenting = useXR(state => state.isPresenting);
  const referenceSpace = useXR(state => state.referenceSpace);
  const [modelPosition, setModelPosition] = useState([]);

  const placeModel = useCallback(() => {
    if(reticleRef.current) {
      let position = reticleRef.current.position.clone();
      let id = Date.now();
      setModelPosition([{ position, id }]);
    }
  }, [])

  useImperativeHandle(ref, () => {
    return {
      placeModel: placeModel
    }
  }, [placeModel])

  //detecting the intersection of a ray with real-world surfaces
  useHitTest((hitMatrix) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );
  
    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  }, referenceSpace);

  return (
    <>
      <ambientLight />
      {isPresenting && 
      modelPosition.map(({ position, id }) => {
        return (
          <Suspense key={id}>
            <Model position={position} itemModel={itemModel} />
          </Suspense>
        )
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

const ForwardedXrHitModel = forwardRef(XrHitModel);
ForwardedXrHitModel.displayName = 'XrHitModel';

ForwardedXrHitModel.propTypes = {
  itemModel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ])
};

export default ForwardedXrHitModel;