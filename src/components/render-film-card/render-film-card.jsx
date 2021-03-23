import './render-film-card.css'
import React, { useContext, useCallback, useEffect } from 'react';
import MyContext from '../../servises/Context';
import FilmCard from '../film-card/'
import getDataRequest from '../../servises/getDataRequest';
import Loader from '../loader';

const RenderFilmCard = ({ state }) => {

  const { loading, q, setMovie, setLoading, setError, setTotalResults, setActivateModal, setDetailRequest, setShowDetail, genreList, yearValue, currPage } = useContext(MyContext)

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


  const filmClickHandler = (item) => { //обработчик события клика. при клике на карточку
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
      {loading && <Loader/>}

      {state !== null && state.length > 0 && state.map((result) => {

        if (!uniqueID.includes(result.imdbID)) {
          uniqueID.push(result.imdbID)

          return (

            <FilmCard
              //isFav={favId.includes(result.imdbID)}
              //isWatch={watchId.includes(result.imdbID)}

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