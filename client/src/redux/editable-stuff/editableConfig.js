// const BACK_END = import.meta.env.VITE_LOCAL
const LOCAL = import.meta.env.VITE_LOCAL
const VITE_API = import.meta.env.VITE_API
let API_BACK
if (LOCAL) {
  API_BACK = 'http://192.168.18.20:3001'
} else {
  API_BACK = VITE_API
}
export const API = API_BACK

// >>>>>>>>>>>>>>>>>>>>>

// export const API = 'http://localhost:3001'

export const imagenDeRespaldo =
  'https://w0.peakpx.com/wallpaper/419/206/HD-wallpaper-warcraft-darck-elf-elf.jpg'

export const urlMedia = 'https://media.rawg.io/media/crop/600/400/games'
