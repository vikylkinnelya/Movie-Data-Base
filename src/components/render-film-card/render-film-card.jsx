import React, { useContext, useEffect } from 'react';
//import { BrowserRouter as Route, Switch, useParams, useLocation, useHistory, generatePath, useRouteMatch } from 'react-router-dom';
import MyContext from '../../servises/Context';
import FilmCard from '../film-card/'
import getDataRequest from '../../servises/getDataRequest'
import { Row } from 'antd';
import './render-film-card.css'

const RenderFilmCard = ({ state, setIdRenderState }) => {

    const { setLoading, setError, setTotalResults, setActivateModal, setDetailRequest, setShowDetail, favList, favId, watchList, watchId, genreList, yearValue, currPage } = useContext(MyContext)

    const filmClickHandler = (item) => { //обработчик события клика. при клике на карточку
        setActivateModal(true); //показать модалку. эл импортируется из другого компонента
        setDetailRequest(true); //обновить стейт с состоянием запроса к серверу
        getDataRequest('i', item.imdbID, setShowDetail, currPage, genreList, yearValue, setError, setTotalResults, setLoading, setDetailRequest) //запрос к серверу за деталями фильма
    }

    let uniqueID = []

    return (

        <>
            {state !== null && state.length > 0 && state.map((result) => {

                if (!uniqueID.includes(result.imdbID)) {
                    uniqueID.push(result.imdbID)

                    return (

                        <FilmCard
                            isFav={favId.includes(result.imdbID)}
                            isWatch={watchId.includes(result.imdbID)}

                            ClickHandler={() => filmClickHandler(result)}

                            key={result.imdbID} //присв ключ обьекту из списка в соотв с его номером в базе 
                            result={result}
                            {...result}
                        />
                    )
                }
            })}
        </>
    )
}

export default RenderFilmCard;