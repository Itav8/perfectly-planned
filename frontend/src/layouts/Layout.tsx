import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navigation/Navbar";
import { MobileNavbar } from "../components/Navigation/MobileNavbar";
import { Outlet } from "react-router-dom";

import "./Layout.css";

export const Layout = () => {
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <div className="layout__content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
