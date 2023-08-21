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
  const loading = useSelector(state => state.videogame.searchpagestate)
  useEffect(() => {
    if (page > 7 || isNaN(page)) {
      return navigate('/error')
    }
  }, [])

  const videogamesFromApi = useSelector(state => state.videogame)
  const dispatch = useDispatch()
  useEffect(() => {
    if (videogamesFromApi.videogamesFromApi.length === 0) {
      dispatch(fetchVideogames())
    }
  }, [])

  if (loading) {
    return (
      <div className='loadingContainer'>
        <div className='lds-facebook'><div /><div /><div /></div>
      </div>
    )
  }
  return (
    <div className='home'>
      <Filters />
      {/* <div>{videogamesFromApi.videogamesFromApi[3] && videogamesFromApi.videogamesFromApi[3].name}</div> */}
      <Pagination />
    </div>
  )
}

export default Home
