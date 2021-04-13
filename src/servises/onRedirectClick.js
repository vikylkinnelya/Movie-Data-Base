import defGenres from './defGenres';
import choseRandomMovie from './choseRandomMovie';

const onRedirectClick = (location, setGenreList, history, setQ) => {
    let query = choseRandomMovie()
    setGenreList(() => defGenres(location));
    history.push(`/${location}/query=${query}/page=1`)
    setQ(query)
}

export default onRedirectClick

