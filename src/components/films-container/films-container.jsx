import React, { useContext } from 'react';
import { BrowserRouter as Route, Switch, Redirect } from 'react-router-dom';
import MyContext from '../../servises/Context';
import getDataRequest from '../../servises/getDataRequest';
import RenderFilmCard from '../render-film-card'
import RenderIdCard from '../renderIdCard'
import { Row } from 'antd';


const FilmsContainer = () => {

    let { movie, favList, setFav, favId, setFavId, watchList, currPage, genreList, yearValue, setError, setTotalResults, setLoading, setDetailRequest } = useContext(MyContext)


    return (

        <Row className='cards-row' >
            <Switch>
                <Route path='/main/:page'>
                    <RenderFilmCard state={movie} />
                </Route>
                <Route path='/favorites/:page'>
                    <RenderIdCard 
                    state={favId} 
                    renderState= {favList}
                    setRenderState = {setFav}
                    />
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