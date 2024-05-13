import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface TrailerState {
    isOpen: boolean;
}

const initialState: TrailerState = {
    isOpen: false
}


const trailerSlice = createSlice({
    name: 'trailer',
    initialState,
    reducers: {
        setTrailerOpenStatus: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        }
    }
})

export const {setTrailerOpenStatus} = trailerSlice.actions
export const trailerReducer = trailerSlice.reducer