// export function createGraphData(heroName, filmsData) {
//   const initialNodes = [];
//   const initialEdges = [];

//   // Добавляем узел для героя
//   const heroNode = {
//     id: heroName,
//     type: "default",
//     position: { x: 0, y: 0 },
//     data: { label: heroName },
//   };
//   initialNodes.push(heroNode);

//   // Добавляем узлы для фильмов и кораблей
//   let yOffset = 100;
//   Object.entries(filmsData).forEach(([filmName, ships], filmIndex) => {
//     // Узел фильма
//     const filmNodeId = `film-${filmIndex}`;
//     const filmNode = {
//       id: filmNodeId,
//       type: "default",
//       position: { x: -200, y: yOffset },
//       data: { label: filmName },
//     };
//     initialNodes.push(filmNode);

//     // Связь между героем и фильмом
//     initialEdges.push({
//       id: `edge-${heroName}-${filmNodeId}`,
//       source: heroName,
//       target: filmNodeId,
//       type: "smoothstep",
//     });

//     // Узлы и связи для кораблей, которые появились в фильме
//     ships.forEach((ship, shipIndex) => {
//       const shipNodeId = `ship-${filmIndex}-${shipIndex}`;
//       const shipNode = {
//         id: shipNodeId,
//         type: "default",
//         position: { x: -400, y: yOffset + shipIndex * 80 },
//         data: { label: ship },
//       };
//       initialNodes.push(shipNode);

//       // Связь между фильмом и кораблём
//       initialEdges.push({
//         id: `edge-${filmNodeId}-${shipNodeId}`,
//         source: filmNodeId,
//         target: shipNodeId,
//         type: "smoothstep",
//       });
//     });

//     yOffset += 200; // Увеличиваем смещение по Y для следующего фильма
//   });

//   return { initialNodes, initialEdges };
// }

// export function createGraphData(heroName, filmsData) {
//   const initialNodes = [];
//   const initialEdges = [];

//   // Позиция для главной ноды
//   const heroNode = {
//     id: heroName,
//     type: "default",
//     position: { x: 0, y: 0 }, // Главная нода в центре сверху
//     data: { label: heroName },
//   };
//   initialNodes.push(heroNode);

//   // Задаем начальное смещение для фильмов
//   const filmYOffset = 100; // Смещение по Y для фильмов
//   const filmSpacing = 200; // Расстояние между фильмами по X

//   // Добавляем узлы для фильмов
//   Object.entries(filmsData).forEach(([filmName, ships], filmIndex) => {
//     const filmNodeId = `film-${filmIndex}`;
//     const filmNode = {
//       id: filmNodeId,
//       type: "default",
//       position: {
//         x: (filmIndex - (Object.keys(filmsData).length - 1) / 2) * filmSpacing,
//         y: filmYOffset,
//       },
//       data: { label: filmName },
//     };
//     initialNodes.push(filmNode);

//     // Связь между героем и фильмом
//     initialEdges.push({
//       id: `edge-${heroName}-${filmNodeId}`,
//       source: heroName,
//       target: filmNodeId,
//       type: "smoothstep",
//     });

//     // Позиция для кораблей
//     const shipYOffset = filmYOffset + 100; // Смещение по Y для кораблей
//     const shipSpacing = 200; // Расстояние между кораблями по X

//     ships.forEach((ship, shipIndex) => {
//       const shipNodeId = `ship-${filmIndex}-${shipIndex}`;
//       const shipNode = {
//         id: shipNodeId,
//         type: "default",
//         position: {
//           x: (shipIndex - (ships.length - 1) / 2) * shipSpacing,
//           y: shipYOffset,
//         },
//         data: { label: ship },
//       };
//       initialNodes.push(shipNode);

//       // Связь между фильмом и кораблём
//       initialEdges.push({
//         id: `edge-${filmNodeId}-${shipNodeId}`,
//         source: filmNodeId,
//         target: shipNodeId,
//         type: "smoothstep",
//       });
//     });
//   });

//   return { initialNodes, initialEdges };
// }

export function createGraphData(heroName, filmShipMapping) {
  const initialNodes = [];
  const initialEdges = [];

  // Create the hero node at the center top
  const heroNodeId = `hero-${heroName}`;
  initialNodes.push({
    id: heroNodeId,
    type: "input",
    data: { label: heroName },
    position: { x: 400, y: 50 }, // Adjust x to center horizontally
  });

  // Create film nodes below the hero node
  Object.keys(filmShipMapping).map((filmTitle, index) => {
    const filmNodeId = `film-${filmTitle}`;
    initialNodes.push({
      id: filmNodeId,
      type: "default",
      data: { label: filmTitle },
      position: { x: 200 + index * 200, y: 200 }, // Spread films horizontally
    });

    // Create an edge from the hero node to each film node
    initialEdges.push({
      id: `edge-${heroNodeId}-${filmNodeId}`,
      source: heroNodeId,
      target: filmNodeId,
    });

    return filmNodeId;
  });

  // Create ship nodes below film nodes and connect them to corresponding films
  Object.entries(filmShipMapping).forEach(([filmTitle, shipNames]) => {
    const filmNodeId = `film-${filmTitle}`;

    shipNames.forEach((shipName, shipIndex) => {
      const shipNodeId = `ship-${shipName}`;

      // Add the ship node if it doesn't already exist
      if (!initialNodes.some((node) => node.id === shipNodeId)) {
        initialNodes.push({
          id: shipNodeId,
          type: "output",
          data: { label: shipName },
          position: { x: 100 + shipIndex * 200, y: 400 }, // Spread ships horizontally
        });
      }

      // Create an edge from the film node to the ship node
      initialEdges.push({
        id: `edge-${filmNodeId}-${shipNodeId}`,
        source: filmNodeId,
        target: shipNodeId,
      });
    });
  });

  return { initialNodes, initialEdges };
}
