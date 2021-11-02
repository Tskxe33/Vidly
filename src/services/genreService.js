import axios from "axios";

export async function getGenreList() {
  const genresUrl = "http://localhost:3900/api/genres";
  const { data } = await axios.get(genresUrl);
  return data;
}
