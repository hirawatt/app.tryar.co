import { OrbitControls } from "@react-three/drei";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import Model from "./Model";
import PropTypes from 'prop-types';

const XrHitModel = ({ itemModel }, ref) => { //eslint-disable-line
  const reticleRef = useRef();
  const { isPresenting, referenceSpace } = useXR();
  const [modelPosition, setModelPosition] = useState([]);

  const placeModel = useCallback(() => {
    if(reticleRef.current) {
      let position = reticleRef.current.position.clone();
      //let position = e.intersection.object.position.clone();
      let id = Date.now();
      console.log(referenceSpace, position, id);
      setModelPosition([{ position, id }]);
    }
  }, [referenceSpace])

  useImperativeHandle(ref, () => {
    return {
      placeModel: placeModel
    }
  }, [placeModel])

  //detecting the intersection of a ray with real-world surfaces
  useHitTest((hitMatrix) => {
    if (reticleRef.current) {
      hitMatrix.decompose(
        reticleRef.current.position,
        reticleRef.current.quaternion,
        reticleRef.current.scale
      );
  
      reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    }
  });

  //wanted to use this but its not working, and 'onMove' is not what expected
  //useInteraction(reticleRef, 'onSelect', (e) => placeModel(e));
    
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