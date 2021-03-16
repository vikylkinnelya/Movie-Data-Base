const getFromLocalStorage = (state) => {
    let stateList = []
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i)
        key.includes(state) && stateList.push(JSON.parse(localStorage.getItem(key)))
    }
    return stateList
}

export default getFromLocalStorage;