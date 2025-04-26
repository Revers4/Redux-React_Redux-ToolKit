import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = { 
    heroFilters: [],
    heroFiltersLoadingStatus: "loaded",
    activeHeroesFilter: 'all',
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const { request } = useHttp()
        return await request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers:{
        changeHeroesFilter: (state, action) => {state.activeHeroesFilter = action.payload}
    },
    extraReducers:( builder => {
        builder
            .addCase(fetchFilters.pending, state => {state.heroFiltersLoadingStatus = "loading"})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.heroFiltersLoadingStatus = "loaded";
                state.heroFilters = action.payload;
              })
            .addCase(fetchFilters.rejected, state => {state.heroFiltersLoadingStatus = "error"})
    })
})

export const {
    changeHeroesFilter
} = filtersSlice.actions

export default filtersSlice.reducer