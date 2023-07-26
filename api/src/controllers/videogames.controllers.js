import { createGame, getAllVideogamesDataBase, getAllVideogamesFromApi, getVideogamesFromApiByName, getVideogamesFromDbByName } from '../helpers/videogames.helpers.js'

export const getVideogames = async (req, res, next) => {
  const { name } = req.query
  if (name) {
    try {
      const gamesFromDbByName = await getVideogamesFromDbByName(name)
      const gamesFromApiByName = await getVideogamesFromApiByName(name)
      const combineVideogames = [...gamesFromDbByName, ...gamesFromApiByName]
      res.status(200).send(combineVideogames)
    } catch (error) {
      next(error)
    }
  } else {
    try {
      const allVideogamesFromApi = await getAllVideogamesFromApi()
      // console.log(allVideogamesFromApi)
      const allVideogamesFromDb = await getAllVideogamesDataBase()
      if (allVideogamesFromDb.length) {
        const combineAllVideogames = [...allVideogamesFromDb, ...allVideogamesFromApi]
        return res.status(200).send(combineAllVideogames)
      } else {
        res.status(200).send(allVideogamesFromApi)
      }
    } catch (error) {
      next(error)
    }
  }
}

export const postVideogame = async (req, res, next) => {
  const { name, description, released, rating, platforms, genres } = req.body
  try {
    const fromCreateGame = await createGame(name, description, released, rating, platforms, genres)
    if (fromCreateGame.original) {
      return res.status(400).send({ error: fromCreateGame.original.detail })
    }
    res.status(200).send(fromCreateGame)
  } catch (error) {
    next(error)
  }
}
