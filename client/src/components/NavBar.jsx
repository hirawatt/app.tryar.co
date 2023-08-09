import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><a href="/">Home</a></li>
        <li className="navbar-item"><a href="/items">Items</a></li>
        <li className="navbar-item"><a href="/profile">Profile</a></li>
        <li className="navbar-item"><a href={`${import.meta.env.VITE_BACKEND_API}/auth/logout`}>Logout</a></li>
      </ul>
    </nav>
  )
}

export default NavBar;
