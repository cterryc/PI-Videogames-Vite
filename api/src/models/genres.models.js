import { DataTypes } from 'sequelize'
import DATA_BASE from '../config/db.js'

const Genres = DATA_BASE.define('genres',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false
  }
)

export default Genres
