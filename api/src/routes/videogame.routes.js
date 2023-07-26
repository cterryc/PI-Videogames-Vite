import { Router } from 'express'
import { getVideogameById } from '../controllers/videogame.controllers.js'

const videogame = Router()

videogame.get('/:id', getVideogameById)

export default videogame
