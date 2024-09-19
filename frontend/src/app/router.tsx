import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";
import { ProtectedRoute } from "./ProtectedRoute";

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
    path: "/signup",
    lazy: async () => {
      const { SignUp } = await import("../pages/SignUp/SignUp");
      return { Component: SignUp };
    },
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    lazy: async () => {
      const { SignIn } = await import("../pages/SignIn/SignIn");
      return { Component: SignIn };
    },
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    lazy: async () => {
      const { ForgotPassword } = await import("../pages/ForgotPassword/ForgotPassword");
      return { Component: ForgotPassword };
    },
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password",
    lazy: async () => {
      const { ResetPassword } = await import("../pages/ResetPassword/ResetPassword");
      return { Component: ResetPassword };
    },
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
