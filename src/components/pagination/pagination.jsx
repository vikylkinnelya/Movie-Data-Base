import React from 'react';
import MyContext from '../../servises/Context';
import { BrowserRouter as Route, Switch, useLocation } from 'react-router-dom';

import { Pagination, Row } from 'antd';
import './pagination.css';


const PaginationRow = ({dataRequest}) => {

    let location = useLocation();
    

    return (
        <MyContext.Consumer>
            { data => {
                const { currPage, totalResults, q, setMovie,genreList, yearValue, setCurrPage } = data
                location = location.pathname.slice(1)
                console.log(location)
                const onPageChange = (page) => {
                    dataRequest('s', q, setMovie, page, genreList, yearValue)
                    setCurrPage(page)
                }

                return (

                    <Pagination
                        current={currPage} //берем из стейта, кот обновл
                        total={totalResults} //length для fav watch 
                        hideOnSinglePage={true} //спрятать если страница одна
                        showSizeChanger={false} //выбор кол-ва отображаемых элементов на странице
                        onChange={onPageChange}
                    />

                )
            }}

        </MyContext.Consumer>




    )
}

export default PaginationRow;