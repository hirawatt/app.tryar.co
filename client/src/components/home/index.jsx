import { connect } from 'react-redux';
import GoogleButton from './GoogleButton';
import TryARLogo from '../../assets/tryAR-Logo.png';
import NavBar from '../navbar/NavBar';
import PropTypes from 'prop-types';

const Frontpage = ({ user }) => {
  return (
    <div>
      {user ? <NavBar /> : null}
      <div className='flex flex-col items-center justify-center h-screen'>
      <img className='h-56' src={TryARLogo} alt="TryAR logo"/>
      <h1 className='text-center'>Plug & Play <br/>Augmented Reality App</h1>
      {user ? null : <GoogleButton/>} 
      </div>
    </div>
  ) 
}

const mapStateToProps = (state) => ({ user: state });

Frontpage.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ])
};

const ConnectedFrontPage = connect(mapStateToProps)(Frontpage);
export default ConnectedFrontPage;