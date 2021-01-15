import React, { useEffect, useState, Component } from 'react';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';


import {
  Layout,
  Row,
  Col,
  Card,
  Tag,
  Spin,
  Alert,
  Typography,
} from 'antd';
import 'antd/dist/antd.css'


import './app.css';

//lessc src/components/app/main.less node_modules/antd/dist/antd.css --js

const API_KEY = 'eb9d8a81';

const { Header, Content, Footer, Sider } = Layout;
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
          <MenuSider
            collapsed={collapsed} />

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