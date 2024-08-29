import { createBrowserRouter } from "react-router-dom";

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
    lazy: async () => {
      const { Chat } = await import("../pages/Chat/Chat");
      return { Component: Chat };
    },
  },
  {
    path: "/signup",
    lazy: async () => {
      const { SignUp } = await import("../pages/SignUp/SignUp");
      return { Component: SignUp };
    },
  },
  {
    path: "/signin",
    lazy: async () => {
      const { SignIn } = await import("../pages/SignIn/SignIn");
      return { Component: SignIn };
    },
  },
]);
