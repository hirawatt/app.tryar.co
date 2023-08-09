import { connect } from 'react-redux';
import GoogleButton from './GoogleButton';
import TryARLogo from '../assets/TryAR-Logo.png';
import NavBar from './NavBar';

const Frontpage = (props) => {
  /*eslint-disable*/
  return (
    <div>
      {props.user ? <NavBar /> : null}
      <img className="logo" src={TryARLogo} alt="TryAR logo"/>
      <h1>Plug & Play <br/>Augmented Reality App</h1>
      {props.user ? null : <GoogleButton/>}
    </div>
  )
  /*eslint-enable*/
}

const mapStateToProps = (state) => {
  return {
    user: state
  }
};

const ConnectedFrontPage = connect(mapStateToProps)(Frontpage);
export default ConnectedFrontPage;