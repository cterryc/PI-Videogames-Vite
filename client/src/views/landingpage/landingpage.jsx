import { Link } from 'react-router-dom'
import Buttons from '../../components/form/buttons/buttons'
import FormLogin from '../../components/form/form'
// import coworking from '../../assets/co-working.svg'
import './landingpage.css'
import ParticlesBackGround from '../../components/particlesBackgound/particlesbackground'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideogames } from '../../redux/videogameSlice/slice'

const Landing = () => {
  // llamo al stado global para saber si existe algo dentro
  const allGames = useSelector(state => state.videogame)
  const dispatch = useDispatch()
  useEffect(() => {
    // sino existe nada en el estado global "state.videogame.videogamesFromApi" realizo una petición.
    if (!allGames.videogamesFromApi.length) {
      dispatch(fetchVideogames())
    }
  }, [])
  return (
    <div className='fullFormContainer'>
      <div className='half1'>
        <ParticlesBackGround /> {/* no importa donde coloque este componente, igual ocupa toda la pantalla a menos q le otorgue un max-with */}
        <Link to='/home' className='buttonContainer'>
          <Buttons name='Guest' />
        </Link>
      </div>
      {/* <hr className='hrFullForm' /> */}
      <div className='half2'>
        <div className='formAndH1container'>
          <h1 className='h1FullForm'>Welcome</h1>
          <FormLogin />
          <h4 className='h4FullForm'>Don`t have an account? <Link to='/signup' className='link'>Sign Up</Link></h4>
        </div>
      </div>
    </div>
  )
}

export default Landing