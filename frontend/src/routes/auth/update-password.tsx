import { createFileRoute } from "@tanstack/react-router";

import { ResetPassword } from "@/pages/ResetPassword/ResetPassword";

export const Route = createFileRoute("/auth/update-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResetPassword />;
}
