import { ContainerProps } from "@/types";
import css from "./Container.module.css";

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={css.container}>{children}</div>;
};

export default Container;
