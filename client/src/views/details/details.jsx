import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { fetchId, fetchScreenShots } from '../../redux/videogameSlice/slice'
import './details.css'
import Android from '../../assets/android'
import Apple from '../../assets/apple'
import Atari from '../../assets/atari'
import Linux from '../../assets/linux'
import Nintendo from '../../assets/nintendo'
import Sega from '../../assets/sega'
import Sony from '../../assets/sony'
import Windows from '../../assets/windows'
import Xbox from '../../assets/xbox'

const Details = () => {
  const { id } = useParams()
  const gameDetails = useSelector(state => state.videogame.gameDetails)
  const screenShots = useSelector(state => state.videogame.screenShots)
  const loading = useSelector(state => state.videogame.searchpagestate)
  const [moreDescription, setMoreDescription] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchId(id))
    dispatch(fetchScreenShots(id))
  }, [])

  let description
  if (gameDetails.description) {
    console.log(gameDetails.description)
    if (gameDetails.description.length > 1000) {
      // const split = gameDetails.description.split('<p>').join('').split('</p>').join('')
      description = gameDetails.description.slice(0, 1000) + '...'
      console.log(description)
    }
  }
  console.log(gameDetails)

  const genres = gameDetails.genres?.map(ele => ele.name).join(', ')

  if (loading) {
    return (
      <div className='loadingContainer'>
        <div className='lds-facebook'><div /><div /><div /></div>
      </div>
    )
  }

  const readMore = () => {
    setMoreDescription(!moreDescription)
  }

  const readMoreFalse = () => {
    if (moreDescription) {
      setMoreDescription(false)
    }
  }

  const read = moreDescription ? 'Show less' : 'Read more'
  // const detailsDescription = moreDescription ? 'detailsDescription' : 'detailsDescription2'
  const opacity = moreDescription ? 'detailsContainerTransparent' : 'detailsContainer'

  const goBack = () => {
    window.history.back()
  }

  return (
    <div className='pageDetailsContainer'>

      <div className={opacity} onClick={readMoreFalse}>
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
        <div className='detailsTextContainer'>
          <div className='detailsSpanContainer'>
            <span className='spanDates'>Released: 📅{gameDetails.released}</span>
            <div className='iconosDetails'>
              <Android marginRight={5} />
              <Apple marginRight={5} />
              <Atari marginRight={5} />
              <Linux marginRight={5} />
              <Nintendo marginRight={5} />
              <Sega marginRight={5} />
              <Windows marginRight={5} />
              <Sony marginRight={5} />
              <Xbox marginRight={5} />
            </div>
            <span className='spanDates'>Rating: ⭐{gameDetails.rating}</span>
          </div>
          <h1 className='detailsH1'>{gameDetails.name}</h1>
          {/* <span>{gameDetails.description}</span> */}
          {/* el span de abajo es para dar uso de las etiquetas html provenientes de la API */}
          <div>
            <span
              className='detailsDescription'
              dangerouslySetInnerHTML={{
                __html: description || gameDetails.description
              }}
            />
            <span> <button className='readMoreButton' onClick={readMore}>{read}</button></span>
          </div>
          <div className='detailsSpanContainer'>
            <span className='spanDates'>
              Genres: {genres}
            </span>
          </div>
          <div className='backButtonContainer'>
            <button className='goBackButton' onClick={goBack}>Go Back</button>
          </div>
        </div>

      </div>
      <img
        src={gameDetails.background_image}
        alt={gameDetails.name}
        width={600}
        height={350}
        className='transparent-image'
      />
      {moreDescription &&
        <span
          className='detailsPositionAbsolute'
          dangerouslySetInnerHTML={{ __html: gameDetails.description }}
        />}
    </div>
  )
}

export default Details
