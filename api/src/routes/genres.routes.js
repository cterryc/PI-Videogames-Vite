import { Router } from 'express'
import { getGenres } from '../controllers/genres.controllers.js'

const genres = Router()

genres.get('/', getGenres)

export default genres
