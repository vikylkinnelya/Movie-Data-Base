import React, { useState } from 'react';
import { Menu } from 'antd';
import { NavLink } from "react-router-dom";
import 'antd/dist/antd.css'
import './menu-sider.css'
import {
    DatabaseOutlined,
    VideoCameraOutlined,
    EyeOutlined,
    HeartOutlined,
} from '@ant-design/icons'

const MenuSider = (collapsed) => {

    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                collapsed={collapsed} >
                <NavLink to='/' >
                    <Menu.Item
                        key="1"
                        mode="inline"
                        className="customclass"
                        icon={<DatabaseOutlined />}
                    >
                        movie data base
                    </Menu.Item>
                </NavLink>
                <NavLink to='/films'>
                    <Menu.Item
                        key="2"
                        mode="inline"
                        className="customclass"
                        icon={<VideoCameraOutlined />}>
                        films
                    </Menu.Item>
                </NavLink>
                <NavLink to='/series'>
                    <Menu.Item
                        key="3"
                        className="customclass"
                        icon={<VideoCameraOutlined />}>
                        series
                    </Menu.Item>
                </NavLink>
                <NavLink to='/favorites' >
                    <Menu.Item
                        key="4"
                        className="customclass"
                        icon={<HeartOutlined />}
                    >
                        liked
                    </Menu.Item>
                </NavLink>
                <NavLink to='/to-watch'>
                    <Menu.Item
                        key="5"
                        className="customclass"
                        icon={<EyeOutlined />}
                    >
                        watch later
                    </Menu.Item>
                </NavLink>
            </Menu>
        </>
    )
}

export default MenuSider;