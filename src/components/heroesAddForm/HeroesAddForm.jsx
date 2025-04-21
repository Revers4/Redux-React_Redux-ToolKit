import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { heroesCreate } from '../../actions/actions';
import { useHttp } from "../../hooks/http.hook"
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('')
    const [heroDescription, setHeroDescription] = useState('')
    const [heroElement, setHeroElement] = useState('')
    const { heroFilters, heroFiltersLoadingStatus } = useSelector(state => state);
    const { request } = useHttp();
    const dispatch = useDispatch()

    const onCreateHero = (e) => {
        e.preventDefault()
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescription,
            element: heroElement
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(data => dispatch(heroesCreate(newHero)))
            .catch(error => console.log(error))
        setHeroName('')
        setHeroDescription('')
        setHeroElement('')
    }

    const renderHeroFilters = (status, filters) => {
        if (status === "loading") {
            return <option value="">Загрузка элементов</option>;
        }

        if (status === "Error") {
            return <option value="">Ошибка элементов</option>;
        }

        if (filters && filters.length > 0) {
            return filters.map(({ id, element, rus }) => {
                if (element === "all") return
                return <option key={id} value={element}>{rus}</option>
            })
        }
    }

    return (
        <form onSubmit={onCreateHero} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    onChange={(e) => setHeroName(e.target.value)}
                    value={heroName}
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={(e) => setHeroDescription(e.target.value)}
                    value={heroDescription}
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Выбрать элемент героя
                </label>
                <select
                    onChange={(e) => setHeroElement(e.target.value)}
                    value={heroElement}
                    required
                    className="form-select"
                    id="element"
                    name="element"
                >
                    <option>Я владею элементом...</option>
                    {renderHeroFilters(heroFiltersLoadingStatus, heroFilters)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>

    )
}

export default HeroesAddForm;