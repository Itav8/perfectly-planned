import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../pages/Landing/Landing";
import { Events } from "../pages/Events/Events";
import { Login } from "../pages/Auth/Login";
import { Layout } from "../layouts/Layout";
import { FindPlace } from "../pages/Location/FindPlace";
import { Guests } from "../pages/Guests/Guests";
// We have two types of routes: main routes and authed routes.
// Main routes are routes that are accessible to everyone, such as the landing page.
// Authed routes are routes that are only accessible to authenticated users, such as the events page.

// TODO: Add authed routes.
export const authedRoutes = [
  {
    path: "/",
    element: <Landing />,
    name: "Home",
  },
  {
    path: "/events",
    element: <Events />,
    name: "Events",
  },
  {
    path: "/guests",
    element: <Guests />,
    name: "Guests",
  },
  {
    path: "/findplace",
    element: <FindPlace />,
    name: "FindPlace",
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
];

export const mainRoutes = [
  {
    path: "/",
    element: <Landing />,
    name: "Home",
  },
  {
    path: "/login",
    element: <Login />,
    name: "Login",
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
];

const routes = [
  {
    element: <Layout />,
    children: mainRoutes,
  },
  {
    element: <Layout />,
    children: authedRoutes,
  },
];

export const router = createBrowserRouter(routes);
