import { createSlice } from "@reduxjs/toolkit";
import { getFilmsData, getGraphData, getOnePageList } from "./operations";

const INITIAL_STATE = {
  page: 1,
  renderData: [],
  homePageEndpoint: "people/",
  filmsEndpoint: "films/",
  shipEndpoint: "starships/",
  films: [],
  graphData: {},
  isLoaded: false,
  characterName: "",
  characterId: 0,
  error: null,
};

export const stateSlice = createSlice({
  name: "state",
  initialState: INITIAL_STATE,
  reducers: {
    setPage(state) {
      state.page++;
    },
    resetData(state) {
      state.renderData = [];
      state.error = null;
      state.graphData = {};
    },
    resetFilmData(state) {
      state.films = [];
    },
    setCharacterName(state, { payload }) {
      state.characterName = payload;
      state.isLoaded = false;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOnePageList.fulfilled, (state, { payload }) => {
      state.renderData = [...state.renderData, ...payload];
    });
    builder.addCase(getOnePageList.rejected, (state, { payload }) => {
      state.error =
        payload instanceof Error ? payload.message : "Unknown error.";
    });
    builder.addCase(getFilmsData.fulfilled, (state, { payload }) => {
      state.films = payload;
      state.graphData = {};
    });
    builder.addCase(getFilmsData.rejected, (state, { payload }) => {
      state.error =
        payload instanceof Error ? payload.message : "Unknown error.";
    });
    builder.addCase(getGraphData.fulfilled, (state, { payload }) => {
      state.graphData = payload.graphData;
      state.characterName = payload.characterName;
      state.isLoaded = true;
    });
  },
});

export const stateReducer = stateSlice.reducer;
export const {
  setPage,
  resetData,
  setCharacterName,
  setIsLoaded,
  resetFilmData,
} = stateSlice.actions;
