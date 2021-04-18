const toggleItem = (item, state, setState, selector, data, setData) => {

  let newList
  let itemStorageName = selector + '_' + item.imdbID

  if (!state.includes(item)) {
    newList = [...state, item];
    localStorage.setItem(itemStorageName, JSON.stringify(item))
  }

  if (state.includes(item)) {
    newList = state.filter(elem => elem !== item)
    localStorage.removeItem(itemStorageName)
  }

  setState(newList)
}

export default toggleItem;