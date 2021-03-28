import './app.css';
import { Layout, Row, Modal, Empty, Pagination, Result } from 'antd';
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
  const [q, setQuery] = useState('');

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
            collapsedMenu={collapsedMenu}
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
              <Result
                icon={<svg width="300" height="300" viewBox="0 0 1158 1158" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M301.499 606H240.9C234.84 606 230.8 610.039 230.8 616.099V656.499C230.8 662.559 234.84 666.598 240.9 666.598H301.499C307.559 666.598 311.599 662.559 311.599 656.499V616.099C311.599 610.039 307.559 606 301.499 606ZM291.4 646.399H250.999V626.199H291.399V646.399H291.4Z" fill="#FFD500" />
                  <path d="M564.099 606H503.499C497.439 606 493.4 610.039 493.4 616.099V656.499C493.4 662.559 497.439 666.598 503.499 666.598H564.099C570.159 666.598 574.199 662.559 574.199 656.499V616.099C574.199 610.039 570.159 606 564.099 606ZM553.998 646.399H513.599V626.199H553.998V646.399Z" fill="#FFD500" />
                  <path d="M665.098 606H604.499C598.439 606 594.399 610.039 594.399 616.099V656.499C594.399 662.559 598.439 666.598 604.499 666.598H665.098C671.158 666.598 675.198 662.559 675.198 656.499V616.099C675.198 610.039 671.158 606 665.098 606ZM654.999 646.399H614.599V626.199H654.999V646.399Z" fill="#FFD500" />
                  <path d="M301.499 242.401H240.9C234.84 242.401 230.8 246.44 230.8 252.5V292.9C230.8 298.96 234.84 302.999 240.9 302.999H301.499C307.559 302.999 311.599 298.96 311.599 292.9V252.5C311.599 246.44 307.559 242.401 301.499 242.401ZM291.4 282.8H250.999V262.601H291.399V282.8H291.4Z" fill="#FFD500" />
                  <path d="M564.099 242.401H503.499C497.439 242.401 493.4 246.44 493.4 252.5V292.9C493.4 298.96 497.439 302.999 503.499 302.999H564.099C570.159 302.999 574.199 298.96 574.199 292.9V252.5C574.199 246.44 570.159 242.401 564.099 242.401ZM553.998 282.8H513.599V262.601H553.998V282.8Z" fill="#FFD500" />
                  <path d="M665.098 242.401H604.499C598.439 242.401 594.399 246.44 594.399 252.5V292.9C594.399 298.96 598.439 302.999 604.499 302.999H665.098C671.158 302.999 675.198 298.96 675.198 292.9V252.5C675.198 246.44 671.158 242.401 665.098 242.401ZM654.999 282.8H614.599V262.601H654.999V282.8Z" fill="#FFD500" />
                  <path d="M396.439 636.299L449.969 582.769C454.009 578.73 454.009 572.67 449.969 568.629L396.439 515.1L449.969 461.57C454.009 457.53 454.009 451.47 449.969 447.429L396.439 393.9L449.969 340.37C454.009 336.33 454.009 330.27 449.969 326.23L396.439 272.701L409.568 259.571C409.568 259.571 409.568 259.571 409.57 259.57L449.969 219.17C452.999 216.14 454.009 212.101 451.989 208.06C450.98 204.02 446.939 202 442.899 202H180.3C163.13 202.001 150 215.131 150 232.301V252.501V292.901V616.1V656.5V676.7C150 693.87 163.13 707 180.3 707H442.899C446.939 707 450.98 704.98 451.989 700.94C454.01 696.9 452.999 692.86 449.969 689.83L396.439 636.299ZM378.259 646.399H351.999V626.199H378.259L375.229 629.229C371.189 633.268 371.189 639.328 375.229 643.369L378.259 646.399ZM378.259 282.8H351.999V262.601H378.259L375.229 265.631C374.471 266.388 373.856 267.217 373.382 268.09C372.593 269.545 372.199 271.123 372.199 272.702C372.199 274.281 372.593 275.858 373.382 277.313C373.856 278.185 374.471 279.015 375.229 279.773L378.259 282.8ZM170.2 262.601H190.401V282.801H170.2V262.601ZM170.2 626.2H190.401V646.4H170.2V626.2ZM180.3 686.8C174.24 686.8 170.2 682.76 170.2 676.7V666.599H200.5C206.56 666.599 210.6 662.56 210.6 656.5V616.1C210.6 610.04 206.56 606.001 200.5 606.001H170.2V303H200.5C206.56 303 210.6 298.961 210.6 292.901V252.5C210.6 246.44 206.56 242.401 200.5 242.401H170.2V232.301C170.2 226.241 174.24 222.202 180.3 222.202H418.66L398.459 242.401H341.899C335.839 242.401 331.799 246.44 331.799 252.5V292.9C331.799 298.96 335.839 302.999 341.899 302.999H398.459L428.759 333.299L375.229 386.829C371.189 390.869 371.189 396.929 375.229 400.97L428.759 454.5L375.229 508.03C371.189 512.07 371.189 518.13 375.229 522.171L428.759 575.7L398.459 605.999H341.899C335.839 605.999 331.799 610.039 331.799 616.099V656.499C331.799 662.559 335.839 666.598 341.899 666.598H398.459L418.66 686.798H180.3V686.8Z" fill="#FFD500" />
                  <path d="M725.698 202.001H503.499C500.469 202.001 498.449 203.011 496.43 205.031L435.83 265.631C431.79 269.671 431.79 275.731 435.83 279.771L489.359 333.3L435.829 386.831C431.789 390.87 431.789 396.93 435.829 400.971L489.359 454.5L435.829 508.03C431.789 512.07 431.789 518.13 435.829 522.171L489.359 575.7L435.829 629.23C431.789 633.269 431.789 639.329 435.829 643.37L496.429 703.97C498.449 705.99 500.468 707 503.498 707H725.698C742.869 707 755.998 693.87 755.998 676.7V656.5V616.1V292.901V252.5V232.301C755.998 215.131 742.869 202.001 725.698 202.001ZM735.798 282.8H715.597V262.601H735.798V282.8ZM725.698 686.8H507.539L457.039 636.299L510.569 582.769C514.608 578.73 514.608 572.67 510.569 568.629L457.039 515.1L510.569 461.57C514.608 457.53 514.608 451.47 510.569 447.429L457.039 393.9L510.569 340.37C514.608 336.33 514.608 330.27 510.569 326.23L457.039 272.701L507.539 222.2H725.698C731.758 222.2 735.798 226.24 735.798 232.3V242.401H705.498C699.438 242.401 695.398 246.44 695.398 252.5V292.9C695.398 298.96 699.438 302.999 705.498 302.999H735.798V605.998H705.498C699.438 605.998 695.398 610.038 695.398 616.098V656.497C695.398 662.557 699.438 666.597 705.498 666.597H735.798V676.697C735.798 682.759 731.758 686.8 725.698 686.8ZM735.798 646.399H715.597V626.199H735.798V646.399Z" fill="#FFD500" />
                  <circle cx="454" cy="454" r="443" fill="white" fill-opacity="0.13" />
                  <path d="M1142 1052.54L808.101 718.637C863.526 644.674 896.785 553.206 896.785 453.893C896.785 209.669 698.116 11 453.893 11C209.669 11 11 209.669 11 453.893C11 698.116 209.669 896.785 453.893 896.785C553.206 896.785 644.674 863.526 718.637 808.101L1052.54 1142L1142 1052.54ZM53.1802 453.893C53.1802 232.931 232.931 53.1802 453.893 53.1802C674.854 53.1802 854.605 232.931 854.605 453.893C854.605 674.854 674.854 854.605 453.893 854.605C232.931 854.605 53.1802 674.854 53.1802 453.893ZM761.112 772.206C764.866 768.578 768.557 764.888 772.185 761.133C775.264 757.949 778.596 755.017 781.57 751.748L1082.36 1052.54L1052.51 1082.38L751.748 781.57C755.017 778.596 757.928 775.264 761.112 772.206Z" fill="black" fill-opacity="0.8" />
                  <path d="M1145.89 1056.42L1149.78 1052.54L1145.89 1048.65L815.344 718.102C869.737 643.921 902.285 552.749 902.285 453.893C902.285 206.631 701.154 5.5 453.893 5.5C206.631 5.5 5.5 206.631 5.5 453.893C5.5 701.154 206.631 902.285 453.893 902.285C552.749 902.285 643.921 869.737 718.102 815.344L1048.65 1145.89L1052.54 1149.78L1056.42 1145.89L1145.89 1056.42ZM764.922 776.173L764.928 776.167L764.934 776.161C768.733 772.49 772.468 768.755 776.139 764.957C777.365 763.688 778.629 762.467 779.971 761.17C780.225 760.924 780.483 760.676 780.743 760.423C781.032 760.144 781.323 759.861 781.617 759.574L1074.58 1052.54L1052.51 1074.6L759.57 781.614C759.856 781.321 760.138 781.03 760.416 780.742C760.627 780.525 760.835 780.309 761.041 780.096C762.374 778.714 763.623 777.42 764.922 776.173ZM58.6802 453.893C58.6802 235.969 235.969 58.6802 453.893 58.6802C671.816 58.6802 849.105 235.969 849.105 453.893C849.105 671.816 671.816 849.105 453.893 849.105C235.969 849.105 58.6802 671.816 58.6802 453.893Z" stroke="#FFD500" stroke-opacity="0.3" stroke-width="11" />
                </svg>}
                status="error"
                title="Submission Failed"
                subTitle={error}
              />
              /* < className='error-row' style={{ margin: '20px 0' }}>
            /* <Empty description={error} type='error' /> */}



            <FilmsContainer />


            <div className='modal-detail' >
              <Modal
                centered
                visible={activateModal}
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


