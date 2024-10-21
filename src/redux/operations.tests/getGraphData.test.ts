import { getGraphData } from "../operations";
import { fetchData } from "../../api/fetchData";
import { configureStore } from "@reduxjs/toolkit";
import { stateReducer } from "../slice";
import { createGraphData } from "../../helpers/createGraphData";
import { groupByFilms } from "../../helpers/groupByFilms";

jest.mock("../../api/fetchData");
jest.mock("../../helpers/createGraphData");
jest.mock("../../helpers/groupByFilms");

const mockStore = configureStore({
  reducer: { state: stateReducer },
});

describe("getGraphData", () => {
  const mockFilms = [
    {
      id: 1,
      title: "A New Hope",
      characters: [
        10, 12, 13, 14, 15, 16, 18, 19, 1, 2, 3, 4, 5, 6, 7, 8, 9, 81,
      ],
    },
    {
      id: 2,
      title: "The Empire Strikes Back",
      characters: [10, 13, 14, 18, 20, 21, 22, 23, 24, 25, 26, 1, 2, 3, 4, 5],
    },
    {
      id: 3,
      title: "Return of the Jedi",
      characters: [
        10, 13, 14, 16, 18, 20, 21, 22, 25, 27, 28, 29, 30, 31, 45, 1, 2, 3, 4,
        5,
      ],
    },
    {
      id: 4,
      title: "The Phantom Menace",
      characters: [
        10, 16, 20, 21, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 46,
        47, 48, 2, 3, 11, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      ],
    },
    {
      id: 5,
      title: "Attack of the Clones",
      characters: [
        10, 20, 21, 22, 33, 35, 36, 40, 43, 46, 2, 3, 6, 7, 11, 51, 52, 53, 58,
        59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
        77, 78, 82,
      ],
    },
    {
      id: 6,
      title: "Revenge of the Sith",
      characters: [
        10, 12, 13, 20, 21, 33, 35, 46, 1, 2, 3, 4, 5, 6, 7, 11, 51, 52, 53, 54,
        55, 56, 58, 63, 64, 67, 68, 75, 78, 79, 80, 81, 82, 83,
      ],
    },
  ];

  const mockData = {
    results: [
      {
        name: "Millennium Falcon",
        films: [1, 2, 3],
        pilots: [10],
      },
      {
        name: "Imperial shuttle",
        films: [2, 3],
        pilots: [10],
      },
    ],
  };

  const shipsGroupedByFilm = {
    "A New Hope": ["Millennium Falcon"],
    "The Empire Strikes Back": ["Millennium Falcon", "Imperial shuttle"],
    "Return of the Jedi": ["Millennium Falcon", "Imperial shuttle"],
  };

  const mockGraphData = {
    initialNodes: [
      {
        id: "hero-Han Solo",
        type: "input",
        data: { label: "Han Solo" },
        position: { x: 400, y: 50 },
      },
      {
        id: "film-A New Hope",
        type: "default",
        data: { label: "A New Hope" },
        position: { x: 100, y: 200 },
      },
      {
        id: "film-The Empire Strikes Back",
        type: "default",
        data: { label: "The Empire Strikes Back" },
        position: { x: 300, y: 200 },
      },
      {
        id: "film-Return of the Jedi",
        type: "default",
        data: { label: "Return of the Jedi" },
        position: { x: 500, y: 200 },
      },
      {
        id: "ship-Millennium Falcon",
        type: "output",
        data: { label: "Millennium Falcon" },
        position: { x: 100, y: 400 },
      },
      {
        id: "ship-Imperial shuttle",
        type: "output",
        data: { label: "Imperial shuttle" },
        position: { x: 300, y: 400 },
      },
    ],
    initialEdges: [
      {
        id: "edge-hero-Han Solo-film-A New Hope",
        source: "hero-Han Solo",
        target: "film-A New Hope",
      },
      {
        id: "edge-hero-Han Solo-film-The Empire Strikes Back",
        source: "hero-Han Solo",
        target: "film-The Empire Strikes Back",
      },
      {
        id: "edge-hero-Han Solo-film-Return of the Jedi",
        source: "hero-Han Solo",
        target: "film-Return of the Jedi",
      },
      {
        id: "edge-film-A New Hope-ship-Millennium Falcon",
        source: "film-A New Hope",
        target: "ship-Millennium Falcon",
      },
      {
        id: "edge-film-The Empire Strikes Back-ship-Millennium Falcon",
        source: "film-The Empire Strikes Back",
        target: "ship-Millennium Falcon",
      },
      {
        id: "edge-film-The Empire Strikes Back-ship-Imperial shuttle",
        source: "film-The Empire Strikes Back",
        target: "ship-Imperial shuttle",
      },
      {
        id: "edge-film-Return of the Jedi-ship-Millennium Falcon",
        source: "film-Return of the Jedi",
        target: "ship-Millennium Falcon",
      },
      {
        id: "edge-film-Return of the Jedi-ship-Imperial shuttle",
        source: "film-Return of the Jedi",
        target: "ship-Imperial shuttle",
      },
    ],
  };

  it("dispatches fulfilled action and returns graph data when API request succeeds", async () => {
    (fetchData as jest.Mock).mockResolvedValueOnce(mockData);
    (groupByFilms as jest.Mock).mockReturnValueOnce(shipsGroupedByFilm);
    (createGraphData as jest.Mock).mockReturnValueOnce(mockGraphData);

    const result = await mockStore.dispatch(
      getGraphData({
        shipEndpoint: "ships",
        films: mockFilms,
        characterIntId: 10,
        characterName: "Han Solo",
      })
    );

    expect(result.type).toBe("getGraphData/fulfilled");
    expect(result.payload).toEqual({
      graphData: mockGraphData,
      characterName: "Han Solo",
    });

    expect(fetchData).toHaveBeenCalledWith("ships", "1,2,3,4,5,6", 10);
    expect(groupByFilms).toHaveBeenCalledWith(mockData, mockFilms, 10);
    expect(createGraphData).toHaveBeenCalledWith(
      "Han Solo",
      shipsGroupedByFilm
    );
  });

  it("dispatches rejected action when API request fails", async () => {
    const mockError = new Error("API Error");
    (fetchData as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await mockStore.dispatch(
      getGraphData({
        shipEndpoint: "ships",
        films: mockFilms,
        characterIntId: 10,
        characterName: "Han Solo",
      })
    );

    expect(result.type).toBe("getGraphData/rejected");
    expect(result.payload).toStrictEqual({ message: mockError.message });
  });
});
