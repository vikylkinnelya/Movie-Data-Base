const toggleItem = (item, selector, data, setData) => {

  const fav = {...item, fav: !item.fav}
  const watch= {...item, watch: !item.watch}

  const idx = data.findIndex(el => el === item);
  const newItem = selector === 'fav' ? fav : watch
  const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx+1)]; //склеиваем две част

  setData(newArr)



  /* let newIdList

  if (!stateId.includes(item.imdbID)) {

    newIdList = [...stateId, item.imdbID];

    localStorage.setItem(name + '_' + item.imdbID, item.imdbID)
  }

  if (stateId.includes(item.imdbID)) {

    newIdList = stateId.filter(elem => elem !== item.imdbID)

    localStorage.removeItem(name + '_' + item.imdbID)
    //в новый список попадают все кроме выбранного на удаление
  }

  setStateId(newIdList) */
}

export default toggleItem;