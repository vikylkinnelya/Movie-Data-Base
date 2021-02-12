import React from 'react';
import { Row, Col, Card, Tag, Button } from 'antd';
import { HeartOutlined, FolderViewOutlined } from '@ant-design/icons'
import './items-box.css'

const { Meta } = Card;

const ItemsBox = ({ result, favList, watchList, GetData, imdbID, isActive, isWatch, ToggleItem, ToggleFav, ToggleWatch, ShowDetail, DetailRequest, ActivateModal, Title, Poster, Type }) => {

    const itemClickHandler = () => { //обработчик события клика. при клике на карточку
        ActivateModal(true); //показать модалку. эл импортируется из другого компонента
        DetailRequest(true); //запрос к серверу за деталями фильма
        GetData('i', imdbID, ShowDetail)
    }
    //возможно записывать в обьект лайков только imdbid а потом для получения делать запрос к серверу чтобы не есть много памяти
    //тогда эта функция которую я напишу будет более юзабельна 

    //посылается запрос на сервер и отображается первая страница
    //при желании другой страницы в функцию передается параметр ввиде числа страницы, стейт обновляется 

    return (
        <div className='card-container'>
            <div className='overlay' >
                <Button
                    className={isActive ? 'overlay like active' : 'overlay like'}
                    type="primary"
                    shape='circle'
                    icon={<HeartOutlined />}
                    onClick={() => ToggleItem(result, favList)} //при клике на кнопку вызывается переданная сверху функция добавления данного обьекта в обьект с избранными
                >
                </Button>
                <Button
                    className={isWatch ? 'overlay watch active' : 'overlay watch'}
                    type="primary"
                    shape='circle'
                    icon={<FolderViewOutlined />}
                    onClick={(e) => ToggleItem(result, watchList, e)}
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
        </div>
    )
}

export default ItemsBox;

