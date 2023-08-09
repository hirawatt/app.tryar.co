import TryARLogo from '../assets/TryAR-Logo.png';

// Define a Card component that takes props for image and text
const Card = () => {
  // Use inline styles to set the width and height of the card
  const cardStyle = {
    width: '200px',
    height: '250px',
    padding: '20px'
  };

  // Use inline styles to set the image source, size and position
  const imageStyle = {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    display: 'block',
  };

  // Use inline styles to set the text content, font and alignment
  const textStyle = {
    content: 'tryAr',
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    textAlign: 'center',
  };

  // Return the JSX code for the card element
  return (
    <div style={cardStyle}>
      <img src={TryARLogo} style={imageStyle} />
      <p style={textStyle}>tryAr</p>
    </div>
  );
}

// Export the Card component
export default Card;
