export const heroesFetching = () => ({ type: 'HEROES_FETCHING' })
export const heroesFetched = (heroes) => ({ type: 'HEROES_FETCHED', payload: heroes })
export const heroesFetchingError = () => ({ type: 'HEROES_FETCHING_ERROR' })

export const heroesDelete = (id) => ({ type: "HEROES_DELETE", payload: id })
export const heroesCreate = (hero) => ({type: "HEROES_CREATE", payload: hero})

export const heroFiltersFetching = () =>({ type: 'HERO_FILTERS_FETCHING' })
export const heroFiltersFetched = (filters) => ({ type: 'HERO_FILTERS_FETCHED', payload: filters })
export const heroFiltersFetchingError = () => ({ type: 'HERO_FILTERS_FETCHING_ERROR' })

export const changeHeroesFilter = (filter) => ({ type: 'CHANGE_HEROES_FILTER', payload: filter })