import SearchBar from '../serchbar/searchbar'
import { useSelector, useDispatch } from 'react-redux'
import Filter from './filter/filter'
import './filters.css'
import { useEffect, useState } from 'react'
import { addFilter, fetchGenres } from '../../redux/videogameSlice/slice'
import { useLocation, useParams } from 'react-router-dom'

const Filters = () => {
  const { genres, videogamesFromApi, searchGames } = useSelector(state => state.videogame)
  const location = useLocation()
  const { nameGame } = useParams()
  // const [counter, setCounter] = useState(false)
  const [filterState, setFilterState] = useState({
    'DB or API': 'DB or API',
    'Rating or A-Z': 'Rating or A-Z',
    Genres: 'Genre'
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

  const handleOnSubmit = (e) => {
    e.preventDefault()
    // setCounter(false)
    if (location.pathname === `/search/${nameGame}`) {
      let filterGames = [...searchGames]
      console.log(filterGames)
      if (filterState.Genres !== 'Genre') {
        const filtering = filterGames.filter((ele) => {
          return ele.genres.find(name => name.name === filterState.Genres)
        })
        filterGames = filtering
      }
      if (filterState['Rating or A-Z'] === '1 to 5') {
        const filtering = filterGames.sort((a, b) => a.rating - b.rating)
        console.log('esto es filtering', filtering)
        filterGames = filtering
      } else if (filterState['Rating or A-Z'] === '5 to 1') {
        const filtering = filterGames.sort((a, b) => b.rating - a.rating)
        console.log('esto es filtering', filtering)
        filterGames = filtering
      } else if (filterState['Rating or A-Z'] === 'A to Z') {
        filterGames.sort((a, b) => {
          const nameA = a.name.toUpperCase() // Convertir a mayúsculas para un ordenamiento sin distinción entre mayúsculas y minúsculas
          const nameB = b.name.toUpperCase()
          if (nameA < nameB) {
            return -1 // a debe ir antes que b
          }
          if (nameA > nameB) {
            return 1 // a debe ir después que b
          }
          return 0 // a y b son iguales en términos de ordenamiento
        })
      } else if (filterState['Rating or A-Z'] === 'Z to A') {
        filterGames.sort((a, b) => {
          const nameA = a.name.toUpperCase() // Convertir a mayúsculas para un ordenamiento sin distinción entre mayúsculas y minúsculas
          const nameB = b.name.toUpperCase()
          if (nameA > nameB) {
            return -1 // a debe ir antes que b
          }
          if (nameA < nameB) {
            return 1 // a debe ir después que b
          }
          return 0 // a y b son iguales en términos de ordenamiento
        })
      }
      if (filterState['DB or API'] === 'Data Base') {
        const filtering = filterGames.filter(ele => isNaN(ele.id))
        filterGames = filtering
      } else if (filterState['DB or API'] === 'APi') {
        console.log(filterGames)
        const filtering = filterGames.filter(ele => !isNaN(ele.id))
        console.log(filtering)
        filterGames = filtering
      }
      dispatch(addFilter(filterGames))
    } else {
      let filterGames = [...videogamesFromApi]
      if (filterState.Genres !== 'Genre') {
        const filtering = filterGames.filter((ele) => {
          return ele.genres.find(name => name.name === filterState.Genres)
        })
        filterGames = filtering
      }
      if (filterState['Rating or A-Z'] === '1 to 5') {
        const filtering = filterGames.sort((a, b) => a.rating - b.rating)
        console.log('esto es filtering', filtering)
        filterGames = filtering
      } else if (filterState['Rating or A-Z'] === '5 to 1') {
        const filtering = filterGames.sort((a, b) => b.rating - a.rating)
        console.log('esto es filtering', filtering)
        filterGames = filtering
      } else if (filterState['Rating or A-Z'] === 'A to Z') {
        filterGames.sort((a, b) => {
          const nameA = a.name.toUpperCase() // Convertir a mayúsculas para un ordenamiento sin distinción entre mayúsculas y minúsculas
          const nameB = b.name.toUpperCase()
          if (nameA < nameB) {
            return -1 // a debe ir antes que b
          }
          if (nameA > nameB) {
            return 1 // a debe ir después que b
          }
          return 0 // a y b son iguales en términos de ordenamiento
        })
      } else if (filterState['Rating or A-Z'] === 'Z to A') {
        filterGames.sort((a, b) => {
          const nameA = a.name.toUpperCase() // Convertir a mayúsculas para un ordenamiento sin distinción entre mayúsculas y minúsculas
          const nameB = b.name.toUpperCase()
          if (nameA > nameB) {
            return -1 // a debe ir antes que b
          }
          if (nameA < nameB) {
            return 1 // a debe ir después que b
          }
          return 0 // a y b son iguales en términos de ordenamiento
        })
      }
      if (filterState['DB or API'] === 'Data Base') {
        const filtering = filterGames.filter(ele => isNaN(ele.id))
        filterGames = filtering
      } else if (filterState['DB or API'] === 'APi') {
        const filtering = filterGames.filter(ele => !isNaN(ele.id))
        filterGames = filtering
      }
      dispatch(addFilter(filterGames))
    }
  }

  const handleOnChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name
    console.log({ [name]: value })
    setFilterState({
      ...filterState,
      [name]: value
    })
    // if (location.pathname === `/search/${nameGame}`) {
    //   const genre = genres.find((gen) => gen.name === value)
    //   const from = dbApi.find(ele => ele === value)
    //   const rate = rating.find(ele => ele === value)
    //   console.log(from)
    //   console.log(rate)
    //   let filterSearchGames
    //   if (genre) {
    //     filterSearchGames = searchGames.filter((genre) => {
    //       return genre.genres.find(name => name.name === value)
    //     })
    //   }
    //   if (from) {
    //     console.log(filterSearchGames)
    //   }
    //   dispatch(addFilter(filterSearchGames))
    // } else {
    //   const filterSearchGames = videogamesFromApi.filter((genre) => {
    //     return genre.genres.find(name => name.name === value)
    //   })
    //   dispatch(addFilter(filterSearchGames))
    // }
    // if (!counter) {
    //   setCounter(true)
    // }
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
            // className={!counter ? 'buttonFilterDisabled' : 'buttonFilter'}
            className='buttonFilter'
            type='submit'
          // disabled={!counter}
          >
            FILTER
          </button>
        </form>
      </div>
    </div>
  )
}

export default Filters
