import React from 'react';
import {
    Row,
    Col,
    Card,
    Button,
    Tag,
} from 'antd';

import {
    FolderViewOutlined,
    HeartOutlined,
} from '@ant-design/icons'

import './cards-box.css'
import { red } from '@ant-design/colors';

const { Meta } = Card;


const CardsBox = ({ Title, imdbID, Poster, Type, ShowDetail, DetailRequest, ActivateModal }) => {

    const cardClickHandler = () => {
        ActivateModal(true)
        DetailRequest(true)
    }
    const watchClickHandler = () => {
        console.log('watch')
    }
    const likeClickHandler = () => {
        console.log('like')
    }


    return (
        <div
            className='card-container'
            style={{ margin: '15px', display: 'flex', }}
        >
            <div className='overlay'>
                <Button
                    className='overlay watch'
                    onClick={() => watchClickHandler()}
                    type="link"
                    shape='circle'
                    icon={<FolderViewOutlined style={{ fontSize: '23px' }} />}>
                </Button>
                <Button
                    className='overlay like'
                    onClick={()=>likeClickHandler()}
                    type="link"
                    shape='circle'
                    icon={<HeartOutlined style={{ fontSize: '23px', marginTop: '2px' }} />}>
                </Button>
            </div>
            <Card
                style={{ maxWidth: 200 }}
                cover={
                    <img
                        style={{ height: 290 }}
                        alt={Title}
                        src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                        onClick={() => cardClickHandler()}
                    />}
            >

                <Meta
                    title={Title}
                    description={false}
                    style={{ padding: 0 }}
                />
                <Row
                    style={{
                        marginTop: '10px'
                    }}
                    className='gutter-row'
                >
                    <Col>
                        <Tag color='magenta'>{Type}</Tag>
                    </Col>
                </Row>
            </Card>

        </div >
    )
}

export default CardsBox;