import Lupa from '../../assets/lupa'
import './searchbar.css'

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className='search-bar'>
      <input id='inputSearchId' type='text' name='search' className='inputSearch' placeholder='Search...' />
      <button className='buttonLupa'>
        <Lupa />
      </button>
    </div>
  )
}

export default SearchBar
