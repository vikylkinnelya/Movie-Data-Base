import './app.css';
import { Layout, Row, Modal, Empty, Pagination } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useHistory, withRouter } from 'react-router-dom';
import MyContext from '../../servises/Context';
import Loader from '../loader';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import FilmsContainer from '../films-container';
import getDataRequest from '../../servises/getDataRequest';
import defTotalRes from '../../servises/defTotalRes';
import getFromLocalStorage from '../../servises/getFromLocalStorage';
import MovieDetail from '../movie-detail';
import defGenres from '../../servises/defGenres';

const { Header, Content, Footer, Sider } = Layout;
//const API_KEY = 'eb9d8a81';
//const API_KEY = 'a6a004a3'

function App() {

  const history = useHistory()
  let location = useLocation().pathname.split('/')[1];
  let urlPage = useLocation().pathname.split('/')[2];

  const [movie, setMovie] = useState(null); //обьект ответа от сервера
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState();

  const [activateModal, setActivateModal] = useState(false);
  const [detail, setShowDetail] = useState(false); //детали фильма
  const [detailRequest, setDetailRequest] = useState(false); //ответ от сервера

  const [favList, setFav] = useState(() => { return getFromLocalStorage('fav') });
  //const [favId, setFavId] = useState(() => { return getFromLocalStorage('favList') })

  const [watchList, setWatch] = useState(() => { return getFromLocalStorage('watch') });
  //const [watchId, setWatchId] = useState(() => { return getFromLocalStorage('watchList') })

  const [collapsedMenu, setCollapsedMenu] = useState(false);

  const [currPage, setCurrPage] = useState(urlPage || 1) //стр в pagination
  const [totalResults, setTotalResults] = useState(null); //кол-во ответов от сервера на  q

  const [genreList, setGenreList] = useState(() => { return defGenres(location) }); //filter menu
  const [yearValue, setYearValue] = useState(null)

  /* const getData = useCallback(() => {
    getDataRequest('s', q, setMovie, currPage, genreList, yearValue, setError, setTotalResults, setLoading, setDetailRequest);
  }, [q, currPage, genreList, yearValue]) */

  const data = { movie, setMovie, favList, setFav, watchList, setWatch, genreList, setGenreList, yearValue, setYearValue, currPage, setCurrPage, totalResults, setTotalResults, setActivateModal, detail, setShowDetail, detailRequest, setDetailRequest, setError, loading, setLoading, q, setQuery, history }

  /* useEffect(() => {
    setLoading(true);
    setError(null);
    setMovie(null)
    setTotalResults(null)
    getData()
  }, [getData]);
  //в кач-ве второго параметра может быть только примитивный обьект
  //при его изменении будет происходить ререндеринг
 */
  const onPageChange = (page) => { //при изменении стр в pagination
    setCurrPage(page)
    history.push(`/${location}/${page}`) //изменяется url на тек локацию и стр
  }

  return (
    <MyContext.Provider value={data}>
      <Layout>

        <Sider
          breakpoint="lg"
          collapsible={true}
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
                  (<MovieDetail {...detail} />) : (<Loader />)}
              </Modal>
            </div>


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
    </MyContext.Provider>

  )
}

export default withRouter(App);


