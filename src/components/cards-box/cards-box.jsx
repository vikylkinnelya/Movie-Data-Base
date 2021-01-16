import React from 'react';
import {
    Row,
    Col,
    Card,
    Tag
} from 'antd';
import 'antd/dist/antd.css'


const { Meta } = Card;
const API_KEY = 'eb9d8a81';


const CardsBox = ({ Title, imdbID, Poster, Type, ShowDetail, DetailRequest, ActivateModal }) => {

    const clickHandler = () => {
        DetailRequest(true)
    }

    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            DetailRequest(false);
            ShowDetail(response)
        })
        .catch(({ message }) => {
            DetailRequest(false)
        })

    return (
        <Col
            style={{ margin: '20px 0' }}
            className='gutter-box'
            span={4}>
            <div className='gutter-box'>
                <Card
                    style={{ width: 200, type: 'flex' }}
                    cover={
                        <img alt={Title}
                            src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                        />
                    }
                    onClick={() => clickHandler()}
                >
                    <Meta
                        Title={Title}
                        description={false}
                    />
                    <Row
                        style={{ marginTop: '10px' }}
                        className='gutter-row'>
                        <Col>
                            <Tag color='magenta'>{Type}</Tag>
                        </Col>
                    </Row>
                </Card>
            </div>
        </Col>
    )
}

export default CardsBox;