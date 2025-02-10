import { useUserStore } from "../../entities/user/user.store.ts";
import styles from "./AsideMenu.module.css";
import { AsideMenuNav } from "./AsideMenuNav/AsideMenuNav.tsx";

export function AsideMenu() {
  const { user } = useUserStore();
  console.log("user", user);
  console.log("isAuth", useUserStore().isAuth());
  console.log("toker", localStorage.getItem("token"));
  return (
    <aside className={styles.aside_menu}>
      {user?.name ? <AsideMenuNav login={true} /> : <AsideMenuNav login={false} />}
    </aside>
  );
}
