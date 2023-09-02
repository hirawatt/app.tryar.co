import Card from './ItemCard';
import NavBar from './NavBar';
import FileUpload from './fileUpload/FileUpload';
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ItemUploadPage = (props) => {
  const [itemArray, setItemArray] = useState([]);

  //getItem function
  const getItem = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_API}/get-item/${userId}`)
    .then(res => {
      setItemArray(res.data);
    })
    .catch(err => {
      console.error(err);
      console.log('cant get the item');
    });
  }

  //render itemList
  const itemList = () => {
    const list = itemArray.map((item) =>{
      //created props object to make code more readable
      const cardProps = {
        itemImg: item.itemArray.imgLocation,
        itemName: item.itemArray.itemName,
        itemModel: item.itemArray.modelLocation,
        itemId: item.itemArray._id,
        userId: props.user._id,
        deleteItemFromChild: deleteItem
      };

      return(
        <div key={item.itemArray._id}>
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
      console.log(res.data);
      console.log('item deleted');
    })
    .catch(err => {
      console.error(err);
      console.log('item deletion failed');
    });
  }

  //check if user is permium or not
  const userPremiumOrNot = () => {
    if (props.user.premium || true) {
      return(<FileUpload />)
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
      <div>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
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