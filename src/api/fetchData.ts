import axios from "axios";
import { Character, Films } from "../types";

axios.defaults.baseURL = "https://sw-api.starnavi.io/";

export async function fetchData(
  endpoint: string,
  films?: string,
  characterId?: number,
  page?: number,
  characters?: Character[]
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
