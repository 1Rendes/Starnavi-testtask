import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import { groupByFilms } from "../helpers/groupByFilms";
import { createGraphData } from "../helpers/createGraphData";
import "reactflow/dist/style.css";
import Flow from "../components/Flow";

const CharacterPage = () => {
  const location = useLocation();
  const characterName = location.state;
  const { characterId } = useParams();
  const [films, setFilms] = useState([]);
  const filmsEndpoint = "films/";
  const shipEndpoint = "starships/";
  const [graphData, setGraphData] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getFilmsData = async () => {
      const { results } = await fetchData(filmsEndpoint);
      const films = results.map((filmsData) => ({
        id: filmsData.id,
        title: filmsData.title,
      }));
      setFilms(films);
    };
    getFilmsData();
  }, []);

  useEffect(() => {
    if (!films.length) return;
    const getShipsData = async () => {
      const shipsData = await fetchData(
        shipEndpoint,
        films.map((film) => film.id).join(","),
        characterId
      );
      const ShipsGroupedByFilm = groupByFilms(shipsData, films);
      const graphData = createGraphData(characterName, ShipsGroupedByFilm);
      setLoaded(true);
      setGraphData(graphData);
    };
    getShipsData();
  }, [characterId, characterName, films]);

  return <>{loaded && <Flow graphData={graphData} />}</>;
};

export default CharacterPage;
