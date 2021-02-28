import React from 'react';
//import { BrowserRouter as Route, Switch, useParams, useLocation } from 'react-router-dom';
import MyContext from '../../servises/Context';
import FilmCard from '../film-card/'
import { Row, Pagination } from 'antd';
import './render-film-card.css'


const RenderFilmCard = ({ state }) => {

    //let location = useLocation().pathname.slice(1);

    return (
        <MyContext.Consumer>
            { data => {

                const { getDataRequest, setActivateModal, setDetailRequest, setShowDetail, movie, favList, watchList, genreList, yearValue, currPage, setCurrPage, totalResults, setTotalResults, q, setMovie } = data
                
                const filmClickHandler = (item) => { //обработчик события клика. при клике на карточку
                    setActivateModal(true); //показать модалку. эл импортируется из другого компонента
                    setDetailRequest(true); //обновить стейт с состоянием запроса к серверу
                    getDataRequest('i', item.imdbID, setShowDetail, currPage, genreList, yearValue) //запрос к серверу за деталями фильма
                }

                return (
                    <>
                        <Row className='cards-row'>
                            {state !== null && state.length > 0 && state.map((result) => (
                                <FilmCard
                                    isActive={favList.includes(result)} //активность кнопки
                                    isWatch={watchList.includes(result)}

                                    ClickHandler={() => filmClickHandler(result)}

                                    key={result.imdbID} //присв ключ обьекту из списка в соотв с его номером в базе 
                                    result={result}
                                    {...result}
                                />
                            ))}
                        </Row>
                        <Row>
                            <Pagination
                                current={currPage} //берем из стейта, кот обновл
                                total={state === movie ? totalResults : state.length}
                                hideOnSinglePage={true} //спрятать если страница одна
                                showSizeChanger={false} //выбор кол-ва отображаемых элементов на странице
                                pageSize={10}
                                onChange={page => setCurrPage(page)}
                            />
                        </Row>
                    </>
                )
            }
            }
        </MyContext.Consumer>
    )

}

export default RenderFilmCard;