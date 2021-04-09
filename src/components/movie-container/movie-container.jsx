import React, { useContext } from 'react';
import { BrowserRouter as Route, Redirect, Switch } from 'react-router-dom';
import StartingPage from '../starting-page';
import MyContext from '../../servises/Context';
import RenderMovieCard from '../render-movie-card';
import RedirectPage from '../redirect-page';
import { Row } from 'antd';


const MovieContainer = () => {

    let { movie, favList, watchList, history, q, setQuery, setGenreList } = useContext(MyContext)

    return (

        <Row className='cards-row' >
            <Switch>
                <Redirect exact from='/' to='/start'/>

                <Route exact path='/start'>
                    <StartingPage
                        history={history}
                        setQ={setQuery}
                        setGenre={setGenreList}
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
                    <RenderMovieCard state={favList} />
                </Route>
                <Route exact path='/to-watch/:page'>
                    <RenderMovieCard state={watchList} />
                </Route>

                <Route path='/'>
                    <RedirectPage
                        setQ={setQuery}
                        setGenre={setGenreList}
                        location={'main'}
                        history={history}
                    />
                </Route>
                
            </Switch>
        </Row>
    )
}

export default MovieContainer;