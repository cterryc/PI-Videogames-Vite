import { useSelector } from 'react-redux'
import Cards from '../cards/cards'
import { useEffect, useState } from 'react'
import './pagination.css'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowLeft from '../../assets/arrow-left'
import ArrowRight from '../../assets/arrow-right'

const itemsPerPage = 15

const Pagination = () => {
  const allGames = useSelector((state) => state.videogame.videogamesFromApi)
  const { page } = useParams()
  const [currentPage, setCurrentPage] = useState(page || 1)
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/home/${currentPage}`)
  }, [currentPage])

  // me devuelve el indice del ultimo juego que puede ser 15, 30, 45 ...etc. de 15 en 15
  const indexOfLastItem = currentPage * itemsPerPage

  // me devuelve el indice del primer juego iniciando del 0, 15, 30 ...etc. de 15 en 15
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  // me devuelve un array con los "juegos" que quiero mostrar en la pagina actual
  // indexOfFirstItem y indexOfLastItem tomaran valores como => (0, 15) ó (15, 30) ó (30, 45)
  const currentGames = allGames.slice(indexOfFirstItem, indexOfLastItem)

  // me devuelve el numero total de botones que necesito
  const totalPages = Math.ceil(allGames.length / itemsPerPage)

  // cuando cambie de pagina, me actualizo el estado de la pagina actual
  const handlePageChange = (pageNumber, e) => {
    console.log(e.target.id)
    setCurrentPage(pageNumber)
  }
  console.log(currentPage)

  return (
    <div className='containerPagination'>
      <div className='containerButtons'>
        <button
          className={currentPage < '2' ? 'buttonsPaginationActive' : 'buttonsPagination'}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage < '2'}
        >
          <ArrowLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          return (
            <button
              key={index}
              onClick={(e) => handlePageChange(index + 1, e)}
              className={Number(currentPage) === index + 1 ? 'buttonsPaginationActive' : 'buttonsPagination'}
              id={index + 1}
              disabled={Number(currentPage) === index + 1}
            >
              {index + 1}
            </button>
          )
        })}
        <button
          className={currentPage > '6' ? 'buttonsPaginationActive' : 'buttonsPagination'}
          onClick={() => setCurrentPage(Number(currentPage) + 1)}
          disabled={currentPage > '6'}
        >
          <ArrowRight />
        </button>
      </div>
      <Cards games={currentGames} />
      <div className='containerButtons'>
        <button
          className={currentPage < '2' ? 'buttonsPaginationActive' : 'buttonsPagination'}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage < '2'}
        >
          <ArrowLeft />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={(e) => handlePageChange(index + 1, e)}
            className={Number(currentPage) === index + 1 ? 'buttonsPaginationActive' : 'buttonsPagination'}
            disabled={Number(currentPage) === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={currentPage > '6' ? 'buttonsPaginationActive' : 'buttonsPagination'}
          onClick={() => setCurrentPage(Number(currentPage) + 1)}
          disabled={currentPage > '6'}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}

export default Pagination
