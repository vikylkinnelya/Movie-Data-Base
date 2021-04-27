import './render-movie-card.css'
import React, { Suspense, useContext, useCallback, useEffect } from 'react';
import MyContext from '../../servises/Context';
import getDataRequest from '../../servises/getDataRequest';
import Loader from '../loader';

const MovieCard = React.lazy(() => import('../movie-card/'))

const RenderMovieCard = ({ state }) => {

  const { favList, watchList, q, setMovie, setLoading, setError, setTotalResults, setActivateModal, setDetailRequest, setShowDetail, genreList, yearValue, currPage } = useContext(MyContext)

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

  const movieClickHandler = (item) => { //обработчик события клика. при клике на карточку
    setActivateModal(true); //показать модалку. эл импортируется из другого компонента
    setDetailRequest(true); //обновить стейт с состоянием запроса к серверу
    getDataRequest('i', item.imdbID, setShowDetail, currPage, genreList, yearValue, setError, setTotalResults, setLoading, setDetailRequest) //запрос к серверу за деталями фильма
  }

  let uniqueID = []

  return (
    <>
      {state !== null && state.length > 0 && state.slice(0, 10).map((result) => {

        if (!uniqueID.includes(result.imdbID)) {
          uniqueID.push(result.imdbID)

          return (
            <Suspense fallback={<Loader />}>
              <MovieCard
                isFav={favList.includes(result) || localStorage.getItem('fav_' + result.imdbID)}
                isWatch={watchList.includes(result) || localStorage.getItem('watch_' + result.imdbID)}

                ClickHandler={() => movieClickHandler(result)}
                key={result.imdbID}
                result={result}
                {...result}
              />
            </Suspense>
          )
        }
      })}
    </>
  )
}

export default RenderMovieCard;