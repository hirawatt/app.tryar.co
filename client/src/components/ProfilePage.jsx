import { connect } from 'react-redux';
import NavBar from './NavBar';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchUser } from '../store/actions/authActions';


const ProfilePage = (props) => {

  //delteUser function
  const deleteUser = (userId) => {
    axios.put(`${import.meta.env.VITE_BACKEND_API}/delete-user`, {
      userId: userId
    })
    .then(res => {
      console.log(res.data.message);
      props.fetch_user();
    })
    .catch(err => {
      console.log(err.data.message);
    });
  }

  return (
    <div>
      <NavBar/>
      <div className='flex flex-col items-center'>
        {<img className='rounded-full w-20' alt="profile" src={props.user ? props.user.userImage : 'https://lh3.googleusercontent.com/a/AAcHTtdJGTM3ndgOrcHC68hCQJLN8PH8HkdPo6b39cGmUcUO=s96-c'}/>}
        <div className='flex'>
          <h1 className='w-1/2'>Email</h1>
          <p className='w-1/2'>{props.user ? props.user.userEmail : 'thekatohome@gmail.com'}</p>
        </div>
        <p>{props.user ? props.user.userName : 'himanshu'}</p>
        <div className='flex'>
          <h1 className='w-1/2'>Premium</h1>
          <p className='w-1/2'>{props.user ? (props.user.premium ? 'true' : 'false') : 'false,false,false,false'}</p>
        </div>
        <button className='mx-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => deleteUser(props.user._id)}>Delete</button>
      </div>      
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetch_user:() => {dispatch(fetchUser())}
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    user: state
  }
};

ProfilePage.propTypes = {
  user: PropTypes.shape({
    userImage: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  fetch_user: PropTypes.func.isRequired
};

const ConnectedProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default ConnectedProfilePage;