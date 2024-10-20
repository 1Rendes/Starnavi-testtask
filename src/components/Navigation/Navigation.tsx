import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
    return [css.navElement, isActive && css.active].join(" ");
  };

  return (
    <div className={css.navigationDiv}>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
    </div>
  );
};

export default Navigation;
