import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

import MyContext from '../../servises/Context';

import { Layout, Row, Modal, Alert, Pagination, Empty  } from 'antd';
import 'antd/dist/antd.css'
import './app.css';

const { Header, Content, Footer, Sider } = Layout;

//const API_KEY = 'eb9d8a81';
const API_KEY = 'a6a004a3'

function App() {

  const [movie, setMovie] = useState(null); //будет хранить обьект ответа от сервера
  const [error, setError] = useState(null); //будет обновляться только при ошибке
  const [loading, setLoading] = useState(false); //обект ожидания
  const [q, setQuery] = useState('lover'); //хранит искомые параметры запроса 

  const [activateModal, setActivateModal] = useState(false); //помогает закрыть модал компонент
  const [detail, setShowDetail] = useState(false); //собирает детали фильма
  const [detailRequest, setDetailRequest] = useState(false); //отображение загрузчика

  const [favList, setFav] = useState([]); //список избранных
  const [watchList, setWatch] = useState([]); //список к просмотру

  const [collapsedMenu, setCollapsedMenu] = useState(false); //отобр меню развернут или свернут

  const [currPage, setCurrPage] = useState(1) //текущая страница в pagination
  const [totalResults, setTotalResults] = useState(null); //общее кол-во ответов от сервера на запрос q

  const [genreList, setGenreList] = useState(['movie', 'series']); //отмеченные чекбоксы в filter menu
  const [yearValue, setYearValue] = useState(null) //выбранные года в filter menu

  const data = {
    movie: movie,
    favList: favList,
    watchList: watchList,
    genreList: genreList,
    yearValue: yearValue,
    setFav: setFav,
    setWatch: setWatch,
    setGenreList: setGenreList,
    setYearValue: setYearValue
  }

  const getDataRequest = (searchParam, questionParam, setState, currPage, type = '', year = '') => { //гибкий запрос на сервер

    fetch(`http://www.omdbapi.com/?${searchParam}=${questionParam}&page=${currPage}&type=${type.length === 2 ? type = '' : type}&y=${year}&apikey=${API_KEY}`)
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
    getDataRequest('s', q, setMovie, page, genreList, yearValue)
    setCurrPage(page)
  }

  useEffect(() => {
    setLoading(true); //ждём
    setTotalResults(null); //обнуление кол-ва фильмов от сервера
    setError(null); //обнуление ошибки перед новым запросом
    setMovie(null); //обнуление обьекта данных перед новым запросом
    getDataRequest('s', q, setMovie, currPage, genreList, yearValue); //запрос на сервер со своими параметрами
  }, [q, currPage, genreList, yearValue]);
  //в кач-ве второго параметра может быть только примитивный обьект. при его изменении будет происходить ререндеринг


  return (
    <Router>
      <MyContext.Provider value={data}>

        <div className='App'>
          <Layout className='Layout'>
            <Sider /* боковая панель */
              collapsible /* сворачивающаяся */
              onCollapse={() => setCollapsedMenu(!collapsedMenu)} >
              <MenuSider />
            </Sider>

            <Layout className='layout'>
              <Header className='header'>

                <SearchBox
                  searchHandler={setQuery} /* поиск по введенным параметрам кот сохр в обьект */
                  GetData={getDataRequest} //запрос данных с сервера
                />

              </Header>

              <Content>
                <Row justify='center'>
                  {loading && <Loader />} {/* ожидание из стейта и иконка загрузки */}

                  {error !== null &&
                    <div className='error-row' style={{ margin: '20px 0'}}>
                      <Empty description={error} type='error' />
                    </div>
                  }

                  <Switch>
                    <Route path='/main'>
                      <RenderItemBox state={movie} />
                    </Route>
                    <Route path='/favorites'>
                      <RenderItemBox state={favList} />
                    </Route>
                    <Route path='/to-watch'>
                      <RenderItemBox state={watchList} />
                    </Route>
                    <Route path='/films'>
                      <RenderItemBox state={movie} />
                    </Route>
                    <Route path='/serials'>
                      <RenderItemBox state={movie} />
                    </Route>
                  </Switch>
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
      </MyContext.Provider>
    </Router>
  )
}

export default App;


