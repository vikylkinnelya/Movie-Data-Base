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
                  icon={ <svg width="300" height="300" viewBox="0 0 1158 1158" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M309.499 605.999H248.9C242.84 605.999 238.8 610.039 238.8 616.099V656.499C238.8 662.558 242.84 666.598 248.9 666.598H309.499C315.559 666.598 319.599 662.558 319.599 656.499V616.099C319.599 610.039 315.559 605.999 309.499 605.999ZM299.4 646.399H258.999V626.199H299.399V646.399H299.4Z" fill="black"/>
                  <path d="M572.099 605.999H511.499C505.439 605.999 501.4 610.039 501.4 616.099V656.499C501.4 662.558 505.439 666.598 511.499 666.598H572.099C578.159 666.598 582.199 662.558 582.199 656.499V616.099C582.199 610.039 578.159 605.999 572.099 605.999ZM561.998 646.399H521.599V626.199H561.998V646.399V646.399Z" fill="black"/>
                  <path d="M673.098 605.999H612.499C606.439 605.999 602.399 610.039 602.399 616.099V656.499C602.399 662.558 606.439 666.598 612.499 666.598H673.098C679.158 666.598 683.198 662.558 683.198 656.499V616.099C683.198 610.039 679.158 605.999 673.098 605.999ZM662.999 646.399H622.599V626.199H662.999V646.399Z" fill="black"/>
                  <path d="M309.499 242.401H248.9C242.84 242.401 238.8 246.44 238.8 252.5V292.9C238.8 298.96 242.84 302.999 248.9 302.999H309.499C315.559 302.999 319.599 298.96 319.599 292.9V252.5C319.599 246.44 315.559 242.401 309.499 242.401ZM299.4 282.8H258.999V262.601H299.399V282.8H299.4Z" fill="black"/>
                  <path d="M572.099 242.401H511.499C505.439 242.401 501.4 246.44 501.4 252.5V292.9C501.4 298.96 505.439 302.999 511.499 302.999H572.099C578.159 302.999 582.199 298.96 582.199 292.9V252.5C582.199 246.44 578.159 242.401 572.099 242.401ZM561.998 282.8H521.599V262.601H561.998V282.8V282.8Z" fill="black"/>
                  <path d="M673.098 242.401H612.499C606.439 242.401 602.399 246.44 602.399 252.5V292.9C602.399 298.96 606.439 302.999 612.499 302.999H673.098C679.158 302.999 683.198 298.96 683.198 292.9V252.5C683.198 246.44 679.158 242.401 673.098 242.401ZM662.999 282.8H622.599V262.601H662.999V282.8Z" fill="black"/>
                  <path d="M404.439 636.299L457.969 582.769C462.009 578.73 462.009 572.67 457.969 568.629L404.439 515.1L457.969 461.57C462.009 457.53 462.009 451.47 457.969 447.429L404.439 393.9L457.969 340.37C462.009 336.33 462.009 330.27 457.969 326.23L404.439 272.701L417.568 259.571C417.568 259.571 417.568 259.571 417.57 259.57L457.969 219.17C460.999 216.14 462.009 212.101 459.989 208.06C458.98 204.02 454.939 202 450.899 202H188.3C171.13 202.001 158 215.131 158 232.301V252.501V292.901V616.1V656.5V676.7C158 693.87 171.13 707 188.3 707H450.899C454.939 707 458.98 704.98 459.989 700.94C462.01 696.9 460.999 692.86 457.969 689.83L404.439 636.299ZM386.259 646.399H359.999V626.199H386.259L383.229 629.229C379.189 633.268 379.189 639.328 383.229 643.369L386.259 646.399ZM386.259 282.8H359.999V262.601H386.259L383.229 265.631C382.471 266.388 381.856 267.217 381.382 268.09C380.593 269.545 380.199 271.123 380.199 272.702C380.199 274.281 380.593 275.858 381.382 277.313C381.856 278.185 382.471 279.015 383.229 279.773L386.259 282.8ZM178.2 262.601H198.401V282.801H178.2V262.601ZM178.2 626.2H198.401V646.4H178.2V626.2ZM188.3 686.8C182.24 686.8 178.2 682.76 178.2 676.7V666.599H208.5C214.56 666.599 218.6 662.56 218.6 656.5V616.1C218.6 610.04 214.56 606.001 208.5 606.001H178.2V303H208.5C214.56 303 218.6 298.961 218.6 292.901V252.5C218.6 246.44 214.56 242.401 208.5 242.401H178.2V232.301C178.2 226.241 182.24 222.202 188.3 222.202H426.66L406.459 242.401H349.899C343.839 242.401 339.799 246.44 339.799 252.5V292.9C339.799 298.96 343.839 302.999 349.899 302.999H406.459L436.759 333.299L383.229 386.829C379.189 390.869 379.189 396.929 383.229 400.97L436.759 454.5L383.229 508.03C379.189 512.07 379.189 518.13 383.229 522.171L436.759 575.7L406.459 605.999H349.899C343.839 605.999 339.799 610.039 339.799 616.099V656.499C339.799 662.559 343.839 666.598 349.899 666.598H406.459L426.66 686.798H188.3V686.8Z" fill="black"/>
                  <path d="M733.698 202.001H511.499C508.469 202.001 506.449 203.011 504.43 205.031L443.83 265.631C439.79 269.671 439.79 275.731 443.83 279.771L497.359 333.3L443.829 386.831C439.789 390.87 439.789 396.93 443.829 400.971L497.359 454.5L443.829 508.03C439.789 512.07 439.789 518.13 443.829 522.171L497.359 575.7L443.829 629.23C439.789 633.269 439.789 639.329 443.829 643.37L504.429 703.97C506.449 705.99 508.468 707 511.498 707H733.698C750.869 707 763.998 693.87 763.998 676.7V656.5V616.1V292.901V252.5V232.301C763.998 215.131 750.869 202.001 733.698 202.001ZM743.798 282.8H723.597V262.601H743.798V282.8ZM733.698 686.8H515.539L465.039 636.299L518.569 582.769C522.608 578.73 522.608 572.67 518.569 568.629L465.039 515.1L518.569 461.57C522.608 457.53 522.608 451.47 518.569 447.429L465.039 393.9L518.569 340.37C522.608 336.33 522.608 330.27 518.569 326.23L465.039 272.701L515.539 222.2H733.698C739.758 222.2 743.798 226.24 743.798 232.3V242.401H713.498C707.438 242.401 703.398 246.44 703.398 252.5V292.9C703.398 298.96 707.438 302.999 713.498 302.999H743.798V605.998H713.498C707.438 605.998 703.398 610.038 703.398 616.098V656.497C703.398 662.557 707.438 666.597 713.498 666.597H743.798V676.696C743.798 682.759 739.758 686.8 733.698 686.8ZM743.798 646.399H723.597V626.199H743.798V646.399Z" fill="black"/>
                  <path d="M1142 1052.54L808.101 718.637C863.526 644.674 896.785 553.206 896.785 453.893C896.785 209.669 698.116 11 453.893 11C209.669 11 11 209.669 11 453.893C11 698.116 209.669 896.785 453.893 896.785C553.206 896.785 644.674 863.526 718.637 808.101L1052.54 1142L1142 1052.54ZM53.1802 453.893C53.1802 232.931 232.931 53.1802 453.893 53.1802C674.854 53.1802 854.605 232.931 854.605 453.893C854.605 674.854 674.854 854.605 453.893 854.605C232.931 854.605 53.1802 674.854 53.1802 453.893ZM761.112 772.206C764.866 768.578 768.557 764.888 772.185 761.133C775.264 757.949 778.596 755.017 781.57 751.748L1082.36 1052.54L1052.51 1082.38L751.748 781.57C755.017 778.596 757.928 775.264 761.112 772.206Z" fill="black" fill-opacity="1"/>
                  <path d="M1145.89 1056.42L1149.78 1052.54L1145.89 1048.65L815.344 718.102C869.737 643.921 902.285 552.749 902.285 453.893C902.285 206.631 701.154 5.5 453.893 5.5C206.631 5.5 5.5 206.631 5.5 453.893C5.5 701.154 206.631 902.285 453.893 902.285C552.749 902.285 643.921 869.737 718.102 815.344L1048.65 1145.89L1052.54 1149.78L1056.42 1145.89L1145.89 1056.42ZM764.922 776.173L764.928 776.167L764.934 776.161C768.733 772.49 772.468 768.755 776.139 764.957C777.365 763.688 778.63 762.466 779.971 761.17C780.226 760.924 780.483 760.675 780.743 760.423C781.032 760.144 781.324 759.861 781.617 759.574L1074.58 1052.54L1052.51 1074.6L759.57 781.614C759.856 781.321 760.138 781.03 760.416 780.742C760.626 780.525 760.834 780.31 761.04 780.097C762.374 778.715 763.623 777.42 764.922 776.173ZM58.6802 453.893C58.6802 235.969 235.969 58.6802 453.893 58.6802C671.816 58.6802 849.105 235.969 849.105 453.893C849.105 671.816 671.816 849.105 453.893 849.105C235.969 849.105 58.6802 671.816 58.6802 453.893Z" stroke="#FFD500" stroke-opacity="0.1" stroke-width="50"/>
                  </svg>
                   }
                  status="error"
                  title="Submission Failed"
                  subTitle={error}
                />
              /* < className='error-row' style={{ margin: '20px 0' }}>
            /* <Empty description={error} type='error' /> */}



            <FilmsContainer />


            <div className='modal-detail' >
              <Modal
                title={detail.Title}
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
    </MyContext.Provider >

  )
}

export default withRouter(App);


