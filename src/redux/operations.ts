import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../api/fetchData";
import { groupByFilms } from "../helpers/groupByFilms";
import { createGraphData } from "../helpers/createGraphData";
import { Film, GetGraphDataValues, GetOnePageListValues } from "../types";

export const getOnePageList = createAsyncThunk(
  "getOnePageList",
  async (values: GetOnePageListValues, thunkApi) => {
    const endpoint = values.endpoint;
    const page = values.page;
    try {
      const onePageList = await fetchData(
        endpoint,
        undefined,
        undefined,
        page,
        undefined
      );
      return onePageList;
    } catch (err) {
      const error = err as Error;
      return thunkApi.rejectWithValue({ message: error.message });
    }
  }
);

export const getFilmsData = createAsyncThunk(
  "getFilmsData",
  async (endpoint: string, thunkApi) => {
    try {
      const { results } = await fetchData(endpoint);
      const films = results.map(
        (filmsData: Film): Film => ({
          id: filmsData.id,
          title: filmsData.title,
        })
      );
      return films;
    } catch (err) {
      const error = err as Error;
      return thunkApi.rejectWithValue({ message: error.message });
    }
  }
);

export const getGraphData = createAsyncThunk(
  "getGraphData",
  async (
    { shipEndpoint, films, characterId, characterName }: GetGraphDataValues,
    thunkApi
  ) => {
    try {
      const shipsData = await fetchData(
        shipEndpoint,
        films.map((film) => film.id).join(","),
        characterId
      );
      const shipsGroupedByFilm = groupByFilms(shipsData, films);
      const graphData = createGraphData(characterName, shipsGroupedByFilm);
      return { graphData, characterName };
    } catch (err) {
      const error = err as Error;
      return thunkApi.rejectWithValue({ message: error.message });
    }
  }
);
