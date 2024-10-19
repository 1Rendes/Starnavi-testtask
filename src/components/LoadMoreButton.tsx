import { LoadMoreButtonProps } from "../types";

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Load More</button>;
};

export default LoadMoreButton;
