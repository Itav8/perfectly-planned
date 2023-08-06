import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../pages/Landing/Landing";
import { Events } from "../pages/Events/Events";
import { Login } from "../pages/Auth/Login";
import { Layout } from "../layouts/Layout";

// We have two types of routes: main routes and authed routes.
// Main routes are routes that are accessible to everyone, such as the landing page.
// Authed routes are routes that are only accessible to authenticated users, such as the events page.

// TODO: Add authed routes.
export const mainRoutes = [
  {
    path: "/",
    element: <Landing />,
    name: "Landing",
  },
  {
    path: "/events",
    element: <Events />,
    name: "Events",
  },
  {
    path: "/login",
    element: <Login />,
    name: "Login",
  },
];

const routes = [
  {
    element: <Layout />,
    children: mainRoutes,
  },
];

export const router = createBrowserRouter(routes);
