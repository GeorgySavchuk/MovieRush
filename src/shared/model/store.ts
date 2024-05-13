import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {MovieRushApi} from "../api";
import {movieReducer} from "./slices";
const rootReducer = combineReducers({
    movieReducer,
    [MovieRushApi.reducerPath]: MovieRushApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(MovieRushApi.middleware, MovieRushApi.middleware)
    });
};


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']