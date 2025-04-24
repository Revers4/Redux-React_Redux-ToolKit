import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import { useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { fetchFilters, changeHeroesFilter } from '../../actions/actions';

const HeroesFilters = () => {
    const { heroFilters, heroFiltersLoadingStatus, activeHeroesFilter } = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request))
    }, [])

    if (heroFiltersLoadingStatus === 'loading') return <Spinner />

    if (heroFiltersLoadingStatus === "error") return <p className="card-text">Ошибка фильтров по элементу</p>

    const filterClassNames = {
        all: "btn btn-outline-dark",
        fire: "btn btn-danger",
        water: "btn btn-primary",
        wind: "btn btn-success",
        earth: "btn btn-secondary"
    };

    const filterButtons = (arr) => {
        if (arr.lenght === 0) {
            return <p className="card-text">Фильтры не найдены</p>
        }

        return arr.map(({ id, element, rus }) => {
            const className = `${filterClassNames[element]}${activeHeroesFilter === element ? " active" : ''}`

            return <button
                onClick={() => dispatch(changeHeroesFilter(element))}
                key={id}
                className={className}
            >{rus}</button>
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filterButtons(heroFilters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;