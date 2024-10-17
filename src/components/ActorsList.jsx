import { Link } from "react-router-dom";

const ActorsList = ({ actorsList }) => {
  return (
    <ul>
      {actorsList.map((actor) => (
        <li key={actor.id}>
          <Link to={`/${actor.id}`} state={actor.name}>
            {actor.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ActorsList;
