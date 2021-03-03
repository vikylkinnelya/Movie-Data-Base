import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useLocation, useRouteMatch} from 'react-router-dom';
//import { useHistory } from "react-router-dom";
import MyContext from '../../servises/Context';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import Loader from '../loader';
import FilmsContainer from '../films-container';
//import FilmCard from '../film-card';
import MovieDetail from '../movie-detail';
/* import FavPage from '../pages/fav-page';
import FilmPage from '../pages/film-page';
import MainPage from '../pages/main-page';
import SeriesPage from '../pages/series-page';
import WatchPage from '../pages/watch-page'; */
import { Layout, Row, Modal, Empty } from 'antd';
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

  const getDataRequest = (searchParam, questionParam, setState, currPage, type = '', year = '') => { //гибкий запрос на сервер

    fetch(`https://www.omdbapi.com/?${searchParam}=${questionParam}&page=${currPage}&type=${type.length === 2 ? type = '' : type}&y=${year}&apikey=${API_KEY}`)
      .then(resp => resp)
      .then(resp => resp.json())
      .then(response => {
        if (response.Response === 'False') { //если нет ответа
          setError(response.Error) //записать в обьект ошибки ошибку
        } else {
          if (searchParam === 's') {
            setState(response.Search)
            setTotalResults(response.totalResults)
          }
          if (searchParam === 'i') {
            setState(response)
          }
        }
        setLoading(false)
        setDetailRequest(false); //для модалки
      }).catch(({ message }) => {
        setLoading(false);
        setError(message);
      })
  }

  /* const doFirstRequest = (genre = ['movie', 'series']) => {
    const themes = ['love', 'hate', 'sex', 'live', 'death', 'sad', 'earth', 'moon', 'sun', 'war', 'rage']
    const randomTheme = themes[Math.floor(Math.random() * themes.length)]
    const randomPage = Math.floor(Math.random() * (9 - 1) + 1)
    return getDataRequest('s', randomTheme, setMovie, randomPage, genre, yearValue)
    console.log(movie.split(10))
    setMovie(movie)
} */

  const data = { movie, getDataRequest, favList, setFav, watchList, setWatch, genreList, setGenreList, yearValue, setYearValue, currPage, setCurrPage, totalResults, setTotalResults, setActivateModal, setShowDetail, setDetailRequest }

  let location = useLocation();
  let match = useRouteMatch()

  console.log(location)
  console.log(match)


  useEffect(() => {
    setLoading(true); //ждём
    setError(null); //обнуление ошибки перед новым запросом
    setTotalResults(null); //обнуление кол-ва фильмов от сервера
    setMovie(null); //обнуление обьекта данных перед новым запросом
    getDataRequest('s', q, setMovie, currPage, genreList, yearValue); //запрос на сервер со своими параметрами
    //doFirstRequest()
    //pseudoRandomMovies()
  }, [q, currPage, genreList, yearValue, location]);
  //в кач-ве второго параметра может быть только примитивный обьект. при его изменении будет происходить ререндеринг



  return (
    <MyContext.Provider value={data}>
      <div className='App'>
        <Layout className='Layout'>

          <Sider /* боковая панель */
            collapsible /* сворачивающаяся */
            onCollapse={() => setCollapsedMenu(!collapsedMenu)} >
            <MenuSider  page = {currPage}/>
          </Sider>

          <Layout className='layout'>

            <Header className='header'>
              <SearchBox
                searchHandler={setQuery} /* поиск по введенным параметрам кот сохр в обьект */
                GetData={getDataRequest} //запрос данных с сервера
              />
            </Header>

            <Content>

              {loading && <Loader />} {/* ожидание из стейта и иконка загрузки */}

              {error !== null &&
                <div className='error-row' style={{ margin: '20px 0' }}>
                  <Empty description={error} type='error' />
                </div>
              }

              <FilmsContainer 
                currPage = {currPage}
              />


              <Modal
                title='Details'
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

  )
}

export default App;


