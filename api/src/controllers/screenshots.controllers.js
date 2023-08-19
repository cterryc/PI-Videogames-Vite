import { allScreenShots } from '../helpers/screenshots.helpers.js'

export const getScreenShots = async (req, res, next) => {
  const { id } = req.params

  try {
    const screenShots = (await allScreenShots(id)).results

    const urlsMod = screenShots.map(screenshot => {
      const penultimaBarra = screenshot.image.lastIndexOf('/', screenshot.image.lastIndexOf('/') - 1) // Encuentra la posición de la penúltima "/"
      const parteDeseada = screenshot.image.substring(penultimaBarra) // extrae la parte deseada
      const finalUrl = 'https://media.rawg.io/media/crop/600/400/screenshots' + parteDeseada // añade la parte deseada a la url
      screenshot.image = finalUrl
      return screenshot
    })
    // https://media.rawg.io/media/crop/600/400/screenshots
    res.status(200).send(urlsMod)
  } catch (error) {
    next()
  }
}
