import { createGraphData } from "./createGraphData";
import { Node, Edge } from "reactflow";
import { FilmMapping } from "../types";

describe("createGraphData", () => {
  const heroName = "Obi-Wan Kenobi";
  const filmShipMapping: FilmMapping = {
    "Attack of the Clones": ["Jedi starfighter"],
    "Revenge of the Sith": [
      "Jedi starfighter",
      "Trade Federation cruiser",
      "Naboo star skiff",
      "Jedi Interceptor",
      "Belbullab-22 starfighter",
    ],
  };

  it("should create nodes and edges correctly", () => {
    const { initialNodes, initialEdges } = createGraphData(
      heroName,
      filmShipMapping
    );

    const expectedNodes: Node[] = [
      {
        id: `hero-${heroName}`,
        type: "input",
        data: { label: heroName },
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
    ];

    const expectedEdges: Edge[] = [
      {
        id: `edge-hero-${heroName}-film-Attack of the Clones`,
        source: `hero-${heroName}`,
        target: "film-Attack of the Clones",
      },
      {
        id: `edge-hero-${heroName}-film-Revenge of the Sith`,
        source: `hero-${heroName}`,
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
    ];

    expect(initialNodes).toEqual(expectedNodes);
    expect(initialEdges).toEqual(expectedEdges);
  });
});
