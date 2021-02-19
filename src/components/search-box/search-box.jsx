import React, { useState } from 'react';

import {
    Row, Col, Input,
    Menu,
    Button, Checkbox, Divider, Slider, InputNumber
} from 'antd';

import './search-box.css'


const SearchBox = ({ searchHandler }) => { //элемент поиска фильмов
    const { Search } = Input;

    const filterOptions = ['movie', 'series'];
    const defaultCheckedList = ['movie', 'series'];

    const [activateFilter, setActivateFilter] = useState(false)
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [inputValue, setInputValue] = useState([1970, 2021])

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
                        className='slider'
                        range={{ draggableTrack: true }}
                        
                        defaultValue={[inputValue[0], inputValue[1]]}
                        min={1970}
                        max={2021}
                        
                        onAfterChange={value => setInputValue(value)}
                        tooltipPlacement="bottom"
                    />

                    <Col span={4}>
                        <InputNumber
                            style={{ margin: '0 16px' }}
                            value={inputValue[0]}
                            onChange={(value) => setInputValue(value)}
                        />
                        <InputNumber
                            style={{ margin: '0 16px' }}
                            value={inputValue[1]}
                            onChange={(value) => setInputValue(value)}
                        />
                    </Col>
                




            </div>
        )
    }

    /* const onFilterMenu = () => {
        //fetch(`http://www.omdbapi.com/?${searchParam}=${questionParam}&page=${currPage}&type=${type}&year=${year}&apikey=${API_KEY}`)
    } */

    return (
        <>
            <Row className='search-row'>
                <Col span={15} >
                    <Search style={{ marginTop: 12 }}
                        placeholder="enter movie, series"
                        size="large"
                        onSearch={value => searchHandler(value)} //задает срабатывание опр скрипта когда польз выполняет поиск в инпуте
                    />
                </Col>

                <Col>
                    <Button
                        onClick={() => setActivateFilter(!activateFilter)}
                        className='filter-menu-btn'
                        style={{ background: 'none', border: '0px', marginTop: 15 }}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#212121" className="bi bi-filter" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                        </svg>}
                    />
                </Col>
            </Row>

            {activateFilter ? <FilterMenu /> : null}




        </>
    )
}

export default SearchBox;