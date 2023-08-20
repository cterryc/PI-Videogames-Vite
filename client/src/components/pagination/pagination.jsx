import { useSelector } from 'react-redux'
import Cards from '../cards/cards'
import { useEffect, useState } from 'react'
import './pagination.css'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const itemsPerPage = 15

const Pagination = () => {
  const allGames = useSelector((state) => state.videogame.videogamesFromApi)
  const { page } = useParams()
  const [currentPage, setCurrentPage] = useState(page || 1)
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location)
  console.log(page)

  useEffect(() => {
    navigate(`/home/${currentPage}`)
  }, [currentPage])
  useEffect(() => {
    setCurrentPage(page)
  }, [page])

  // me devuelve el indice del ultimo juego que puede ser 15, 30, 45 ...etc. de 15 en 15
  const indexOfLastItem = currentPage * itemsPerPage

  // me devuelve el indice del primer juego iniciando del 0, 15, 30 ...etc. de 15 en 15
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  // me devuelve un array con los "juegos" que quiero mostrar en la pagina actual
  // indexOfFirstItem y indexOfLastItem tomaran valores como => (0, 15) ó (15, 30) ó (30, 45)
  const currentGames = allGames.slice(indexOfFirstItem, indexOfLastItem)

  // me devuelve el numero total de paginas que necesito
  const totalPages = Math.ceil(allGames.length / itemsPerPage)

  // cuando cambie de pagina, me actualizo el estado de la pagina actual
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // const abc = ''
  return (
    <div className='containerPagination'>
      <div className='containerButtons'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className='buttonsPagination'>
            {index + 1}
          </button>
        ))}
      </div>
      <Cards games={currentGames} />
      <div className='containerButtons'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} className='buttonsPagination'>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Pagination
