import {
  stateReducer,
  setPage,
  resetData,
  setCharacterName,
  resetFilmData,
} from "./slice";
import { getFilmsData, getGraphData, getOnePageList } from "./operations";
import { INITIAL_STATE } from "./slice";
import { Films, GraphDataPayload, RenderData } from "../types";

describe("stateSlice", () => {
  it("should return the initial state", () => {
    expect(stateReducer(undefined, { type: "@@INIT" })).toEqual(INITIAL_STATE);
  });

  it("should handle setPage", () => {
    const previousState = { ...INITIAL_STATE, page: 1 };
    expect(stateReducer(previousState, setPage())).toEqual({
      ...previousState,
      page: 2,
    });
  });

  it("should handle resetData", () => {
    const previousState = {
      ...INITIAL_STATE,
      renderData: [
        {
          id: 1,
          name: "Luke Skywalker",
          films: [1, 2],
          starships: [3],
        },
      ],
      error: "Some error",
    };
    expect(stateReducer(previousState, resetData())).toEqual({
      ...previousState,
      renderData: [],
      error: "",
      graphData: { initialNodes: [], initialEdges: [] },
    });
  });

  it("should handle setCharacterName", () => {
    const previousState = { ...INITIAL_STATE, characterName: "Old Name" };
    expect(
      stateReducer(previousState, setCharacterName("New Character"))
    ).toEqual({
      ...previousState,
      characterName: "New Character",
      isLoaded: false,
      page: 1,
    });
  });

  it("should handle resetFilmData", () => {
    const previousState = {
      ...INITIAL_STATE,
      films: [{ id: 1, title: "Film 1" }],
    };
    expect(stateReducer(previousState, resetFilmData())).toEqual({
      ...previousState,
      films: [],
    });
  });
});

describe("extraReducers in stateSlice", () => {
  it("should handle getOnePageList.fulfilled", () => {
    const previousState = { ...INITIAL_STATE, renderData: [] };
    const payload: RenderData = [
      {
        id: 1,
        name: "Luke Skywalker",
        films: [1, 2],
        starships: [3],
      },
    ];
    const newState = stateReducer(
      previousState,
      getOnePageList.fulfilled(payload, "", { endpoint: "", page: 1 })
    );

    expect(newState.renderData).toEqual(payload);
  });

  it("should handle getOnePageList.rejected", () => {
    const previousState = { ...INITIAL_STATE, error: "" };
    const newState = stateReducer(
      previousState,
      getOnePageList.rejected(new Error("Unknown error."), "", {
        endpoint: "",
        page: 1,
      })
    );

    expect(newState.error).toBe("Unknown error.");
  });

  it("should handle getFilmsData.fulfilled", () => {
    const previousState = { ...INITIAL_STATE, films: [] };
    const payload: Films = [{ id: 1, title: "Film 1" }];
    const newState = stateReducer(
      previousState,
      getFilmsData.fulfilled(payload, "", "")
    );

    expect(newState.films).toEqual(payload);
  });

  it("should handle getFilmsData.rejected", () => {
    const previousState = { ...INITIAL_STATE, error: "" };
    const newState = stateReducer(
      previousState,
      getFilmsData.rejected(new Error("Unknown error."), "", "")
    );

    expect(newState.error).toBe("Unknown error.");
  });

  it("should handle getGraphData.fulfilled", () => {
    const previousState = {
      ...INITIAL_STATE,
      graphData: { initialNodes: [], initialEdges: [] },
      isLoaded: false,
    };
    const payload: GraphDataPayload = {
      graphData: {
        initialNodes: [
          { id: "1", position: { x: 0, y: 0 }, data: { label: "label_1" } },
        ],
        initialEdges: [],
      },
      characterName: "Luke Skywalker",
    };

    const arg = {
      shipEndpoint: "",
      films: [{ id: 1, title: "Film 1" }],
      characterId: "10",
      characterName: "Luke Skywalker",
    };

    const newState = stateReducer(
      previousState,
      getGraphData.fulfilled(payload, "", arg)
    );

    expect(newState.graphData).toEqual(payload.graphData);
    expect(newState.characterName).toBe("Luke Skywalker");
    expect(newState.isLoaded).toBe(true);
  });
});
