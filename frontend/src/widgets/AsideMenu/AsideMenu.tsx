import { Link } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store.ts";
import styles from "./AsideMenu.module.css";
import * as images from "./icons/index.ts";

export function AsideMenu() {
  const { name, logout } = useUserStore();

  return (
    <aside className={styles.aside_menu}>
      <nav className={styles.nav_menu}>
        <Link className={styles.nav_links} to="/">
          <img src={images.Logo} alt="" />
        </Link>
        <div className={styles.main_links}>
          <Link className={styles.nav_links} to="/chat">
            <img src={images.ChatDots} alt="" />
          </Link>
          <Link className={styles.nav_links} to="/">
            <img src={images.News} alt="" />
          </Link>
          <Link className={styles.nav_links} to="/">
            <img src={images.Contact} alt="" />
          </Link>
          <Link className={styles.nav_links} to="/">
            <img src={images.Cash} alt="" />
          </Link>
          <Link className={styles.nav_links} to="/">
            <img src={images.People} alt="" />
          </Link>
          <Link className={styles.nav_links} to="/">
            <img src={images.Settings} alt="" />
          </Link>
          {name && (
            <button className={styles.nav_links_logout}>
              <img onClick={logout} src={images.GoOut} alt="" />
            </button>
          )}
        </div>
      </nav>
    </aside>
  );
}
