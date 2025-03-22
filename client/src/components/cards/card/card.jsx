import {
  imagenDeRespaldo,
  urlMedia
} from '../../../redux/editable-stuff/editableConfig'
import './card.css'
import { Link } from 'react-router-dom'
import {
  FaComputer,
  FaPlaystation,
  FaXbox,
  FaAppStoreIos,
  FaLinux,
  FaApple
} from 'react-icons/fa6'
import { BsNintendoSwitch, BsAndroid2 } from 'react-icons/bs'
import { TbWorldWww } from 'react-icons/tb'

// Función para obtener el icono de la plataforma
const getPlatformIcon = (platformName) => {
  const name = platformName.toLowerCase()
  if (name.includes('pc')) return <FaComputer />
  if (name.includes('playstation')) return <FaPlaystation />
  if (name.includes('xbox')) return <FaXbox />
  if (name.includes('nintendo')) return <BsNintendoSwitch />
  if (name.includes('ios')) return <FaAppStoreIos />
  if (name.includes('android')) return <BsAndroid2 />
  if (name.includes('linux')) return <FaLinux />
  if (name.includes('web')) return <TbWorldWww />
  if (name.includes('mac')) return <FaApple />
  return '🎮'
}

const Card = ({ game }) => {
  // Procesar géneros
  const genres = []
  game.genres?.forEach((ele) => {
    if (genres.length < 2) {
      genres.push(ele.name)
    } else if (genres.length === 2) {
      genres.push('...')
    }
  })

  // Truncar nombre si es demasiado largo
  let name = game.name
  if (name.length > 32) {
    name = name.substring(0, 30) + '...'
  }

  // Función para procesar la URL de la imagen
  const processImageUrl = (imageUrl) => {
    if (!imageUrl) return imagenDeRespaldo

    const isScreenshot = imageUrl.includes('/screenshots/')
    const url = imageUrl || 'no hay imagen'
    const penultimaBarra = url.lastIndexOf('/', url.lastIndexOf('/') - 1)
    const parteDeseada = url.substring(penultimaBarra)

    return isScreenshot
      ? 'https://media.rawg.io/media/crop/600/400/screenshots' + parteDeseada
      : urlMedia + parteDeseada
  }

  const finalUrl = processImageUrl(game.background_image)

  return (
    <div className='transform hover:scale-105 transition-all duration-300 h-[340px] w-[280px] mt-5'>
      <Link
        to={`/details/${game.id}`}
        className='h-full w-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col no-underline bg-white dark:bg-gray-800'
      >
        {/* Imagen */}
        <div className='relative w-full min-h-[180px] overflow-hidden'>
          <img
            src={finalUrl}
            alt={game.name}
            className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'
            loading='lazy'
          />

          {/* Rating Badge */}
          <div className='absolute top-3 right-3 bg-black/70 text-amber-400 px-2 py-1 rounded-full text-sm font-bold backdrop-blur-sm flex items-center'>
            <span className='mr-1'>⭐</span>
            {game.rating || 'N/A'}
          </div>

          {/* Overlay gradient */}
          <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50' />
        </div>

        {/* Contenido */}
        <div className='flex flex-col gap-3 p-4 flex-grow dark:text-gray-100'>
          <h3 className='font-bold text-base leading-tight'>{game.name}</h3>
          {/* Título */}

          {/* Géneros */}
          <div className='flex flex-wrap gap-1 mt-auto'>
            {genres.map((genre, index) => (
              <span
                key={index}
                className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-[10px] font-medium text-gray-700 dark:text-gray-300'
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Plataformas */}
          <div className='flex flex-wrap gap-1 mt-2'>
            {game.parent_platforms?.map((platform, index) => {
              if (index === 3) {
                return (
                  <span
                    key={index}
                    className='px-2.5 py-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-indigo-600/30 dark:to-purple-600/30 rounded-lg text-[10px] font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1 hover:scale-105 transition-transform duration-200'
                  >
                    ...
                  </span>
                )
              } else if (index > 3) {
                return null
              }
              return (
                <span
                  key={index}
                  className='px-2.5 py-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-indigo-600/30 dark:to-purple-600/30 rounded-lg text-[9px] font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1 hover:scale-105 transition-transform duration-200'
                >
                  {getPlatformIcon(platform.platform.name)}
                  {platform.platform.name}
                </span>
              )
            })}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
