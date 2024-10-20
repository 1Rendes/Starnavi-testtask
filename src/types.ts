import { Edge, Node } from "reactflow";

export type InitialState = {
  page: number;
  renderData: {
    id: number;
    name: string;
    films: number[];
    starships: number[];
    [key: string]: any;
  }[];
  homePageEndpoint: string;
  filmsEndpoint: string;
  shipEndpoint: string;
  films: { id: number; title: string }[];
  graphData: GraphData;
  isLoaded: boolean;
  characterName: string;
  characterId: number | string;
  error: string;
};

export interface CustomNodeData {
  label: string;
}

export type GraphData = {
  initialNodes: Node<CustomNodeData>[];
  initialEdges: Edge[];
};

export type RenderData = {
  id: number;
  name: string;
  films: number[];
  starships: number[];
  [key: string]: any;
}[];

export type Films = Film[];
export type Film = { id: number; title: string };
export type FilmMapping = {
  [filmTitle: string]: string[];
};

export type GraphDataPayload = {
  graphData: GraphData;
  characterName: string;
};

export type GetOnePageListValues = { endpoint: string; page: number };

export type GetGraphDataValues = {
  shipEndpoint: string;
  films: Films;
  characterId: string | undefined;
  characterName: string;
};

export type Character = {
  id: number;
  name: string;
};

export type CharactersListProps = {
  charactersList: Character[];
};

export type FlowProps = {
  graphData: GraphData;
};

export type LoadMoreButtonProps = {
  onClick: () => void;
};

export type RejectedValue = {
  message: string;
}