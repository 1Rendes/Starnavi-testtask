import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "reactflow/dist/style.css";
import Flow from "../components/Flow/Flow";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCharacterName,
  selectFilms,
  selectFilmsEndpoint,
  selectGraphData,
  selectIsLoaded,
  selectShipEndpoint,
} from "../redux/selectors";
import { getFilmsData, getGraphData } from "../redux/operations";
import { resetFilmData } from "../redux/slice";
import { AppDispatch } from "../redux/store";

const CharacterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filmsEndpoint = useSelector(selectFilmsEndpoint);
  const shipEndpoint = useSelector(selectShipEndpoint);
  const characterName = useSelector(selectCharacterName);
  const graphData = useSelector(selectGraphData);
  const films = useSelector(selectFilms);
  const { characterId } = useParams();
  const isLoaded = useSelector(selectIsLoaded);

  useEffect(() => {
    if (graphData.initialNodes.length) return;
    dispatch(getFilmsData(filmsEndpoint));
  }, []);

  useEffect(() => {
    if (!films.length) return;
    dispatch(getGraphData({ shipEndpoint, films, characterId, characterName }));
    dispatch(resetFilmData());
  }, [films]);

  return <>{isLoaded && <Flow graphData={graphData} />}</>;
};

export default CharacterPage;
