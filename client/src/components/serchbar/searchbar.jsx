import { useDispatch } from 'react-redux'
import Lupa from '../../assets/lupa'
import './searchbar.css'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { addFilter } from '../../redux/videogameSlice/slice'

const SearchBar = () => {
  const [name, setname] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    const value = e.target.value
    setname(value)
  }

  const handleOnClick = () => {
    if (name !== '') {
      dispatch(addFilter([]))
      // dispatch(fetchSearch(name))
      if (location.pathname !== '/search') {
        return navigate(`/search/${name}`)
      }
      if (location.pathname === '/search') {
        setname('')
      }
    }
  }

  // esta funciona se activara cuando se presione enter en el input
  const handleOnKeyDown = (e) => {
    if (name !== '') {
      if (e.key === 'Enter') {
        dispatch(addFilter([]))
        // dispatch(fetchSearch(name))
        if (location.pathname !== '/search') {
          return navigate(`/search/${name}`)
        }
        if (location.pathname === '/search') {
          setname('')
        }
      }
    }
  }
  return (
    <div className='search-bar'>
      <input
        value={name}
        onChange={handleOnChange}
        id='inputSearchId'
        type='text'
        className='inputSearch'
        placeholder='Search...'
        onKeyDown={handleOnKeyDown}
      />
      <button className='buttonLupa' onClick={handleOnClick}>
        <Lupa />
      </button>
    </div>
  )
}

export default SearchBar
