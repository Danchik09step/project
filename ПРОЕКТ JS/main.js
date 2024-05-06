document.addEventListener("DOMContentLoaded", async () => {

const URL = "https://api.kinopoisk.dev";
const apiKey = '93N7SRW-9SA47KX-HNHDV4W-5QND19N';

const menuIcon = document.querySelector(".menu")
const closeIcon = document.querySelector(".close")
const sidebar = document.querySelector(".sidebar")
const main = document.querySelector("#main")

menuIcon.addEventListener("click", () => {
    sidebar.style.display = "flex";
    main.style.width = 83.7 + "%";
    main.style.marginLeft = 250 + "px";
})
closeIcon.addEventListener("click", () => {
    sidebar.style.display = "none";
    main.style.width = 101.3 + "%";
    main.style.marginLeft = -20 + "px";
})


const sectionGenres = document.querySelector(".section-genres");
const sectionCountries = document.querySelector(".section-countries");
const sectionStudios = document.querySelector(".section-studios");
const sectionForFilms = document.querySelector(".section-film");
const filmList = document.querySelector(".film-list");

const homeButton = document.getElementById("home")
homeButton.addEventListener("click", () => {
    sectionGenres.style.display = "none"
    sectionForFilms.style.display = 'flex';
    sectionCountries.style.display = 'none';
    sectionStudios.style.display = 'none';
    homeButton.classList.add("hide");
})


const genresButton = document.querySelector(".genres");
const getGenres = async () => {
     try {
         const res = await fetch(`${URL}/v1/movie/possible-values-by-field?field=genres.name`, {
             method: "GET",
             headers: {
                 'accept': 'application/json',
                 'X-API-KEY': apiKey
             }
         });
         if (res.ok) {
             const data = await res.json();
             showGenres(data);
         }
     } catch (error) {
         console.error("ПРОвал");
     }
 };
 const showGenres = async (data) => {
     if (data && data.length) {
         console.log(data);
         for (let i = 0; i < data.length; i++) {
            const genreCard = `<h1 class="genre-name" id="list">${data[i].name}</h1>`;
            sectionGenres.insertAdjacentHTML("beforeend", genreCard);
         }
     } else {
         console.error("Данные о жанрах не определены или пусты.");
     }
 };
 genresButton.addEventListener("click", () => {
    homeButton.classList.remove("hide");
    sectionForFilms.style.display = 'none';
    sectionCountries.style.display = 'none';
    sectionStudios.style.display = 'none';
    sectionGenres.style.display = "block";
    getGenres()
});
// const getFilmsByGenre = async (selectedGenre) => {
//     const res = await fetch(`${URL}/v1.4/movie?page=1&limit=250&notNullFields=top250&selectFields=name&selectFields=description&selectFields=year&selectFields=rating&selectFields=genres&selectFields=poster&selectFields=countries`, {
//         method: "GET",
//         headers: {
//             'accept': 'application/json',
//             'X-API-KEY': apiKey
//         }
//     })
//     if (res.ok) {
//         const data = await res.json();
//         data.docs.sort((a, b) => b.rating.imdb - a.rating.imdb);
//         console.log(data);
//         showFilmsCardByGenre(data, selectedGenre);
//         localStorage.setItem('filmsData', JSON.stringify(data));
//     }
// };

// const showFilmsCardByGenre = async(data, selectedGenre) => {
//     console.log("Выбранный жанр:", selectedGenre);
//     for (let i = 0; i < data.docs.length; i++) {
//         const filmGenre = data.docs[i].genres[0].name.toLowerCase();
//         console.log("Жанр текущего фильма:", filmGenre);
//         if (filmGenre === selectedGenre) {
//             const filmId = `film-${i}`;
//             const imgURL = window.URL.createObjectURL(await fetch(data.docs[i].poster.url).then(response => response.blob()));
//             let ratingClass = '';
//             if (data.docs[i].rating.imdb >= 7) {
//                 ratingClass = 'high-rating';
//             } else if (data.docs[i].rating.imdb >= 5) {
//                 ratingClass = 'medium-rating';
//             } else {
//                 ratingClass = 'hide';
//             }
//             const filmCards = 
//             `<div id="${filmId}" class="film-card-1 active">
//                 <span class="film-poster"><img src="${imgURL}" alt="${data.docs[i].name} Poster"></span>
//                 <span class="film-name">${data.docs[i].name}</span>
//                 <span class="film-country">${data.docs[i].countries[0].name}</span>
//                 <span class="film-year">${data.docs[i].year}</span>
//                 <span class="film-genre-name">${data.docs[i].genres[0].name}</span>
//                 <span class="film-rating ${ratingClass}">${data.docs[i].rating.imdb}</span>
//             </div>`;
//             filmList.insertAdjacentHTML("beforeend", filmCards);
//         } else {
//             console.log("Фильм не соответствует выбранному жанру.");
//         }
//     }
// }
// sectionGenres.addEventListener("click", (e) => {
//     const selectedGenre = e.target.classList.contains("genre-name");
//     console.log("Выбранный жанр:", selectedGenre);
//     sectionGenres.style.display = "none";
//     getFilmsByGenre(selectedGenre);
// });






const countriesButton = document.querySelector(".countries");
const getCountries = async () => {
    try {
        const res = await fetch(`${URL}/v1/movie/possible-values-by-field?field=countries.name`, {
            method: "GET",
            headers: {
                'accept': 'application/json',
                'X-API-KEY': apiKey
            }
        });
        if (res.ok) {
            const data = await res.json();
            showCountries(data);
        } else {
            console.log("Неудача");
        }
    } catch (error) {
        console.error("ПРОвал");
    }
};
const showCountries = async (data) => {
    if (data && data.length) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const countryCard = `<h1 class="country-name id="list"">${data[i].name}</h1>`;
            sectionCountries.insertAdjacentHTML("beforeend", countryCard);
        }
    } else {
        console.error("Данные о странах не определены или пусты.");
    }
};
countriesButton.addEventListener("click", () => {
    homeButton.classList.remove("hide");
    sectionForFilms.style.display = 'none';
    sectionGenres.style.display = 'none';
    sectionStudios.style.display = 'none';
    sectionCountries.style.display = "block";
    getCountries()
});


const studiosButton = document.querySelector(".studios")
const getStudios = async () => {
    try {
        const res = await fetch(`${URL}/v1.4/studio?page=1&limit=50`, {
            method: "GET",
            headers: {
                'accept': 'application/json',
                'X-API-KEY': apiKey
            }
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data.docs[0].title);
            showStudios(data);
        } else {
            console.log("Неудача");
        }
    } catch (error) {
        console.error("ПРОвал");
    }
};
const showStudios = async (data) => {
        console.log(data.docs);
        for (let i = 0; i < data.docs.length; i++) {
            const studioCard = `<h1 class="studio-name id="list"">${data.docs[i].title}</h1>`;
            sectionStudios.insertAdjacentHTML("beforeend", studioCard);
        }
};
studiosButton.addEventListener("click", () => {
    homeButton.classList.remove("hide");
    sectionForFilms.style.display = 'none';
    sectionGenres.style.display = 'none';
    sectionCountries.style.display = 'none';
    sectionStudios.style.display = "block";
    getStudios()
});


const getFilms = async () => {
    const res = await fetch(`${URL}/v1.4/movie?page=1&limit=250&notNullFields=top250&selectFields=name&selectFields=description&selectFields=year&selectFields=rating&selectFields=genres&selectFields=poster&selectFields=countries`, {
        method: "GET",
        headers: {
            'accept': 'application/json',
            'X-API-KEY': apiKey
        }
    })
    if (res.ok) {
        const data = await res.json();
        data.docs.sort((a, b) => b.rating.imdb - a.rating.imdb)
        showFilmsCard(data)
        console.log(data.docs[0].countries[0].name);
        localStorage.setItem('filmsData', JSON.stringify(data));
    }
}
const showFilmsCard = async (data) => {
    // console.log(data);
    for (let i = 0; i < data.docs.length; i++) {
        if (data.docs[i].poster && data.docs[i].poster.url) {
            const filmId = `film-${i}`;
            const imgURL = window.URL.createObjectURL(await fetch(data.docs[i].poster.url).then(response => response.blob()));
            let ratingClass = '';
            if (data.docs[i].rating.imdb >= 7) {
                ratingClass = 'high-rating';
            } else if (data.docs[i].rating.imdb >= 5) {
                ratingClass = 'medium-rating';
            } else {
                ratingClass = 'hide';
            }
            const filmCards = 
            `<div id="${filmId}" class="film-card-1 active">
                <span class="film-poster"><img src="${imgURL}" alt="${data.docs[i].name} Poster"></span>
                <span class="film-name">${data.docs[i].name}</span>
                <span class="film-year">${data.docs[i].year}</span>
                <span class="film-rating ${ratingClass}">${data.docs[i].rating.imdb}</span>
            </div>`;
            sectionForFilms.insertAdjacentHTML("beforeend", filmCards);
        } else {
            console.log("Что-то не так");
        }
    }
}
// const getFilmsTwo = async () => {
//     const res = await fetch(`${URL}/v1.4/movie?page=1&limit=250&notNullFields=top250&selectFields=name&selectFields=description&selectFields=year&selectFields=rating&selectFields=genres&selectFields=poster&selectFields=countries`, {
//         method: "GET",
//         headers: {
//             'accept': 'application/json',
//             'X-API-KEY': apiKey
//         }
//     })
//     if (res.ok) {
//         const data = await res.json();
//         data.docs.sort((a, b) => b.rating.imdb - a.rating.imdb)
//         showFilmsCardTwo(data)
//         console.log(data.docs[0].countries[0].name);
//         localStorage.setItem('filmsData', JSON.stringify(data));
//     }
// }
// const showFilmsCardTwo = async (data) => {
//     for (let i = 0; i < data.docs.length; i++) {
//         if (data.docs[i].poster && data.docs[i].poster.url) {
//             const filmId = `film-${i}`;
//             const imgURL = window.URL.createObjectURL(await fetch(data.docs[i].poster.url).then(response => response.blob()));
//             let ratingClass = '';
//             if (data.docs[i].rating.imdb >= 7) {
//                 ratingClass = 'high-rating';
//             } else if (data.docs[i].rating.imdb >= 5) {
//                 ratingClass = 'medium-rating';
//             } else {
//                 ratingClass = 'hide';
//             }
//         const filmCards = 
//             `<div class="film-card-2 active">
//                 <span class="film-poster"><img src="${imgURL}" alt="${data.docs[i].name} Poster"></span>
//                 <span class="film-name">${data.docs[i].name}</span>
//                 <span class="film-name">${data.docs[i].description}</span>
//                 <span class="film-country">${data.docs[i].countries[0].name}</span>
//                 <span class="film-year">${data.docs[i].year}</span>
//                 <span class="film-genre-name">${data.docs[i].genres[0].name}</span>
//                 <span class="film-rating ${ratingClass}">${data.docs[i].rating.imdb}</span>
//             </div>`;
//         sectionForFilms.insertAdjacentHTML("beforeend", filmCards)
//     } else {
//         console.log("Что-то не так");
//     }
//     }
// }
// sectionForFilms.addEventListener("click", (e) => {
//     const target = e.target.classList.contains("film-card-1")
//     if (target) {
//         const filmCardTwo = document.querySelector(".film-card-2")
//         target.style.zIndex = "1";
//         filmCardTwo.style.zIndex = "2";
//         getFilmsTwo()
//     }
// })









const checkLocalStorage = async () => {
    // Проверяем, содержится ли ключ 'filmsData' в локальном хранилище
    const filmsData = localStorage.getItem('filmsData');
    
    if (filmsData) {
        // Если ключ 'filmsData' существует, выводим его содержимое
        console.log('Данные в локальном хранилище:', JSON.parse(filmsData));
    } else {
        console.log('Данные в локальном хранилище отсутствуют.');
    }
};
const init = async () => {
    await getFilms()
    await checkLocalStorage()
}
init()
})