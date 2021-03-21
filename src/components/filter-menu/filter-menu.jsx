import './filter-menu.css'
import { Checkbox, InputNumber, Menu } from 'antd';

import React, { useContext } from 'react';
import MyContext from '../../servises/Context'

const FilterMenu = () => {

    const filterOptions = ['movie', 'series'];

    const { genreList, setGenreList, yearValue, setYearValue } = useContext(MyContext)

    return (
        <Menu className='filter-menu'>
            <Menu.Item key="1">
                <Checkbox.Group
                    options={filterOptions}
                    value={genreList}
                    onChange={value => setGenreList(value)} />
            </Menu.Item>

            <Menu.Item key="2">
                <InputNumber
                    className='input-number'
                    placeholder="year"
                    style={{ background: 'none', border: '1px', fontSize: '17px', color: 'white' }}
                    value={yearValue}
                    onChange={(value) => setYearValue(value)} />
            </Menu.Item>
        </Menu>
    )
}

export default FilterMenu;