import React from 'react';

import { Menu } from 'antd';
import 'antd/dist/antd.css'

import {
    VideoCameraOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    LikeOutlined,
    DislikeOutlined,
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
                inlineCollapsed={collapsed} >
                <Menu.Item
                    key="1"
                    mode="inline"
                    className="customclass"
                    icon={<VideoCameraOutlined style={{ fontSize: '20px' }} />}>
                    films
        </Menu.Item>
                <Menu.Item
                    key="2"
                    className="customclass"
                    style={{ marginTop: '10px' }}
                    icon={<VideoCameraOutlined style={{ fontSize: '20px' }} />}>
                    serials
        </Menu.Item>
                <Menu.Item
                    key="3"
                    className="customclass"
                    style={{ marginTop: '20px' }}
                    icon={<EyeOutlined style={{ fontSize: '20px' }} />}>
                    watched
        </Menu.Item>
                <Menu.Item
                    key="4"
                    className="customclass"
                    style={{ marginTop: '10px' }}
                    icon={<EyeInvisibleOutlined style={{ fontSize: '20px' }} />}>
                    to watch
        </Menu.Item>
                <Menu.Item
                    key="5"
                    className="customclass"
                    style={{ marginTop: '20px' }}
                    icon={<HeartOutlined style={{ fontSize: '20px' }} />}>
                    liked
        </Menu.Item>
                <Menu.Item
                    key="6"
                    className="customclass"
                    icon={<LikeOutlined style={{ fontSize: '20px' }} />}>
                    good
        </Menu.Item>
                <Menu.Item
                    key="7"
                    className="customclass"
                    icon={<DislikeOutlined style={{ fontSize: '20px' }} />}>
                    bad
        </Menu.Item>
            </Menu>
        </>
    )
}

export default MenuSider;