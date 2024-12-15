import "./shared/styles/index.css";
import "./shared/styles/variables.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import axios from "axios";
import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";

import { useUserStore } from "@/entities/user/user.store";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { BASE_API_URL } from "./shared/constants/urls";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    user: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

axios.defaults.baseURL = BASE_API_URL;

const queryClient = new QueryClient();

function InnerApp() {
  const user = useUserStore();
  const { token, isInitialized, initialization } = user;

  useEffect(() => {
    if (!isInitialized) initialization();
  }, [token, initialization, isInitialized]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ user }} />
    </QueryClientProvider>
  );
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <InnerApp />
    </StrictMode>
  );
}
