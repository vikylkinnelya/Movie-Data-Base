import React, { useContext } from 'react';
import { BrowserRouter as Route, Redirect, Switch } from 'react-router-dom';
import StartingPage from '../starting-page';
import MyContext from '../../servises/Context';
import RenderFilmCard from '../render-film-card'

import { Row } from 'antd';


const FilmsContainer = () => {

    let { movie, favList, watchList, history, q, setQuery, setGenreList } = useContext(MyContext)

    console.log()

    return (

        <Row className='cards-row' >
            <Switch>

                <Route exact path='/'>
                    <StartingPage
                        history={history}
                        setQ={setQuery}
                        setGenre={setGenreList}
                        q={q}
                    />
                </Route>

                <Redirect exact from='/main' to='/main/1' />
                
                <Route path='/main/:page'>
                    <RenderFilmCard state={movie} />
                </Route>
                <Route path='/favorites/:page'>
                    <RenderFilmCard state={favList} />
                </Route>
                <Route exact path='/to-watch/:page'>
                    <RenderFilmCard state={watchList} />
                </Route>
                <Route path='/films/:page'>
                    <RenderFilmCard state={movie} />
                </Route>
                <Route path='/serials/:page'>
                    <RenderFilmCard state={movie} />
                </Route>

            </Switch>
        </Row>
    )
}

export default FilmsContainer;