import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import FrontPage from './components/Frontpage';
import ProfilePage from './components/ProfilePage';
import ItemUploadPage from './components/ItemUploadPage';
import { fetchUser } from './store/actions/authActions';

function App() {

  const dispatch = useDispatch(); // call useDispatch
  useEffect(() => {
    dispatch(fetchUser()); // dispatch fetchUser action
  }, [dispatch])

  return (
    <Routes>
      <Route exact path="/" element={<FrontPage />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/item" element={<ItemUploadPage />} />
    </Routes>
  )
}

export default App;

