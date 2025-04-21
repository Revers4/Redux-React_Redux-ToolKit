import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import { useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { heroFiltersFetched, heroFiltersFetching, heroFiltersFetchingError, changeHeroesFilter } from '../../actions/actions';
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { heroFilters, heroFiltersLoadingStatus, activeHeroesFilter } = useSelector(state => state)
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroFiltersFetching())
        request('http://localhost:3001/filters')
            .then(data => dispatch(heroFiltersFetched(data)))
            .catch(data => dispatch(heroFiltersFetchingError))
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