import { createLazyFileRoute } from "@tanstack/react-router";

import { Home as HomePage } from "../pages/Home/Home";

export const Route = createLazyFileRoute("/home")({
  component: Home,
});

function Home() {
  return <HomePage />;
}
