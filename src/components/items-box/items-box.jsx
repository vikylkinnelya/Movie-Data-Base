import React from 'react';
import {
    Row,
    Col,
    Card,
    Button,
    Tag,
} from 'antd';
import { FolderViewOutlined } from '@ant-design/icons'
import './items-box.css'
import AddFavorites from '../add-favorites';
const { Meta } = Card;


const ItemsBox = ({ Title, imdbID, Poster, Type, ShowDetail, DetailRequest, ActivateModal, AddFavorites }) => {

    const itemClickHandler = () => { //обработчик события клика. при клике на карточку
        ActivateModal(true); //показать модалку. эл импортируется из другого компонента
        DetailRequest(true); //запрос к серверу за деталями фильма
    }

    const watchClickHandler = (item) => { //при клике на глаз
        console.log('watch')
    }

    const favClickHandler = (item) => {
        console.log('like')
    }


    const magenta = <Tag color='magenta'>{Type}</Tag>
    const green = <Tag color='green'>{Type}</Tag>


    return (
        <div
            className='card-container'
            style={{ margin: '15px', display: 'flex', }}
        >
            <div className='overlay'>
                <AddFavorites
                    onClick={() => this.handleFavouritesClick()}
                />


                <Button
                    className='overlay watch'
                    type="primary"
                    shape='circle'
                    icon={<FolderViewOutlined style={{ fontSize: '23px' }} />}
                    onClick={() => watchClickHandler()}
                >
                </Button>


            </div>
            <Card /* карточка  с фото */
                style={{ maxWidth: 200 }}
                cover={
                    <img
                        style={{ height: 290 }}
                        alt={Title}
                        src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                        onClick={() => itemClickHandler()}
                    />}
            >
                <Meta /* краткая информация */
                    title={Title}
                    description={false}
                    style={{ padding: 0 }}
                />
                <Row
                    style={{ marginTop: '1px' }}
                    className='gutter-row'
                >
                    <Col>
                        {Type === 'movie' ? magenta : green}
                    </Col>
                </Row>
            </Card>
        </div >
    )
}

export default ItemsBox;