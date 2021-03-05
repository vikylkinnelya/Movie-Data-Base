import React from 'react';
import { BrowserRouter as Route, Switch, Redirect, withRouter, useParams, useLocation, useRouteMatch } from 'react-router-dom';
import MyContext from '../../servises/Context';
import RenderFilmCard from '../render-film-card'

const FilmsContainer = ({page}) => {

    //let location = useLocation();
    

  

    return (
        <MyContext.Consumer>
            { data => {

                const { movie, favList, watchList, getDataRequest, setMovie, yearValue } = data

                const doFirstRequest = (genre = ['movie', 'series']) => {
                    const themes = ['love', 'hate', 'sex', 'live', 'death', 'sad', 'earth', 'moon', 'sun', 'war', 'rage']
                    const randomTheme = themes[Math.floor(Math.random() * themes.length)]
                    const randomPage = Math.floor(Math.random() * (9 - 1) + 1)
                    return getDataRequest('s', randomTheme, setMovie, randomPage, genre, yearValue)
                }

                return (
                    <>
                        <Switch>
                            <Route path='/main/:page'>
                                <RenderFilmCard state={movie} />
                            </Route>
                            <Route path='/favorites/:page'>
                                <RenderFilmCard state={favList} />
                            </Route>
                            <Route path='/to-watch/:page'>
                                <RenderFilmCard state={watchList} />
                            </Route>
                            <Route path='/films/:page'>
                                <RenderFilmCard state={movie} />
                            </Route>
                            <Route path='/serials/:page'>
                                <RenderFilmCard state={movie} />
                            </Route>
                            <Redirect from='/' to='/main/:page' />
                        </Switch>
                    </>
                )
            }}
        </MyContext.Consumer>
    )
}

export default withRouter(FilmsContainer);