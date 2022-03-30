import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(movieId) {
  return http.get(apiEndPoint + "/" + movieId);
}

export function saveMovie(movie) {
  // update movie algorithm
  // at the backend the movie that we want to update
  // should not has id.
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiEndPoint + "/" + movie._id, body);
  }

  // create movie algorithm
  return http.post(apiEndPoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndPoint + "/" + movieId);
}
