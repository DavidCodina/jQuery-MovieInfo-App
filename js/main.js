//"use strict";
/* =============================================================================
                                 functions
============================================================================= */


/* =============================
          getMovies()
============================= */


//getMovies() makes a request to the API
function getMovies(searchText){

  axios.get('http://www.omdbapi.com/?apikey=[YOUR_API_KEY]&s='+searchText)

  .then((response) => {
    //console.dir(response);
    let movies = response.data.Search;
    let output = '';

    //Loop through the movies array.
    //The cards aren't all the same size, but this is an issue with the images used by
    //www.omdbapi.com/
    $.each(movies, (index, movie) => {
      output += `
        <div class="col-md-4 mb-3">
          <div class="card text-center text-white border border-dark rounded">
            <img class="card-img-top"src="${movie.Poster}" alt="movie image">

            <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
              <a class="btn btn-outline-primary mt-3" style="width: 175px;" href="#" onclick="movieSelected('${movie.imdbID}')">Movie Details</a>
            </div>
          </div>
        </div>
      `;
    });

    //Render the output.
    $('#movies').html(output);
  })

  .catch((err) => {
    console.log(err);
  });
}


/* =============================
        movieSelected()
============================= */


function movieSelected(id){
  sessionStorage.setItem('movieId', id);

  //when we go to movie.html, there is a <script> that calls getMovie();
  window.location = 'movie.html';
  return false;
}


/* =============================
        getMovie()
============================= */


function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?apikey=[YOUR_API_KEY]i='+movieId)
    .then((response) => {
      console.log(response);
      let movie = response.data;


      let output =`
      <div class="card-body p-0">
        <h3 class="card-title my-4 text-center">${movie.Title}</h3>


        <div class="row w-100 mx-auto">
        <!-- The align-items-md-stretch class will stretch the image, which is not ideal, but it works for now -->
          <div class="col-md-4 px-3 pr-md-0 pr-0 pt-0 pb-3 d-flex align-items-start align-items-md-stretch">
            <img src="${movie.Poster}" class="thumbnail border border-dark rounded">
          </div>


          <div class="col-md-8 m-0 px-3 pt-0 pb-3 d-flex align-items-start align-items-md-stretch">
            <ul class="list-group border border-dark rounded w-100">
              <li class="list-group-item h-100"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item h-100"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item h-100"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item h-100"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item h-100"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item h-100"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item h-100"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>


        <div class="mx-3 mb-3 p-3 border border-dark rounded">
          <h3 class="card-title text-center my-3 py-0">Plot:</h3>

          <p>${movie.Plot}</p>

          <div class="text-center mt-5">
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-outline-primary mr-2" style="width: 175px;">View IMDB</a>
            <a href="index.html" class="btn btn-outline-primary" style="width: 175px;">Go Back To Search</a>
          </div>
        </div>
      </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}


/* =============================================================================

============================================================================= */


$(document).ready(() => {
  //Catch the form submission, get the value of the input, and call getMovies().
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();

    let searchText = $('#searchText').val();

    getMovies(searchText);
  });
});
