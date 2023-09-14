import { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import ItemCardForAR from "./ItemCardForAR";
import axios from "axios";
import { useParams } from "react-router-dom";
//import { toggleSession } from '@react-three/xr';

const XrHitModelContainer = () => {
  let position;
  let id;
  const { userId } = useParams(); // get the shopId from the route params
  const divRef = useRef(); //overlay element/div ref

  const [state, setState] = useState({
    arSupportedOrNot: false,
    itemArray: [],
    itemModel: '', //itemModel state to pass it as prop to XrHitModel component
    showOverlay: false,
    showCanvas: false,
    modelPosition: [] //model position in real time in ar
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

  //callback function to get isPresenting value from useXR hook from child component
  const showOverlayOrNotFun = useCallback((value) => setState(pervState => ({...pervState, showOverlay: value})), [])

  //handel click on item card to open ar/custom ar button
  const  handleItemSelection = /*async*/(itemModel) => {
    setState({...state, itemModel: itemModel});
    //await toggleSession('immersive-ar')
  }

  //render itemList element
  const itemList = state.itemArray.map(({imgLocation, itemName, _id, modelLocation}) =>(
    <div className='cursor-pointer' key={_id} onClick={() => handleItemSelection(modelLocation)}>
      <ItemCardForAR {...{imgLocation, itemName}}/>
    </div>
  ));

  //function to place item in XrHitModel.jsx file using PLACE button here
  const placeModel = (e) => {
    position = e.intersection.object.position.clone(); //typeOf object
    id = Date.now(); //typeOf int
  }
  
  //element variable for conditionally rendering if ar supported
  const renderIfArSupported = (
    <>
    <div ref={divRef} id="overlay-content" className={"flex justify-center absolute bottom-4 left-1/2 transform -translate-x-1/2 " + (state.showOverlay ? 'block' : 'hidden')}>
      <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded h-16" onClick={() => {setState({...state, modelPosition: [{ position, id }]})}}>PLACE</button>
      <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded h-16">EXIT AR</button>
    </div>
    
    {/*need to give element's ref to domOverlay instead of id*/}
    <ARButton
    sessionInit={{ 
      requiredFeatures: ["hit-test"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: {root: divRef.current} 
    }}
    />
    
    {/* xr props doesn't work, when canvas is not rendered or canvas display is hidden/none or if canvas has height and width 0 */}
    <Canvas style={state.showCanvas ? {opacity: 1, visibility: "visible", position: "static", left: 0} : {opacity: 0, visibility: "hidden", position: "absolute", left: "-100%"}}>
      <XR onSessionStart={() => setState({...state, showCanvas: true})} onSessionEnd={() => setState({...state, showCanvas: false})}>
        <XrHitModel itemModel={state.itemModel} showOverlayOrNot={showOverlayOrNotFun} placeModel={placeModel} modelPosition={state.modelPosition}/>
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
