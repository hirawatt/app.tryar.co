import './App.css';
import { useEffect } from 'react';
//import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import FrontPage from './components/FrontPage';
import ConnectedProfilePage from './components/ProfilePage';
import ItemUploadPage from './components/ItemUploadPage';
import { fetchUser } from './store/actions/authActions';

function App(props) {
  useEffect(() => {
    props.fetch_user(); //eslint-disable-line
  }, [props])

  return (
    <Routes>
      <Route exact path="/" element={<FrontPage />} />
      <Route exact path="/profile" element={<ConnectedProfilePage />} />
      <Route exact path="/items" element={<ItemUploadPage />} />
    </Routes>
  )
}

function mapDispatchToProps(dispatch) {
  return {
      fetch_user:() => {dispatch(fetchUser())}
  }
}

const ConnectedApp = connect(null, mapDispatchToProps)(App);
export default ConnectedApp;

