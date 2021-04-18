import React, { useContext, useState } from 'react';
import { BrowserRouter as Route, Redirect, Switch } from 'react-router-dom';
import StartingPage from '../starting-page';
import MyContext from '../../servises/Context';
import RenderMovieCard from '../render-movie-card';
import defTotalRes from '../../servises/defTotalRes';
import Error from '../error';
import { Row, Pagination } from 'antd';


const MovieContainer = ({ location, urlPage }) => {

    let { movie, setError, favList, watchList, history, q, setQuery, setGenreList, currPage, setCurrPage, totalResults } = useContext(MyContext)

    const [favCurr, setFavCurr] = useState(favList)
    const [watchCurr, setWatchCurr] = useState(watchList)

    const handleClick = (page) => {
        const favWatchLink = `movie-database/${location}/page=${page}`

        if (location === 'favorites') {
            setFavCurr(favList.slice((page - 1) * 10, page * 10))
            history.push(favWatchLink)
        }
        else if (location === 'to-watch') {
            setWatchCurr(watchCurr.slice((page - 1) * 10, page * 10))
            history.push(favWatchLink)
        } else {
            history.push(`movie-database/${location}/query=${q}/page=${page}`)
        }
        setCurrPage(page)
    }

    return (
        <>
            <Row className='cards-row' >
                <Switch>

                    <Redirect exact from='/movie-database' to='/movie-database/start' />
                    <Redirect exact from='/' to='/movie-database/start' />


                    <Route exact path='/movie-database/start'>
                        <StartingPage
                            history={history}
                            setQuery={setQuery}
                            setGenreList={setGenreList}
                            q={q}
                        />
                    </Route>

                    <Route path='/movie-database/main/:q/:page'>
                        <RenderMovieCard state={movie} />
                    </Route>
                    <Route path='/movie-database/movie/:q:page'>
                        <RenderMovieCard state={movie} />
                    </Route>
                    <Route path='/movie-database/series/:page'>
                        <RenderMovieCard state={movie} />
                    </Route>
                    <Route path='/movie-database/favorites/:page'>
                        <RenderMovieCard state={favCurr} />
                    </Route>
                    <Route exact path='/movie-database/to-watch/:page'>
                        <RenderMovieCard state={watchCurr} />
                    </Route>

                    <Route path='/'>
                        <Error
                            error={() => setError("Please enter your query or try random")}
                            setQuery={setQuery}
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