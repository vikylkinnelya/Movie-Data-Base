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

//lessc src/components/app/main.less node_modules/antd/dist/antd.css --js

const API_KEY = 'eb9d8a81';

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;
const TextTitle = Typography.Title;

function App() {

  const [data, setData] = useState(null); //будет хранить обьект ответа
  const [error, setError] = useState(null); //будет обновляться только при ошибке
  const [loading, setLoading] = useState(false); //показывает спиннер
  const [q, setQuery] = useState('batman'); //хранит искомые параметры запроса 

  const [activateModal, setActivateModal] = useState(false); //помогает закрыть модал компонент
  const [detail, setShowDetail] = useState(false); //собирает данные
  const [detailRequest, setDetailRequest] = useState(false); //отображение загрузчика

  const [collapsed, setCollapsed] = useState(false); //


  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    fetch(`http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`)
      .then(resp => resp)
      .then(resp => resp.json())
      .then(response => {
        if (response.Response === 'false') {
          setError(response.Error)
        }
        else {
          setData(response.Search)
        }
        setLoading(false)
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false)
      })
  }, [q]);


  return (
    <div className='App'>
      <Layout className='Layout' style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          onCollapse={() => {
            setCollapsed(!collapsed)
          }}
        >
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
            <SearchBox searchHandler={setQuery} /> {/*поиск по введенным параметрам кот сохр в обьект*/}
          </Header>
          <Content
            style={{ padding: '0 50px' }}>
            <div style={{ background: 'fff', padding: 24, minHeight: 280 }} >
              <Row gutter={16} type='flex' justify='center'>
                {loading && <Loader />}
                {error !== null &&
                  <div style={{ margin: '20px 0' }}>
                    <Alert message={error} type='error' />
                  </div>
                }
                {data !== null && data.length > 0 && data.map((result, idx) => (
                  <CardsBox
                    ShowDetail={setShowDetail}
                    DetailRequest={setDetailRequest}
                    ActivateModal={setActivateModal}
                    key={idx}
                    {...result} />
                ))}
              </Row>
            </div>
          </Content>
          <Footer>
            footer
        </Footer>
        </Layout>

      </Layout>
    </div >
  )

  const SearchBox = ({ searchHandler }) => { //элемент поиска фильмов
    return (
      <Row marginTop='150px' justify='center'>
        <Col span={15} >
          <Search style={{ marginTop: 12, type: 'flex' }}
            placeholder="enter movie, series"
            size="large"
            onSearch={value => searchHandler(value)} //задает срабатывание опр скрипта когда польз выполняет поиск в инпуте
          />
        </Col>
      </Row>

    )
  }

  const CardsBox = ({ Title, imdbID, Poster, Type, ShowDetail, DetailRequest, ActivateModal }) => {

    const clickHandler = () => {
      DetailRequest(true)
    }

    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
      .then(resp => resp)
      .then(resp => resp.json())
      .then(response => {
        DetailRequest(false);
        ShowDetail(response)
      })
      .catch(({ message }) => {
        DetailRequest(false)
      })

    return (
      <Col
        style={{ margin: '20px 0' }}
        className='gutter-box'
        span={4}>
        <div className='gutter-box'>
          <Card
            style={{ width: 200, type: 'flex' }}
            cover={
              <img alt={Title}
                src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
              />
            }
            onClick={() => clickHandler()}
          >
            <Meta
              Title={Title}
              description={false}
            />
            <Row
              style={{ marginTop: '10px' }}
              className='gutter-row'>
              <Col>
                <Tag color='magenta'>{Type}</Tag>
              </Col>
            </Row>
          </Card>
        </div>
      </Col>
    )
  }

  const Loader = () => (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <Spin />
    </div>
  )






  export default App;