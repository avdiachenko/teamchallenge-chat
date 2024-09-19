import { useUserStore } from "../../entities/user/user.store.ts";
import styles from "./AsideMenu.module.css";
import { AsideMenuNav } from "./AsideMenuNav/AsideMenuNav.tsx";

export function AsideMenu() {
  const { name } = useUserStore();

  return (
    <aside className={styles.aside_menu}>
      {name ? <AsideMenuNav login={true} /> : <AsideMenuNav login={false} />}
    </aside>
  );
}
