import './searchpage.css'
import Filters from '../../components/filters/filters'
import { useSelector, useDispatch } from 'react-redux'
import Cards from '../../components/cards/cards'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { addActualSearch, fetchSearch } from '../../redux/videogameSlice/slice'

const SearchPage = () => {
  const { searchGames, searchpagestate, actualSearch, filter } = useSelector(state => state.videogame)
  const { nameGame } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (actualSearch !== nameGame) {
      dispatch(fetchSearch(nameGame))
      dispatch(addActualSearch(nameGame))
    }
  }, [nameGame])
  let firstFifteenElements
  if (filter?.length) {
    firstFifteenElements = filter?.slice(0, 15)
  } else {
    firstFifteenElements = searchGames?.slice(0, 15)
  }

  if (searchpagestate) {
    return (
      <div className='searchPageLoading'>
        <div className='lds-facebook'><div /><div /><div /></div>
      </div>
    )
  }

  return (
    <div className='searchPage'>
      <Filters />
      {nameGame && <h1 className='searchPageTitle2'>🎮 Results for: {nameGame} 🎮</h1>}
      <Cards games={firstFifteenElements} name={nameGame && nameGame} />
    </div>
  )
}

export default SearchPage
