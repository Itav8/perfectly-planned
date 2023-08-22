import { NavLink } from "react-router-dom";
import { authedRoutes, mainRoutes } from "../../routes/routes";

import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../hooks/useAuth/useAuth";
import { firebaseApp } from "../../hooks/useAuth/firebaseConfig";

export const Navbar = () => {
  const { isLoggedIn, ...authData } = useContext(AuthContext);

  const onLogoutClick = () => {
    firebaseApp.auth().signOut();
  };

  return (
    <div className="navbar">
      <NavLink className="navbar__link navbar__link--logo" to="/">
        Perfectly Planned
      </NavLink>
      <div className="navbar__links">
        {isLoggedIn && (
          <>
            {authedRoutes.map((route) => {
              return (
                <NavLink
                  className="navbar__link"
                  key={route.path}
                  to={route.path}
                >
                  {route.name}
                </NavLink>
              );
            })}
            <span className="navbar__link--logout">
              {authData.userData?.photoURL && (
                <img
                  className="navbar__link--logout-photo"
                  src={authData.userData.photoURL}
                />
              )}

              <a className="navbar__link" onClick={onLogoutClick}>
                Logout
              </a>
            </span>
          </>
        )}

        {!isLoggedIn &&
          mainRoutes.map((route) => {
            return (
              <NavLink
                className="navbar__link"
                key={route.path}
                to={route.path}
              >
                {route.name}
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};
