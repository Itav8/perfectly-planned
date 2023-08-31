import { AuthContext } from "../../hooks/useAuth/useAuth";
import { firebaseApp } from "../../hooks/useAuth/firebaseConfig";
import { authedRoutes, mainRoutes } from "../../routes/routes";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { Modal } from "../Modal/Modal";

import "./Navbar.css";

export const Navbar = () => {
  const { isLoggedIn, ...authData } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onLogoutClick = () => {
    firebaseApp.auth().signOut();
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

              <a className="navbar__link" onClick={openModal}>
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
      <Modal open={isModalOpen} onClose={closeModal}>
        <button onClick={onLogoutClick}>Confirm Logout?</button>
      </Modal>
    </div>
  );
};
