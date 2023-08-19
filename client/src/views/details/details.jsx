import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchId, fetchScreenShots } from '../../redux/videogameSlice/slice'
import './details.css'

const Details = () => {
  const { id } = useParams()
  const gameDetails = useSelector(state => state.videogame.gameDetails)
  const screenShots = useSelector(state => state.videogame.screenShots)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchId(id))
    dispatch(fetchScreenShots(id))
  }, [])

  let description
  if (gameDetails.description) {
    if (gameDetails && (gameDetails.description.length > 1000)) {
      description = gameDetails.description.slice(0, 1000) + '...'
    }
  }
  // console.log(description)

  const genres = gameDetails.genres?.map(ele => ele.name).join(', ')

  return (
    <div className='detailsContainer'>
      <div className='detailsTextContainer'>
        <h1 className='detailsH1'>{gameDetails.name}</h1>
        {/* <span>{gameDetails.description}</span> */}
        {/* el span de abajo es para dar uso de las etiquetas html provenientes de la API */}
        <p className='detailsDescription' dangerouslySetInnerHTML={{ __html: description || gameDetails.description }} />
        <div className='detailsSpanContainer'>
          <span>Released: {gameDetails.released} 📅 </span>
          <span> Rating:{gameDetails.rating} ⭐</span>
          <span>
            Genres: {genres}
          </span>
        </div>
      </div>
      <hr className='detailsHr' />
      <div className='detailsImageContainer'>
        <img
          src={gameDetails.background_image}
          alt={gameDetails.name}
          width={600}
          height={350}
          className='detailsImage'
        />
        {
          screenShots.map(ele => {
            return (
              <img
                key={ele.id}
                src={ele.image}
                alt={ele.image}
                className='detailsScreenShots'
              />
            )
          })
        }
      </div>
      <img
        src={gameDetails.background_image}
        alt={gameDetails.name}
        width={600}
        height={350}
        className='transparent-image' // Agrega esta clase
      />
    </div>
  )
}

export default Details
