import { connect } from 'react-redux';
import NavBar from './NavBar';


const ProfilePage = (props) => {
  /*eslint-disable*/
  return (
    <div>
      <NavBar/>
      <div className='flex flex-col items-center'>
      {<img className='rounded-full w-20' alt="profile" src={props.user ? props.user.userImage : 'https://lh3.googleusercontent.com/a/AAcHTtdJGTM3ndgOrcHC68hCQJLN8PH8HkdPo6b39cGmUcUO=s96-c'}/>}
      <div className='flex'>
      <h1 className='w-1/2'> Email</h1> <p className='w-1/2'>{props.user ? props.user.userEmail : 'thekatohome@gmail.com'}</p>
      </div>
      <p>{props.user ? props.user.userName : null}</p>
      </div>      
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