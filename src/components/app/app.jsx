import React, { useEffect, useState } from 'react';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import Loader from '../loader';
import ItemsBox from '../items-box';
import MovieDetail from '../movie-detail';
/* import FavPage from '../pages/fav-page';
import FilmPage from '../pages/film-page';
import MainPage from '../pages/main-page';
import SeriesPage from '../pages/series-page';
import WatchPage from '../pages/watch-page'; */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout, Row, Modal, Alert, Pagination } from 'antd';
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

  /* const getMovieReqest = async (q) => { //запрос на сервер
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
  }; */

  const getDataRequest = (searchParam, questionParam, setState) => { //гибкий запрос на сервер

    fetch(`http://www.omdbapi.com/?${searchParam}=${questionParam}&apikey=${API_KEY}`)
      .then(resp => resp)
      .then(resp => resp.json())
      .then(response => {
        if (response.Response === 'False') { //если нет ответа
          setError(response.Error) //записать в обьект ошибки ошибку
        } else {
          searchParam === 's' ?
            setState(response.Search) : //если поиск по названию 
            setState(response) //если поиск по imdbId
        }
        setLoading(false);
        setDetailRequest(false);
      }).catch(({ message }) => { //в случае неудачи словить ошибку
        setError(message); //и записать ее в стейт
        setLoading(false);
      })
  }

  const RenderItemBox = ({ state }) => {
    return (state !== null && state.length > 0 && state.map((result) => (
      <ItemsBox
        isActive={favList.includes(result)}
        isWatch={watchList.includes(result)}

        ToggleFav={toggleFav}
        ToggleWatch={toggleWatch}

        GetData={getDataRequest}
        ShowDetail={setShowDetail}
        DetailRequest={setDetailRequest}
        ActivateModal={setActivateModal}

        key={result.imdbID} //присв ключ обьекту из списка в соотв с его номером в базе 
        result={result}
        {...result}
      />
    )))
  }
  useEffect(() => {
    setLoading(true); //ждём
    setError(null); //обнуление ошибки перед новым запросом
    setMovie(null); //обнуление обьекта данных перед новым запросом
    //getMovieReqest(q)
    getDataRequest('s', q, setMovie); //запрос на сервер со своими параметрами
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
                <Switch>
                  <Route path='/main' >
                    <RenderItemBox state={movie} />
                    {/* <MainPage /> */}
                  </Route>
                  <Route path='/favorites'>
                    <RenderItemBox state={favList} />
                    {/* <FavPage /> */}
                  </Route>
                  <Route path='/to-watch'>
                    <RenderItemBox state={watchList} />
                    {/* <WatchPage /> */}
                  </Route>
                  <Route path='/films'>
                    <RenderItemBox state={movie} />
                    {/* <FilmPage /> */}
                  </Route>
                  <Route path='/serials'>
                    <RenderItemBox state={movie} />
                    {/* <SeriesPage /> */}
                  </Route>
                </Switch>
              </Row>

              <Row>
              <Pagination
                //current={1}
                defaultCurrent={1}
                pageSize={10}
                defaultPageSize={10}
                total={100} //length для fav watch , а что для остальных?
                //hideOnSinglePage={true} //спрятать если страница одна
                showSizeChanger={false} //выбор кол-ва отображаемых элементов на странице
                //pageSizeOptions={[10,20,30]}
                //onChange = {function(current, size)}
                />
              </Row>
              <Modal
                title='Detail'
                centered
                visible={activateModal}
                onCancel={() => { setActivateModal(false); setShowDetail(null) }}
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


