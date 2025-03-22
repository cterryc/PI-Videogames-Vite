import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Función para detectar el scroll y cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 shadow-lg backdrop-blur-sm' : 'bg-gray-900'
      }`}
    >
      <div className='container mx-auto px-4 py-3'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <Link
            to='/home/1'
            className='text-white text-2xl font-bold relative group'
          >
            <span className='bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
              {'<TerryDev />'}
            </span>
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full'></span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className='hidden md:flex items-center space-x-1'>
            <NavLink
              to='/home/1'
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition duration-300 rounded hover:bg-gray-800 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-blue-500 after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-white after:w-full'
                    : 'text-gray-300 after:w-0 hover:after:w-full'
                }`
              }
            >
              VIDEOGAMES
            </NavLink>
            <NavLink
              to='/creategame'
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition duration-300 rounded hover:bg-gray-800 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-blue-500 after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-white after:w-full'
                    : 'text-gray-300 after:w-0 hover:after:w-full'
                }`
              }
            >
              ADD GAME
            </NavLink>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition duration-300 rounded hover:bg-gray-800 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-blue-500 after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-white after:w-full'
                    : 'text-gray-300 after:w-0 hover:after:w-full'
                }`
              }
            >
              ABOUT ME
            </NavLink>
            <Link
              to='/'
              className='ml-4 px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-md hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300'
            >
              LOGIN
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-300 hover:text-white focus:outline-none focus:text-white transition duration-300'
            >
              {isOpen ? (
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              ) : (
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='flex flex-col space-y-2 px-2 pt-2 pb-4 bg-gray-800 rounded-lg'>
            <NavLink
              to='/home/1'
              className={({ isActive }) =>
                `block px-4 py-2 text-sm font-medium rounded transition duration-300 ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              VIDEOGAMES
            </NavLink>
            <NavLink
              to='/creategame'
              className={({ isActive }) =>
                `block px-4 py-2 text-sm font-medium rounded transition duration-300 ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              ADD GAME
            </NavLink>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                `block px-4 py-2 text-sm font-medium rounded transition duration-300 ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              ABOUT ME
            </NavLink>
            <Link
              to='/'
              className='block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded transition duration-300 hover:from-purple-700 hover:to-blue-700'
              onClick={() => setIsOpen(false)}
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
