import { createFileRoute, redirect } from "@tanstack/react-router";

import { Notifications } from "@/pages/Notifications/Notifications";
import { Spinner } from "@/shared/components/Spinner/Spinner";

export const Route = createFileRoute("/activities/__root")({
  beforeLoad: ({ context, location }) => {
    if (!context.user.isInitialized) return <Spinner />;
    if (!context.user.isAuth()) {
      throw redirect({
        to: "/auth/signin",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Notifications />;
}
