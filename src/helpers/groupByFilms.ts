import { FilmMapping, Film } from "../types";

type Ship = {
  name: string;
  films: number[]; // Array of film IDs
  pilots: number[];
};

type ShipsData = {
  results: Ship[];
};

export function groupByFilms(
  ships: ShipsData,
  films: Film[],
  characterId: number
): FilmMapping {
  // Create an object for quick lookup of film title by its ID
  const filmIdToTitle = films.reduce<Record<number, string>>((acc, film) => {
    acc[film.id] = film.title;
    return acc;
  }, {});

  // Create the mapping with ships grouped by films
  const filmMapping = ships.results.reduce<FilmMapping>((acc, ship) => {
    // Check if the character is a pilot of the ship
    if (ship.pilots.includes(characterId)) {
      // Iterate over each film in which the ship appeared
      ship.films.forEach((filmId) => {
        const filmTitle = filmIdToTitle[filmId];
        if (filmTitle) {
          // Initialize the array if it doesn't exist and add the ship name
          if (!acc[filmTitle]) {
            acc[filmTitle] = [];
          }
          acc[filmTitle].push(ship.name);
        }
      });
    }

    return acc;
  }, {});

  // Add empty arrays for films in which the character appeared but has no ships
  films.forEach((film) => {
    if (film.characters.includes(characterId) && !filmMapping[film.title]) {
      filmMapping[film.title] = [];
    }
  });

  return filmMapping;
}
