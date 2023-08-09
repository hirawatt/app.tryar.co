import { connect } from 'react-redux';
import NavBar from './NavBar';


const ProfilePage = (props) => {
  /*eslint-disable*/
  return (
    <div>
      <NavBar/>
      {<img className="profile-image" alt="profile" src={props.user ? props.user.userImage : ''}/>}
      <h1> Email</h1> <p>thekatohome@gmail.com</p>
      <p>{props.user ? props.user.userName : null}</p>
    </div>
  )
  /*eslint-enable*/
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    user: state
  }
};

const ConnectedProfilePage = connect(mapStateToProps)(ProfilePage);
export default ConnectedProfilePage;