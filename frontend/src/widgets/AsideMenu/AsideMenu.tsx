import { Link } from "react-router-dom";
import styles from "./AsideMenu.module.css";
import * as images from "./icons/index.ts";

export function AsideMenu() {
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
          <Link className={styles.nav_links} to="/">
            <img src={images.GoOut} alt="" />
          </Link>
        </div>
      </nav>
    </aside>
  );
}
