import { render, screen, fireEvent } from "@testing-library/react";
import LoadMoreButton from "./LoadMoreButton";
import { LoadMoreButtonProps } from "../../types";

test("renders Load More button", () => {
  const mockOnClick = jest.fn();
  render(<LoadMoreButton onClick={mockOnClick} />);
  const buttonElement = screen.getByText(/Load More/i);
  expect(buttonElement).toBeInTheDocument();
  fireEvent.click(buttonElement);
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
