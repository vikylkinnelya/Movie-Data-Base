const toggleItem = (item, state, setState) => {
    let newList
    if (state.includes(item)) {
      newList = state.filter(elem => elem.imdbID !== item.imdbID)
      //в новый список попадают все кроме выбранного на удаление
    }
    if (!state.includes(item)) {
      newList = [...state, item]; //новый список сост из старых эл и нового выбранного
    }
    setState(newList) //перезаписываем обьект списка избранных
}

export default toggleItem;