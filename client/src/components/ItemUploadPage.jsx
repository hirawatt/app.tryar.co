import Card from './ItemCard';
import NavBar from './NavBar';

const ItemUploadPage = () => {
  return (
    <div>
      <NavBar />
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '10px'}}>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
    
  )
}

export default ItemUploadPage;