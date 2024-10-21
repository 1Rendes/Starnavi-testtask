import { groupByFilms } from "./groupByFilms";
import { Film, FilmMapping } from "../types";

describe("groupByFilms", () => {
  const shipsData = {
    results: [
      {
        name: "Jedi starfighter",
        films: [5, 6],
        pilots: [10],
      },
      {
        name: "Trade Federation cruiser",
        films: [6],
        pilots: [10],
      },
      {
        name: "Naboo star skiff",
        films: [6],
        pilots: [10],
      },
      {
        name: "Jedi Interceptor",
        films: [6],
        pilots: [11],
      },
      {
        name: "Belbullab-22 starfighter",
        films: [6],
        pilots: [10],
      },
    ],
  };

  const films: Film[] = [
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

  it("should group ships by films correctly for character with ID 10", () => {
    const filmMapping: FilmMapping = groupByFilms(shipsData, films, 10);

    const expectedMapping: FilmMapping = {
      "A New Hope": [],
      "Attack of the Clones": ["Jedi starfighter"],
      "Return of the Jedi": [],
      "Revenge of the Sith": [
        "Jedi starfighter",
        "Trade Federation cruiser",
        "Naboo star skiff",
        "Belbullab-22 starfighter",
      ],
      "The Empire Strikes Back": [],
    };

    expect(filmMapping).toEqual(expectedMapping);
  });
});
