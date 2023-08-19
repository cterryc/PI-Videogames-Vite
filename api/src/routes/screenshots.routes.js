import { Router } from 'express'
import { getScreenShots } from '../controllers/screenshots.controllers.js'

const screenShots = Router()

screenShots.get('/:id', getScreenShots)

export default screenShots
