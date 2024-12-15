import { createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { Home } = await import("../pages/Home/Home");
      return { Component: Home };
    },
  },
  {
    path: "/chat",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/chat",
        lazy: async () => {
          const { Chat } = await import("../pages/Chat/Chat");
          return { Component: Chat };
        },
      },
    ],
  },
  {
    path: "/notifications",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/notifications",
        lazy: async () => {
          const { Notifications } = await import("../pages/Notifications/Notifications");
          return { Component: Notifications };
        },
      },
    ],
  },
  {
    path: "/update-password/:tempCode",
    element: <PublicRoute />,
    children: [
      {
        path: "/update-password/:tempCode",
        lazy: async () => {
          const { ResetPassword } = await import("../pages/ResetPassword/ResetPassword");
          return { Component: ResetPassword };
        },
      },
    ],
  },
  {
    path: "/ResidentComplexInfo/:name",
    lazy: async () => {
      const { ResidentComplexInfo } = await import(
        "../pages/ResidentComplexInfo/ResidentComplexInfo"
      );
      return { Component: ResidentComplexInfo };
    },
  },
]);
