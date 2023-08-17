import Card from './ItemCard';
import NavBar from './NavBar';
import FileUpload from './fileUpload/FileUpload';

const ItemUploadPage = () => {
  return (
    <div className='container-snap'>
      <NavBar />
      <FileUpload />
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