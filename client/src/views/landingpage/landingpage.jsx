import { Link } from 'react-router-dom'
import Buttons from '../../components/form/buttons/buttons'
import FormLogin from '../../components/form/form'
// import coworking from '../../assets/co-working.svg'
import './landingpage.css'
import ParticlesBackGround from '../../components/particlesBackgound/particlesbackground'

const Landing = () => {
  // llamo al stado global para saber si existe algo dentro

  return (
    <div className='fullFormContainer'>
      <div className='half1'>
        <ParticlesBackGround /> {/* no importa donde coloque este componente, igual ocupa toda la pantalla a menos q le otorgue un max-with */}
        <Link to='/home/1' className='buttonContainer'>
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
