//import TryARLogo from '../../assets/tryAR-logo.png';
import PropTypes from 'prop-types';

const ItemCardForAR = ({ imgLocation, itemName }) => (
    <div className='border border-gray-400 p-4'>
      <img src={`${import.meta.env.VITE_PUBLIC_BUCKET_URL}/${imgLocation}`} className='h-56 mx-auto' />
      <p className='text-center mx-auto'>{itemName}</p>
    </div>
  )

ItemCardForAR.propTypes = {
  imgLocation: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired
};

export default ItemCardForAR