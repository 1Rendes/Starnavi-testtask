import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import { groupByFilms } from "../helpers/groupByFilms";
import { createGraphData } from "../helpers/createGraphData";
import "reactflow/dist/style.css";
import Flow from "./Flow";

const ActorCard = () => {
  const location = useLocation();
  const actorName = location.state;
  const { actorId } = useParams();
  const [films, setFilms] = useState([]);
  // const [shipsInFilms, setShipsInFilms] = useState({});
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
        actorId
      );
      const ShipsGroupedByFilm = groupByFilms(shipsData, films);
      const graphData = createGraphData(actorName, ShipsGroupedByFilm);
      console.log(graphData);
      setLoaded(true);
      setGraphData(graphData);
    };
    getShipsData();
  }, [actorId, actorName, films]);

  return <div>{loaded && <Flow graphData={graphData} />}</div>;
};

export default ActorCard;
