import { videogameById } from '../helpers/videogame.helpers.js'

export const getVideogameById = async (req, res, next) => {
  const { id } = req.params
  try {
    const gameDetails = await videogameById(id)
    if (gameDetails.detail) {
      return res.status(404).send({ error: 'Game not found' })
    }
    res.status(200).send(gameDetails)
  } catch (error) {
    next(error)
    // res.status(404).send({ error: error.message })
  }
}
