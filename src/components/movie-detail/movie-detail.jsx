import './movie-detail.css'
import { Row, Col, Typography, Tag, Button } from 'antd';
import { HeartOutlined, EyeOutlined, EyeFilled, HeartFilled } from '@ant-design/icons';
import React from 'react';

const TextTitle = Typography.Title;
const { Paragraph } = Typography;


const MovieDetail = ({ isFav, isWatch, Title, Actors, Year, Country, Language, Poster, imdbRating, Rated, Runtime, Genre, Plot }) => {

    return (
        <Row>
            <Col span={10} className='modal-img'>
                <img 
                    src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                    alt={Title}
                />
            </Col>
            <Col className='detail-row' xs={24} sm={24} md={24} lg={{span: 13, offset: 1}}>
                <Row>
                    <Col>
                        <TextTitle span={21}
                        className='movie-title'
                            level={4}>
                            {Title}
                        </TextTitle>
                    </Col>
                    <Col style={{ textAlign: 'right' }} >
                        <TextTitle
                        className='movie-rating'
                            level={4}>
                            <span style={{ color: '#41A8F8' }}>
                                {imdbRating}
                            </span>
                        </TextTitle>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                    <Col className='movie-tags' xs={24} sm={24} md={24} lg={24}>
                        <Tag>{Runtime}</Tag>
                        <Tag>{Genre}</Tag>
                        <Tag>{Rated}</Tag>
                        <Tag>{Year}</Tag>
                        <Tag>{Country}</Tag>
                        <Tag>{Language}</Tag>
                        <Tag>{Actors}</Tag>
                    </Col>
                </Row>
                <Row>
                    <Paragraph className='movie-detail-paragraph'>{Plot}</Paragraph >
                </Row>
                <Row>
                    <Button
                        className={isWatch ? 'overlay watch active' : 'overlay watch'} key='watch'
                        shape='circle'
                        icon={isWatch ? <EyeFilled /> : <EyeOutlined />}
                    />

                    <Button
                        className={isFav ? 'overlay like active' : 'overlay like'} key='fav'
                        shape='circle'
                        icon={isFav ? <HeartFilled /> : <HeartOutlined />}
                    />
                </Row></Col>

        </Row>

    )
}

export default MovieDetail;