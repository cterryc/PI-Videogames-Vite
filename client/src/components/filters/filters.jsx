import SearchBar from '../serchbar/searchbar'
import { useSelector, useDispatch } from 'react-redux'
import Filter from './filter/filter'
import './filters.css'
import { useEffect } from 'react'
import { fetchGenres } from '../../redux/videogameSlice/slice'

const Filters = () => {
  const genres = useSelector(state => state.videogame.genres)
  const genre = ['Genre', ...genres]
  // console.log(genres)
  const dispatch = useDispatch()

  const dbApi = ['DB or API', 'Data Base', 'APi']
  const rating = ['Rating or A-Z', '1 to 5', '5 to 1', 'A to Z', 'Z to A']

  const handleOnSubmit = (e) => {
    e.preventDefault()
    // console.log(e.target.genres.value)
  }

  useEffect(() => {
    if (!genres.length) {
      dispatch(fetchGenres())
    }
  }, [])

  return (
    <div className='containerAllFilters'>
      <div className='filters'>
        <div className='divSearchBar'>
          <SearchBar />
        </div>
        <form className='containerFilters' onSubmit={handleOnSubmit}>
          <Filter name='Genres' filter={genre} />
          <Filter name='DB or API' filter={dbApi} />
          <Filter name='Rating or A-Z' filter={rating} />
          <button className='buttonFilter' type='submit'>FILTER</button>
        </form>
      </div>
    </div>
  )
}

export default Filters
