import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFilmsData, getGraphData, getOnePageList } from "./operations";
import {
  Films,
  GraphDataPayload,
  InitialState,
  RejectedValue,
  RenderData,
} from "../types";

export const INITIAL_STATE: InitialState = {
  page: 1,
  renderData: [],
  homePageEndpoint: "people/",
  filmsEndpoint: "films/",
  shipEndpoint: "starships/",
  films: [],
  graphData: { initialNodes: [], initialEdges: [] },
  isLoaded: false,
  characterName: "",
  characterId: 0,
  error: "",
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
      state.error = "";
      state.graphData = { initialNodes: [], initialEdges: [] };
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
    builder.addCase(
      getOnePageList.fulfilled,
      (state, { payload }: PayloadAction<RenderData>) => {
        state.renderData = [...state.renderData, ...payload];
      }
    );
    builder.addCase(getOnePageList.rejected, (state, { payload }) => {
      const errorPayload = payload as RejectedValue | undefined;
      state.error = errorPayload?.message || "Unknown error.";
    });
    builder.addCase(
      getFilmsData.fulfilled,
      (state, { payload }: PayloadAction<Films>) => {
        state.films = payload;
        state.graphData = { initialNodes: [], initialEdges: [] };
      }
    );
    builder.addCase(getFilmsData.rejected, (state, { payload }) => {
      const errorPayload = payload as RejectedValue | undefined;
      state.error = errorPayload?.message || "Unknown error.";
    });
    builder.addCase(
      getGraphData.fulfilled,
      (state, { payload }: PayloadAction<GraphDataPayload>) => {
        state.graphData = payload.graphData;
        state.characterName = payload.characterName;
        state.isLoaded = true;
      }
    );
  },
});

export const stateReducer = stateSlice.reducer;
export const { setPage, resetData, setCharacterName, resetFilmData } =
  stateSlice.actions;
