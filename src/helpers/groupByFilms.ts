import { FilmMapping, Film } from "../types";

type Ship = {
  name: string;
  films: number[]; // Array of film IDs
};

type ShipsData = {
  results: Ship[];
};

export function groupByFilms(ships: ShipsData, films: Film[]): FilmMapping {
  const filmMapping: FilmMapping = {};

  // Create an object for quick lookup of film title by its ID
  const filmIdToTitle = films.reduce<Record<number, string>>((acc, film) => {
    acc[film.id] = film.title;
    return acc;
  }, {});

  // Iterate over each ship in the results
  ships.results.forEach((ship) => {
    // Iterate over each film in which the ship appeared
    ship.films.forEach((filmId) => {
      // Get the film title by its ID
      const filmTitle = filmIdToTitle[filmId];

      // If the film is not yet added to filmMapping, create an empty array for it
      if (!filmMapping[filmTitle]) {
        filmMapping[filmTitle] = [];
      }

      // Add the ship's name to the array for the corresponding film
      filmMapping[filmTitle].push(ship.name);
    });
  });

  return filmMapping;
}
