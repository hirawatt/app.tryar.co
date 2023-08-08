import './App.css';
import {Routes, Route} from 'react-router-dom';
import FrontPage from './components/Frontpage';
import ProfilePage from './components/ProfilePage';
import ItemUploadPage from './components/ItemUploadPage';

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<FrontPage />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/item" element={<ItemUploadPage />} />
    </Routes>
  )
}

export default App
