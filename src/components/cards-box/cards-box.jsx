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

const { Meta } = Card;


const CardsBox = ({ Title, imdbID, Poster, Type, ShowDetail, DetailRequest, ActivateModal }) => {

    const clickHandler = () => {
        ActivateModal(true)
        DetailRequest(true)
    }


    return (
        <div
            className='card-container'
            style={{ margin: '15px', display: 'flex', justifyContent: 'start' }}
        >
            <Card
                style={{ maxWidth: 200 }}
                cover={
                    <img
                        style={{ height: 290 }}
                        alt={Title}
                        src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                    />
                }
                onClick={() => clickHandler()}
            >
                <div className='overlay'>
                    <Button 
                        type="link"
                        className='overlay watch'
                        icon={<FolderViewOutlined style={{ fontSize: '23px' }} />}
                    />

                    <Button
                        type="link"
                        className='overlay like'
                        icon={<HeartOutlined style={{ fontSize: '23px' }} />}
                    />
                </div>
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

        </div>
    )
}

export default CardsBox;