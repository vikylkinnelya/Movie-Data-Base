import './filter-menu.css'
import { Checkbox, InputNumber, Menu } from 'antd';
import React from 'react';

const FilterMenu = ({ genreList, setGenreList, yearValue, setYearValue, history, q, currPage }) => {

    const filterOptions = ['movie', 'series'];

    const onFilterChange = (value) => {
        setGenreList(value)
        let loc = value.length === 2 ? 'main' : value 
        history.push(`/${loc}/query=${q}/page=${currPage}`)
    }

    return (
        <Menu className='filter-menu'>
            <Menu.Item key="1" className='filter-item'>
                <Checkbox.Group
                    options={filterOptions}
                    value={genreList}
                    onChange={value => onFilterChange(value)} />
            </Menu.Item>

            <Menu.Item key="2" className='filter-item'>
                <InputNumber
                    className='input-number'
                    placeholder="year"
                    style={{ background: 'none', border: '1px', fontSize: '20px', color: 'white' }}
                    value={yearValue}
                    onChange={(value) => setYearValue(value)} />
            </Menu.Item>
        </Menu>
    )
}

export default FilterMenu;