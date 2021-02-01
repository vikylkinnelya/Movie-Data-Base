import React from 'react';
import {
    Row,
    Col,
    Card,
    Tag, Button
} from 'antd';
import './items-box.css'
import { HeartOutlined, FolderViewOutlined } from '@ant-design/icons'

const { Meta } = Card;


const ItemsBox = ({ data, AddFavItem, AddWatchItem, RemoveFavItem, RemoveWatchItem, favBtn, watchBtn, imdbID, ShowDetail, DetailRequest, ActivateModal }) => {

    const itemClickHandler = () => { //обработчик события клика. при клике на карточку
        ActivateModal(true); //показать модалку. эл импортируется из другого компонента
        DetailRequest(true); //запрос к серверу за деталями фильма
    }


    const toggleFav = (item) => {
        if (!favBtn) {
            AddFavItem(item)
            classNamesFav += ' active'
        } else {
            RemoveFavItem(item)
            classNamesFav = classNamesFav.slice(0, -6)
        }
    }



    let classNamesFav = 'overlay like';
    let classNamesWatch = 'overlay watch';


    if (watchBtn) {
        classNamesWatch += 'active'
    }

    return (
        <>
            {data !== null && data.length > 0 && data.map((result) => ( /* перебор обьекта даты */
                <div
                    key={result.imdbID} //присв ключ обьекту из списка в соотв с его номером в базе 
                    className='card-container'
                    style={{ margin: '15px', display: 'flex', }}
                >
                    <div className='overlay'>
                        <Button
                            className={classNamesFav}
                            type="primary"
                            shape='circle'
                            icon={<HeartOutlined style={{ fontSize: '23px', marginTop: '2px' }} />}
                            onClick={() => toggleFav(result)} //при клике на кнопку вызывается переданная сверху функция добавления данного обьекта в обьект с избранными
                        >
                        </Button>
                        <Button
                            className={classNamesWatch}
                            type="primary"
                            shape='circle'
                            icon={<FolderViewOutlined style={{ fontSize: '23px' }} />}
                            onClick={() => AddWatchItem(result)}

                        >
                        </Button>


                    </div>
                    <Card /* карточка  с фото */
                        style={{ maxWidth: 200 }}
                        cover={
                            <img
                                style={{ height: 290 }}
                                alt={result.Title}
                                src={result.Poster === 'N/A' ?
                                    'https://placehold.it/198x264&text=Image+Not+Found' :
                                    result.Poster}
                                onClick={() => itemClickHandler()}
                            />}
                    >
                        <Meta /* краткая информация */
                            title={result.Title}
                            description={false}
                            style={{ padding: 0 }}
                        />
                        <Row
                            style={{ marginTop: '3px' }}
                            className='gutter-row'
                        >
                            <Col>
                                {result.Type === 'movie' ?
                                    <Tag color='magenta'>{result.Type}</Tag> :
                                    <Tag color='green'>{result.Type}</Tag>}
                            </Col>
                        </Row>
                    </Card>
                </div >
            ))}
        </>
    )
}

export default ItemsBox;