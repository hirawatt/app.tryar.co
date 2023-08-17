
const NavBar = () => {
  return (
    <nav className='p-10'>
      <ul className='flex'>
        <li className='mx-auto'></li>
        <li className='mx-auto'><a href="/">Home</a></li>
        <li className='mx-auto'><a href="/items">Items</a></li>
        <li className='mx-auto'><a href="/profile">Profile</a></li>
        <li className='mx-auto'><a href={`${import.meta.env.VITE_BACKEND_API}/auth/logout`}>Logout</a></li>
        <li className='mx-auto'></li>
      </ul>
    </nav>
  )
}

export default NavBar;
