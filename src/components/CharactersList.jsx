import { Link } from "react-router-dom";
import { setCharacterName } from "../redux/slice";
import { useDispatch } from "react-redux";

const CharactersList = ({ charactersList }) => {
  const dispatch = useDispatch();
  const handleClick = (name) => {
    dispatch(setCharacterName(name));
  };
  return (
    <ul>
      {charactersList.map((character) => (
        <li key={character.id}>
          <Link
            to={`/characters/${character.id}`}
            state={character.name}
            onClick={() => handleClick(character.name)}
          >
            {character.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
