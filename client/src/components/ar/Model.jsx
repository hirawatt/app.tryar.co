import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Model = ({ position }) => { //eslint-disable-line
    const gltf = useLoader(GLTFLoader, '../../assets/1.glb')
    const texture = useLoader(TextureLoader, '../../assets/photo_studio_01_1k.hdr')
    return <primitive position={position} object={gltf.scene} material={{map: texture}}/> //eslint-disable-line
};

export default Model;