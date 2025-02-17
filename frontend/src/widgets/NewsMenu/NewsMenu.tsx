import { useLocation } from "react-router-dom";
import { BaseButton } from "../../shared/components/BaseButton/BaseButton";
import styles from "./NewsMenu.module.css";
import { useState } from "react";

export function NewsMenu({
  onClick,
  checked,
}: {
  onClick: (e: React.MouseEvent) => void;
  checked: string;
}) {
  // const [activeButton, setActiveButton] = useState(second)
  return (
    <div className={styles.menu}>
      <BaseButton
        variant={checked.toLocaleLowerCase() === "notifications" ? "primary" : "quaternary"}
        onClick={onClick}
      >
        Notifications
      </BaseButton>
      <BaseButton
        variant={checked.toLocaleLowerCase() === "votings" ? "primary" : "quaternary"}
        onClick={onClick}
      >
        Votings
      </BaseButton>
      <BaseButton
        variant={checked.toLocaleLowerCase() === "news" ? "primary" : "quaternary"}
        onClick={onClick}
      >
        News
      </BaseButton>
    </div>
  );
}
