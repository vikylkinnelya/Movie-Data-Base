import React, { useContext, useEffect, useState } from 'react';
import getDataRequest from '../../servises/getDataRequest'
import MyContext from '../../servises/Context';
import RenderFilmCard from '../render-film-card/render-film-card'


const RenderIdCard = ({state, renderState, setRenderState}) => {

    const { setLoading, setError, setTotalResults, setDetailRequest, favList, watchList, watchId, genreList, yearValue, currPage } = useContext(MyContext)

    const [termState, setTerm] = useState([])

    let termList = []

    state !== null && state.length > 0 && state.map(el => {
        getDataRequest('i', el, setTerm, currPage, genreList, yearValue, setError, setTotalResults, setLoading, setDetailRequest)
        termList = [...renderState, termState]
        
    })

    setRenderState(termList)

    return (
        {
            
        }
        
        
        
        <RenderFilmCard state={renderState} />
    )




}

export default RenderIdCard