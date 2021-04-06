import defGenres from './defGenres';
import choseRandomMovie from './choseRandomMovie';

const onRedirectClick = (loc, setGenre, history, setQ) => {
    let query = choseRandomMovie()
    setGenre(() => defGenres(loc));
    history.push(`/${loc}/query=${query}/page=1`)
    setQ(query)
}

export default onRedirectClick

