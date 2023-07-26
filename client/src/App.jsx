import './App.css'
import imagen1 from './assets/100-best-games-hp-b.webp'
import imagen2 from './assets/descarga.jpeg'
import imagen3 from './assets/Fate-of-Game-Preservation-Games-GettyImages-1170073827.webp'
import imagen4 from './assets/i-stock-1287493837-1.jpg'

function App () {
  return (
    <div className='contenedor'>
      <img src={imagen1} alt='imagen1' className='imagen1' />
      <img src={imagen2} alt='imagen2' className='imagen2' />
      <img src={imagen3} alt='imagen3' className='imagen3' />
      <img src={imagen4} alt='imagen4' className='imagen4' />
    </div>
  )
}

export default App
