import './app.css';
import { Layout, Row, Modal, Empty, Pagination, Result } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useHistory, withRouter } from 'react-router-dom';
import MyContext from '../../servises/Context';
import Loader from '../loader';
import SearchBox from '../search-box';
import MenuSider from '../menu-sider';
import MovieContainer from '../movie-container';
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

  let queryStr = useLocation().pathname.split('/')[2]
  let query = queryStr !== undefined && queryStr.split('=')[1]

  let urlPageStr = useLocation().pathname.split('/')[3]
  let urlPage = urlPageStr !== undefined && urlPageStr.split('=')[1]

  const [movie, setMovie] = useState(null); //обьект ответа от сервера
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQuery] = useState(query);

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
 }, [q, currPage, genreList, yearValue])  */

  const data = { movie, setMovie, favList, setFav, watchList, setWatch, genreList, setGenreList, yearValue, setYearValue, currPage, setCurrPage, totalResults, setTotalResults, setActivateModal, detail, setShowDetail, detailRequest, setDetailRequest, setError, loading, setLoading, q, setQuery, history }

  /* useEffect(() => {
    setLoading(true);
    setError(null);
    setMovie(null)
    setTotalResults(null)
    getData()
  }, [getData]); */
  //в кач-ве второго параметра может быть только примитивный обьект
  //при его изменении будет происходить ререндеринг

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
            collapsedMenu={collapsedMenu}
            loc={location}
          />
        </Sider>

        <Layout className='layout'>

          <Header className='header'>
            <SearchBox
              history={history} />
          </Header>

          <Content>

            {loading && <Loader />}

            {error !== null &&
              <Result
                icon={<svg width="300" height="300" viewBox="0 0 664 663" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M170.543 348.729H135.035C131.484 348.729 129.117 351.096 129.117 354.646V378.318C129.117 381.869 131.484 384.236 135.035 384.236H170.543C174.093 384.236 176.46 381.869 176.46 378.318V354.646C176.46 351.096 174.093 348.729 170.543 348.729ZM164.625 372.4H140.953V360.564H164.624V372.4H164.625Z" fill="#FFD500" />
                  <path d="M324.41 348.729H288.902C285.351 348.729 282.984 351.096 282.984 354.646V378.318C282.984 381.869 285.351 384.236 288.902 384.236H324.41C327.96 384.236 330.327 381.869 330.327 378.318V354.646C330.327 351.096 327.96 348.729 324.41 348.729ZM318.491 372.4H294.82V360.564H318.491V372.4V372.4Z" fill="#FFD500" />
                  <path d="M383.589 348.729H348.081C344.53 348.729 342.163 351.096 342.163 354.646V378.318C342.163 381.869 344.53 384.236 348.081 384.236H383.589C387.14 384.236 389.507 381.869 389.507 378.318V354.646C389.507 351.096 387.14 348.729 383.589 348.729ZM377.671 372.4H354V360.564H377.671V372.4Z" fill="#FFD500" />
                  <path d="M170.543 135.682H135.035C131.484 135.682 129.117 138.049 129.117 141.6V165.272C129.117 168.822 131.484 171.189 135.035 171.189H170.543C174.093 171.189 176.46 168.822 176.46 165.272V141.6C176.46 138.049 174.093 135.682 170.543 135.682ZM164.625 159.354H140.953V147.519H164.624V159.354H164.625Z" fill="#FFD500" />
                  <path d="M324.41 135.682H288.902C285.351 135.682 282.984 138.049 282.984 141.6V165.272C282.984 168.822 285.351 171.189 288.902 171.189H324.41C327.96 171.189 330.327 168.822 330.327 165.272V141.6C330.327 138.049 327.96 135.682 324.41 135.682ZM318.491 159.354H294.82V147.519H318.491V159.354V159.354Z" fill="#FFD500" />
                  <path d="M383.589 135.682H348.081C344.53 135.682 342.163 138.049 342.163 141.6V165.272C342.163 168.822 344.53 171.189 348.081 171.189H383.589C387.14 171.189 389.507 168.822 389.507 165.272V141.6C389.507 138.049 387.14 135.682 383.589 135.682ZM377.671 159.354H354V147.519H377.671V159.354Z" fill="#FFD500" />
                  <path d="M226.171 366.482L257.537 335.117C259.903 332.75 259.903 329.199 257.537 326.832L226.171 295.467L257.537 264.102C259.903 261.735 259.903 258.184 257.537 255.816L226.171 224.452L257.537 193.086C259.903 190.719 259.903 187.169 257.537 184.801L226.171 153.436L233.864 145.743C233.864 145.743 233.864 145.743 233.865 145.742L257.537 122.071C259.312 120.295 259.903 117.929 258.72 115.561C258.129 113.194 255.761 112.01 253.394 112.01H99.5273C89.4665 112.011 81.7734 119.704 81.7734 129.765V141.601V165.272V354.647V378.319V390.155C81.7734 400.215 89.4665 407.909 99.5273 407.909H253.394C255.761 407.909 258.129 406.725 258.72 404.358C259.904 401.991 259.312 399.623 257.537 397.848L226.171 366.482ZM215.519 372.4H200.132V360.564H215.519L213.743 362.339C211.377 364.706 211.377 368.257 213.743 370.625L215.519 372.4ZM215.519 159.354H200.132V147.519H215.519L213.743 149.294C213.3 149.738 212.939 150.223 212.662 150.735C212.199 151.587 211.968 152.512 211.968 153.437C211.968 154.362 212.199 155.287 212.662 156.139C212.939 156.65 213.3 157.136 213.743 157.58L215.519 159.354ZM93.6096 147.519H105.446V159.355H93.6096V147.519ZM93.6096 360.565H105.446V372.401H93.6096V360.565ZM99.5273 396.072C95.9765 396.072 93.6096 393.705 93.6096 390.155V384.236H111.363C114.914 384.236 117.281 381.869 117.281 378.319V354.647C117.281 351.096 114.914 348.729 111.363 348.729H93.6096V171.19H111.363C114.914 171.19 117.281 168.823 117.281 165.272V141.6C117.281 138.049 114.914 135.682 111.363 135.682H93.6096V129.765C93.6096 126.214 95.9765 123.847 99.5273 123.847H239.191L227.355 135.682H194.214C190.663 135.682 188.297 138.049 188.297 141.6V165.272C188.297 168.822 190.663 171.189 194.214 171.189H227.355L245.109 188.943L213.743 220.309C211.377 222.676 211.377 226.226 213.743 228.594L245.109 259.959L213.743 291.325C211.377 293.692 211.377 297.242 213.743 299.61L245.109 330.975L227.355 348.729H194.214C190.663 348.729 188.297 351.096 188.297 354.646V378.318C188.297 381.869 190.663 384.236 194.214 384.236H227.355L239.191 396.072H99.5273V396.072Z" fill="#FFD500" />
                  <path d="M419.097 112.011H288.902C287.127 112.011 285.943 112.602 284.76 113.786L249.252 149.294C246.885 151.661 246.885 155.212 249.252 157.579L280.617 188.944L249.251 220.309C246.884 222.676 246.884 226.227 249.251 228.595L280.617 259.959L249.251 291.325C246.884 293.692 246.884 297.242 249.251 299.61L280.617 330.975L249.251 362.34C246.884 364.707 246.884 368.258 249.251 370.625L284.759 406.133C285.943 407.317 287.126 407.909 288.901 407.909H419.097C429.157 407.909 436.85 400.215 436.85 390.155V378.319V354.647V165.272V141.6V129.765C436.85 119.704 429.157 112.011 419.097 112.011ZM425.014 159.354H413.178V147.519H425.014V159.354ZM419.097 396.072H291.269L261.679 366.482L293.044 335.117C295.411 332.75 295.411 329.199 293.044 326.832L261.679 295.467L293.044 264.102C295.411 261.735 295.411 258.184 293.044 255.816L261.679 224.452L293.044 193.086C295.411 190.719 295.411 187.169 293.044 184.801L261.679 153.436L291.269 123.846H419.097C422.647 123.846 425.014 126.213 425.014 129.764V135.682H407.26C403.71 135.682 401.343 138.049 401.343 141.6V165.272C401.343 168.822 403.71 171.189 407.26 171.189H425.014V348.728H407.26C403.71 348.728 401.343 351.095 401.343 354.646V378.317C401.343 381.868 403.71 384.235 407.26 384.235H425.014V390.153C425.014 393.705 422.647 396.072 419.097 396.072ZM425.014 372.4H413.178V360.564H425.014V372.4Z" fill="#FFD500" />
                  <path d="M663.023 610.371L467.38 414.727C499.855 371.389 519.343 317.795 519.343 259.603C519.343 116.504 402.935 0.0960693 259.836 0.0960693C116.736 0.0960693 0.328125 116.504 0.328125 259.603C0.328125 402.703 116.736 519.111 259.836 519.111C318.027 519.111 371.621 499.623 414.959 467.148L610.603 662.791L663.023 610.371ZM25.0431 259.603C25.0431 130.134 130.366 24.8111 259.836 24.8111C389.305 24.8111 494.628 130.134 494.628 259.603C494.628 389.073 389.305 494.396 259.836 494.396C130.366 494.396 25.0431 389.073 25.0431 259.603ZM439.847 446.115C442.047 443.99 444.209 441.827 446.335 439.627C448.139 437.761 450.091 436.044 451.834 434.128L628.076 610.371L610.591 627.857L434.36 451.602C436.276 449.859 437.981 447.907 439.847 446.115Z" fill="black" fill-opacity="0.8" />
                </svg>}
                status="error"
                title="Submission Failed"
                subTitle={error}
              />
              /* < className='error-row' style={{ margin: '20px 0' }}>
            /* <Empty description={error} type='error' /> */}



            <MovieContainer />


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


          <Footer>
            footer
              </Footer>

        </Layout>
      </Layout>
    </MyContext.Provider >

  )
}

export default withRouter(App);


