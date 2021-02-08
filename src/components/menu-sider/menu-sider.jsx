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
            >
                <Menu.Item
                    key="1"
                    className="customclass"
                    icon={<DatabaseOutlined />} >
                    movie data base
                    <Link to='/main' />
                </Menu.Item>

                <Menu.Item
                    key="2"
                    className="customclass"
                    icon={<VideoCameraOutlined />}>
                    film
                    <Link to='/films' />
                </Menu.Item>

                <Menu.Item
                    key="3"
                    className="customclass"
                    icon={<VideoCameraOutlined />}>
                    series
                    <Link to='/series' />
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
                    watch later
                    <Link to='/to-watch' />
                </Menu.Item>

            </Menu>
        </>
    )
}

export default withRouter(MenuSider);