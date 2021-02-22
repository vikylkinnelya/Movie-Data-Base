import React from 'react';
import MyContext from '../../servises/Context'
import { Row, Checkbox, InputNumber } from 'antd';
import './filter-menu.css'


const FilterMenu = () => {
    
    const filterOptions = ['movie', 'series'];

    return (
        <MyContext.Consumer>
            {data => {
                return (
                    <Row className='filter-menu'>
                            <Checkbox.Group
                                options={filterOptions}
                                value={data.genreList}
                                onChange={value => data.setGenreList(value)} />

                            <InputNumber
                                className='input-number'
                                placeholder="year"
                                style={{ width: '73px', background: 'none', border: '1px', fontSize: '17px', color: 'white' }}
                                value={data.yearValue}
                                onChange={(value) => data.setYearValue(value)} />


                    </Row>
                )
            }}

        </MyContext.Consumer >
    )
}

export default FilterMenu;