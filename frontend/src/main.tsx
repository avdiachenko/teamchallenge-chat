import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { App } from "./app/app.tsx";
import { router } from "./app/router.tsx";
import "./shared/styles/index.css";
import "./shared/styles/variables.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </StrictMode>
);
