import { createLazyFileRoute } from "@tanstack/react-router";

import { Notifications } from "@/pages/Notifications/Notifications";

export const Route = createLazyFileRoute("/activities/notifications")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Notifications />;
}
