import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navigation from "./Navigation";

test("renders navigation link to Home", () => {
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "/");
});
