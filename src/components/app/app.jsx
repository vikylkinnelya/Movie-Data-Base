import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, useLocation, useRouteMatch, useParams, useHistory, withRouter } from 'react-router-dom';
import MyContext from '../../servises/Context';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import Loader from '../loader';
import FilmsContainer from '../films-container';
import MovieDetail from '../movie-detail';
import getDataRequest from '../../servises/getDataRequest'
/* import FavPage from '../pages/fav-page';
import FilmPage from '../pages/film-page';
import MainPage from '../pages/main-page';
import SeriesPage from '../pages/series-page';
import WatchPage from '../pages/watch-page'; */
import { Layout, Row, Modal, Empty, Pagination } from 'antd';

import './app.css';

const { Header, Content, Footer, Sider } = Layout;
//const API_KEY = 'eb9d8a81';
//const API_KEY = 'a6a004a3'

function App() {

  const history = useHistory()
  let location = useLocation().pathname.split('/')[1];
  let urlPage = useLocation().pathname.split('/')[2];

  const [movie, setMovie] = useState(null); //будет хранить обьект ответа от сервера
  const [error, setError] = useState(null); //будет обновляться только при ошибке
  const [loading, setLoading] = useState(false); //обект ожидания
  const [q, setQuery] = useState('sun'); //хранит искомые параметры запроса 

  const [activateModal, setActivateModal] = useState(false); //помогает закрыть модал компонент
  const [detail, setShowDetail] = useState(false); //собирает детали фильма
  const [detailRequest, setDetailRequest] = useState(false); //отображение загрузчика

  const [favList, setFav] = useState([]); //список избранных
  const [watchList, setWatch] = useState([]); //список к просмотру

  const [collapsedMenu, setCollapsedMenu] = useState(false); //отобр меню развернут или свернут8

  const [currPage, setCurrPage] = useState(1 && urlPage) //текущая страница в pagination
  const [totalResults, setTotalResults] = useState(null); //общее кол-во ответов от сервера на запрос q

  const [genreList, setGenreList] = useState(['movie', 'series']); //отмеченные чекбоксы в filter menu
  const [yearValue, setYearValue] = useState(null) //выбранные года в filter menu



  /* const doFirstRequest = (genre = ['movie', 'series']) => {
    const themes = ['love', 'hate', 'sex', 'live', 'death', 'sad', 'earth', 'moon', 'sun', 'war', 'rage']
    const randomTheme = themes[Math.floor(Math.random() * themes.length)]
    const randomPage = Math.floor(Math.random() * (9 - 1) + 1)
    return getDataRequest('s', randomTheme, setMovie, randomPage, genre, yearValue)
    console.log(movie.split(10))
    setMovie(movie)
} */

  const data = { movie, getDataRequest, favList, setFav, watchList, setWatch, genreList, setGenreList, yearValue, setYearValue, currPage, setCurrPage, totalResults, setTotalResults, setActivateModal, setShowDetail, setDetailRequest, setError, setLoading }

  useEffect(() => {
    setLoading(true); //ждём
    setError(null); //обнуление ошибки перед новым запросом
    setTotalResults(null); //обнуление кол-ва фильмов от сервера
    setMovie(null); //обнуление обьекта данных перед новым запросом
    getDataRequest('s', q, setMovie, currPage, genreList, yearValue, setError, setTotalResults, setLoading, setDetailRequest); //запрос на сервер со своими параметрами
    //doFirstRequest()
    //pseudoRandomMovies()
  }, [q, currPage, genreList, yearValue]);
  //в кач-ве второго параметра может быть только примитивный обьект. при его изменении будет происходить ререндеринг

  const onPageChange = (page) => { //при изменении стр в pagination
    setCurrPage(page) //уст текущая стр в зав-ти от выбранной
    history.push(`/${location}/${page}`) //изменяется url на тек локацию и стр
  }

  const defTotalRes = () => {
    if (location === 'favorites') {
      return favList.length
    }
    else if (location === 'to-watch') {
      return watchList.length
    }
    else {
      return totalResults
    }
  }


  return (
    <MyContext.Provider value={data}>
      <div className='App'>
        <Layout className='Layout'>

          <Sider collapsible
            onCollapse={() => setCollapsedMenu(!collapsedMenu)} >
            <MenuSider
              page={currPage}
              setPage={setCurrPage}
              loc={location}
              onChange={onPageChange} />
          </Sider>

          <Layout className='layout'>

            <Header className='header'>
              <SearchBox searchHandler={setQuery} />
            </Header>

            <Content>

              {loading && <Loader />}

              {error !== null &&
                <div className='error-row' style={{ margin: '20px 0' }}>
                  <Empty description={error} type='error' />
                </div>
              }

              <FilmsContainer />




              <Modal
                title='Details'
                centered
                visible={activateModal}
                onCancel={() => { setActivateModal(false); setShowDetail(null) }}
                footer={null}
              >
                {detailRequest === false ?
                  (<MovieDetail {...detail} />) : (<Loader />)
                }
              </Modal>


              <Row>
                <Pagination
                  current={parseInt(currPage) || parseInt(urlPage)}
                  total={defTotalRes()}
                  onChange={page => onPageChange(page)}
                  //total={state === movie ? totalResults : state.length}
                  hideOnSinglePage={true}
                  showSizeChanger={false}
                  pageSize={10}
                />
              </Row>

            </Content>
            <Footer>
              footer
              </Footer>
          </Layout>
        </Layout>
      </div >
    </MyContext.Provider>

  )
}

export default withRouter(App);


