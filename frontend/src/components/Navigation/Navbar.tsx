import { NavLink } from "react-router-dom";
import { mainRoutes } from "../../routes/routes";

import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink className="navbar__link navbar__link--logo" to="/">
        Perfectly Planned
      </NavLink>
      <div>
        {mainRoutes.map((route) => {
          return (
            <NavLink className="navbar__link" key={route.path} to={route.path}>
              {route.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};