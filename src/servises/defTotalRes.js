const defTotalRes = (location, favList, watchList, totalResults) => {

  if (location === 'favorites') {
    return favList.length
  }
  else if (location === 'to-watch') {
    return watchList.length
  }

  else {
    return totalResults
  }
}

export default defTotalRes