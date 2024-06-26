import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import "./index.css";
import App from "./routes/App.jsx";
import RootLayout from "./routes/layout.jsx";
import Login from "./routes/Login.jsx";
import LuckDraw from "./routes/LuckDraw.jsx";
import ProtectedRoutes from "./routes/ProtectedRoutes.jsx";
import TradingCard from "./routes/TradingCard.jsx";
import Signup from "./routes/Signup.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/lucky-draw",
            element: <LuckDraw />,
          },
          {
            path: "/trading",
            element: <TradingCard />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
