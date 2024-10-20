import {
  selectRenderData,
  selectPage,
  selectHomePageEndpoint,
  selectFilmsEndpoint,
  selectShipEndpoint,
  selectError,
  selectCharacterName,
  selectFilms,
  selectGraphData,
  selectIsLoaded,
} from "./selectors";
import { RootState } from "./store";

describe("Redux Selectors", () => {
  const mockState: RootState = {
    state: {
      page: 1,
      renderData: [{ id: 1, name: "Luke Skywalker", films: [], starships: [] }],
      homePageEndpoint: "people/",
      filmsEndpoint: "films/",
      shipEndpoint: "starships/",
      films: [{ id: 1, title: "A New Hope" }],
      graphData: {
        initialNodes: [
          { id: "1", data: { label: "label_1" }, position: { x: 0, y: 0 } },
        ],
        initialEdges: [
          { id: "e1", source: "1", target: "2", type: "straight" },
        ],
      },
      isLoaded: true,
      characterName: "Luke Skywalker",
      characterId: 1,
      error: "",
    },
  };

  it("should select renderData", () => {
    expect(selectRenderData(mockState)).toEqual(mockState.state.renderData);
  });

  it("should select page", () => {
    expect(selectPage(mockState)).toEqual(mockState.state.page);
  });

  it("should select homePageEndpoint", () => {
    expect(selectHomePageEndpoint(mockState)).toEqual(
      mockState.state.homePageEndpoint
    );
  });

  it("should select filmsEndpoint", () => {
    expect(selectFilmsEndpoint(mockState)).toEqual(
      mockState.state.filmsEndpoint
    );
  });

  it("should select shipEndpoint", () => {
    expect(selectShipEndpoint(mockState)).toEqual(mockState.state.shipEndpoint);
  });

  it("should select error", () => {
    expect(selectError(mockState)).toEqual(mockState.state.error);
  });

  it("should select characterName", () => {
    expect(selectCharacterName(mockState)).toEqual(
      mockState.state.characterName
    );
  });

  it("should select films", () => {
    expect(selectFilms(mockState)).toEqual(mockState.state.films);
  });

  it("should select graphData", () => {
    expect(selectGraphData(mockState)).toEqual(mockState.state.graphData);
  });

  it("should select isLoaded", () => {
    expect(selectIsLoaded(mockState)).toEqual(mockState.state.isLoaded);
  });
});
