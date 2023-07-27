import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

// carga el archivo ".env" y se asignan los valores definidas en él a las variables de entorno de la aplicacion.
dotenv.config()
const { PORT_DB, USER_DB, PASS_DB, NAME_DB, DB_DEPLOY } = process.env

// const DATA_BASE = new Sequelize(`postgres://${USER_DB}:${PASS_DB}@${PORT_DB}/${NAME_DB}`, {
//   logging: false
// })

// "?sslmode=require" es necesario para activar la seguridad SSL al ser desplegado en la nube
const DATA_BASE = new Sequelize(`${DB_DEPLOY}?sslmode=require`, {
  logging: false
})

export default DATA_BASE
