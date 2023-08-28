import { useEffect } from 'react';
import { connect } from 'react-redux';
import {Navigate, Routes, Route} from 'react-router-dom';
import FrontPage from './components/FrontPage';
import ConnectedProfilePage from './components/ProfilePage';
import ItemUploadPage from './components/ItemUploadPage';
import XrHitModelContainer from './components/ar/XrHitModelContainer';
import { fetchUser } from './store/actions/authActions';
import PropTypes from 'prop-types';

function App(props) {
  useEffect(() => {
    props.fetch_user(); //eslint-disable-line
  }, [props])

  if (props.user === null) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route exact path="/" element={<FrontPage />} />
      <Route path="/profile" element={<ConnectedProfilePage />} />
      <Route path="/items" element={<ItemUploadPage />} />
      <Route path="/ar/:userId" element={<XrHitModelContainer />} />
    </Routes>
  )

  //protected routes will uncomment after developing other components
  /*return (
    <Routes>
      <Route exact path="/" element={<FrontPage />} />
      <Route path="/profile" element={props.user ? <ConnectedProfilePage /> : <Navigate to="/" />} />
      <Route path="/items" element={props.user ? <ItemUploadPage /> : <Navigate to="/" />} />
      <Route path="/ar/:userId" element={props.user ? <XrHitModelContainer /> : <Navigate to="/" />} />
    </Routes>
  )*/
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
    PropTypes.bool
  ])
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

