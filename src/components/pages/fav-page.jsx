import React from 'react';
import ItemsBox from '../items-box/items-box';
import { withRouter } from 'react-router-dom'

const FavPage = ({ favList, watchList, imdbID, ShowDetail, DetailRequest, ActivateModal, ToggleFav, ToggleWatch }) => {


    return (
        <ItemsBox
            data={favList} //передаем обьект с данными на уровень ниже

            ShowDetail={setShowDetail}
            DetailRequest={setDetailRequest}
            ActivateModal={setActivateModal}

            ToggleFav={toggleFav}
            ToggleWatch={toggleWatch}
        />
    )
}

export default FavPage