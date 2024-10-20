import { Link } from "react-router-dom";
import { setCharacterName } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { CharactersListProps } from "../../types";
import { AppDispatch } from "../../redux/store";
import css from "./CharactersList.module.css";

const CharactersList: React.FC<CharactersListProps> = ({ charactersList }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleClick = (name: string) => {
    dispatch(setCharacterName(name));
  };
  return (
    <ul className={css.charactersList}>
      {charactersList.map((character) => (
        <li key={character.id}>
          <Link
            className={css.character}
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
