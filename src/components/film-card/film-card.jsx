import React, { useContext, useEffect, useState } from 'react';
//import { BrowserRouter as Route, Switch, useParams, useLocation, useRouteMatch } from 'react-router-dom';
import { Row, Col, Card, Tag, Button } from 'antd';
import toggleItem from '../../servises/toggleItem';
import MyContext from '../../servises/Context'
import { HeartOutlined, EyeOutlined, EyeFilled, HeartFilled } from '@ant-design/icons'
import './film-card.css'
const { Meta } = Card;

const FilmCard = ({ result, isWatch, isFav, ClickHandler, Title, Poster, Type }) => {

    const { watchList, setWatch, favList, setFav, favId, setFavId, watchId, setWatchId } = useContext(MyContext)


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
                            onClick={() =>  toggleItem(result, watchId, setWatchId, 'watchList')} />
                    </Col>
                    <Col className={isFav ? 'overlay like active' : 'overlay like'}>
                        <Button
                            shape='circle'
                            icon={isFav ? <HeartFilled /> : <HeartOutlined />}
                            onClick={() => toggleItem(result, favId, setFavId, 'favList')} />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default FilmCard;

