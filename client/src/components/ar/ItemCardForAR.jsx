import TryARLogo from '../../assets/tryAR-logo.png';

const ItemCardForAR = ({ itemImg, itemName }) => {
  return (
    <div className='border border-gray-400 p-4'>
      <img src={TryARLogo /*itemImg*/} className='h-56 mx-auto' />
      <p className='text-center mx-auto'>tryAr{/*itemName*/}</p>
    </div>
  )
}

export default ItemCardForAR