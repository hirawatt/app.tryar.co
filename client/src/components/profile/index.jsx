import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NavBar from '../navbar/NavBar';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchUser } from '../../store/actions/authActions';


const ProfilePage = (props) => {

  const [modalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    console.log('Getting Rendered');
  }, [])

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
        <button className='mx-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => setModalOpen(true)}>Delete</button>
        {modalOpen && <div className='fixed items-center justify-center h-screen'>
          <div className='h-28 w-40 rounded-sm bg-slate-400'>
            <button onClick={() => setModalOpen(false)}>X</button>
            <button onClick={() => setModalOpen(false)}>Delete</button>
            <button onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </div>}
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
