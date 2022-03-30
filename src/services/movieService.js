import http from "./httpService";
import config from "../config.json";

const apiEndPoint = config.apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndPoint);
}

export function deleteMovie(movieId) {
  return http.delete(apiEndPoint + "/" + movieId);
}
