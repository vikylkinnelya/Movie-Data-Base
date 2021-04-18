import './app.css';
import { Layout, Modal } from 'antd';
import React, { useState } from 'react';
import { useLocation, useHistory, withRouter } from 'react-router-dom';
import MyContext from '../../servises/Context';
import Loader from '../loader';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import MovieContainer from '../movie-container';
import Error from '../error';
import MovieDetail from '../movie-detail';
import getFromLocalStorage from '../../servises/getFromLocalStorage';
import defGenres from '../../servises/defGenres';

const { Header, Content, Footer, Sider } = Layout;
//const API_KEY = 'eb9d8a81';
//const API_KEY = 'a6a004a3'

function App() {

  const history = useHistory()
  let location = useLocation().pathname.split('/')[2];

  let queryStr = useLocation().pathname.split('/')[3]
  let query = queryStr !== undefined && queryStr.split('=')[1]

  let urlPageStr = useLocation().pathname.split('/')[4]
  let urlPage = urlPageStr !== undefined && urlPageStr.split('=')[1]

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState(query);

  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false);
  const [detailRequest, setDetailRequest] = useState(false); //ответ от сервера

  const [favList, setFav] = useState(() => { return getFromLocalStorage('fav') });
  const [watchList, setWatch] = useState(() => { return getFromLocalStorage('watch') });

  const [collapsedMenu, setCollapsedMenu] = useState(false);

  const [currPage, setCurrPage] = useState(urlPage || 1) //стр в pagination
  const [totalResults, setTotalResults] = useState(null);

  const [genreList, setGenreList] = useState(() => { return defGenres(location) });
  const [yearValue, setYearValue] = useState(null)

  const data = { movie, error, setError, watchList, favList, setWatch, setFav, history, location, q, setQuery, setGenreList, setMovie, setLoading, setTotalResults, setActivateModal, setDetailRequest, setShowDetail, setCurrPage, genreList, yearValue, currPage, totalResults }

  return (

    <Layout>

      <Sider
        breakpoint="lg"
        collapsible={true}
        onCollapse={() => setCollapsedMenu(!collapsedMenu)} >

        <MenuSider
          collapsedMenu={collapsedMenu}
          location={location}
          q={q}
          setQuery={setQuery}
          setGenreList={setGenreList}
          setCurrPage={setCurrPage}
        />
      </Sider>

      <Layout className='layout'>

        <Header className='header'>
          <SearchBox
            history={history}
            location={location}
            q={q}
            currPage={currPage}
            setQuery={setQuery}
            genreList={genreList}
            setGenreList={setGenreList}
            yearValue={yearValue}
            setYearValue={setYearValue}
          />
        </Header>

        <Content>

          {loading && <Loader />}

          {error !== null &&
            <Error
              error={error}
              setError={setError}
              setQuery={setQuery}
              setGenreList={setGenreList}
              location={'main'}
              history={history} />

            /* < className='error-row' style={{ margin: '20px 0' }}>
          /* <Empty description={error} type='error' /> */
          }

          <MyContext.Provider value={data}>
            <MovieContainer
              history={history}
              location={location}
              urlPage={urlPage}
            />
          </MyContext.Provider>

          <div className='modal-detail' >
            <Modal
              centered
              visible={activateModal}
              maskStyle={{ backdropFilter: 'blur(1.0px)' }}
              onCancel={() => { setActivateModal(false); setShowDetail(null) }}
              footer={null}
            >
              {detailRequest === false && detail != null ?
                (<MovieDetail
                  {...detail}
                  isFav={favList.includes(detail) || localStorage.getItem('fav_' + detail.imdbID)}
                  isWatch={watchList.includes(detail) || localStorage.getItem('watch_' + detail.imdbID)} />)
                : (<Loader />)}
            </Modal>
          </div>

        </Content>


        <Footer>
          footer
        </Footer>

      </Layout>
    </Layout>

  )
}

export default withRouter(App);


