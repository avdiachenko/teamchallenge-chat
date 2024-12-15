import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/neighbours")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/neighbours"!</div>;
}
