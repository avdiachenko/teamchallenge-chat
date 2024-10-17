import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { Home } = await import("../pages/Home/Home");
      return { Component: Home };
    },
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <PublicRoute />,
    children: [
      {
        path: "/signup",
        lazy: async () => {
          const { SignUp } = await import("../pages/SignUp/SignUp");
          return { Component: SignUp };
        },
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: <PublicRoute />,
    children: [
      {
        path: "/signin",
        lazy: async () => {
          const { SignIn } = await import("../pages/SignIn/SignIn");
          return { Component: SignIn };
        },
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <PublicRoute />,
    children: [
      {
        path: "/forgot-password",
        lazy: async () => {
          const { ForgotPassword } = await import("../pages/ForgotPassword/ForgotPassword");
          return { Component: ForgotPassword };
        },
      },
    ],
    errorElement: <ErrorPage />,
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
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/ResidentComplexInfo/:name",
    lazy: async () => {
      const { ResidentComplexInfo } = await import(
        "../pages/ResidentComplexInfo/ResidentComplexInfo"
      );
      return { Component: ResidentComplexInfo };
    },
    errorElement: <ErrorPage />,
  }
]);
