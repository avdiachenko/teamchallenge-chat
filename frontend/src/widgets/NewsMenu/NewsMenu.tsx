import { useLocation } from "react-router-dom";
import { BaseButton } from "../../shared/components/BaseButton/BaseButton";
import styles from "./NewsMenu.module.css";

export function NewsMenu({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  const { pathname } = useLocation();

  return (
    <div className={styles.menu}>
      <BaseButton
        variant={pathname === "/notifications" ? "primary" : "quaternary"}
        onClick={onClick}
      >
        Notifications
      </BaseButton>
      <BaseButton variant={pathname === "/votings" ? "primary" : "quaternary"} onClick={onClick}>
        Votings
      </BaseButton>
      <BaseButton variant={pathname === "/news" ? "primary" : "quaternary"} onClick={onClick}>
        News
      </BaseButton>
    </div>
  );
}
