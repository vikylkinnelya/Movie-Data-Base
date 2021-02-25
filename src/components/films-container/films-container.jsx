import React from 'react';
import { BrowserRouter as Route, Switch, useParams, useLocation } from 'react-router-dom';
import MyContext from '../../servises/Context';
import FilmCard from '../film-card/'
import { Row, Pagination } from 'antd';


const FilmsContainer = ({ dataRequest }) => {

    let location = useLocation().pathname.slice(1);

    return (
        <MyContext.Consumer>
            { data => {

                const { setActivateModal, setDetailRequest, setShowDetail, movie, favList, watchList, genreList, yearValue, currPage, setCurrPage, totalResults, setTotalResults, q, setMovie } = data

                const defTotalRes = () => {
                    if (location === 'favorites') {
                        return favList.length
                    } else if (location === 'to-watch') {
                        return watchList.length
                    } else {
                        return totalResults
                    }
                }

                const onPageChange = (page, location) => {
                    if (location === 'main') {
                        dataRequest('s', q, setMovie, page, genreList, yearValue)
                        setCurrPage(page)
                    } else {
                        setCurrPage(page)
                    }
                }

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
                        <Row justify='center'>
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
                        </Row>

                        <Row>
                            <Pagination
                                current={currPage} //берем из стейта, кот обновл
                                total={defTotalRes()} //length для fav watch 
                                hideOnSinglePage={true} //спрятать если страница одна
                                showSizeChanger={false} //выбор кол-ва отображаемых элементов на странице
                                pageSize={10}
                                onChange={onPageChange}

                            />
                        </Row>
                    </>
                )
            }}
        </MyContext.Consumer>
    )
}

export default FilmsContainer;