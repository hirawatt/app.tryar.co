import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className='p-10'>
      <ul className='flex'>
        <li className='mx-auto'></li>
        <li className='mx-auto'><Link to="/">Home</Link></li>
        <li className='mx-auto'><Link to="/items">Items</Link></li>
        <li className='mx-auto'><Link to="/profile">Profile</Link></li>
        <li className='mx-auto'><a href={`${import.meta.env.VITE_BACKEND_API}/auth/logout`}>Logout</a></li>
        <li className='mx-auto'></li>
      </ul>
    </nav>
  )
}

export default NavBar;
