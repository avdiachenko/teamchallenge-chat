import { Link } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store.ts";
import styles from "./AsideMenu.module.css";
import * as images from "./icons/index.ts";
import { AsideMenuNav } from "./AsideMenuNav/AsideMenuNav.tsx";

export function AsideMenu() {
  const { name, logout } = useUserStore();

  return (
    <aside className={styles.aside_menu}>
      {name ? <AsideMenuNav login={true} /> : <AsideMenuNav login={false} />}
    </aside>
  );
}
