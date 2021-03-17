import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useHistory, withRouter } from 'react-router-dom';
import MyContext from '../../servises/Context';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import Loader from '../loader';
import FilmsContainer from '../films-container';
import MovieDetail from '../movie-detail';
import getDataRequest from '../../servises/getDataRequest';
import getFromLocalStorage from '../../servises/getFromLocalStorage';
import defTotalRes from '../../servises/defTotalRes';
import defGenres from '../../servises/defGenres';
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

  /* const doFirstRequest = (genre = ['movie', 'series']) => {
    const themes = ['love', 'hate', 'sex', 'live', 'death', 'sad', 'earth', 'moon', 'sun', 'war', 'rage']
    const randomTheme = themes[Math.floor(Math.random() * themes.length)]
    const randomPage = Math.floor(Math.random() * (9 - 1) + 1)
    return getDataRequest('s', randomTheme, setMovie, randomPage, genre, yearValue)
    console.log(movie.split(10))
    setMovie(movie)
} */

  const [movie, setMovie] = useState(new Set()); //будет хранить обьект ответа от сервера
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState(() => {
    const themes = ['love', 'hate', 'sex', 'live', 'death', 'sad', 'earth', 'moon', 'sun', 'war', 'rage']
    return themes[Math.floor(Math.random() * themes.length)]
  });

  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false); //собирает детали фильма
  const [detailRequest, setDetailRequest] = useState(false); //получен ответ от сервера или нет

  const [favList, setFav] = useState(() => { return getFromLocalStorage('favList') });
  const [watchList, setWatch] = useState(() => { return getFromLocalStorage('watchList') });

  const [collapsedMenu, setCollapsedMenu] = useState(false);

  const [currPage, setCurrPage] = useState(1 && urlPage) //стр в pagination
  const [totalResults, setTotalResults] = useState(null); //общее кол-во ответов от сервера на запрос q

  const [genreList, setGenreList] = useState(() => { return defGenres(location) }); //отмеч  в filter menu

  const [yearValue, setYearValue] = useState(null) //выбранные года в filter menu

  const getData = useCallback(() => {
    getDataRequest('s', q, setMovie, currPage, genreList, yearValue, setError, setTotalResults, setLoading, setDetailRequest);
  }, [q, currPage, genreList, yearValue])

  const data = { movie, getDataRequest, favList, setFav, watchList, setWatch, genreList, setGenreList, yearValue, setYearValue, currPage, setCurrPage, totalResults, setTotalResults, setActivateModal, setShowDetail, setDetailRequest, setError, setLoading }

  useEffect(() => {
    setLoading(true);
    setError(null);
    setMovie(null)
    setTotalResults(null)
    getData()
  }, [getData]);
  //в кач-ве второго параметра может быть только примитивный обьект
  //при его изменении будет происходить ререндеринг

  const onPageChange = (page) => { //при изменении стр в pagination
    setCurrPage(page) //уст текущая стр в зав-ти от выбранной
    history.push(`/${location}/${page}`) //изменяется url на тек локацию и стр
  }

  return (
    <MyContext.Provider value={data}>
      <div className='App'>
        <Layout className='Layout'>

          <Sider collapsible
            onCollapse={() => setCollapsedMenu(!collapsedMenu)} >
            <MenuSider
              setPage={setCurrPage}
              setGenre={setGenreList}
              loc={location} />
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


              <div className='modal-detail' >
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
                </Modal></div>


              <Row>
                <Pagination
                  current={parseInt(currPage) || parseInt(urlPage)}
                  total={defTotalRes(location, favList, watchList, totalResults)}
                  onChange={page => onPageChange(page)}
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


