import { useHttp } from '../../hooks/http.hook.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { createSelector } from 'reselect';
import { heroesDelete, fetchHeroes } from './HeroSlice.js';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = (props) => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeHeroesFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                return heroes
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    )
    const filtreredHeroes = useSelector(filteredHeroesSelector)

    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request))
    }, []);

    const deleteHeroe = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => dispatch(heroesDelete(id)))
            .catch(error => console.log(error))
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {

        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} deleteHeroe={() => deleteHeroe(id)} {...props} />
        })
    }

    const elements = renderHeroesList(filtreredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;