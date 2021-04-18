import './search-box.css';
import { Row, Col, Input, Button, Dropdown } from 'antd';
import React, { useState } from 'react';
import FilterMenu from '../filter-menu/filter-menu'

const { Search } = Input;

const SearchBox = ({ history, location, q, currPage, setQuery, genreList, setGenreList, yearValue, setYearValue }) => {

    const [activateFilter, setActivateFilter] = useState(false);

    const onSearch = (value) => {
        setQuery(value)
        let location = genreList.length === 2 ? 'main' : genreList;
        history.push(`/movie-database/${location}/query=${value}/page=1`)
    }

    let value = location === 'main' || location === 'movie' || location === 'series' ?
        q :
        "enter title of the movie"

    return (
        <>
            <Row className='search-row'>
                <Col className='search' >
                    <Search
                        placeholder={value}
                        size="large"
                        onSearch={value => onSearch(value)} />
                </Col>
                <Col>
                    <Dropdown
                        overlay={
                            <FilterMenu
                                history={history}
                                genreList={genreList}
                                setGenreList={setGenreList}
                                yearValue={yearValue}
                                setYearValue={setYearValue}
                                q={q}
                                currPage={currPage}
                            />}
                        placement='bottomLeft'
                        onClick={() => setActivateFilter(!activateFilter)}
                        visible={activateFilter}
                        overlayStyle={{ top: '64px' }}
                    >
                        <Button
                            style={{ background: 'none' }}
                            className='filter-menu-btn'
                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill='#FFD500' width="40" height="40" className="bi bi-filter" viewBox="0 0 16 16">
                                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                            </svg>}
                        />
                    </Dropdown>
                </Col>
            </Row>
        </>
    )
}


export default SearchBox;