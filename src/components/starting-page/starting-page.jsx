import './starting-page.css'
import React from 'react';
import { Result, Button, Card, Row, Col } from 'antd';
import { SmileOutlined } from '@ant-design/icons';


const StartingPage = ({ history, setQ }) => {

    const onStartClick = () => {
        history.push('/main/1')
        setQ(() => randomMovie())
    }

    const randomMovie = () => {
        const themes = ['love', 'hate', 'sex', 'live', 'death', 'sad', 'earth', 'moon', 'sun', 'war', 'rage']
        return themes[Math.floor(Math.random() * themes.length)]
    }

    const gridStyle = {
        width: '25%',
        textAlign: 'center',
    };

    return (

        <>
            <Row span={24} className='welcome-page'>
                <Col span={24}>Welcome to the movie database</Col>
                <Col span={24} >This app will help you</Col>
                <Col span={12}>
                    find the movie you are looking for </Col>
                <Col span={12}>
                    find out something new </Col>
                <Col span={12}>film</Col>
                <Col span={12}>series</Col>
            </Row>

        </>

        /* <Result
            icon={<SmileOutlined />}
            title="Welcome to the movie database"
            subTitle={'This app helps you to find the movie you looking for by entering a title; or explore something new e. MovieDB will help it quickly rank movies based on criteria film/series. Then you can check more details about film such as short description, genre, durations, actors list, reviews and other things which is useful if there are people who do not watch films yet! Or just click the button and there will be some random films'}
            extra={
                <Button
                    className='btn-start-page'
                    type="primary"
                    onClick={() => onStartClick()}>
                    let's start
                </Button>
            }
        />
 */


    )
}

export default StartingPage