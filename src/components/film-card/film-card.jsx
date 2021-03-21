import './film-card.css';
import { Card, Tag, Button } from 'antd';
import { HeartOutlined, EyeOutlined, EyeFilled, HeartFilled } from '@ant-design/icons';

import React, { useContext } from 'react';
import MyContext from '../../servises/Context'
import toggleItem from '../../servises/toggleItem';


const { Meta } = Card;

const FilmCard = ({ result, isWatch, isFav, ClickHandler, Title, Poster, Type }) => {

    const { movie, setMovie } = useContext(MyContext)

    return (
        <Card className='card-container'
            cover={<img
                alt={Title}
                src={Poster === 'N/A' ?
                    'https://placehold.it/198x264&text=Image+Not+Found' :
                    Poster}
                onClick={() => ClickHandler()} />}

            actions={[
                <>
                    {Type === 'movie' ?
                        <Tag color='magenta'>{Type}</Tag> :
                        <Tag color='green'>{Type}</Tag>}
                </>,

                <Button
                    className={result.watch ? 'overlay watch active' : 'overlay watch'} key='watch'
                    shape='circle'
                    icon={result.watch ? <EyeFilled /> : <EyeOutlined />}
                    onClick={() => toggleItem(result, 'watch', movie, setMovie)} />
                ,
                <Button
                    className={result.fav ? 'overlay like active' : 'overlay like'} key='fav'
                    shape='circle'
                    icon={result.fav ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => toggleItem(result, 'fav', movie, setMovie)} />
            ]}
        >
            <Meta
                title={Title}
                description={false}
                onClick={() => ClickHandler()} />
        </Card>
    )
}

export default FilmCard;

