import React from 'react';
import ItemsBox from '../items-box/items-box';
import { withRouter } from 'react-router-dom'

const WatchPage = ({ setShowDetail, setDetailRequest, setActivateModal, toggleFav, toggleWatch, favList, watchList }) => {

    const data = watchList;
    const ShowDetail = setShowDetail
    const DetailRequest = setDetailRequest
    const ActivateModal = setActivateModal
 
    return (
        <>
            { data !== null && data.length > 0 && data.map((result) => ( /* перебор обьекта даты */
                <div className='card-container' 
                key={result.imdbID} //присв ключ обьекту из списка в соотв с его номером в базе 
                >
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
                    />
                </div>
            ))}
        </>
    )
}

export default WatchPage