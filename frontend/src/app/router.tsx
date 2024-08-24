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
]);
