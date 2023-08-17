import TryARLogo from '../assets/tryAR-logo.png';

// Define a Card component that takes props for image and text
const Card = () => {

  return (
    <div>
      <img src={TryARLogo} className='h-56 mx-auto' />
      <p className='text-center'>tryAr</p>
    </div>
  );
}

export default Card;
