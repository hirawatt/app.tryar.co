import TryARLogo from '../assets/tryAR-logo.png';
import PropTypes from 'prop-types';

// Define a Card component that takes props for image and text
const Card = ({ itemImg, itemName, itemModel, itemId, userId, deleteItemFromChild }) => {

  return (
    <div className='flex flex-row items-center justify-between border border-gray-400 p-4'>
      <img src={TryARLogo /*itemImg*/} className='h-56 mx-auto' />
      <p className='text-center mx-auto'>{itemName}</p>
      <button className='mx-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => deleteItemFromChild(userId, itemId, itemImg, itemModel)}>Delete</button>
    </div>
  );
}

Card.propTypes = {
  itemImg: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemModel: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  deleteItemFromChild: PropTypes.func.isRequired
};

export default Card;
