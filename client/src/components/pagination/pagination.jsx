import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Cards from '../cards/cards'
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight
} from 'react-icons/fi'

const itemsPerPage = 15

const Pagination = () => {
  const { videogamesFromApi, filter } = useSelector((state) => state.videogame)
  const { page } = useParams()
  const [currentPage, setCurrentPage] = useState(Number(page) || 1)
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const lastProcessedPage = useRef()
  const safePage = Math.max(1, Number(page) || 1)

  // Monitorear el scroll para efectos visuales
  useEffect(() => {
    if (lastProcessedPage.current !== safePage) {
      lastProcessedPage.current = safePage
      setCurrentPage(safePage)
    }
    const handleScroll = () => {
      const position = window.pageYOffset
      setIsScrolled(position > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    // Solo actualizar currentPage si es diferente del valor procesado previamente
    if (lastProcessedPage.current !== page) {
      lastProcessedPage.current = page
      setCurrentPage(Number(page))
    }
  }, [page])

  useEffect(() => {
    // Evitar navegación si la página actual coincide con el parámetro de la URL
    if (Number(page) !== currentPage) {
      navigate(`/home/${currentPage}`)
    }
  }, [currentPage, navigate, page])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  let currentGames
  let totalPages

  if (filter.length) {
    currentGames = filter.slice(indexOfFirstItem, indexOfLastItem)
    totalPages = Math.ceil(filter.length / itemsPerPage)
  } else {
    currentGames = videogamesFromApi.slice(indexOfFirstItem, indexOfLastItem)
    totalPages = Math.ceil(videogamesFromApi.length / itemsPerPage)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Crear array de páginas visibles (lógica para mostrar páginas cercanas y puntos suspensivos)
  const getVisiblePages = () => {
    const delta = 2 // Número de páginas a mostrar a cada lado de la página actual
    const range = []
    const rangeWithDots = []

    // Siempre mostrar primera página
    range.push(1)

    // Calcular rango de páginas visibles
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i)
      }
    }

    // Siempre mostrar la última página si hay más de una
    if (totalPages > 1) {
      range.push(totalPages)
    }

    // Agregar puntos suspensivos donde sea necesario
    let l
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <div className='min-h-screen bg-gray-900 pt-6 pb-12 px-4'>
      {/* Barra de progreso que indica la posición en la lista total */}
      <div className='fixed top-16 left-0 w-full h-1 z-40 bg-gray-800'>
        <div
          className='h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300'
          style={{ width: `${(currentPage / totalPages) * 100}%` }}
        ></div>
      </div>

      {/* Header con información de paginación */}
      <div className='max-w-7xl mx-auto mb-8'>
        <div className='flex flex-col md:flex-row justify-between items-center bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-700 shadow-lg'>
          <div className='text-gray-300 mb-4 md:mb-0'>
            <span className='text-white font-medium'>
              {indexOfFirstItem + 1} -{' '}
              {Math.min(
                indexOfLastItem,
                filter.length || videogamesFromApi.length
              )}
            </span>{' '}
            of {filter.length || videogamesFromApi.length} games
          </div>

          {/* Paginación superior */}
          <div className='flex items-center space-x-1'>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center p-2 rounded-md transition-all ${
                currentPage === 1
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-label='First page'
            >
              <FiChevronsLeft className='w-5 h-5' />
            </button>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center p-2 rounded-md transition-all ${
                currentPage === 1
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-label='Previous page'
            >
              <FiChevronLeft className='w-5 h-5' />
            </button>

            {visiblePages.map((page, index) => (
              <button
                key={index}
                onClick={() =>
                  typeof page === 'number' && handlePageChange(page)
                }
                disabled={page === currentPage || page === '...'}
                className={`
                  w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-all
                  ${
                    page === '...'
                      ? 'text-gray-400 cursor-default'
                      : page === currentPage
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center p-2 rounded-md transition-all ${
                currentPage === totalPages
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-label='Next page'
            >
              <FiChevronRight className='w-5 h-5' />
            </button>

            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center p-2 rounded-md transition-all ${
                currentPage === totalPages
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-label='Last page'
            >
              <FiChevronsRight className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>

      {/* Cards de juegos */}
      <Cards games={currentGames} />

      {/* Flotante de paginación inferior - aparece con scroll */}
      <div
        className={`fixed bottom-0 left-0 w-full transition-transform duration-300 transform ${
          isScrolled ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className='max-w-xl mx-auto mb-6'>
          <div className='flex justify-center bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-full p-2 shadow-lg'>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center p-2 rounded-full transition-all ${
                currentPage === 1
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-label='First page'
            >
              <FiChevronsLeft className='w-5 h-5' />
            </button>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center p-2 rounded-full transition-all ${
                currentPage === 1
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-label='Previous page'
            >
              <FiChevronLeft className='w-5 h-5' />
            </button>

            <div className='px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium'>
              Página {currentPage} de {totalPages}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center p-2 rounded-full transition-all ${
                currentPage === totalPages
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-label='Next page'
            >
              <FiChevronRight className='w-5 h-5' />
            </button>

            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center p-2 rounded-full transition-all ${
                currentPage === totalPages
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-label='Last page'
            >
              <FiChevronsRight className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination
