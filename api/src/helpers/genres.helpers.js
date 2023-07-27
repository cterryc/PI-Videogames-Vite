import Genres from '../models/genres.models.js'
import fetch from 'node-fetch'

const { API_KEY, API } = process.env

export const genresFromDataBase = () => {
  // el metodo "findAll()" retorna un array vacio sino no existe info en la Base de Datos
  const genresDataBase = Genres.findAll()
  return genresDataBase
}

export const genresFromApi = () => {
  const fromApi = fetch(`${API}genres?${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      // creando array con lo elementos necesarios apartir de "data", en este caso: "id" y "name"
      const genresByData = data.results.map(ele => { return { name: ele.name, id: ele.id } })
      // guardando los generos en nuestra base de datos apartir del array de arriba
      const createGenres = Genres.bulkCreate(genresByData)
      return createGenres
    })
  return fromApi
}
