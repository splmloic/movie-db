AOS.init();
import { api } from './apikey.js';
let movies = [];

function getMovies(search) {
    fetch(`http://www.omdbapi.com/?apikey=${api}&s=${search}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            movies = response.Search;
            console.log(movies);
            let element = document.getElementById('movie-list');
            element.innerHTML = '';
            movies.forEach(movie => {
                showMovies(element, movie.Title, movie.Year, movie.Poster);
            });
            attachEventListeners();
        })
        .catch((error) => {
            console.error('Response error:', error.message);
        });
}

const showMovies = (element, Title, Year, Poster) => {
    element.innerHTML += `
    <div data-aos="fade-right">
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-lg-8">
                    <div class="card-body">
                        <h2 id="title" class="mb-0">${Title}</h2>
                        <p class="mb-1 text-body-secondary">${Year}</p>
                        <button id="btn-${Title.replace(/\s/g, '-')}" class="read-more btn btn-primary">Read More</button>
                    </div>
                </div>
                    <div class="col-lg-4 d-flex align-items-center justify-content-center">
                        <img src="${Poster}" alt="Img de ${Title}" class="img-fluid rounded m-3">
                    </div>
                </div>        
            </div>
        </div>
    </div>
    `;
}

function getMovieDetails(movieTitle) {
    fetch(`http://www.omdbapi.com/?apikey=${api}&t=${movieTitle}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response);
            openPopup(response);
        })
        .catch((error) => {
            console.error('Response error:', error.message);
        });
}

function openPopup(movieData) {
    const popupContent = `
        <h2>${movieData.Title}</h2>
        <p><strong>Year:</strong> ${movieData.Year}</p>
        <p><strong>Genre:</strong> ${movieData.Genre}</p>
        <p><strong>Director:</strong> ${movieData.Director}</p>
        <p><strong>Plot:</strong> ${movieData.Plot}</p>
        <img src="${movieData.Poster}" alt="Img of ${movieData.Title}">
    `;
    // Créer un élément div pour le popup
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.classList.add('text-center');
    popup.innerHTML = popupContent;

    // Ajouter le popup à la page
    document.body.appendChild(popup);

    // Ajouter un écouteur pour fermer le popup lorsque l'utilisateur clique en dehors de celui-ci
    document.addEventListener('click', function closePopup(event) {
        if (!popup.contains(event.target)) {
            document.body.removeChild(popup);
            document.removeEventListener('click', closePopup);
        }
    });
}

function attachEventListeners() {
    const movieCards = document.querySelectorAll('.card');
    movieCards.forEach(card => {
        const btnReadMore = card.querySelector('.read-more');
        const movieTitle = btnReadMore.id.replace('btn-', '').replace(/-/g, ' ');
        btnReadMore.addEventListener('click', function (event) {
            event.preventDefault();
            getMovieDetails(movieTitle);
        });
    });
}

document.getElementById('formRecherche').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value;
    getMovies(searchTerm);
});
