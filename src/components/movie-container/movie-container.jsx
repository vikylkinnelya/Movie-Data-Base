import React, { Suspense, useContext, useState } from 'react';
import { BrowserRouter as Route, Redirect, Switch } from 'react-router-dom';
import StartingPage from '../starting-page';
import MyContext from '../../servises/Context';
import defTotalRes from '../../servises/defTotalRes';
import Loader from '../loader';
import Error from '../error';
import { Row } from 'antd';
import { Pagination } from 'antd';

const RenderMovieCard = React.lazy(() => import('../render-movie-card'))

const MovieContainer = ({ location, urlPage }) => {

    let { movie, setError, favList, watchList, history, q, setQuery, setGenreList, currPage, setCurrPage, totalResults } = useContext(MyContext)

    const [favCurr, setFavCurr] = useState(favList)
    const [watchCurr, setWatchCurr] = useState(watchList)

    const handleClick = (page) => {
        const favWatchLink = `/${location}/page=${page}`

        if (location === 'favorites') {
            setFavCurr(favList.slice((page - 1) * 10, page * 10))
            history.push(favWatchLink)
        }
        else if (location === 'to-watch') {
            setWatchCurr(watchCurr.slice((page - 1) * 10, page * 10))
            history.push(favWatchLink)
        } else {
            history.push(`/${location}/query=${q}/page=${page}`)
        }
        setCurrPage(page)
    }

    return (
        <>
            <Row className='cards-row' >
                <Suspense fallback={<Loader />}>
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
                            <RenderMovieCard state={favCurr} />
                        </Route>
                        <Route exact path='/to-watch/:page'>
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
                </Suspense>
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