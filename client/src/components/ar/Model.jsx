import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import PropTypes from "prop-types";

const Model = ({ position, itemModel }) => {
  const gltf = useLoader(GLTFLoader, '/src/assets/1.glb' || itemModel) //pathing is different, it is relative to root file instead of this file
  const texture = useLoader(TextureLoader, '/src/assets/photo_studio_01_1k.jpg')
  return <primitive position={position} object={gltf.scene} material={{map: texture}}/> //eslint-disable-line
};

Model.propTypes = {
  position: PropTypes.shape({
    // specify the types of the properties of the position object
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    }).isRequired,
    itemModel: PropTypes.string.isRequired,
};

export default Model;