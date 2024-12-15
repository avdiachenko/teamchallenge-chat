import { useLocation, useNavigate } from "@tanstack/react-router";

import { BaseButton } from "@/shared/components/BaseButton/BaseButton";

import styles from "./NewsMenu.module.css";

export function NewsMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={styles.menu}>
      <BaseButton
        variant={pathname === "/notifications" ? "primary" : "light"}
        onClick={() => navigate({ to: "/activities/notifications" })}
      >
        Notifications
      </BaseButton>
      <BaseButton
        variant={pathname === "/votings" ? "primary" : "light"}
        onClick={() => navigate({ to: "/activities/votings" })}
      >
        Votings
      </BaseButton>
      <BaseButton
        variant={pathname === "/news" ? "primary" : "light"}
        onClick={() => navigate({ to: "/activities/news" })}
      >
        News
      </BaseButton>
    </div>
  );
}
