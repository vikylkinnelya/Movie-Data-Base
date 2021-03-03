import React from 'react';
import { BrowserRouter as Route, Switch, useParams, useLocation, useRouteMatch } from 'react-router-dom';

import { Row, Col, Card, Tag, Button } from 'antd';
import toggleItem from '../../servises/toggleItem';
import MyContext from '../../servises/Context'
import { HeartOutlined, EyeOutlined, EyeFilled, HeartFilled } from '@ant-design/icons'
import './film-card.css'
const { Meta } = Card;

const FilmCard = ({ result, ClickHandler, isActive, isWatch, Title, Poster, Type }) => {

    return (
        <MyContext.Consumer>
            {data => {
                const { watchList, setWatch, favList, setFav } = data
                return (
                    <div className='card-container'>
                        <Card
                            cover={<img
                                alt={Title}
                                src={Poster === 'N/A' ?
                                    'https://placehold.it/198x264&text=Image+Not+Found' :
                                    Poster}
                                onClick={() => ClickHandler()} />} >
                            <Meta
                                title={Title}
                                description={false}
                                onClick={() => ClickHandler()} />
                            <Row className='gutter-row'>
                                <Col>
                                    {Type === 'movie' ?
                                        <Tag color='magenta'>{Type}</Tag> :
                                        <Tag color='green'>{Type}</Tag>}
                                </Col>
                            </Row>
                            <Row className='overlay' >
                                <Col className={isWatch ? 'overlay watch active' : 'overlay watch'}>
                                    <Button
                                        shape='circle'
                                        icon={isWatch ? <EyeFilled /> : <EyeOutlined />}
                                        onClick={() => toggleItem(result, watchList, setWatch)} />
                                </Col>
                                <Col className={isActive ? 'overlay like active' : 'overlay like'}>
                                    <Button
                                        shape='circle'
                                        icon={isActive ? <HeartFilled /> : <HeartOutlined />}
                                        onClick={() => toggleItem(result, favList, setFav)} />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                )
            }}
        </MyContext.Consumer>
    )
}

export default FilmCard;

