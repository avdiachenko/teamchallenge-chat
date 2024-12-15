import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/activities/votings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/activities/votings"!</div>;
}
