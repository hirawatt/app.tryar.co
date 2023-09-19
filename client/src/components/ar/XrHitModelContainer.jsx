import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import ItemCardForAR from "./ItemCardForAR";
import axios from "axios";
import { useParams } from "react-router-dom";
//import { toggleSession } from '@react-three/xr';

const XrHitModelContainer = () => {
  const { userId } = useParams(); // get the shopId from the route params

  const [state, setState] = useState({
    arSupportedOrNot: false,
    itemArray: [],
    itemModel: '', //itemModel state to pass it as prop to XrHitModel component
    sessionActive: false,
  });

  //chekc for ar support
  useEffect(() => {
    // Check if WebXR is available
    if ("xr" in navigator) {
      // Check if immersive-ar mode is supported
      navigator.xr.isSessionSupported("immersive-ar")
      .then((result) => setState(pervState => ({...pervState, arSupportedOrNot: result})))
      .catch((error) => console.error(error));
    }

    /*navigator.xr.requestSession('immersive-ar', {
      requiredFeatures: ['dom-overlay']
    }).then((session) => {
      console.log(session.domOverlayState)
    });*/
  }, [])

  //fetching data from db
  useEffect(() => {
    //get Item from db using userId
    axios.get(`${import.meta.env.VITE_BACKEND_API}/get-item/${userId}`)
    .then(res => {
      setState(prevState => ({...prevState, itemArray: res.data}));
    })
    .catch(err => {
      console.error(err);
      console.log('cant get the item');
    });
  }, [userId]);

  //handel click on item card to open ar/custom ar button
  const  handleItemSelection = /*async*/(itemModel) => {
    setState({...state, itemModel: itemModel});
    //await toggleSession('immersive-ar')
  }

  //render itemList element
  const itemList = state.itemArray.map(({imgLocation, itemName, _id, modelLocation}) => (
    <div className='cursor-pointer' key={_id} onClick={() => handleItemSelection(modelLocation)}>
      <ItemCardForAR {...{imgLocation, itemName}}/>
    </div>
  ));
  
  //element variable for conditionally rendering if ar supported
  const renderIfArSupported = (
    <>
    <ARButton
    sessionInit={{ 
      requiredFeatures: ["hit-test"]
    }}
    />
    
    {/* xr props doesn't work, when canvas is not rendered or canvas display is hidden/none or if canvas has height and width 0 */}
    <Canvas style={state.sessionActive ? {position: "static", left: 0} : {position: "absolute", left: "-100%"}}>
      <XR onSessionStart={() => setState({...state, sessionActive: true})} onSessionEnd={() => setState({...state, sessionActive: false})}>
        <XrHitModel itemModel={state.itemModel}/>
      </XR>
    </Canvas>
    </>
  );

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className='grid md:grid-cols-3'>
        {itemList}
      </div>
      {state.arSupportedOrNot ? renderIfArSupported : <p>Ar not supported</p>}
    </div>
  );
};

export default XrHitModelContainer;
