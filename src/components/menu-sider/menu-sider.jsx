import React from 'react';
import { NavLink } from "react-router-dom";
import { Menu } from 'antd';
import './menu-sider.css'
import { DatabaseOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons'

const MenuSider = ({ setPage, setGenre, loc }) => {

    return (
        <>
            <Menu
                defaultSelectedKeys='main'
                selectedKeys={loc}
                mode="inline"
                theme="dark"
                onClick={() => setPage(1)}
            >
                <Menu.Item
                    key="main"
                    className="customclass"
                    icon={<DatabaseOutlined />}
                    onClick={() => setGenre(['movie', 'series'])}
                >
                    <NavLink to={`/main/1`} />
                    main
                </Menu.Item>

                <Menu.Item
                    key="films"
                    className="customclass"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-film" viewBox="0 0 16 16">
                        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
                    </svg>}
                    onClick={() => setGenre(['movie'])}
                >
                    <NavLink to={`/films/1`} />
                    movies
                </Menu.Item>

                <Menu.Item
                    key="serials"
                    className="customclass"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera-reels" viewBox="0 0 16 16">
                        <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM1 3a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                        <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7zm6 8.73V7.27l-3.5 1.555v4.35l3.5 1.556zM1 8v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z" />
                        <path d="M9 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                    </svg>}
                    onClick={() => setGenre(['series'])}
                >
                    <NavLink to={`/serials/1`} />
                    serials
                </Menu.Item>

                <Menu.Item
                    key="favorites"
                    className="customclass"
                    icon={<HeartOutlined />}>
                    <NavLink to={`/favorites/1`} />
                    liked
                </Menu.Item>

                <Menu.Item
                    key="to-watch"
                    className="customclass"
                    icon={<EyeOutlined />}>
                    <NavLink to={`/to-watch/1`} />
                    watchlist
                </Menu.Item>

            </Menu>
        </>
    )
}

export default MenuSider;