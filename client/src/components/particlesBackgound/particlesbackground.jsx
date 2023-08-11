import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import particlesConfig from './particles.config.js'
import './particlesbackground.css'

const ParticlesBackGround = () => {
  const particlesInit = useCallback((engine) => {
    loadFull(engine)
  }, [])
  return (
    <div className='canvas'>
      <Particles
        // id=''
        options={particlesConfig}
        init={particlesInit}
      />
    </div>
  )
}

export default ParticlesBackGround
