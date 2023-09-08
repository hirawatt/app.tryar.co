import { useEffect } from 'react';
import { connect } from 'react-redux';
import {Navigate, Routes, Route} from 'react-router-dom';
import FrontPage from './components/FrontPage';
import ConnectedProfilePage from './components/ProfilePage';
import ConnectedItemUploadPage from './components/ItemUploadPage';
import XrHitModelContainer from './components/ar/XrHitModelContainer';
import { fetchUser } from './store/actions/authActions';
import PropTypes from 'prop-types';

function App({ user, fetch_user }) {
  useEffect(() => {
    fetch_user(); 
  }, [fetch_user])

  if (user === null) {
    return <div>Loading...</div>;
  }
  
  //protected routes will uncomment after developing other components
  return (
    <Routes>
      <Route exact path="/" element={<FrontPage />} />
      <Route path="/profile" element={user ? <ConnectedProfilePage /> : <Navigate to="/" />} />
      <Route path="/items" element={user ? <ConnectedItemUploadPage /> : <Navigate to="/" />} />
      <Route path="/ar/:userId" element={<XrHitModelContainer />} />
    </Routes>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
      fetch_user:() => {dispatch(fetchUser())}
  }
}

const mapStateToProps = (state) => {
  return {
    user: state
  }
};

App.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  fetch_user: PropTypes.func.isRequired
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

