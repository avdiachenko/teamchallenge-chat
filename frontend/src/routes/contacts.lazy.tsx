import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/contacts"!</div>;
}
