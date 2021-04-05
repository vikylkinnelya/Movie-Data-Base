const randomMovie = () => {
    const themes = ['love', 'hate', 'sex', 'live', 'death', 'sad', 'earth', 'moon', 'sun', 'war', 'rage']
    return themes[Math.floor(Math.random() * themes.length)]
}

export default randomMovie