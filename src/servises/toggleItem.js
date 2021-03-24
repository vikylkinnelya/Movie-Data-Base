const toggleItem = (item, state, setState, selector, data, setData) => {

  /*   const fav = { ...item, fav: !item.fav }
    const watch = { ...item, watch: !item.watch }
  
    const idx = data.findIndex(el => el === item);
    const newItem = selector === 'fav' ? fav : watch
    const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]; //склеиваем две част
  
    setData(newArr)
  
    let itemStorageName = selector + '_' + item.imdbID
  
    localStorage.getItem(itemStorageName) ?
      localStorage.removeItem(itemStorageName) :
      localStorage.setItem(selector + '_' + item.imdbID, JSON.stringify(newItem)) */

  let newList
  let itemStorageName = selector + '_' + item.imdbID

  if (!state.includes(item)) {
    newList = [...state, item];
    localStorage.setItem(itemStorageName, JSON.stringify(item))
  }

  if (state.includes(item)) {
    newList = state.filter(elem => elem !== item)
    localStorage.removeItem(itemStorageName)
    //в новый список попадают все кроме выбранного на удаление
  }

  setState(newList)
}

export default toggleItem;