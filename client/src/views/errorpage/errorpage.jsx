import { useEffect } from 'react'
import './erropage.css'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      return navigate('home/1')
    }, 2000)
  }, [])
  return (
    <div className='errorPage'>
      <h1>ErrorPage</h1>
      <h3>Redirecting to Home</h3>
      <div className='lds-facebook'><div /><div /><div /></div>
    </div>
  )
}

export default ErrorPage
