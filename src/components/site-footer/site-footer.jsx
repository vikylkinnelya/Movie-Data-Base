import './site-footer.css';
import React from 'react';
import { Button, Row, Col, Typography } from 'antd';



const SiteFooter = () => {
    return (
        <>
            <Row className='nav-row'>
                <Col>
                    main
                </Col>
                <Col>
                    movies
                </Col>
                <Col>
                    series
                </Col>
                <Col>
                    favorites
                </Col>
                <Col>
                    to watch
                </Col>

            </Row>

            <Row className='author-row'>

            </Row>



        </>
    )

}

export default SiteFooter;