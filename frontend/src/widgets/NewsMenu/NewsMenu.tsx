import { useLocation, useNavigate } from "react-router-dom";
import { BaseButton } from "../../shared/components/BaseButton/BaseButton";
import styles from "./NewsMenu.module.css";

export function NewsMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={styles.menu}>
      <BaseButton
        variant={pathname === "/notifications" ? "primary" : "quaternary"}
        onClick={() => navigate("/notifications")}
      >
        Notifications
      </BaseButton>
      <BaseButton
        variant={pathname === "/votings" ? "primary" : "quaternary"}
        onClick={() => navigate("/votings")}
      >
        Votings
      </BaseButton>
      <BaseButton
        variant={pathname === "/news" ? "primary" : "quaternary"}
        onClick={() => navigate("/news")}
      >
        News
      </BaseButton>
    </div>
  );
}
