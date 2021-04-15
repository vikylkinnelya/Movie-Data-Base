import React, { useContext, useState } from 'react';
import { BrowserRouter as Route, Redirect, Switch } from 'react-router-dom';
import StartingPage from '../starting-page';
import MyContext from '../../servises/Context';
import RenderMovieCard from '../render-movie-card';
import RedirectPage from '../redirect-page';
import defTotalRes from '../../servises/defTotalRes';
import Error from '../error';
import { Row, Pagination } from 'antd';


const MovieContainer = ({ location, urlPage }) => {

    let { movie, setError, favList, watchList, history, q, setQuery, setGenreList, currPage, setCurrPage, totalResults } = useContext(MyContext)


    const onPageChange = (page) => { //при изменении стр в pagination
        setCurrPage(page)
        history.push(`/${location}/query=${q}/page=${page}`) //изменяется url на тек локацию и стр
    }


    const defCurrPageList = (location) => {
        return location === 'favorites' ? favList : watchList
    }

    const [offset, setOffset] = useState(10)
    const [currPageElems, setCurrPageElems] = useState(() => { return defCurrPageList(location).slice(0,10) })

    const setElemForCurrPage = () => {
        const allElems = defCurrPageList(location)
        setCurrPageElems(allElems.slice(offset, offset + 10))
    }

    const handleClick = (page) => {
        setElemForCurrPage()
        setCurrPage(page)
        const curtPage = page - 1
        setOffset(curtPage * 10)
    }

    const onFavWatchPageChange = (page) => {
        history.push(`/${location}/query=${q}/page=${page}`)
    }


    return (
        <>
            <Row className='cards-row' >
                <Switch>

                    <Redirect exact from='/' to='/start' />

                    <Route exact path='/start'>
                        <StartingPage
                            history={history}
                            setQuery={setQuery}
                            setGenreList={setGenreList}
                            q={q}
                        />
                    </Route>

                    <Route path='/main/:q/:page'>
                        <RenderMovieCard state={movie} />
                    </Route>
                    <Route path='/movie/:q:page'>
                        <RenderMovieCard state={movie} />
                    </Route>
                    <Route path='/series/:page'>
                        <RenderMovieCard state={movie} />
                    </Route>
                    <Route path='/favorites/:page'>
                        <RenderMovieCard state={currPageElems} />
                    </Route>
                    <Route exact path='/to-watch/:page'>
                        <RenderMovieCard state={watchList} />
                    </Route>

                    <Route path='/'>
                        <Error
                            error={() => setError("Please enter your query or try random")}

                            setQ={setQuery}
                            setGenreList={setGenreList}
                            location={'main'}
                            history={history}
                        />
                    </Route>

                </Switch>
            </Row>


            <Row>
                {location !== 'start' &&
                    <Pagination
                        current={parseInt(currPage) || parseInt(urlPage)}
                        total={defTotalRes(location, favList, watchList, totalResults)}
                        onChange={page => handleClick(page)}
                        hideOnSinglePage={true}
                        showSizeChanger={false}
                        pageSize={10}
                    />}
            </Row>

        </>
    )
}

export default MovieContainer;