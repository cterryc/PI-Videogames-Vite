import { Link, NavLink } from 'react-router-dom'
import './navbar.css'
import './buttonNavbar.css'
// import SearchBar from '../../components/serchbar/searchbar'

const NavBar = () => {
  return (
    <div className='navbarContainer'>
      <div className='navbar'>
        <Link to='/home' className='navLinkLogo'>
          <h2 className='divIntoNavLink'>{'< TerryDev />'}</h2>
        </Link>
        {/* <SearchBar /> */}
        <div className='containerFourLinks'>
          <NavLink to='/home' className='navLink'>
            <div className='divIntoNavLink'>VIDEOGAMES</div>
          </NavLink>
          <NavLink to='/creategame' className='navLink'>
            <div className='divIntoNavLink'>CREATE GAME</div>
          </NavLink>
          <NavLink to='/about' className='navLink'>
            <div className='divIntoNavLink'>ABOUT</div>
          </NavLink>
          <Link to='/' className='navLink'>
            <div className='divButtonsContainerNav'>
              <div className='divBackgroundButtonsNav' />
              <button className='buttonsNav'>Login</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavBar
