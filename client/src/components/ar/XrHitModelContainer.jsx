import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import ItemCardForAR from "./ItemCardForAR";
import axios from "axios";
import { useParams } from "react-router-dom";
//import { toggleSession } from '@react-three/xr';

const XrHitModelContainer = () => {

  const { userId } = useParams(); // get the shopId from the route params
  const [arSupportedOrNot, setARSupportedOrNot] = useState(false);
  const [itemArray, setItemArray] = useState([]);
  const [itemModel, setItemModel] = useState(''); //itemModel state to pass it as prop to XrHitModel component
  const [showOverlay, setShowOverlay] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  const divRef = useRef(); //overlay element/div ref

  useEffect(() => {
    // Check if WebXR is available
    if ("xr" in navigator) {
      // Check if immersive-ar mode is supported
      navigator.xr.isSessionSupported("immersive-ar").then((result) => setARSupportedOrNot(result));
    }

    //get Item from db using userId
    axios.get(`${import.meta.env.VITE_BACKEND_API}/get-item/${userId}`)
    .then(res => {
      setItemArray(res.data);
    })
    .catch(err => {
      console.error(err);
      console.log('cant get the item');
    });

    /*navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['dom-overlay']
    }).then((session) => {
      console.log(session.domOverlayState)
    });*/

  }, [userId]);

  //callback function to get isPresenting value from useXR hook from child component
  const showOverlayOrNotFun = useCallback((value) => setShowOverlay(value), [showOverlay]) //eslint-disable-line 

  //handel click on item card to open ar/custom ar button
  const handelClickOnItemCard = /*async*/(itemModel) => {
    setItemModel(itemModel);
    //await toggleSession('immersive-ar')
  }

  //render itemList
  const itemList = itemArray.map((item) =>{
    //created props object to make code more readable
    const cardProps = {
      itemImg: item.imgLocation,
      itemName: item.itemName
    };

    return(
      <div className='cursor-pointer' key={item._id} onClick={() => handelClickOnItemCard(item.modelLocation)}>
        <ItemCardForAR {...cardProps}/>
      </div>
    );

  });
  
  return (
    <div className="h-screen w-screen overflow-x-hidden">
      {arSupportedOrNot ? <p>Ar supported</p> : <p>Ar not supported</p>}

      <div className='grid md:grid-cols-3 cursor-pointer' onClick={() => handelClickOnItemCard('test')}>
        {itemList}
      </div>

      
      <div ref={divRef} id="overlay-content" className={"flex justify-center absolute bottom-4 left-1/2 transform -translate-x-1/2 " + (showOverlay ? 'block' : 'hidden')}>
        <button id="my-button" className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">PLACE</button>
        <button id="my-button" className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">EXIT AR</button>
      </div>

      <ARButton
      sessionInit={{ 
        requiredFeatures: ["hit-test"],
        optionalFeatures: ["dom-overlay"],
        domOverlay: {root: divRef.current} 
      }}
      />
    
    <Canvas style={showCanvas ? {opacity: 1, visibility: "visible", position: "static", left: 0} : {opacity: 0, visibility: "hidden", position: "absolute", left: "-100%"}}>
      <XR onSessionStart={() => setShowCanvas(true)} onSessionEnd={() => setShowCanvas(false)}>
        <XrHitModel itemModel={itemModel} showOverlayOrNot={showOverlayOrNotFun}/>
      </XR>
    </Canvas>

    </div>
  );
};

export default XrHitModelContainer;
