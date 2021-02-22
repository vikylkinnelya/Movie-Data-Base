import React from 'react';
import MyContext from '../../servises/Context';
import { Pagination } from 'antd';


const PaginationRow = (state) => {
    
    return (
        <MyContext.Consumer>
            { data => {
                return (
                    <Pagination
                        current={data.currPage} //берем из стейта, кот обновл
                        total={data.totalResults} //length для fav watch 
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