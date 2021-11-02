import axios from "axios";
import http from "./httpService";

const moviesUrl = "http://localhost:3900/api/movies";
export async function getMovieList() {
  const { data } = await axios.get(moviesUrl);
  return data;
}

export function deleteMovie(movieId) {
  return http.delete(moviesUrl + "/" + movieId);
}
