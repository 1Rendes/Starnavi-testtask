import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import CharactersList from "../components/CharactersList";
import { BrowserRouter } from "react-router-dom";

test("renders character names", () => {
  const charactersList = [{ id: 1, name: "Luke Skywalker" }];

  render(
    <BrowserRouter>
      <Provider store={store}>
        <CharactersList charactersList={charactersList} />
      </Provider>
    </BrowserRouter>
  );

  expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
});
