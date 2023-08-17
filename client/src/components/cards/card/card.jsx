import { imagenDeRespaldo } from '../../../redux/editable-stuff/editableConfig'
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
  return (
    <div className='cardBackgound'>
      <div className='card'>
        <div className='cardContainer'>
          <img
            src={game.background_image || imagenDeRespaldo}
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
