import React from 'react';

import { Menu } from 'antd';
import 'antd/dist/antd.css'

import {
    DatabaseOutlined,
    VideoCameraOutlined,
    EyeOutlined,
    HeartOutlined,
} from '@ant-design/icons'

const MenuSider = (collapsed) => {

    return (
        <>
            <Menu
                style={{
                    height: '100vh',
                    background: '#212121',
                    color: '#D6D9DC',
                    paddingTop: '60px',
                    paddingLeft: '20px',
                    borderRight: '0px',
                    fontSize: '26px',
                }}
                defaultSelectedKeys={['1']}
                mode="inline"
                collapsed={collapsed} >
                <Menu.Item
                    key="1"
                    mode="inline"
                    className="customclass"
                    icon={<DatabaseOutlined  style={{ fontSize: '20px' }} />}>
                    movie data base
        </Menu.Item>
                <Menu.Item
                    key="2"
                    mode="inline"
                    className="customclass"
                    icon={<VideoCameraOutlined style={{ fontSize: '20px' }} />}>
                    films
        </Menu.Item>
                <Menu.Item
                    key="3"
                    className="customclass"
                    style={{ marginTop: '10px' }}
                    icon={<VideoCameraOutlined style={{ fontSize: '20px' }} />}>
                    series
        </Menu.Item>
                <Menu.Item
                    key="4"
                    className="customclass"
                    style={{ marginTop: '20px' }}
                    icon={<HeartOutlined style={{ fontSize: '20px' }} />}>
                    liked
        </Menu.Item>
                <Menu.Item
                    key="5"
                    className="customclass"
                    style={{ marginTop: '20px' }}
                    icon={<EyeOutlined style={{ fontSize: '20px' }} />}>
                    watch later
        </Menu.Item>
            </Menu>
        </>
    )
}

export default MenuSider;