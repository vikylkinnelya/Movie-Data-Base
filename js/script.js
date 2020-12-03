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
    
    reklam.forEach(el => el.remove());
    
    genre.textContent = 'ДРАМА';
    
    background.style.backgroundImage = "url(img/bg.jpg)";
    
    function movieDBRefresher() {
        watchedFilms.innerHTML = ''; //очищен список просмотренных по умолчанию 
        movieDB.movies.sort();
        movieDB.movies.forEach( (el, idx) => {
            watchedFilms.innerHTML += `
            <li class="promo__interactive-item"> #${idx+1} ${el}
                <div class="delete"></div>
                    </li> 
            `;
        });
    }
    movieDBRefresher();

    button.addEventListener('click', (ev) => {
        ev.preventDefault();
    
        if (addInput.value.length > 21) {
            
            movieDB.movies.push(addInput.value.slice(0,21) + '...');
            movieDBRefresher();

        } else {
            movieDB.movies.push(addInput.value);
            movieDBRefresher();
        }
        console.log(movieDB.movies);
        if(checkbox.checked == true) {
            console.log('Добавляем любимый фильм');
        }
    
    
            
    });
    
    console.log(movieDB.movies);

    





});






