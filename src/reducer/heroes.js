import { createReducer } from "@reduxjs/toolkit";
import { 
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroesDelete,
    heroesCreate
} from "../actions/actions";

const initialValue = { 
    heroes: [],
    heroesLoadingStatus: "load",
}

const heroes = createReducer(initialValue, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading'
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = "loaded"
            state.heroes = action.payload
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error'
        })
        .addCase(heroesDelete, (state, action) => {
            state.heroes.filter(hero => hero.id !== action.payload)
        })
        .addCase(heroesCreate, (state, action) => {
            state.heroes.push(action.payload)
        })
        .addDefaultCase(() => {})
})

export default heroes