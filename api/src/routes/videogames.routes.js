import { Router } from 'express'
import { getVideogames, postVideogame } from '../controllers/videogames.controllers.js'

const videogames = Router()

videogames.get('/', getVideogames)
videogames.post('/create', postVideogame)

export default videogames
