/* const getDataRequest = (searchParam, questionParam, setState, currPage, type = '', year = '') => { //гибкий запрос на сервер

    fetch(`http://www.omdbapi.com/?${searchParam}=${questionParam}&page=${currPage}&type=${type}&year=${year}&apikey=${API_KEY}`)
      .then(resp => resp)
      .then(resp => resp.json())
      .then(response => {
        if (response.Response === 'False') { //если нет ответа
          setError(response.Error) //записать в обьект ошибки ошибку
        } else {
          searchParam === 's' ?
            setState(response.Search) : //если поиск по названию 
            setState(response) //если поиск по imdbId
          setTotalResults(response.totalResults)
        }
        setLoading(false);
        setDetailRequest(false); //для модалки
      }).catch(({ message }) => { //в случае неудачи словить ошибку
        setError(message); //и записать ее в стейт
        setLoading(false);
      })
  } */