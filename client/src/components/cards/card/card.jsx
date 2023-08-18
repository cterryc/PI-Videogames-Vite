import { imagenDeRespaldo, urlMedia } from '../../../redux/editable-stuff/editableConfig'
import './card.css'

const Card = ({ game }) => {
  // console.log(game)
  const genres = []
  game.genres.forEach(ele => {
    if (genres.length < 2) {
      genres.push(ele.name)
    }
    if (genres.length === 2) {
      genres.push('...')
    }
  })
  let name = game.name
  if (name.length > 32) {
    name = name.substring(0, 30) + '...'
  }

  // todo lo de abajo es para reducir el tamaño de las imagenes provenientes de la API
  // añadiendo "crop/600/400"
  const url = game.background_image || 'no hay imagen'// si no existe añadimos un string para q no de error
  const penultimaBarra = url.lastIndexOf('/', url.lastIndexOf('/') - 1) // Encuentra la posición de la penúltima "/"
  const parteDeseada = url.substring(penultimaBarra) // extrae la parte deseada
  const finalUrl = urlMedia + parteDeseada // añade la parte deseada a la url

  return (
    <div className='cardBackgound'>
      <div className='card'>
        <div className='cardContainer'>
          <img
            src={game.background_image ? finalUrl : imagenDeRespaldo}
            alt='background_image'
            className='imgCard'
            loading='lazy'
          />
          <span>🎮{game.name}</span>
          <span>⭐{game.rating}</span>
          <span>{genres.join(', ')}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
