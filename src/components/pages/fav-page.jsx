import React from 'react';
import ItemsBox from '../items-box/items-box';
import { withRouter } from 'react-router-dom'

const FavPage = ({ setShowDetail, setDetailRequest, setActivateModal, toggleFav, toggleWatch, favList, watchList }) => {

    const data = favList;
    const ShowDetail = setShowDetail
    const DetailRequest = setDetailRequest
    const ActivateModal = setActivateModal


    return (
        <>
            { data !== null && data.length > 0 && data.map((result) => ( /* перебор обьекта даты */
                <div className='card-container' >
                    <ItemsBox
                        key={result.imdbID} //присв ключ обьекту из списка в соотв с его номером в базе 
                        result={result}

                        ShowDetail={ShowDetail}
                        DetailRequest={DetailRequest}
                        ActivateModal={ActivateModal}

                        toggleFav={toggleFav}
                        toggleWatch={toggleWatch}

                        isActive={favList.includes(result)}
                        isWatch={watchList.includes(result)}

                        {...result}
                    />
                </div>
            ))}
        </>
    )
}


export default FavPage