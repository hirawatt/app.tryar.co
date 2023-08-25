import Card from './ItemCard';
import NavBar from './NavBar';
import FileUpload from './fileUpload/FileUpload';
import { Link } from "react-router-dom";

const ItemUploadPage = () => {
  return (
    <div className='container-snap'>
      <NavBar />
      <FileUpload />
      <div className="flex justify-center m-5">
        <Link to="/ar/1">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded focus:outline-none focus:ring-4 focus:ring-blue-300">AR page</button>
        </Link>
      </div>
      <div className='grid lg:grid-cols-3 h-screen p-10'>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
    
  )
}

export default ItemUploadPage;