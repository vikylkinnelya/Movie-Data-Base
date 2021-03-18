import React, { useContext } from 'react';
import { BrowserRouter as Route, Switch, Redirect } from 'react-router-dom';
import MyContext from '../../servises/Context';
import RenderFilmCard from '../render-film-card'
import { Row } from 'antd';


const FilmsContainer = () => {

    let { movie, favList, watchList } = useContext(MyContext)

    return (

        <Row className='cards-row' >
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
                <Redirect from='/' to='/main/1' />
            </Switch>
        </Row>
    )
}

export default FilmsContainer;