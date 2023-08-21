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
  useEffect(() => {
    if (page > 7 || isNaN(page)) {
      return navigate('/error')
    }
  }, [])

  const videogamesFromApi = useSelector(state => state.videogame)
  console.log(videogamesFromApi.videogamesFromApi)
  const dispatch = useDispatch()
  useEffect(() => {
    if (videogamesFromApi.videogamesFromApi.length === 0) {
      dispatch(fetchVideogames())
    }
  }, [videogamesFromApi])
  return (
    <div className='home'>
      <Filters />
      {/* <div>{videogamesFromApi.videogamesFromApi[3] && videogamesFromApi.videogamesFromApi[3].name}</div> */}
      <Pagination />
    </div>
  )
}

export default Home
