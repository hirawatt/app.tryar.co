import { connect } from 'react-redux';
import GoogleButton from './GoogleButton';
<<<<<<< HEAD:client/src/components/Frontpage.jsx
import TryARLogo from '../assets/tryAR-Logo.png';
import NavBar from './NavBar';
=======
import TryARLogo from '../../assets/TryAR-Logo.png';
import NavBar from '../navbar/NavBar';
>>>>>>> 7c0dc4a5a59e507efe2e5a579cf50dd80284af98:client/src/components/home/index.jsx
import PropTypes from 'prop-types';

const Frontpage = (props) => {
  return (
    <div>
      {props.user ? <NavBar /> : null}
      <div className='flex flex-col items-center justify-center h-screen'>
      <img className='h-56' src={TryARLogo} alt="TryAR logo"/>
      <h1 className='text-center'>Plug & Play <br/>Augmented Reality App</h1>
      {props.user ? null : <GoogleButton/>} 
      </div>
    </div>
  ) 
}

const mapStateToProps = (state) => {
  return {
    user: state
  }
};

Frontpage.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ])
};

const ConnectedFrontPage = connect(mapStateToProps)(Frontpage);
export default ConnectedFrontPage;