import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../editable-stuff/editableConfig.js'

const initialState = {
  videogamesFromApi: [],
  genres: [],
  platforms: [],
  searchGames: [],
  searchpagestate: false,
  filterState: [],
  gameDetails: {},
  screenShots: []
}

export const fetchVideogames = createAsyncThunk('videogames/fetchVideogames',
  async (allGames, thunkAPI) => {
    if (!initialState.videogamesFromApi.length) {
      const response = await fetch(`${API}/videogames`)
      const data = await response.json()
      return data
    }
    return initialState.videogamesFromApi
  }
)

export const fetchGenres = createAsyncThunk('videogames/fetchGenres',
  async (allGames, thunkAPI) => {
    const response = await fetch(`${API}/genres`)
    const data = await response.json()
    return data
  }
)

export const fetchId = createAsyncThunk('videogames/fetchId',
  async (id, thunkAPI) => {
    const response = await fetch(`${API}/videogame/${id}`)
    const data = await response.json()
    return data
  }
)

export const fetchScreenShots = createAsyncThunk('videogames/fetchScreenShots',
  async (id, thunkAPI) => {
    const response = await fetch(`${API}/screenshots/${id}`)
    const data = await response.json()
    return data
  }
)

export const videogamesSlice = createSlice({
  name: 'videogame',
  initialState,
  reducers: {
    getAllGames: (state, action) => {
      state.videogamesFromApi = action.payload
    },
    getGenres: (state, action) => {
      state.genres = action.payload
    },
    getPlatforms: (state, action) => {
      state.platforms = action.payload
    },
    getSearchGames: (state, action) => {
      state.searchGames = action.payload
    },
    getFilters: (state, action) => {
      state.filterState = action.payload
    },
    getDetails: (state, action) => {
      state.gameDetails = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideogames.pending, (state) => {
        state.searchpagestate = true
      })
      .addCase(fetchVideogames.fulfilled, (state, action) => {
        state.searchpagestate = false
        state.videogamesFromApi = action.payload
      })
      .addCase(fetchVideogames.rejected, (state, action) => {
        state.searchpagestate = false
        state.videogamesFromApi = action.error.message
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.genres = action.error.message
      })
      .addCase(fetchId.pending, (state) => {
        state.searchpagestate = true
      })
      .addCase(fetchId.fulfilled, (state, action) => {
        state.searchpagestate = false
        state.gameDetails = action.payload
      })
      .addCase(fetchScreenShots.fulfilled, (state, action) => {
        state.screenShots = action.payload
      })
  }
})

export const { getAllGames, getGenres, getPlatforms, getSearchGames, getFilters, getDetails } = videogamesSlice.actions
export default videogamesSlice.reducer
