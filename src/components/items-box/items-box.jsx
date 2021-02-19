import React from 'react';
import { Row, Col, Card, Tag, Button } from 'antd';
import { HeartOutlined, EyeOutlined, EyeFilled, HeartFilled } from '@ant-design/icons'
import './items-box.css'
import toggleItem from '../../servises/toggleItem';
import MyContext from '../../servises/Context'

const { Meta } = Card;

const ItemsBox = ({ result, GetData, imdbID, isActive, isWatch, ShowDetail, DetailRequest, ActivateModal, Title, Poster, Type }) => {

    const itemClickHandler = () => { //обработчик события клика. при клике на карточку
        ActivateModal(true); //показать модалку. эл импортируется из другого компонента
        DetailRequest(true); //запрос к серверу за деталями фильма
        GetData('i', imdbID, ShowDetail)
    }

    //возможно записывать в обьект лайков только imdbid а потом для получения делать запрос к серверу чтобы не есть много памяти
    //тогда эта функция которую я напишу будет более юзабельна 

    //посылается запрос на сервер и отображается первая страница

    return (

        <MyContext.Consumer>
            {
                (value) => {
                    return (
                        <div className='card-container'>
                            <Card /* карточка  с фото */
                                cover={
                                    <img
                                        alt={Title}
                                        src={Poster === 'N/A' ?
                                            'https://placehold.it/198x264&text=Image+Not+Found' :
                                            Poster}
                                        onClick={() => itemClickHandler()}
                                    />}
                            >
                                <Meta /* краткая информация */
                                    title={Title}
                                    description={false}
                                    onClick={() => itemClickHandler()}
                                />
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
                                            onClick={() => toggleItem(result, value.watchList, value.setWatch)}
                                        />
                                    </Col>
                                    <Col className={isActive ? 'overlay like active' : 'overlay like'}>
                                        <Button
                                            shape='circle'
                                            icon={isActive ? <HeartFilled /> : <HeartOutlined />}
                                            onClick={() => toggleItem(result, value.favList, value.setFav)} //при клике на кнопку вызывается переданная сверху функция добавления данного обьекта в обьект с избранными
                                        />
                                    </Col>

                                </Row>
                            </Card>
                        </div>
                    )
                }
            }

        </MyContext.Consumer>
    )
}

export default ItemsBox;

