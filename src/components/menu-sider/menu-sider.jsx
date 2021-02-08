import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from "react-router-dom";
import 'antd/dist/antd.css'
import './menu-sider.css'
import {
    DatabaseOutlined,
    VideoCameraOutlined,
    EyeOutlined,
    HeartOutlined,
} from '@ant-design/icons'

const MenuSider = () => {

    return (
        <>
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme="dark"
            >
                <Menu.Item
                    key="1"
                    className="customclass"
                    icon={<DatabaseOutlined />} >
                    movie data base`
                    <Link to='/main' />
                </Menu.Item>

                <Menu.Item
                    key="2"
                    className="customclass"
                    icon={<VideoCameraOutlined />}>
                    movies
                    <Link to='/films' />
                </Menu.Item>

                <Menu.Item
                    key="3"
                    className="customclass"
                    icon={<VideoCameraOutlined />}>
                    serials
                    <Link to='/serials' />
                </Menu.Item>

                <Menu.Item
                    key="4"
                    className="customclass"
                    icon={<HeartOutlined />}>
                    liked
                    <Link to='/favorites' />
                </Menu.Item>

                <Menu.Item
                    key="5"
                    className="customclass"
                    icon={<EyeOutlined />}>
                    watchlist
                    <Link to='/to-watch' />
                </Menu.Item>

            </Menu>
        </>
    )
}

export default withRouter(MenuSider);