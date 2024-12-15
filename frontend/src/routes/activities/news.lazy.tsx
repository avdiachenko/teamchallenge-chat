import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/activities/news")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/activities/news"!</div>;
}
