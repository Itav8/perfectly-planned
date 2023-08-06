import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navigation/Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
