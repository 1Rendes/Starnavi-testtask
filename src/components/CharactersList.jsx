import { Link } from "react-router-dom";

const CharactersList = ({ charactersList }) => {
  console.log(charactersList);

  return (
    <ul>
      {charactersList.map((character) => (
        <li key={character.id}>
          <Link to={`/${character.id}`} state={character.name}>
            {character.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CharactersList;
