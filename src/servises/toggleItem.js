const toggleItem = (item, stateId, setStateId, name) => {

  let newIdList

  if (!stateId.includes(item.imdbID)) {

    newIdList = [...stateId, item.imdbID];

    localStorage.setItem(name + '_' + item.imdbID, item.imdbID)
  }

  if (stateId.includes(item.imdbID)) {

    newIdList = stateId.filter(elem => elem !== item.imdbID)

    localStorage.removeItem(name + '_' + item.imdbID)
    //в новый список попадают все кроме выбранного на удаление
  }

  setStateId(newIdList)
}

export default toggleItem;