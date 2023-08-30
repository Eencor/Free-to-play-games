import {configureStore} from '@reduxjs/toolkit';

import filterReducer from './slice/filterSlice'
import gamesReducer from './slice/gamesSlice'
import pageGameReducer from './slice/pageGameSlice'

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        games: gamesReducer,
        pageGame: pageGameReducer,
    }
})