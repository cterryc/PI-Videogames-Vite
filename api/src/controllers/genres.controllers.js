import { genresFromDataBase, genresFromApi } from '../helpers/genres.helpers.js'

export const getGenres = async (req, res, next) => {
  // verifica si existe algo en la tabla genres
  const allGenres = await genresFromDataBase()
  try {
    if (allGenres[0]) {
      res.status(200).send(allGenres)
    } else {
      const fromApi = await genresFromApi()
      res.status(200).send(fromApi)
    }
  } catch (error) {
    next(error)
  }
}
