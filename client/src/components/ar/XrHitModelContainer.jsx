import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";
import ForwardedXrHitModel from "./XrHitModel";
import ItemCardForAR from "./ItemCardForAR";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toggleSession } from '@react-three/xr';

const XrHitModelContainer = () => {
  const { userId } = useParams(); // get the shopId from the route params
  const divRef = useRef(); //overlay element/div ref
  const xrHitModelRef = useRef(null);

  const [state, setState] = useState({
    arSupportedOrNot: false,
    itemArray: [],
    itemModel: '', //itemModel state to pass it as prop to XrHitModel component
    sessionActive: false,
  });
  const [session, setSession] = useState(null)

  //chekc for ar support
  useEffect(() => {
    // Check if WebXR is available
    if ("xr" in navigator) {
      // Check if immersive-ar mode is supported
      navigator.xr.isSessionSupported("immersive-ar", { requiredFeatures: ['hit-test', 'dom-overlay', 'local-floor'] })
      .then((result) => setState(pervState => ({...pervState, arSupportedOrNot: result})))
      .catch((error) => console.error(error));
    }
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
  const  handleItemSelection = async(itemModel) => {
    // Start an AR session only if there is no session; ar and other features supported
    if (!session && state.arSupportedOrNot) {
      setState({...state, itemModel: itemModel});

      const newSession = await toggleSession('immersive-ar', {
        requiredFeatures: ['hit-test', 'dom-overlay'],
        optionalFeatures: ['local-floor'],
        domOverlay: { root: divRef.current }
      })
      setSession(newSession);
    } else if (!state.arSupportedOrNot) {
      alert('Sorry, your device or browser does not support AR features.');
    }
  }

  const handleStopAR = async () => {
    // Stop an AR session only if there is a session
    if (session) {
      await session.end();
      setSession(null);
      xrHitModelRef.current.resetModelPositon();
    }
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
     <div ref={divRef} id="overlay-content" className={"flex justify-center absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[10001] " + (state.sessionActive ? 'block' : 'hidden')}>
      <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded h-16" onClick={() => xrHitModelRef.current.placeModel()}>PLACE</button>
      <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded h-16" onClick={() => handleStopAR()}>EXIT AR</button>
    </div>
    
    {/* xr props doesn't work, when canvas is not rendered or canvas display is hidden/none or if canvas has height and width 0 */}
    <Canvas 
    style={state.sessionActive ? {position: "static", left: 0} : {position: "absolute", left: "-100%"}}>
      <XR 
      referenceSpace="local-floor"
      onSessionStart={() => {setState({...state, sessionActive: true})}} 
      onSessionEnd={() => setState({...state, sessionActive: false})}>
        <ForwardedXrHitModel itemModel={state.itemModel} ref={xrHitModelRef}/>
      </XR>
    </Canvas>
    </>
  );

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <div className='grid md:grid-cols-3'>
        {itemList}
      </div>
      {state.arSupportedOrNot ? renderIfArSupported : <p>Ar and other features not supported</p>}
    </div>
  );
};

export default XrHitModelContainer;
