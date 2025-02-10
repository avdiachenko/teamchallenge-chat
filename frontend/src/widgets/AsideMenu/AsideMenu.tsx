import { useUserStore } from "../../entities/user/user.store.ts";
import styles from "./AsideMenu.module.css";
import { AsideMenuNav } from "./AsideMenuNav/AsideMenuNav.tsx";

export function AsideMenu() {
  const { user } = useUserStore();
  return (
    <aside className={styles.aside_menu}>
      {user?.name ? <AsideMenuNav login={true} /> : <AsideMenuNav login={false} />}
    </aside>
  );
}
