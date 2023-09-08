import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import Card from './ItemCard';
import NavBar from './NavBar';
import FileUpload from './fileUpload/FileUpload';
import PropTypes from 'prop-types';

const ItemUploadPage = (props) => {
  const [itemArray, setItemArray] = useState([]);

  //getItem function
  const getItem = useCallback(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API}/get-item/${props.user._id}`)
    .then(res => {
      setItemArray(res.data);
    })
    .catch(err => {
      console.error(err);
      console.log('cant get the item');
    });
  }, [props.user._id])

  useEffect(() => {
    getItem();
  }, [getItem, props.user._id])

  //render itemList
  const itemList = () => {
    const list = itemArray.map((item) =>{
      //created props object to make code more readable
      const cardProps = {
        itemImg: item.imgLocation,
        itemName: item.itemName,
        itemModel: item.modelLocation,
        itemId: item._id,
        userId: props.user._id,
        deleteItemFromChild: deleteItem
      };

      return(
        <div key={item._id}>
          <Card {...cardProps}/>
        </div>
      );
  
    });
    return (list);
  }

  //delteItem function
  const deleteItem = (userId, itemId, imgLocation, modelLocation) => {
    axios.put(`${import.meta.env.VITE_BACKEND_API}/delete-item`, {
      userId: userId,
      itemId: itemId,
      imgLocation: imgLocation,
      modelLocation: modelLocation
    })
    .then(res => {
      console.log(res.data.message);
      getItem();
    })
    .catch(err => {
      console.error(err);
      console.log('item deletion failed');
    });
  }

  //check if user is permium or not
  const userPremiumOrNot = () => {
    if (props.user.premium) {
      return(<FileUpload userId={props.user._id}/>)
    } 
    return(<div className='flex justify-center'>upgrade to premium, to add more items</div>)
  }

  return (
    <div className='container-snap'>
      <NavBar />
      {userPremiumOrNot()}
      <div className="flex justify-center m-5">
        <Link to="/ar/1">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-4 focus:ring-blue-300">AR page</button>
        </Link>
      </div>
      {itemList()}
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    user: state
  }
};

ItemUploadPage.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired
  }).isRequired
};

const ConnectedItemUploadPage = connect(mapStateToProps)(ItemUploadPage);
export default ConnectedItemUploadPage;