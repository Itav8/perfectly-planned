import { useState, useContext } from "react";
import { AuthContext } from "../../hooks/useAuth/useAuth";
import { firebaseApp } from "../../hooks/useAuth/firebaseConfig";
import { authedRoutes, mainRoutes } from "../../routes/routes";
import { NavLink } from "react-router-dom";
import { Modal } from "../Modal/Modal";

import "./MobileNavbar.css";

export const MobileNavbar = () => {
  const { isLoggedIn, ...authData } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onLogoutClick = () => {
    firebaseApp.auth().signOut();
    setIsModalOpen(false);
  };

  return (
    <nav className="mobile-navbar">
      <span
        onClick={() => setMenuOpen(!menuOpen)}
        className="material-symbols-outlined mobile-navbar__hamburger"
      >
        menu
      </span>
      {menuOpen ? (
        <div className="mobile-navbar__container">
          <div
            className="mobile-navbar__close"
            onClick={() => setMenuOpen(false)}
          >
            x
          </div>
          <div className="mobile-navbar__links">
            {isLoggedIn && (
              <>
                {authedRoutes.map((route) => {
                  return (
                    <NavLink
                      onClick={() => setMenuOpen(false)}
                      className="mobile-navbar__link"
                      key={route.path}
                      to={route.path}
                    >
                      {route.name}
                    </NavLink>
                  );
                })}
                <span className="mobile-navbar__link--logout">
                  {authData.userData?.photoURL && (
                    <img
                      className="mobile-navbar__link--logout-photo"
                      src={authData.userData.photoURL}
                    />
                  )}

                  <a
                    className="mobile-navbar__link"
                    onClick={() => {
                      setIsModalOpen(true);
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </a>
                </span>
              </>
            )}

            {!isLoggedIn &&
              mainRoutes.map((route) => {
                return (
                  <NavLink
                    onClick={() => setMenuOpen(false)}
                    className="navbar__link"
                    key={route.path}
                    to={route.path}
                  >
                    {route.name}
                  </NavLink>
                );
              })}
          </div>
          <Modal
            open={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setMenuOpen(false);
            }}
          >
            <button onClick={onLogoutClick}>Confirm Logout?</button>
          </Modal>
        </div>
      ) : null}
    </nav>
  );
};
