import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'
import { fetchId, fetchScreenShots } from '../../redux/videogameSlice/slice'
import './details.css'
import Platforms from './platforms/platforms'
import { imagenDeRespaldo } from '../../redux/editable-stuff/editableConfig'

const Details = () => {
  const { id } = useParams()
  const gameDetails = useSelector((state) => state.videogame.gameDetails)
  const screenShots = useSelector((state) => state.videogame.screenShots)
  const loading = useSelector((state) => state.videogame.searchpagestate)
  const [moreDescription, setMoreDescription] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchId(id))
    dispatch(fetchScreenShots(id))
  }, [])
  let description
  if (gameDetails.description) {
    if (gameDetails.description.length > 1000) {
      description = gameDetails.description.slice(0, 1000) + '...'
    }
  }

  const genres = gameDetails.genres?.map((ele) => ele.name).join(', ')

  const readMore = () => {
    setMoreDescription(!moreDescription)
  }

  const readMoreFalse = () => {
    if (moreDescription) {
      setMoreDescription(false)
    }
  }

  const read = moreDescription ? 'Show less' : 'Read more'
  const opacity = moreDescription
    ? 'detailsContainerTransparent'
    : 'detailsContainer'

  const goBack = () => {
    window.history.back()
  }

  if (loading) {
    return (
      <div className='loadingContainer'>
        <div className='lds-facebook'>
          <div />
          <div />
          <div />
        </div>
      </div>
    )
  } else if (gameDetails.error) {
    return (
      <div className='gameNotFound'>
        <h1>{gameDetails.error}</h1>
        <button className='goBackButtonError' onClick={goBack}>
          Go Back
        </button>
      </div>
    )
  }
  return (
    <div className='pageDetailsContainer'>
      <div className={opacity} onClick={readMoreFalse}>
        <div className='detailsImageContainer'>
          <img
            src={
              gameDetails.background_image
                ? gameDetails.background_image
                : imagenDeRespaldo
            }
            alt={gameDetails.name}
            width={600}
            height={350}
            className='detailsImage'
          />
          {screenShots.map((ele) => {
            return (
              <img
                key={ele.id}
                src={ele.image}
                alt={ele.image}
                className='detailsScreenShots'
              />
            )
          })}
        </div>
        <div className='detailsTextContainer'>
          <div className='detailsSpanContainer'>
            <span className='spanDates'>📅 {gameDetails.released}</span>
            <div className='iconosDetails'>
              <Platforms platforms={gameDetails.parent_platforms} />
            </div>
            <span className='spanDates'>⭐ {gameDetails.rating}</span>
          </div>
          <h1 className='detailsH1'>{gameDetails.name}</h1>
          <div>
            <span
              className='detailsDescription'
              dangerouslySetInnerHTML={{
                __html: description || gameDetails.description
              }}
            />
            <span>
              {' '}
              <button className='readMoreButton' onClick={readMore}>
                {read}
              </button>
            </span>
          </div>
          <div className='detailsSpanContainer'>
            <span className='spanDates'>Genres: {genres}</span>
          </div>
          <div className='backButtonContainer'>
            <button className='goBackButton' onClick={goBack}>
              Go Back
            </button>
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
      {moreDescription && (
        <span
          className='detailsPositionAbsolute'
          dangerouslySetInnerHTML={{ __html: gameDetails.description }}
        />
      )}
    </div>
  )
}

export default Details
