import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Landing from './views/landingpage/landingpage'
import Home from './views/home/home'
import ErrorPage from './views/errorpage/errorpage'
import About from './views/about/about'
import NavBar from './views/navbar/navbar'
import CreateGame from './views/Create-Game/create-game'
import Details from './views/details/details'

function App () {
  const location = useLocation()
  // console.log(location)
  return (
    <div className='app'>
      <div className='containerRoutesApp'>
        {location.pathname !== '/' && <NavBar />}
      </div>
      <div className='containerRoutesApp'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home/:page' element={<Home />} />
          <Route path='details/:id' element={<Details />} />
          <Route path='creategame' element={<CreateGame />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
