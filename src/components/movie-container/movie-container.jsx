import React, { useContext, useEffect, useState } from 'react';
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
    const [watchCurr, setWatchCurr] = useState(favList)

    const handleClick = (page) => {
        setCurrPage(page)
        if (location === 'favorites') {
            setFavCurr(favList.slice((page - 1) * 10, page * 10))
            history.push(`/${location}/page=${page}`)
        }
        else if (location === 'favorites') {
            setWatchCurr(watchCurr.slice((page - 1) * 10, page * 10))
            history.push(`/${location}/page=${page}`)
        } else {
            history.push(`/${location}/query=${q}/page=${page}`)
        }







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
                        <RenderMovieCard state={favCurr} />
                    </Route>
                    <Route exact path='/to-watch/:page'>
                        <RenderMovieCard state={watchCurr} />
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