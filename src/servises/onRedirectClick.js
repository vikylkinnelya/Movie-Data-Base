import defGenres from './defGenres';
import choseRandomMovie from './choseRandomMovie';

const onRedirectClick = (location, setGenre, history, setQ) => {
    let query = choseRandomMovie()
    setGenre(() => defGenres(location));
    history.push(`/${location}/query=${query}/page=1`)
    setQ(query)
}

export default onRedirectClick

