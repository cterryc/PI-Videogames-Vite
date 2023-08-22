import SearchBar from '../serchbar/searchbar'
import { useSelector, useDispatch } from 'react-redux'
import Filter from './filter/filter'
import './filters.css'
import { useEffect, useState } from 'react'
import { fetchGenres } from '../../redux/videogameSlice/slice'

const Filters = ({ videogamesFromApi }) => {
  const genres = useSelector(state => state.videogame.genres)
  const [nameFilter, setNameFilter] = useState(false)
  const [disable, setDisable] = useState('FILTER')
  const [filterState, setFilterState] = useState({
    'DB or API': 'DB or API',
    'Rating or A-Z': 'Rating or A-Z',
    Genres: 'Genres'
  })
  const genre = ['Genre', ...genres]
  // console.log(genres)
  const dispatch = useDispatch()

  const dbApi = ['DB or API', 'Data Base', 'APi']
  const rating = ['Rating or A-Z', '1 to 5', '5 to 1', 'A to Z', 'Z to A']

  useEffect(() => {
    if (!genres.length) {
      dispatch(fetchGenres())
    }
  }, [])
  useEffect(() => {
    console.log(nameFilter)
  }, [filterState])

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (nameFilter) {
      setNameFilter(false)
    }
    setFilterState({
      'DB or API': 'DB or API',
      'Rating or A-Z': 'Rating or A-Z',
      Genres: 'Genres'
    })
  }

  const handleOnChange = (e) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    setFilterState({
      ...filterState,
      [name]: value
    })
    if (!nameFilter) {
      console.log('entro a !nameFilter')
      setNameFilter(true)
      setDisable(false)
    }
  }

  return (
    <div className='containerAllFilters'>
      <div className='filters'>
        <div className='divSearchBar'>
          <SearchBar />
        </div>
        <form className='containerFilters' onSubmit={handleOnSubmit} onChange={handleOnChange}>
          <Filter name='Genres' filter={genre} value={filterState.Genres} />
          <Filter name='DB or API' filter={dbApi} value={filterState['DB or API']} />
          <Filter name='Rating or A-Z' filter={rating} value={filterState['Rating or A-Z']} />
          <button
            className={disable ? 'buttonFilterDisabled' : 'buttonFilter'}
            type='submit'
            disabled={disable}
          >
            {disable ? 'FILTER' : 'CLEAR'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Filters
