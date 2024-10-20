import { getGraphData } from "../operations";
import { fetchData } from "../../api/fetchData";
import { configureStore } from "@reduxjs/toolkit";
import { stateReducer } from "../slice";
jest.mock("../../api/fetchData.ts");

const mockStore = configureStore({
  reducer: { state: stateReducer },
});

describe("getGraphData", () => {
  const mockData = {
    count: 5,
    next: null,
    previous: null,
    results: [
      {
        id: 48,
        name: "Jedi starfighter",
        films: [5, 6],
      },
      {
        id: 59,
        name: "Trade Federation cruiser",
        films: [6],
      },
      {
        id: 64,
        name: "Naboo star skiff",
        films: [6],
      },
      {
        id: 65,
        name: "Jedi Interceptor",
        films: [6],
      },
      {
        id: 74,
        name: "Belbullab-22 starfighter",
        films: [6],
      },
    ],
  };

  const mockFilms = [
    { id: 5, title: "Attack of the Clones" },
    { id: 6, title: "Revenge of the Sith" },
  ];

  const mockGroupedByFilm = {
    "Attack of the Clones": ["Jedi starfighter"],
    "Revenge of the Sith": [
      "Jedi starfighter",
      "Trade Federation cruiser",
      "Naboo star skiff",
      "Jedi Interceptor",
      "Belbullab-22 starfighter",
    ],
  };

  const mockGraphData = {
    initialNodes: [
      {
        id: "hero-Obi-Wan Kenobi",
        type: "input",
        data: { label: "Obi-Wan Kenobi" },
        position: { x: 400, y: 50 },
      },
      {
        id: "film-Attack of the Clones",
        type: "default",
        data: { label: "Attack of the Clones" },
        position: { x: 200, y: 200 },
      },
      {
        id: "film-Revenge of the Sith",
        type: "default",
        data: { label: "Revenge of the Sith" },
        position: { x: 400, y: 200 },
      },
      {
        id: "ship-Jedi starfighter",
        type: "output",
        data: { label: "Jedi starfighter" },
        position: { x: 100, y: 400 },
      },
      {
        id: "ship-Trade Federation cruiser",
        type: "output",
        data: { label: "Trade Federation cruiser" },
        position: { x: 300, y: 400 },
      },
      {
        id: "ship-Naboo star skiff",
        type: "output",
        data: { label: "Naboo star skiff" },
        position: { x: 500, y: 400 },
      },
      {
        id: "ship-Jedi Interceptor",
        type: "output",
        data: { label: "Jedi Interceptor" },
        position: { x: 700, y: 400 },
      },
      {
        id: "ship-Belbullab-22 starfighter",
        type: "output",
        data: { label: "Belbullab-22 starfighter" },
        position: { x: 900, y: 400 },
      },
    ],
    initialEdges: [
      {
        id: "edge-hero-Obi-Wan Kenobi-film-Attack of the Clones",
        source: "hero-Obi-Wan Kenobi",
        target: "film-Attack of the Clones",
      },
      {
        id: "edge-hero-Obi-Wan Kenobi-film-Revenge of the Sith",
        source: "hero-Obi-Wan Kenobi",
        target: "film-Revenge of the Sith",
      },
      {
        id: "edge-film-Attack of the Clones-ship-Jedi starfighter",
        source: "film-Attack of the Clones",
        target: "ship-Jedi starfighter",
      },
      {
        id: "edge-film-Revenge of the Sith-ship-Jedi starfighter",
        source: "film-Revenge of the Sith",
        target: "ship-Jedi starfighter",
      },
      {
        id: "edge-film-Revenge of the Sith-ship-Trade Federation cruiser",
        source: "film-Revenge of the Sith",
        target: "ship-Trade Federation cruiser",
      },
      {
        id: "edge-film-Revenge of the Sith-ship-Naboo star skiff",
        source: "film-Revenge of the Sith",
        target: "ship-Naboo star skiff",
      },
      {
        id: "edge-film-Revenge of the Sith-ship-Jedi Interceptor",
        source: "film-Revenge of the Sith",
        target: "ship-Jedi Interceptor",
      },
      {
        id: "edge-film-Revenge of the Sith-ship-Belbullab-22 starfighter",
        source: "film-Revenge of the Sith",
        target: "ship-Belbullab-22 starfighter",
      },
    ],
  };

  it("dispatches fulfilled action and returns graph data when API request succeeds", async () => {
    (fetchData as jest.Mock).mockResolvedValueOnce(mockData);

    const result = await mockStore.dispatch(
      getGraphData({
        shipEndpoint: "ships",
        films: mockFilms,
        characterId: "10",
        characterName: "Obi-Wan Kenobi",
      })
    );

    expect(result.type).toBe("getGraphData/fulfilled");
    expect(result.payload).toEqual({
      graphData: mockGraphData,
      characterName: "Obi-Wan Kenobi",
    });
  });

  it("dispatches rejected action when API request fails", async () => {
    const mockError = new Error("API Error");
    (fetchData as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await mockStore.dispatch(
      getGraphData({
        shipEndpoint: "ships",
        films: mockFilms,
        characterId: "10",
        characterName: "Obi-Wan Kenobi",
      })
    );

    expect(result.type).toBe("getGraphData/rejected");
    expect(result.payload).toStrictEqual({ message: mockError.message });
  });
});
