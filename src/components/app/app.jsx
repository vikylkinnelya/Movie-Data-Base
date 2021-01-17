import React, { useEffect, useState, Component } from 'react';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import Loader from '../loader';
import CardsBox from '../cards-box';
import MovieDetail from '../movie-detail'

import {
  Layout,
  Row,
  Col,
  Modal,
  Alert,
  Typography,
} from 'antd';
import 'antd/dist/antd.css'

import './app.css';

//lessc src/components/app/main.less node_modules/antd/dist/antd.css --js

const API_KEY = 'eb9d8a81';

const { Header, Content, Footer, Sider } = Layout;

function App() {

  const [data, setData] = useState(null); //будет хранить обьект ответа
  const [error, setError] = useState(null); //будет обновляться только при ошибке
  const [loading, setLoading] = useState(false); //обект ожидания
  const [q, setQuery] = useState('batman'); //хранит искомые параметры запроса 

  const [activateModal, setActivateModal] = useState(false); //помогает закрыть модал компонент
  const [detail, setShowDetail] = useState(false); //собирает данные
  const [detailRequest, setDetailRequest] = useState(false); //отображение загрузчика

  const [collapsed, setCollapsed] = useState(false); //отобр меню развернут или свернут

  

  useEffect(() => {
    setLoading(true); //ждём
    setError(null); //обнуление ошибки
    setData(null); //обнуление обьекта данных

    fetch(`http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`)
      .then(resp => resp)
      .then(resp => resp.json())
      .then(response => {
        if (response.Response === 'False') { //если нет ответа
          setError(response.Error) //записать в обьект ошибки ошибку
        }
        else {
          setData(response.Search) //записать в обьект ответ
        }
        setLoading(false) //больше не ждём
      })
      .catch(({ message }) => {
        setError(message); //показать сообщение в случае ошибки
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
          }}>
          <MenuSider
            collapsed={collapsed} />
        </Sider>
        <Layout className='layout'>
          <Header style={{ background: '#FFD500' }}>
            <SearchBox searchHandler={setQuery} /> {/*поиск по введенным параметрам кот сохр в обьект*/}
          </Header>
          <Content
            style={{ padding: '20px 20px' }}>
            <div style={{ background: 'fff', minHeight: 270 }} >
              <Row type='flex' justify='center'>
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
            <Modal
              title='Detail'
              centered
              visible={activateModal}
              onCancel={() => setActivateModal(false)}
              footer={null}
              width={900}
            >
              {detailRequest === false ?
                (<MovieDetail {...detail} />) :
                (<Loader />)}
            </Modal>
          </Content>
          <Footer>
            footer
        </Footer>
        </Layout>

      </Layout>
    </div >
  )
}

export default App;
