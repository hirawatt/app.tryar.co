import GoogleButton from './GoogleButton';
import TryARLogo from '../assets/TryAR-Logo.png';

const Frontpage = () => {
  return (
    <div>
      <img className="logo" src={TryARLogo} alt="TryAR logo"/>
      <h1>Plug & Play <br/>Augmented Reality App</h1>
      <GoogleButton/>
    </div>
  )
}

export default Frontpage;