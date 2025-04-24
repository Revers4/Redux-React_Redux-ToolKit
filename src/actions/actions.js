import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching);
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters= (request) => (dispatch) => {
    dispatch(heroFiltersFetching())
    request('http://localhost:3001/filters')
        .then(data => dispatch(heroFiltersFetched(data)))
        .catch(data => dispatch(heroFiltersFetchingError))
}

export const heroesFetching = createAction('HEROES_FETCHING')
export const heroesFetched = createAction('HEROES_FETCHED')
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

export const heroesDelete = createAction("HEROES_DELETE")
export const heroesCreate = createAction("HEROES_CREATE")

export const heroFiltersFetching = createAction('HERO_FILTERS_FETCHING')
export const heroFiltersFetched = createAction('HERO_FILTERS_FETCHED')
export const heroFiltersFetchingError = createAction('HERO_FILTERS_FETCHING_ERROR')

export const changeHeroesFilter = createAction('CHANGE_HEROES_FILTER')