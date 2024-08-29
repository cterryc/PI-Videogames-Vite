import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// importar las rutas aqui abajo
import genres from '../routes/genres.routes.js'
import screenShots from '../routes/screenshots.routes.js'
import videogame from '../routes/videogame.routes.js'
import videogames from '../routes/videogames.routes.js'
import home from '../routes/home.routes.js'
// importar las rutas arriba.

const SERVER = express()

// Permite al servidor recibir y procesar datos enviados desde formularios HTML o solicitudes HTTP en formato JSON, con un límite de tamaño máximo establecido en 50 megabytes.
SERVER.use(express.urlencoded({ extended: true, limit: '50mb' }))
SERVER.use(express.json({ limit: '50mb' }))

SERVER.use(morgan('dev'))
SERVER.use(cors())
SERVER.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // ! se puede cambiar  "*" para habilitar todos los puertos y evitar problemas de CORS
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
  next()
})

// Usar rutas importadas aqui abajo:
SERVER.use('/genres', genres)
SERVER.use('/screenshots', screenShots)
SERVER.use('/videogame', videogame)
SERVER.use('/videogames', videogames)
SERVER.use('/', home)
// Usar rutas importadas arriba:.

// Captura de Errores
SERVER.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || err
  res.status(status).send(message)
})

export default SERVER
