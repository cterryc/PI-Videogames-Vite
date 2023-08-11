import { configureStore } from '@reduxjs/toolkit'
import videogameReducer from './videogameSlice/slice.js'

const store = configureStore({
  reducer: {
    videogame: videogameReducer
  }
})

export default store
