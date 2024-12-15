import { createFileRoute, redirect } from "@tanstack/react-router";

import { SignIn } from "@/pages/SignIn/SignIn";
import { Spinner } from "@/shared/components/Spinner/Spinner";

export const Route = createFileRoute("/auth/__root")({
  beforeLoad: ({ context }) => {
    console.log("pre-load");
    if (!context.user.isInitialized) return <Spinner />;
    if (context.user.isAuth()) {
      console.log("already auth");
      throw redirect({
        to: "/chat",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <SignIn />;
}
