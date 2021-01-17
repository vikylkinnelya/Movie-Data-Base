import React from 'react';
import {
    Row,
    Col,
    Card,
    Tag,
    Button
} from 'antd';
import {
    EyeOutlined,
    HeartOutlined,
} from '@ant-design/icons'


const { Meta } = Card;
const API_KEY = 'eb9d8a81';


const CardsBox = ({ Title, imdbID, Poster, Type, ShowDetail, DetailRequest, ActivateModal }) => {

    const clickHandler = () => {
        ActivateModal(true)
        DetailRequest(true)
    }



    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            DetailRequest(false);
            ShowDetail(response)
        })
        .catch(({ message }) => {
            DetailRequest(false)
        })



    return (
        <Col span={6}
            style={{ margin: '15px 0' }}
            className='gutter-box'
        >
            <div className='gutter-box'
                style={{ //как будут отображаться карточки в совокупности
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'space - between',
                    alignItems: 'center',
                    flexDirection: 'colum'
                }}>
                <Card
                    style={{
                        maxWidth: 200, type: 'flex', zIndex: 1,
                    }}
                    cover={
                        <img alt={Title}
                            src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                        />
                    }
                    onClick={() => clickHandler()}
                >
                    <Row>
                        <Button ghost
                            class='customclass'
                            type='link'
                            icon={<EyeOutlined style={{ fontSize: '23px' }}/>}
                            style={{
                                width: '30px',
                                position: 'absolute',
                                bottom: '95px',
                                left: '5px',
                                zIndex: 999,
                                color: '#FFD500'
                            }} />
                        <Button ghost
                            class='customclass'
                            type='link'
                            icon={<HeartOutlined style={{ fontSize: '23px' }}/>}
                            style={{
                                width: '30px',
                                position: 'absolute',
                                bottom: '95px',
                                right: '5px',
                                zIndex: 999,
                                color: '#FFD500'
                            }} />
                    </Row>
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
        </Col>
    )
}

export default CardsBox;