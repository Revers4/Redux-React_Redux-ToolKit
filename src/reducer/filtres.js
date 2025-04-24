import { createReducer } from "@reduxjs/toolkit";
import { 
    heroFiltersFetching,
    heroFiltersFetched,
    heroFiltersFetchingError,
    changeHeroesFilter
} from "../actions/actions";

const initialValue = { 
    heroFilters: [],
    heroFiltersLoadingStatus: "load",
    activeHeroesFilter: 'all',
}

const filters = createReducer(initialValue, builder => {
    builder
        .addCase(heroFiltersFetching, state => {
            state.heroFiltersLoadingStatus = "loading"
        })
        .addCase(heroFiltersFetched, (state, action) => {
            state.heroFiltersLoadingStatus = "loaded"
            state.heroFilters = action.payload
        })
        .addCase(heroFiltersFetchingError, state => {
            state.heroFiltersLoadingStatus = "error"
        })
        .addCase(changeHeroesFilter, (state, action) => {
            state.activeHeroesFilter = action.payload
        })
        .addDefaultCase(() =>{})
})

export default filters