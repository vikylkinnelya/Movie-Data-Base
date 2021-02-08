import React, { useEffect, useState } from 'react';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import Loader from '../loader';
import ItemsBox from '../items-box';
import MovieDetail from '../movie-detail';
import FavPage from '../pages/fav-page';
import FilmPage from '../pages/film-page';
import MainPage from '../pages/main-page';
import SeriesPage from '../pages/series-page';
import WatchPage from '../pages/watch-page';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout, Row, Modal, Alert, } from 'antd';
import 'antd/dist/antd.css'
import './app.css';

const { Header, Content, Footer, Sider } = Layout;

const API_KEY = 'eb9d8a81';

function App() {

  const [movie, setMovie] = useState(null); //будет хранить обьект ответа от сервера
  const [error, setError] = useState(null); //будет обновляться только при ошибке
  const [loading, setLoading] = useState(false); //обект ожидания
  const [q, setQuery] = useState('love'); //хранит искомые параметры запроса 

  const [activateModal, setActivateModal] = useState(false); //помогает закрыть модал компонент
  const [detail, setShowDetail] = useState(false); //собирает детали фильма
  const [detailRequest, setDetailRequest] = useState(false); //отображение загрузчика

  const [favList, setFav] = useState([]); //список избранных
  const [watchList, setWatch] = useState([]); //список к просмотру

  const [collapsed, setCollapsed] = useState(false); //отобр меню развернут или свернут

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

  const getMovieReqest = async (q) => { //запрос на сервер
    const url = `http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`

    const response = await fetch(url); //запрос к серверу
    const responseJson = await response.json();

    if (responseJson.Response === 'False') { //если нет ответа
      setError(response.Error) //записать в обьект ошибки ошибку
    }
    if (responseJson.Search) {
      setMovie(responseJson.Search) //записать в обьект с данными полученный ответ
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true); //ждём
    setError(null); //обнуление ошибки
    setMovie(null); //обнуление обьекта данных
    getMovieReqest(q);
  }, [q]); //ищем черещ getmovie с параметрами q 


  return (
    <Router>
      <div className='App'>
        <Layout className='Layout'>
          <Sider /* боковая панель */
            collapsible /* сворачивающаяся */
            onCollapse={() => setCollapsed(!collapsed)}
          >
            <MenuSider />
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

                {/* <ItemsBox
                    data={movie} //передаем обьект с данными на уровень ниже

                    ShowDetail={setShowDetail}
                    DetailRequest={setDetailRequest}
                    ActivateModal={setActivateModal}

                    ToggleFav={toggleFav}
                    ToggleWatch={toggleWatch}
                  /> */}
                <Switch>

                  <Route path='/main' >
                    <MainPage
                      movie={movie}  //передаем обьект с данными на уровень ниже

                      setShowDetail={setShowDetail}
                      setDetailRequest={setDetailRequest}
                      setActivateModal={setActivateModal}

                      toggleFav={toggleFav}
                      toggleWatch={toggleWatch}

                      favList={favList}
                      watchList={watchList}
                    />
                  </Route>
                  <Route path='/favorites'>
                    <FavPage
                      setShowDetail={setShowDetail}
                      setDetailRequest={setDetailRequest}
                      setActivateModal={setActivateModal}

                      toggleFav={toggleFav}
                      toggleWatch={toggleWatch}

                      favList={favList}
                      watchList={watchList}
                    />
                  </Route>
                  <Route path='/to-watch'>
                    <WatchPage
                      watchList={watchList}
                    >
                      <ItemsBox
                        ShowDetail={setShowDetail}
                        DetailRequest={setDetailRequest}
                        ActivateModal={setActivateModal}

                        toggleFav={toggleFav}
                        toggleWatch={toggleWatch}

                        favList={favList}

                        isActive={false}
                        isWatch={false}

                      />

                    </WatchPage>
                  </Route>
                  <Route path='/films'>
                    <FilmPage />
                  </Route>
                  <Route path='/serials'>
                    <SeriesPage />
                  </Route>
                </Switch>
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
    </Router>
  )
}

export default App;


