import axios from "axios";

axios.defaults.baseURL = "https://sw-api.starnavi.io/";

export async function fetchData(
  endpoint,
  films,
  characterId,
  page,
  characters
) {
  const params = {
    films__in: films,
    pilots: characterId,
    page,
    characters,
  };
  try {
    const { data } = await axios.get(endpoint, { params });
    return data;
  } catch (error) {
    return error;
  }
}
