import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import choseRandomMovie from '../../servises/choseRandomMovie';

const RedirectPage = ({setQ, loc, history}) => {

    const onRedirect = () => {
        history.push(`/${loc}/1`);
        setQ(() => choseRandomMovie())
    }

    return (
        <Result
            icon={<SmileOutlined />}
            title="Please enter your query or try random."
            extra={<Button type="primary" onClick={() => onRedirect()}> Let's go! </Button>}
        />
    )
}

export default RedirectPage;

