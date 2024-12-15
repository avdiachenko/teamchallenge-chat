import { createFileRoute } from "@tanstack/react-router";

import { ForgotPassword } from "@/pages/ForgotPassword/ForgotPassword";

export const Route = createFileRoute("/auth/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPassword />;
}
