import React from 'react';
import { Row, Col, Card, Tag, Button } from 'antd';
import toggleItem from '../../servises/toggleItem';
import MyContext from '../../servises/Context'
import { HeartOutlined, EyeOutlined, EyeFilled, HeartFilled } from '@ant-design/icons'
import './items-box.css'
const { Meta } = Card;

const ItemsBox = ({ result, GetData, ClickHandler, imdbID, isActive, isWatch, ShowDetail, DetailRequest, ActivateModal, Title, Poster, Type }) => {

    

    return (
        <MyContext.Consumer>
            {value => {
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
                                        onClick={() => toggleItem(result, value.watchList, value.setWatch)} />
                                </Col>
                                <Col className={isActive ? 'overlay like active' : 'overlay like'}>
                                    <Button
                                        shape='circle'
                                        icon={isActive ? <HeartFilled /> : <HeartOutlined />}
                                        onClick={() => toggleItem(result, value.favList, value.setFav)} />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                )
            }}

        </MyContext.Consumer>
    )
}

export default ItemsBox;

