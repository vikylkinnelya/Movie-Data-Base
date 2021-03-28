import { Row, Col, Typography, Tag, Button } from 'antd';
import { HeartOutlined, EyeOutlined, EyeFilled, HeartFilled } from '@ant-design/icons';
import React from 'react';

const TextTitle = Typography.Title;
const { Paragraph } = Typography;


const MovieDetail = ({ isFav, isWatch, Title, Actors, Year, Country, Language, Poster, imdbRating, Rated, Runtime, Genre, Plot }) => {

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
                    <Col style={{ textAlign: 'right' }}>
                        <TextTitle
                            level={4}>
                            <span style={{ color: '#41A8F8' }}>
                                {imdbRating}
                            </span>
                        </TextTitle>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                    <Col className='movie-tags'>
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
                    <Paragraph >{Plot}</Paragraph >
                </Row>
                <Row>
                    <Button
                        className={isWatch ? 'overlay watch active' : 'overlay watch'} key='watch'
                        shape='circle'
                        icon={isWatch ? <EyeFilled /> : <EyeOutlined />}
                    //onClick={() => toggleItem(result, watchList, setWatch, 'watch')} 
                    />

                    <Button
                        className={isFav ? 'overlay like active' : 'overlay like'} key='fav'
                        shape='circle'
                        icon={isFav ? <HeartFilled /> : <HeartOutlined />}
                    //onClick={() => toggleItem(result, favList, setFav, 'fav')} 
                    />
                </Row></Col>

        </Row>

    )
}

export default MovieDetail;