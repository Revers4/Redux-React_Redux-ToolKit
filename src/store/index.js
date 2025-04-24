import heroes from "../reducer/heroes";
import filters from "../reducer/filtres";
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