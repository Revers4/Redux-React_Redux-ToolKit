import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
  heroes: [],
  heroesLoadingStatus: "loaded",
};

export const fetchHeroes = createAsyncThunk(
    "heroes/fetchHeroes",
    async () => {
        const { request } = useHttp()
        return await request("http://localhost:3001/heroes")
    }
)

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesDelete: (state, action) => {
      state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
    },
    heroesCreate: (state, action) => {
      state.heroes.push(action.payload);
    },
  },
  extraReducers:( builder => {
    builder
        .addCase(fetchHeroes.pending,state => {state.heroesLoadingStatus = 'loading'})
        .addCase(fetchHeroes.fulfilled, (state, action) => {
            state.heroesLoadingStatus = "loaded";
            state.heroes = action.payload;
        })
        .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
        .addDefaultCase(() =>{})
  })
});

export const {
  heroesDelete,
  heroesCreate
} = heroesSlice.actions;

export default heroesSlice.reducer;
