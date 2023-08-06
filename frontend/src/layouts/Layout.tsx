import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navigation/Navbar";
import { Outlet } from "react-router-dom";

import "./Layout.css";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="layout__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
