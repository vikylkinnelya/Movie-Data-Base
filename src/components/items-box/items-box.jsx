import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tag, Button } from 'antd';
import { HeartOutlined, FolderViewOutlined } from '@ant-design/icons'

import './items-box.css'

const { Meta } = Card;

const ItemsBox = ( {result, GetData, imdbID, isActive, isWatch, toggleFav, toggleWatch, ShowDetail, DetailRequest, ActivateModal, Title, Poster, Type }) => {

    const itemClickHandler = () => { //обработчик события клика. при клике на карточку
        ActivateModal(true); //показать модалку. эл импортируется из другого компонента
        DetailRequest(true); //запрос к серверу за деталями фильма
        GetData('i', imdbID, ShowDetail)


    //изменить названия на нормальные названия но это не точно 
    //возможно записывать в обьект лайков только imdbid а потом для получения делать запрос к серверу чтобы не есть много памяти
    //тогда эта функция которую я напишу будет более юзабельна 

    //так же нужно пдумать над структурой и добавить функцию для быстрого переиспользования кода

}

const classNameFav = isActive ? 'overlay like active' : 'overlay like'
const classNameWatch = isWatch ? 'overlay watch active' : 'overlay watch'

return (
    <>
        <div className='overlay' >
            <Button
                className={classNameFav}
                type="primary"
                shape='circle'
                icon={<HeartOutlined />}
                onClick={() => toggleFav(result)} //при клике на кнопку вызывается переданная сверху функция добавления данного обьекта в обьект с избранными
            >
            </Button>
            <Button
                className={classNameWatch}
                type="primary"
                shape='circle'
                icon={<FolderViewOutlined />}
                onClick={() => toggleWatch(result)}
            >
            </Button>
        </div>
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
            />
            <Row className='gutter-row'>
                <Col>
                    {Type === 'movie' ?
                        <Tag color='magenta'>{Type}</Tag> :
                        <Tag color='green'>{Type}</Tag>}
                </Col>
            </Row>
        </Card>
    </>
)
}

export default ItemsBox;

