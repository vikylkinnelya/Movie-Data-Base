import React, { useEffect, useState } from 'react';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import Loader from '../loader';
import ItemsBox from '../items-box';
import MovieDetail from '../movie-detail';
import FavBox from '../favPage';

import {
  Layout,
  Row,
  Col,
  Modal,
  Alert,
} from 'antd';
import 'antd/dist/antd.css'

import './app.css';

//lessc src/components/app/main.less node_modules/antd/dist/antd.css --js

const API_KEY = 'eb9d8a81';

const { Header, Content, Footer, Sider } = Layout;

function App() {

  const [data, setData] = useState(null); //будет хранить обьект ответа от сервера
  const [error, setError] = useState(null); //будет обновляться только при ошибке
  const [loading, setLoading] = useState(false); //обект ожидания
  const [q, setQuery] = useState('love'); //хранит искомые параметры запроса 

  const [favList, setFavList] = useState([]); //список избранных
  const [watchList, setWatchList] = useState([]); //список к просмотру
  const [favBtn, setFavBtn] = useState(false); //активность кнопки лайков
  const [watchBtn, setWatchBtn] = useState(false); //активн кнопки просмотреть


  const [activateModal, setActivateModal] = useState(false); //помогает закрыть модал компонент
  const [detail, setShowDetail] = useState(false); //собирает детали фильма
  const [detailRequest, setDetailRequest] = useState(false); //отображение загрузчика

  const [collapsed, setCollapsed] = useState(false); //отобр меню развернут или свернут


  useEffect(() => {

    setLoading(true); //ждём
    setError(null); //обнуление ошибки
    setData(null); //обнуление обьекта данных

    const getMovieReqest = async () => { //запрос на сервер
      const url = `http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`

      const response = await fetch(url); //запрос к серверу
      const responseJson = await response.json();

      if (responseJson.Response === 'False') { //если нет ответа
        setError(response.Error) //записать в обьект ошибки ошибку
      }
      if (responseJson.Search) {
        setData(responseJson.Search) //записать в состояние ответ
      }
    }
    getMovieReqest(q);
    setLoading(false);
  }, [q]); //ищем черещ getmovie с параметрами q

  const addFavItem = (item) => { //добавл в список избранных
    const newFavList = [...favList, item]; //новый список сост из старых эл и нового выбранного
    setFavList(newFavList) //перезаписываем обьект списка избранных
    
  }
  const addWatchItem = (item) => {
    const newWatchList = [...favList, item];
    setWatchList(newWatchList)
  }



  return (
    <div className='App'>
      <Layout className='Layout' style={{ minHeight: '100vh' }}>
        <Sider /* боковая панель */
          collapsible /* сворачивающаяся */
          onCollapse={() => {
            setCollapsed(!collapsed)
          }}>
          <MenuSider
            collapsed={collapsed} /> {/* зависит от того, свернута ли бок панель */}
        </Sider>
        <Layout className='layout'>
          <Header style={{ background: '#FFD500' }}>
            <SearchBox
              searchHandler={setQuery} /> {/* поиск по введенным параметрам кот сохр в обьект */}
          </Header>
          <Content
            style={{ padding: '20px 20px' }}>
            <div style={{ background: 'fff' }} >
              <Row justify='center'>
                {loading && <Loader />} {/* ожидание из стейта и иконка загрузки */}
                {error !== null &&
                  <div style={{ margin: '20px 0' }}>
                    <Alert message={error} type='error' />
                  </div>
                }
                {data !== null && data.length > 0 && data.map((result, idx) => ( /* перебор обьекта даты */
                  <ItemsBox
                    ShowDetail={setShowDetail}
                    DetailRequest={setDetailRequest}
                    ActivateModal={setActivateModal}
                    favClickHandler={addFavItem}
                    key={idx}
                    {...result} /> /* показ самих элементов */
                ))}
                {favList !== null && favList.length > 0 && favList.map((result, idx) => (
                  <FavBox
                    

                    key={idx}
                    {...result}
                  />
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
