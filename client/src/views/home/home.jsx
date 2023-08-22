import { useSelector, useDispatch } from 'react-redux'
import Filters from '../../components/filters/filters'
import './home.css'
import { useEffect } from 'react'
import { fetchVideogames } from '../../redux/videogameSlice/slice'
import Pagination from '../../components/pagination/pagination'
import { useNavigate, useParams } from 'react-router-dom'

const Home = () => {
  const { page } = useParams()
  const navigate = useNavigate()
  const { searchpagestate, videogamesFromApi } = useSelector(state => state.videogame)
  useEffect(() => {
    if (page > 7 || isNaN(page)) {
      return navigate('/error')
    }
    if (videogamesFromApi.length === 0) {
      dispatch(fetchVideogames())
    }
  }, [])

  const dispatch = useDispatch()

  if (searchpagestate) {
    return (
      <div className='loadingContainer'>
        <div className='lds-facebook'><div /><div /><div /></div>
      </div>
    )
  }
  return (
    <div className='home'>
      <Filters videogamesFromApi={videogamesFromApi} />
      {/* <div>{videogamesFromApi.videogamesFromApi[3] && videogamesFromApi.videogamesFromApi[3].name}</div> */}
      <Pagination />
    </div>
  )
}

export default Home
