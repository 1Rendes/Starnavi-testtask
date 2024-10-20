import { groupByFilms } from "./groupByFilms";
import { Film, FilmMapping } from "../types";

describe("groupByFilms", () => {
  const shipsData = {
    results: [
      {
        name: "Jedi starfighter",
        films: [5, 6],
      },
      {
        name: "Trade Federation cruiser",
        films: [6],
      },
      {
        name: "Naboo star skiff",
        films: [6],
      },
      {
        name: "Jedi Interceptor",
        films: [6],
      },
      {
        name: "Belbullab-22 starfighter",
        films: [6],
      },
    ],
  };

  const films: Film[] = [
    { id: 5, title: "Attack of the Clones" },
    { id: 6, title: "Revenge of the Sith" },
  ];

  it("should group ships by films correctly", () => {
    const filmMapping: FilmMapping = groupByFilms(shipsData, films);

    const expectedMapping: FilmMapping = {
      "Attack of the Clones": ["Jedi starfighter"],
      "Revenge of the Sith": [
        "Jedi starfighter",
        "Trade Federation cruiser",
        "Naboo star skiff",
        "Jedi Interceptor",
        "Belbullab-22 starfighter",
      ],
    };

    expect(filmMapping).toEqual(expectedMapping);
  });
});
