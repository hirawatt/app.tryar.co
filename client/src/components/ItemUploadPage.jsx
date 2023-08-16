import Card from './ItemCard';
import NavBar from './NavBar';
import FileUpload from './fileUpload/FileUpload';

const ItemUploadPage = () => {
  return (
    <div>
      <NavBar />
      <FileUpload />
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '10px'}}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
    
  )
}

export default ItemUploadPage;