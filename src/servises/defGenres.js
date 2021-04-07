const defGenres = (location) => {
    if (location === 'movie') {
        return (['movie'])
    }
    else if (location === 'series') {
        return (['series'])
    } else {
        return (['movie', 'series'])
    }
}

export default defGenres;