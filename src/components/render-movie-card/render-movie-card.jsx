import './render-movie-card.css'
import React, { useContext, useCallback, useEffect } from 'react';
import { Card, Tag, Button, List } from 'antd';
import MyContext from '../../servises/Context';
import MovieCard from '../movie-card/'
import getDataRequest from '../../servises/getDataRequest';
import Loader from '../loader';

const RenderMovieCard = ({ state }) => {

  const { favList, watchList, loading, q, setMovie, setLoading, setError, setTotalResults, setActivateModal, setDetailRequest, setShowDetail, genreList, yearValue, currPage } = useContext(MyContext)

  const getData = useCallback(() => {
    getDataRequest('s', q, setMovie, currPage, genreList, yearValue, setError, setTotalResults, setLoading, setDetailRequest);
  }, [q, currPage, genreList, yearValue])

  useEffect(() => {
    setLoading(true);
    setError(null);
    setMovie(null)
    setTotalResults(null)
    getData()
  }, [getData]);
  
  //в кач-ве второго параметра может быть только примитивный обьект
  //при его изменении будет происходить ререндеринг

  const movieClickHandler = (item) => { //обработчик события клика. при клике на карточку
    setActivateModal(true); //показать модалку. эл импортируется из другого компонента
    setDetailRequest(true); //обновить стейт с состоянием запроса к серверу
    getDataRequest('i', item.imdbID, setShowDetail, currPage, genreList, yearValue, setError, setTotalResults, setLoading, setDetailRequest) //запрос к серверу за деталями фильма
  }

  /* const getIdRequest = (questionParam) => { //гибкий запрос на сервер

    const API_KEY = 'a6a004a3'

    fetch(`https://www.omdbapi.com/?i=${questionParam}&apikey=${API_KEY}`)
      .then(resp => resp.json())
      .then(response => {
        if (response.Response === 'False') { //если нет ответа
          setError(response.Error) //записать в обьект ошибки ошибку
          throw new Error(response.statusText)
        } else {
          //setTermState(response)
        }
        setLoading(false)
        setDetailRequest(false);
      }).catch(({ message }) => {
        setLoading(false);
        setError(message);
      })
  } */

  let uniqueID = []

  return (

    <>

      {state !== null && state.length > 0 && state.map((result) => {

        if (!uniqueID.includes(result.imdbID)) {
          uniqueID.push(result.imdbID)

          return (

            <MovieCard
              isFav={favList.includes(result) || localStorage.getItem('fav_' + result.imdbID) }
              isWatch={watchList.includes(result) || localStorage.getItem('watch_' + result.imdbID)}

              ClickHandler={() => movieClickHandler(result)}
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

export default RenderMovieCard;