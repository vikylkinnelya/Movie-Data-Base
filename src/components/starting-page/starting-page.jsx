import './starting-page.css'
import React from 'react';
import { Result, Button } from 'antd';
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

    return (
        <Result
            icon={<SmileOutlined />}
            title="Welcome to the movie database"
            extra={
                <Button
                    className='btn-start-page'
                    type="primary"
                    onClick={() => onStartClick()}>
                    let's start
                </Button>
            }
        />
    )
}

export default StartingPage