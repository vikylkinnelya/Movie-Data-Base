import React from 'react';

import MyContext from '../../servises/Context'
import { Checkbox, InputNumber, Menu } from 'antd';
import './filter-menu.css'

const FilterMenu = () => {

    const filterOptions = ['movie', 'series'];

    return (
        <MyContext.Consumer>
            { data => {
                return (
                    <Menu className='filter-menu'>
                        <Menu.Item key="1">
                            <Checkbox.Group
                                options={filterOptions}
                                value={data.genreList}
                                onChange={value => data.setGenreList(value)} />
                        </Menu.Item>

                        <Menu.Item key="2">
                            <InputNumber
                                className='input-number'
                                placeholder="year"
                                style={{ background: 'none', border: '1px', fontSize: '17px', color: 'white' }}
                                value={data.yearValue}
                                onChange={(value) => data.setYearValue(value)} />
                        </Menu.Item>
                    </Menu>
                )
            }}
        </MyContext.Consumer>
    );
}

export default FilterMenu;