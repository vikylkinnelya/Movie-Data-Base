import React from 'react';
import { BrowserRouter as Route, Switch, useParams } from 'react-router-dom';
import MyContext from '../../servises/Context';
import FilmCard from '../film-card/'
import PaginationRow from '../pagination'

const FilmsContainer = ({ dataRequest }) => {

    

    return (
        <MyContext.Consumer>
            { data => {
                const { setActivateModal, setDetailRequest, setShowDetail, movie, favList, watchList, genreList, yearValue, currPage, } = data

                const filmClickHandler = (item) => { //обработчик события клика. при клике на карточку
                    setActivateModal(true); //показать модалку. эл импортируется из другого компонента
                    setDetailRequest(true); //обновить стейт с состоянием запроса к серверу
                    dataRequest('i', item.imdbID, setShowDetail, currPage, genreList, yearValue) //запрос к серверу за деталями фильма
                }

                const RenderFilmCard = ({ state }) => {
                    return (state !== null && state.length > 0 && state.map((result) => (
                        <FilmCard
                            isActive={favList.includes(result)} //активность кнопки
                            isWatch={watchList.includes(result)}

                            ClickHandler={() => filmClickHandler(result)}

                            key={result.imdbID} //присв ключ обьекту из списка в соотв с его номером в базе 
                            result={result}
                            {...result}
                        />
                    )))
                }

                return (
                    <>
                        <Switch>
                            <Route path='/main'>
                                <RenderFilmCard state={movie} />
                            </Route>
                            <Route path='/favorites'>
                                <RenderFilmCard state={favList} />
                            </Route>
                            <Route path='/to-watch'>
                                <RenderFilmCard state={watchList} />
                            </Route>
                            <Route path='/films'>
                                <RenderFilmCard state={movie} />
                            </Route>
                            <Route path='/serials'>
                                <RenderFilmCard state={movie} />
                            </Route>
                        </Switch>
                    </>
                )
            }}

        </MyContext.Consumer>
    )
}

export default FilmsContainer;