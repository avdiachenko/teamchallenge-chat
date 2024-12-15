import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/payments")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/payments"!</div>;
}
