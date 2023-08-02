import Genres from '../models/genres.models.js'
import Videogames from '../models/videgames.models.js'
import fetch from 'node-fetch'

const { API, API_KEY } = process.env

export const videogameById = (id) => {
  // findAll retorna toda la base de datos, de lo contrario un array vacio
  // ? la propiedad "include" sirve para matchear un videogame con sus respectivos generos sin incluir la tabla intermediaria "VideogameGenres"
  const dataBaseOrApi = Videogames.findAll(
    { include: [{ model: Genres, through: { attributes: [] } }] }
  )
    .then(data => {
      // find retorna la primera coincidencia, de lo contrario retorna undefine
      const findGame = data.find(ele => ele.id === id)
      if (findGame) {
        return findGame
      } else {
        const gameFromApi = fetch(`${API}games/${id}?${API_KEY}`)
          .then(response => response.json())
        return gameFromApi
      }
    })
  return dataBaseOrApi

  // es necesario encerrar "await fetch()" entre parentesis, para poder aplicar "json.()"
  // const gameFromApi = (await fetch(`${API}games/${id}?${API_KEY}`)).json()
}
