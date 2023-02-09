import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRepo} from "../../models/models";

const LS_FAV_KEY = 'rfk'

interface GithubState {
    favorites: IRepo[]
}

const initialState: GithubState = {
    favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]')
}

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<IRepo>){
            state.favorites.push(action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites))
        },
        removeFavorites(state, action: PayloadAction<number>) {
            state.favorites = state.favorites.filter(item => item.id !== action.payload)
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites))
        }
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer