import React from 'react';

import {
    Row,
    Col,
    Input,
} from 'antd';

const SearchBox = ({ searchHandler }) => { //элемент поиска фильмов
const { Search } = Input;

    return (
        <Row style = {{ justifyContent:'center'}}>
            <Col span={15} >
                <Search style={{ marginTop: 12}}
                    placeholder="enter movie, series"
                    size="large"
                    onSearch={value => searchHandler(value)} //задает срабатывание опр скрипта когда польз выполняет поиск в инпуте
                />
            </Col>
        </Row>

    )
}

export default SearchBox;