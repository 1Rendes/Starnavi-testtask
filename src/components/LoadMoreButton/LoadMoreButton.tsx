import { LoadMoreButtonProps } from "../../types";
import css from "./LoadMoreButton.module.css";

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <button className={css.button} onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreButton;
