import TryARLogo from '../../assets/tryAR-logo.png';
import PropTypes from 'prop-types';

const ItemCardForAR = ({ itemImg, itemName }) => {
  return (
    <div className='border border-gray-400 p-4'>
      <img src={TryARLogo /*itemImg*/} className='h-56 mx-auto' />
      <p className='text-center mx-auto'>{itemName}</p>
    </div>
  )
}

ItemCardForAR.propTypes = {
  itemImg: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired
};

export default ItemCardForAR