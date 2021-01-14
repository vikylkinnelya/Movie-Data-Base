import React, { useEffect, useState } from 'react';

import {
  Layout,
  Input,
  Row,
  Col,
  Card,
  Space,
  Tag,
  Spin,
  Alert,
  Button,
  Modal,
  Typography,
  Menu,
  Switch,
} from 'antd';
import 'antd/dist/antd.css'

import {
  VideoCameraOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LikeOutlined,
  DislikeOutlined,
  HeartOutlined,
} from '@ant-design/icons'

import './app.css';


const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;
const TextTitle = Typography.Title;

function App() {

  /*  const [data, setData] = useState(null); //будет хранить обьект ответа
   const [error, setError] = useState(null); //будет обновляться только при ошибке
   const [loading, setLoading] = useState(false); //показывает спиннер
   const [q, setQuery] = useState('batman'); //хранит искомые параметры запроса 
 
   const [activateModal, setActivateModal] = useState(false); //помогает закрыть модал компонент
   const [detail, setShowDetail] = useState(false); //собирает данные
   const [detailRequest, setDetailRequest] = useState(false); //отображение загрузчика
 
  */
  const [collapsed, setCollapsed] = useState(false); //


  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className='App'>
      <Layout className='Layout' style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          onCollapse={toggleCollapsed}
        >
          <div className="logo" />
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
            inlineCollapsed={collapsed}
          >
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
        </Sider>
        <Layout className='layout'>
          <Header style={{ background: '#FFD500' }}>
            <SearchBox />
          </Header>
          <Content>
            content
        </Content>
          <Footer>
            footer
        </Footer>
        </Layout>

      </Layout>
    </div >
  )

}

const SearchBox = () => {

  return (
    <Row marginTop='150px' justify='center'>
      <Col span={15} >
        <Search style={{ marginTop: 12, type: 'flex' }}
          placeholder="enter movie, series, episode name"
          size="large"
          onSearch={value => console.log(value)}
        />
      </Col>
    </Row>

  )
}








export default App;