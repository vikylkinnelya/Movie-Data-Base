/* 1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const reklam = document.querySelectorAll('.promo__adv img'),
        genre = document.querySelector('.promo__genre'),
        background = document.querySelector('.promo__bg'),
        watchedFilms = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type = checkbox]'),
        button = addForm.querySelector('button');
    
    const delAdv = (arr) => {
        arr.forEach(el => el.remove());
    };
    delAdv(reklam);
    
    const makeChanges = () => {
        genre.textContent = 'ДРАМА';
        background.style.backgroundImage = "url(img/bg.jpg)";
    };
    makeChanges();

    const sortArr = (arr) => {
        arr.sort();
    };
    sortArr(movieDB.movies);

    function movieDBRefresher(films, parrent) {
        parrent.innerHTML = ''; //очищаем список
        films.forEach( (film, idx) => {
            parrent.innerHTML += `
            <li class="promo__interactive-item"> #${idx+1} ${film}
                <div class="delete"></div>
                    </li> 
            `;
        });
    }
    movieDBRefresher(movieDB.movies, watchedFilms);

    addForm.addEventListener('submit', (ev) => {
        ev.preventDefault(); //отключена перезагрузка страницы
        
        let newFilm = addInput.value;
        const favorite = checkbox.checked; //стоит ли галочка булевое значение

        if (newFilm) { //если пустая строка,условие не выполнится
           
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0,22)}...`; 
            } 

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            movieDBRefresher(movieDB.movies, watchedFilms);

            if (favorite) { //если стоит галочка на любимом фильме
                console.log('Добавляем любимый фильм');
        } 
        }

        ev.target.reset();
            
    });
    

    





});






