import React, { useState } from 'react';
import { Menu } from 'antd';
import { NavLink, withRouter } from "react-router-dom";
import 'antd/dist/antd.css'
import './menu-sider.css'
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
                defaultSelectedKeys={['1']}
                mode="inline"
                collapsed={collapsed} >

                <Menu.Item
                    key="1"
                    mode="inline"
                    className="customclass"
                    icon={<DatabaseOutlined />} >
                    movie data base
                    <NavLink to='/' />
                </Menu.Item>

                <Menu.Item
                    key="2"
                    mode="inline"
                    className="customclass"
                    icon={<VideoCameraOutlined />}>
                    film
                    <NavLink to='/films' />
                </Menu.Item>

                <Menu.Item
                    key="3"
                    className="customclass"
                    icon={<VideoCameraOutlined />}>
                    series
                    <NavLink to='/series' />
                </Menu.Item>

                <Menu.Item
                    key="4"
                    className="customclass"
                    icon={<HeartOutlined />}>
                    liked
                    <NavLink to='/favorites' />
                </Menu.Item>

                <Menu.Item
                    key="5"
                    className="customclass"
                    icon={<EyeOutlined />}>
                    watch later
                    <NavLink to='/to-watch' />
                </Menu.Item>

            </Menu>
        </>
    )
}

export default withRouter(MenuSider);