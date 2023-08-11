import { imagenDeRespaldo } from '../../../redux/editable-stuff/editableConfig'
import './card.css'

const Card = ({ game }) => {
  // console.log(game)
  const genres = game.genres.map(ele => ele.name).join(', ')
  let name = game.name
  if (name.length > 32) {
    name = name.substring(0, 30) + '...'
  }
  return (
    <div className='card'>
      <div className='cardContainer'>
        <img
          src={game.background_image || imagenDeRespaldo}
          alt='background_image'
          className='imgCard'
          loading='lazy'
        />
        <span>{name}</span>
        <span>Rating: {game.rating}</span>
        <span>Genre: {genres}</span>
      </div>
    </div>
  )
}

export default Card
