import React, { useEffect, useState } from 'react';
import ItemsBox from '../items-box/items-box';
import { withRouter } from 'react-router-dom'

const MainPage = ({ movie, setLoading, setError, setMovie, getMovieReqest, q, setShowDetail, setDetailRequest, setActivateModal, toggleFav, toggleWatch, favList, watchList }) => {

    useEffect(() => {
        setLoading(true); //ждём
        setError(null); //обнуление ошибки
        setMovie(null); //обнуление обьекта данных
        getMovieReqest(q);
    }, [q]); //ищем черещ getmovie с параметрами q

    const data = movie;
    const ShowDetail = setShowDetail
    const DetailRequest = setDetailRequest
    const ActivateModal = setActivateModal

    return (
        <>
            { data !== null && data.length > 0 && data.map((result) => ( /* перебор обьекта даты */
                <div
                    key={result.imdbID} //присв ключ обьекту из списка в соотв с его номером в базе 
                    className='card-container' >

                    <ItemsBox
                        result={result}

                        ShowDetail={ShowDetail}
                        DetailRequest={DetailRequest}
                        ActivateModal={ActivateModal}

                        toggleFav={toggleFav}
                        toggleWatch={toggleWatch}

                        isActive={favList.includes(result)}
                        isWatch={watchList.includes(result)}

                        {...result}
                    /></div>

            ))}
        </>
    )
}

export default MainPage