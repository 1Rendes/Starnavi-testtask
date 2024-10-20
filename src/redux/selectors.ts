import { RootState } from "./store";

export const selectRenderData = (state: RootState) => state.state.renderData;
export const selectPage = (state: RootState) => state.state.page;
export const selectHomePageEndpoint = (state: RootState) =>
  state.state.homePageEndpoint;
export const selectFilmsEndpoint = (state: RootState) =>
  state.state.filmsEndpoint;
export const selectShipEndpoint = (state: RootState) =>
  state.state.shipEndpoint;
export const selectError = (state: RootState) => state.state.error;
export const selectCharacterName = (state: RootState) =>
  state.state.characterName;
export const selectFilms = (state: RootState) => state.state.films;
export const selectGraphData = (state: RootState) => state.state.graphData;
export const selectIsLoaded = (state: RootState) => state.state.isLoaded;
export const selectNext = (state: RootState) => state.state.next;
