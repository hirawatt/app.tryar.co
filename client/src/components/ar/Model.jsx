import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Model = ({ position }) => { //eslint-disable-line
    const gltf = useLoader(GLTFLoader, '/src/assets/1.glb') //pathing is different, it is relative to root file instead of this file
    const texture = useLoader(TextureLoader, '/src/assets/photo_studio_01_1k.jpg')
    return <primitive position={position} object={gltf.scene} material={{map: texture}}/> //eslint-disable-line
};

export default Model;