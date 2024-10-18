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
