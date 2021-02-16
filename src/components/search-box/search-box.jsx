import React, { useState } from 'react';

import {
    Row, Col, Input,
    Menu,
    Button, Checkbox, Divider, Slider,
} from 'antd';

import './search-box.css'


const SearchBox = ({ searchHandler }) => { //элемент поиска фильмов
    const { Search } = Input;

    const filterOptions = ['movie', 'series'];
    const defaultCheckedList = ['movie', 'series'];

    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const onChange = list => {
        setCheckedList(list);
    };

    const FilterMenu = () => {
        return (
            <div className='filter-menu'>

                <Checkbox.Group
                    options={filterOptions}
                    value={checkedList}
                    onChange={onChange}
                />
                <Slider
                    range={{ draggableTrack: true }}
                    defaultValue={[1970, 2021]}
                />


            </div>

        )
    }

    /* const onFilterMenu = () => {
        //fetch(`http://www.omdbapi.com/?${searchParam}=${questionParam}&page=${currPage}&type=${type}&year=${year}&apikey=${API_KEY}`)
    } */

    return (
        <>
            <Row style={{ justifyContent: 'center' }}>
                <Col span={15} >
                    <Search style={{ marginTop: 12 }}
                        placeholder="enter movie, series"
                        size="large"
                        onSearch={value => searchHandler(value)} //задает срабатывание опр скрипта когда польз выполняет поиск в инпуте
                    />
                </Col>

                <Col>
                    <Button
                        /* onClick={() => FilterMenuItem()} */
                        className='filter-menu-btn'
                        style={{ background: 'none', border: '0px', marginTop: 15 }}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#212121" className="bi bi-filter" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                        </svg>}
                    />
                </Col>
            </Row>
            <Row>
                <FilterMenu />

            </Row>
        </>
    )
}

export default SearchBox;