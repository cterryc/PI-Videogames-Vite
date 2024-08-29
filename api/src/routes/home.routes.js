import { Router } from 'express'
// import { getGenres } from '../controllers/genres.controllers.js'

const home = Router()

home.get('/', (req, res) => {
  res.status(200).send({ hi: 'welcome' })
})

export default home
