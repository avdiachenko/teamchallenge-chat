import { useUserStore } from "@/entities/user/user.store.ts";

import styles from "./AsideMenu.module.scss";
import { AsideMenuNav } from "./AsideMenuNav/AsideMenuNav.tsx";

export function AsideMenu() {
  const { user } = useUserStore();

  const isLoggedIn = !!user?.name;

  return (
    <aside className={styles.aside_menu}>
      <AsideMenuNav isLoggedIn={isLoggedIn} />
    </aside>
  );
}
