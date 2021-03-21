import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const StartingPage = ({ history }) => {
    return (
        <Result
            icon={<SmileOutlined />}
            title="Welcome to the movie database"
            extra={
                <Button type="primary" onClick={() => { history.push('/main/1') }}>
                    let's start
                </Button>
            }
        />
    )
}

export default StartingPage