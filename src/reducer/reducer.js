
const initialValue = { 
    heroes: [],
    heroesLoadingStatus: "load",
    heroFilters: [],
    heroFiltersLoadingStatus: "load",
    activeHeroesFilter: 'all',
    filtreredHeroes: []
}

export const reducer = (state = initialValue, action) =>{
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state, heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state, 
                heroesLoadingStatus: 'loaded',
                heroes: action.payload,
                filtreredHeroes: state.activeHeroesFilter === 'all' ? 
                    action.payload 
                    : action.payload.filter(item => item.element === state.activeHeroesFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state, 
                heroesLoadingStatus: 'error',
            }

        case "HEROES_DELETE":
            const newHeroesList = state.heroes.filter(hero => hero.id !== action.payload)
            return {
                ...state,
                heroes: newHeroesList,
                filtreredHeroes: state.activeHeroesFilter === 'all' ? 
                    newHeroesList 
                    : newHeroesList.filter(item => item.element === state.activeHeroesFilter)
            }
        case "HEROES_CREATE":
            const newCreatedHeroesList = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newCreatedHeroesList,
                filtreredHeroes: state.activeHeroesFilter === 'all' ? 
                    newCreatedHeroesList 
                    : newCreatedHeroesList.filter(item => item.element === state.activeHeroesFilter)
            }
        
        case 'HERO_FILTERS_FETCHING':
            return {
                ...state, heroFiltersLoadingStatus: 'loading'
            }
        case 'HERO_FILTERS_FETCHED':
            return {
                ...state, 
                heroFiltersLoadingStatus: 'loaded',
                heroFilters: action.payload
            }
        case 'HERO_FILTERS_FETCHING_ERROR':
            return {
                ...state, 
                heroFiltersLoadingStatus: 'error',
            }

        case 'CHANGE_HEROES_FILTER':
            return {
                ...state,
                activeHeroesFilter: action.payload,
                filtreredHeroes: action.payload === 'all' ? 
                    state.heroes 
                    : state.heroes.filter(item => item.element === action.payload)
            }
        default:
            return state;
    }
}    
