import SearchBar from '../serchbar/searchbar'
import { useSelector, useDispatch } from 'react-redux'
import Filter from './filter/filter'
import './filters.css'
import { addFilter, fetchGenres } from '../../redux/videogameSlice/slice'
import { useLocation, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import {
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiX
} from 'react-icons/fi'

const Filters = () => {
  const { genres, videogamesFromApi, searchGames } = useSelector(
    (state) => state.videogame
  )
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
  const [isSticky, setIsSticky] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)

  useEffect(() => {
    if (!genres.length) {
      dispatch(fetchGenres())
    }
  }, [])
  // Calcula cuántos filtros están activos
  useEffect(() => {
    let count = 0
    if (filterState.Genres) count++
    if (filterState['DB or API']) count++
    if (filterState['Rating or A-Z']) count++
    setActiveFilters(count)
  }, [filterState])

  // Detecta el scroll para hacer el componente sticky
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsSticky(offset > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Maneja el borrado de todos los filtros
  const handleClearFilters = (e) => {
    e.preventDefault()
    // Aquí puedes implementar la lógica para limpiar todos los filtros
    // Depende de cómo estés manejando el estado en el componente padre
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    // setCounter(false)
    if (location.pathname === `/search/${nameGame}`) {
      let filterGames = [...searchGames]
      console.log(filterGames)
      if (filterState.Genres !== 'Genre') {
        const filtering = filterGames.filter((ele) => {
          return ele.genres.find((name) => name.name === filterState.Genres)
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
        const filtering = filterGames.filter((ele) => isNaN(ele.id))
        filterGames = filtering
      } else if (filterState['DB or API'] === 'APi') {
        console.log(filterGames)
        const filtering = filterGames.filter((ele) => !isNaN(ele.id))
        console.log(filtering)
        filterGames = filtering
      }
      dispatch(addFilter(filterGames))
    } else {
      let filterGames = [...videogamesFromApi]
      if (filterState.Genres !== 'Genre') {
        const filtering = filterGames.filter((ele) => {
          return ele.genres.find((name) => name.name === filterState.Genres)
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
        const filtering = filterGames.filter((ele) => isNaN(ele.id))
        filterGames = filtering
      } else if (filterState['DB or API'] === 'APi') {
        const filtering = filterGames.filter((ele) => !isNaN(ele.id))
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
  }

  return (
    <div
      className={`transition-all duration-300 z-40 w-full ${
        isSticky ? 'sticky top-16 shadow-lg' : ''
      }`}
    >
      <div
        className={`bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 transition-all duration-300 ${
          isSticky ? 'py-2' : 'py-4'
        }`}
      >
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            {/* Barra de búsqueda */}
            <div className='w-full md:w-1/3 relative'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <FiSearch className='h-5 w-5 text-gray-400' />
                </div>
                <SearchBar className='w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent' />
              </div>
            </div>

            {/* Botón para expandir/colapsar filtros en móviles */}
            <div className='md:hidden flex justify-between items-center'>
              <button
                type='button'
                onClick={() => setIsExpanded(!isExpanded)}
                className='flex items-center space-x-1 text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors'
              >
                <FiFilter className='h-5 w-5' />
                <span>Filtros</span>
                {isExpanded ? (
                  <FiChevronUp className='h-5 w-5' />
                ) : (
                  <FiChevronDown className='h-5 w-5' />
                )}
              </button>

              {activeFilters > 0 && (
                <div className='flex items-center'>
                  <span className='bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                    {activeFilters}
                  </span>
                </div>
              )}
            </div>

            {/* Contenedor de filtros - visible en desktop, toggle en móvil */}
            <form
              className={`md:flex md:flex-1 md:items-center md:justify-between gap-4 ${
                isExpanded ? 'block' : 'hidden md:flex'
              }`}
              onSubmit={handleOnSubmit}
              onChange={handleOnChange}
            >
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 md:mb-0 md:flex md:flex-1 md:items-center md:space-x-4'>
                <div className='relative'>
                  <Filter
                    name='Genres'
                    filter={genre}
                    value={filterState.Genres}
                    className='w-full bg-gray-700 border border-gray-600 rounded-lg text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none'
                  />
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400'>
                    <FiChevronDown className='h-4 w-4' />
                  </div>
                  {filterState.Genres && (
                    <div className='absolute top-0 right-8 transform -translate-y-1/2'>
                      <span className='bg-purple-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'>
                        ✓
                      </span>
                    </div>
                  )}
                </div>

                <div className='relative'>
                  <Filter
                    name='DB or API'
                    filter={dbApi}
                    value={filterState['DB or API']}
                    className='w-full bg-gray-700 border border-gray-600 rounded-lg text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none'
                  />
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400'>
                    <FiChevronDown className='h-4 w-4' />
                  </div>
                  {filterState['DB or API'] && (
                    <div className='absolute top-0 right-8 transform -translate-y-1/2'>
                      <span className='bg-purple-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'>
                        ✓
                      </span>
                    </div>
                  )}
                </div>

                <div className='relative'>
                  <Filter
                    name='Rating or A-Z'
                    filter={rating}
                    value={filterState['Rating or A-Z']}
                    className='w-full bg-gray-700 border border-gray-600 rounded-lg text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none'
                  />
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400'>
                    <FiChevronDown className='h-4 w-4' />
                  </div>
                  {filterState['Rating or A-Z'] && (
                    <div className='absolute top-0 right-8 transform -translate-y-1/2'>
                      <span className='bg-purple-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center'>
                        ✓
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex gap-2'>
                {activeFilters > 0 && (
                  <button
                    type='button'
                    onClick={handleClearFilters}
                    className='flex items-center space-x-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors'
                  >
                    <FiX className='h-4 w-4' />
                    <span>Limpiar</span>
                  </button>
                )}

                <button
                  type='submit'
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeFilters > 0
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className='flex items-center'>
                    <FiFilter className='mr-2 h-4 w-4' />
                    <span>FILTRAR</span>
                    {activeFilters > 0 && (
                      <span className='ml-2 bg-white text-purple-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
                        {activeFilters}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
