import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import choseRandomMovie from '../../servises/choseRandomMovie';
import onRedirectClick from '../../servises/onRedirectClick'


const RedirectPage = ({location, setGenre, history, setQ}) => {


    return (
        <Result
            //status={'404' || location}
            icon={<SmileOutlined />}
            title="Please enter your query or try random."
            extra={<Button type="primary" onClick={() => onRedirectClick(location, setGenre, history, setQ)}> Let's go! </Button>}
        />
    )
}

export default RedirectPage;

