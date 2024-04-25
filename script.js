import {api} from './apikey.js'; 
let movies = [];
const search = document.getElementById("search");

function getMovies(search){
    fetch(`http://www.omdbapi.com/?apikey=${api}s=${search}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
        console.log(response);
        movies = response;
          let element = document.getElementById('movie-list');
          movies.results.forEach(movie => {
            showMovies(element,  movie.Title, movie.Year, movie.Poster);
          });
        })
        .catch((error) => {
          console.error('Response error:', error.message);
        });
}

const showMovies = (element, Title, Year, Poster) => {
    element.innerHTML += `
        <div>
            <h2>${Title}</h2>
            <p>${Year}</p>
            <p>${Genre}</p>
            <p>${Director}</p>
            <p>${Metascore}</p>
            <p>${Plot}</p>
            <img src="${Poster}" alt="Img of ${Title}"></img>
        </div>
    `;
}

if(search !== null){
    setInterval(getMovies(search),100)
}