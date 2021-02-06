import React from 'react';
import ItemsBox from '../items-box/items-box';
import { withRouter } from 'react-router-dom'

const FilmPage = ({ data,movie, favList, watchList, imdbID, ShowDetail, DetailRequest, ActivateModal, ToggleFav, ToggleWatch }) => {
    return(
        <ItemsBox
            data={data} //передаем обьект с данными на уровень ниже
            favList = {favList}

        />
    )
}

export default FilmPage