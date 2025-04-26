import filters from "../components/heroesFilters/filterSlice";
import heroes from "../components/heroesList/HeroSlice"
import { configureStore } from "@reduxjs/toolkit"

const stringMiddleWare = () => (next) => (action) => {
    if(typeof action === 'string'){
        return next({
            type: action
        })
    }
    return next(action)
}

export const store = configureStore({
    reducer: {heroes,filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleWare),
    devTools: process.env.NODE_ENV!=="production",
})