import { createFileRoute, redirect } from "@tanstack/react-router";

import { SignIn } from "@/pages/SignIn/SignIn";
import { Spinner } from "@/shared/components/Spinner/Spinner";

export const Route = createFileRoute("/auth/signin")({
  beforeLoad: ({ context }) => {
    if (!context.user.isInitialized) return <Spinner />;
    if (context.user.isAuth()) {
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
