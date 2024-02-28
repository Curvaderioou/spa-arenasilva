import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import { Authentication } from "./pages/Authentication/Authentication";
import { GlobalStyled } from "./GlobalStyled";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.jsx";
import UserProvider from "./Context/UserContext.jsx";
import { Court } from "./pages/Court/Court.jsx";
import Reserves from "./pages/Reserves/Reserves.jsx";
import Search from "./pages/Search/Search.jsx";
import Archives from "./pages/Archives/Archives.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/quadra",
        element: <Court />,
      },
      {
        path: "/reservas/:idCourt",
        element: <Reserves />,
      },
      {
        path: "/search/:client",
        element: <Search />,
      },
      {
        path: "/arquivados",
        element: <Archives />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyled />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
