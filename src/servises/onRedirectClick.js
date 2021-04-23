import defGenres from './defGenres';
import choseRandomMovie from './choseRandomMovie';

const onRedirectClick = (location, setGenreList, history, setQuery) => {
    let query = choseRandomMovie()
    setQuery(query)
    setGenreList(() => defGenres(location));
    history.push(`/${location}/query=${query}/page=1`) 
}

export default onRedirectClick