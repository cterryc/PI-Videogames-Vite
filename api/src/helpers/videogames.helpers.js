import { Op } from 'sequelize'
import Genres from '../models/genres.models.js'
import Videogames from '../models/videgames.models.js'
import fetch from 'node-fetch'

const { API, API_KEY } = process.env

export const getVideogamesFromApiByName = (name) => {
  const videogamesFromApi = fetch(`${API}games?${API_KEY}&search=${name}`)
    .then(response => response.json())
    .then(data => data.results)
  return videogamesFromApi
}

export const getVideogamesFromDbByName = (name) => {
  const videogamesFromDb = Videogames.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: { model: Genres, through: { attributes: [] } }
  })
  return videogamesFromDb
}

export const getAllVideogamesDataBase = () => {
  const foundAllVideogames = Videogames.findAll({
    include: { model: Genres, through: { attributes: [] } }
  })
  return foundAllVideogames
}

export const getAllVideogamesFromApi = () => {
  const urlsApi = [
    `${API}games?${API_KEY}`,
    `${API}games?${API_KEY}&page=2`,
    `${API}games?${API_KEY}&page=3`,
    `${API}games?${API_KEY}&page=4`,
    `${API}games?${API_KEY}&page=5`
  ]
  const getFirst100Games = urlsApi.map(url => {
    const promise = fetch(url)
      .then(response => response.json())
      .then(data => data.results)
    return promise
  })
  const result = Promise.all(getFirst100Games)
    .then(data => {
      const ArrayDeObjetos = []
      data.forEach(eleData => {
        eleData.forEach(lastEle => ArrayDeObjetos.push(lastEle))
      })
      return ArrayDeObjetos
    })
  return result
}

export const createGame = (name, description, released, rating, platforms, genres) => {
  // recorre el array "genres" y matchea todo el contenido sin importar mayusculas o minusculas
  // si se desea usar en otro array solo cambiar el array genres por el array necesario.
  const whereClause = {
    [Op.or]: genres.map(genre => ({ name: { [Op.iLike]: `%${genre}%` } }))
  }
  // sea crea un Videogame con los argumentos dados
  const creatingNewGame = Videogames.create({ name, description, released, rating, platforms })
    .then(newGame => {
      // buscamos todos los generes existentes en nuestra base de datos
      return Genres.findAll({ where: whereClause })
        .then(data => {
          // retornamos y asignamos los generos a los videogames
          return newGame.setGenres(data)
            .then(_ => {
              // buscamos y retornamos el videogame creado con sus generos respectivos.
              // ? la propiedad "include" sirve para matchear un videogame con sus respectivos generos sin incluir la tabla intermediaria "VideogameGenres"
              return Videogames.findOne({
                where: { name },
                include: [
                  {
                    model: Genres,
                    through: { attributes: [] }
                  }
                ]
              })
            })
        })
    })
    .catch(error => error)
  return creatingNewGame
  // // Crea un nuevo juego en la base de datos
  // const newGame = await Videogames.create({ name, description, released, rating, platforms })
  // console.log('esto es newGame2.0', newGame)
  // // Busca los géneros correspondientes en la base de datos
  // const foundGenres = await Genres.findAll({ where: { name: genres } })
  // console.log('esto es foundGenres2.0', foundGenres)
  // // Asigna los géneros encontrados al juego
  // await newGame.setGenres(foundGenres)
  // // Busca el juego recién creado y los géneros asociados
  // const gameWithGenres = await Videogames.findOne({
  //   where: {
  //     id: newGame.id
  //   },
  //   include: [Genres]
  // })
  // return gameWithGenres
  // const findGenres = Genres.findAll({ where: { name: { [Op.in]: genres } } })
}
