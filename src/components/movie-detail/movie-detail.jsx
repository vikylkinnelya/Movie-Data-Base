import './movie-detail.css'
import { Row, Col, Typography, Tag, Modal } from 'antd';
import React, { useContext } from 'react';
import MyContext from '../../servises/Context';
import Loader from '../loader';

const TextTitle = Typography.Title;

const MovieDetail = ({ Title, Poster, imdbRating, Rated, Runtime, Genre, Plot }) => {

    const { activateModal, setActivateModal, detailRequest, setShowDetail } = useContext(MyContext)


    return (

        <div className='modal-detail' >
            <Modal
                title='Details'
                centered
                visible={activateModal}
                onCancel={() => { setActivateModal(false); setShowDetail(null) }}
                footer={null}
            >
                {detailRequest === false ?
                    (<Row>
                        <Col span={11}>
                            <img
                                src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                                alt={Title}
                            />
                        </Col>
                        <Col span={13}>
                            <Row>
                                <Col span={21}>
                                    <TextTitle
                                        level={4}>
                                        {Title}
                                    </TextTitle>
                                </Col>
                                <Col span={3} style={{ textAlign: 'right' }}>
                                    <TextTitle
                                        level={4}>
                                        <span style={{ color: '#41A8F8' }}>
                                            {imdbRating}
                                        </span>
                                    </TextTitle>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col>
                                    <Tag>{Rated}</Tag>
                                    <Tag>{Runtime}</Tag>
                                    <Tag>{Genre}</Tag>
                                </Col>
                            </Row>
                            <Row>
                                <Col>{Plot}</Col>
                            </Row>
                        </Col>
                    </Row>)
                    : (<Loader />)
                }
            </Modal>

        </div>




    )
}

export default MovieDetail;