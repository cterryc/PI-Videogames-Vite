import { DataTypes } from 'sequelize'
import DATA_BASE from '../config/db.js'
import Genres from './genres.models.js'

const Videogames = DATA_BASE.define('videogames',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    released: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2), // 3 = cantidad de digitos, 2 = digitos reservados para decimales
      allowNull: false
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    }
  }, {
    timestamps: false
  }
)

Videogames.belongsToMany(Genres, { through: 'VideogameGenres' })
Genres.belongsToMany(Videogames, { through: 'VideogameGenres' })

export default Videogames

// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *
