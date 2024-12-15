import { createFileRoute } from "@tanstack/react-router";

import { SignUp } from "@/pages/SignUp/SignUp";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUp />;
}
