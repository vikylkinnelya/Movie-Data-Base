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

  const [collapsedMenu, setCollapsedMenu] = useState(false); //отобр меню развернут или свернут
  const [collapsedSearch, setCollapsedSearch] = useState(false); //отобр меню развернут или свернут


  const [currPage, setCurrPage] = useState(1)
  const [totalResults, setTotalResults] = useState(null);


  const toggleItem = (item, state) => {
    let newList
    if (state.includes(item)) {
      newList = state.filter(elem => elem.imdbID !== item.imdbID) //в новый список попадают все кроме выбранного на удаление
    }
    if (!state.includes(item)) {
      newList = [...state, item]; //новый список сост из старых эл и нового выбранного
    }
    state === favList ? setFav(newList) : setWatch(newList) //перезаписываем обьект списка избранных
  }

  const getDataRequest = (searchParam, questionParam, setState, currPage, type = '', year = '') => { //гибкий запрос на сервер

    fetch(`http://www.omdbapi.com/?${searchParam}=${questionParam}&page=${currPage}&type=${type}&year=${year}&apikey=${API_KEY}`)
      .then(resp => resp)
      .then(resp => resp.json())
      .then(response => {
        if (response.Response === 'False') { //если нет ответа
          setError(response.Error) //записать в обьект ошибки ошибку
        } else {
          searchParam === 's' ?
            setState(response.Search) : //если поиск по названию 
            setState(response) //если поиск по imdbId
          setTotalResults(response.totalResults)
        }
        setLoading(false);
        setDetailRequest(false); //для модалки
      }).catch(({ message }) => { //в случае неудачи словить ошибку
        setError(message); //и записать ее в стейт
        setLoading(false);
      })
  }

  const RenderItemBox = ({ state }) => {
    return (state !== null && state.length > 0 && state.map((result) => (
      <ItemsBox
        ToggleItem={toggleItem} //добавить или удалить из стейтов
        favList={favList}
        watchList={watchList}
        
        isActive={favList.includes(result)} //активность кнопки
        isWatch={watchList.includes(result)}
        
        GetData={getDataRequest} //запрос данных с сервера
        ShowDetail={setShowDetail}
        DetailRequest={setDetailRequest}
        ActivateModal={setActivateModal}

        key={result.imdbID} //присв ключ обьекту из списка в соотв с его номером в базе 
        result={result}
        {...result}
      />
    )))
  }

  const onPageChange = (page) => {
    getDataRequest('s', q, setMovie, page)
    setCurrPage(page)
  }

  useEffect(() => {
    setLoading(true); //ждём
    setTotalResults(null); //обнуление кол-ва фильмов от сервера
    setError(null); //обнуление ошибки перед новым запросом
    setMovie(null); //обнуление обьекта данных перед новым запросом
    //getMovieReqest(q)
    getDataRequest('s', q, setMovie); //запрос на сервер со своими параметрами
  }, [q]); //ищем черещ getmovie с параметрами q
  //в кач-ве второго параметра может быть только примитивный обьект. при его изменении будет происходить ререндеринг


  return (
    <Router>
      <div className='App'>
        <Layout className='Layout'>
          <Sider /* боковая панель */
            collapsible /* сворачивающаяся */
            onCollapse={() => setCollapsedMenu(!collapsedMenu)}
          >
            <MenuSider />
          </Sider>
          <Layout className='layout'>
            <Header>
              <SearchBox
                searchHandler={setQuery} /* поиск по введенным параметрам кот сохр в обьект */
                collapsible /* сворачивающаяся */
                collapsedSearch={collapsedSearch}
                toggleCollapsedSearch={setCollapsedSearch}
                onCollapse={() => setCollapsedSearch(!collapsedSearch)}
                GetData={getDataRequest} //запрос данных с сервера

              />
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
                  <Route path='/main/:q/:page' >
                    <RenderItemBox state={movie}/>
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
<<<<<<< HEAD


=======
>>>>>>> e95e40dc2c957536de62b24abcf3f5a5d64f9fe1
              </Row>

              <Row>
                <Pagination
                  current={currPage} //берем из стейта, кот обновл
                  total={totalResults} //length для fav watch 
                  hideOnSinglePage={true} //спрятать если страница одна
                  showSizeChanger={false} //выбор кол-ва отображаемых элементов на странице
                  onChange={onPageChange}
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


