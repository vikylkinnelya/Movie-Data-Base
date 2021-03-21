import './movie-detail.css'
import { Row, Col, Typography, Tag } from 'antd';
import React from 'react';

const TextTitle = Typography.Title;

const MovieDetail = ({ Title, Poster, imdbRating, Rated, Runtime, Genre, Plot }) => {

    return (
        <Row>
            <Col span={11}>
                <img
                    src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                    alt={Title}
                />
            </Col>
            <Col span={13}>
                <Row>
                    <Col span={21}>
                        <TextTitle
                            level={4}>
                            {Title}
                        </TextTitle>
                    </Col>
                    <Col span={3} style={{ textAlign: 'right' }}>
                        <TextTitle
                            level={4}>
                            <span style={{ color: '#41A8F8' }}>
                                {imdbRating}
                            </span>
                        </TextTitle>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                    <Col>
                        <Tag>{Rated}</Tag>
                        <Tag>{Runtime}</Tag>
                        <Tag>{Genre}</Tag>
                    </Col>
                </Row>
                <Row>
                    <Col>{Plot}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export default MovieDetail;