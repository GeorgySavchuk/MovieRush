import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface MovieState {
    isSimilarMovieLoading: boolean;
}

const initialState: MovieState = {
    isSimilarMovieLoading: false
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setSimilarMovieLoading: (state, action: PayloadAction<boolean>) => {
            state.isSimilarMovieLoading = action.payload
        }
    }
})

export const {setSimilarMovieLoading} = movieSlice.actions
export const movieReducer = movieSlice.reducer