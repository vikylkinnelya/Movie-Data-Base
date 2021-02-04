import React, { useEffect, useState } from 'react';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import Loader from '../loader';
import ItemsBox from '../items-box';
import MovieDetail from '../movie-detail';
import FavPage from '../pages/fav-page'

import {
  Layout,
  Row,
  Modal,
  Alert,
} from 'antd';
import 'antd/dist/antd.css'

import './app.css';

const API_KEY = 'eb9d8a81';

const { Header, Content, Footer, Sider } = Layout;

function App() {

  const [data, setData] = useState(null); //будет хранить обьект ответа от сервера
  const [error, setError] = useState(null); //будет обновляться только при ошибке
  const [loading, setLoading] = useState(false); //обект ожидания
  const [q, setQuery] = useState('love'); //хранит искомые параметры запроса 

  const [favList, setFav] = useState([]); //список избранных
  const [watchList, setWatch] = useState([]); //список к просмотру

  const [activateModal, setActivateModal] = useState(false); //помогает закрыть модал компонент
  const [detail, setShowDetail] = useState(false); //собирает детали фильма
  const [detailRequest, setDetailRequest] = useState(false); //отображение загрузчика

  const [collapsed, setCollapsed] = useState(false); //отобр меню развернут или свернут

  const getMovieReqest = async (q) => { //запрос на сервер
    const url = `http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`

    const response = await fetch(url); //запрос к серверу
    const responseJson = await response.json();

    if (responseJson.Response === 'False') { //если нет ответа
      setError(response.Error) //записать в обьект ошибки ошибку
    }
    if (responseJson.Search) {
      setData(responseJson.Search) //записать в обьект с данными полученный ответ
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true); //ждём
    setError(null); //обнуление ошибки
    setData(null); //обнуление обьекта данных
    getMovieReqest(q);
  }, [q]); //ищем черещ getmovie с параметрами q

  const toggleFav = (item) => {
    let newFavList
    if (favList.includes(item)) {
      newFavList = favList.filter(fav => fav.imdbID !== item.imdbID) //в новый список попадают все кроме выбранного на удаление
    }
    if (!favList.includes(item)) {
      newFavList = [...favList, item]; //новый список сост из старых эл и нового выбранного
    }
    setFav(newFavList) //перезаписываем обьект списка избранных
  }
  const toggleWatch = (item) => {
    let newWatchList
    if (watchList.includes(item)) {
      newWatchList = watchList.filter(watch => watch.imdbID !== item.imdbID)
    }
    if (!watchList.includes(item)) {
      newWatchList = [...watchList, item];
    }
    setWatch(newWatchList)
  }

  return (
    <div className='App'>
      <Layout className='Layout'>
        <Sider /* боковая панель */
          collapsible /* сворачивающаяся */
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <MenuSider collapsed={collapsed} /> {/* зависит от того, свернута ли бок панель */}
        </Sider>
        <Layout className='layout'>
          <Header>
            <SearchBox
              searchHandler={setQuery} /> {/* поиск по введенным параметрам кот сохр в обьект */}
          </Header>
          <Content>
            <Row justify='center'>
              {loading && <Loader />} {/* ожидание из стейта и иконка загрузки */}
              {error !== null &&
                <div style={{ margin: '20px 0' }}>
                  <Alert message={error} type='error' />
                </div>
              }
              <ItemsBox
                data={data} //передаем обьект с данными на уровень ниже
                favList={favList}
                watchList={watchList}

                ShowDetail={setShowDetail}
                DetailRequest={setDetailRequest}
                ActivateModal={setActivateModal}

                ToggleFav={toggleFav}
                ToggleWatch={toggleWatch}
              />
            </Row>

            <Modal
              title='Detail'
              centered
              visible={activateModal}
              onCancel={() => setActivateModal(false)}
              footer={null}
            >
              {detailRequest === false ? /* если получен ответ от сервера с деталями */
                (<MovieDetail {...detail} />) : /* показать детали */
                (<Loader />)
              }
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
