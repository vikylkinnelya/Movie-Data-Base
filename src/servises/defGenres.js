const defGenres = (location) => {
    if (location === 'films') {
        return (['movie'])
    }
    else if (location === 'serials') {
        return (['series'])
    } else {
        return (['movie', 'series'])
    }
}

export default defGenres;