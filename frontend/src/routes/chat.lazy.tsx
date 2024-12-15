import { createLazyFileRoute } from "@tanstack/react-router";

import { Chat } from "@/pages/Chat/Chat";

export const Route = createLazyFileRoute("/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Chat />;
}
