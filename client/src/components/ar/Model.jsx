import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import PropTypes from "prop-types";

const Model = ({ position, itemModel }) => {
  const gltf = useLoader(GLTFLoader, `${import.meta.env.VITE_PUBLIC_BUCKET_URL}/${itemModel}`);
  const texture = useLoader(TextureLoader, '/src/assets/photo_studio_01_1k.jpg');
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