export function groupByFilms(ships, films) {
  const filmMapping = {};

  // Создаём объект для быстрого поиска названия фильма по его ID
  const filmIdToTitle = films.reduce((acc, film) => {
    acc[film.id] = film.title;
    return acc;
  }, {});

  // Проходим по каждому кораблю в results
  ships.results.forEach((ship) => {
    // Проходим по каждому фильму, в котором участвовал данный корабль
    ship.films.forEach((filmId) => {
      // Получаем название фильма по его ID
      const filmTitle = filmIdToTitle[filmId];

      // Если фильм ещё не добавлен в объект filmMapping, создаём для него пустой массив
      if (!filmMapping[filmTitle]) {
        filmMapping[filmTitle] = [];
      }

      // Добавляем название корабля в массив соответствующего фильма
      filmMapping[filmTitle].push(ship.name);
    });
  });

  return filmMapping;
}
