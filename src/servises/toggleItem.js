const toggleItem = (item, state, setState, name) => {
    let newList
    if (state.includes(item)) {
      newList = state.filter(elem => elem.imdbID !== item.imdbID)
      localStorage.removeItem(name + '_' + item.imdbID)
      //в новый список попадают все кроме выбранного на удаление
    }
    if (!state.includes(item)) {
      newList = [...state, item]; //новый список сост из старых эл и нового выбранного
      localStorage.setItem(name + '_' + item.imdbID, JSON.stringify(item))
    }
    setState(newList) //перезаписываем обьект списка избранных
}

export default toggleItem;