import React from 'react';

import {
    Row,
    Col,
    Input,
} from 'antd';
import 'antd/dist/antd.css'


const SearchBox = ({ searchHandler }) => { //элемент поиска фильмов
const { Search } = Input;

    return (
        <Row marginTop='150px' justify='center'>
            <Col span={15} >
                <Search style={{ marginTop: 12, type: 'flex' }}
                    placeholder="enter movie, series"
                    size="large"
                    onSearch={value => searchHandler(value)} //задает срабатывание опр скрипта когда польз выполняет поиск в инпуте
                />
            </Col>
        </Row>

    )
}

export default SearchBox;