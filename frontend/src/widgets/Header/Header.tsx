import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export function Header() {
  return (
    <div className={styles.header}>
      <ul className={styles.menu}>
        <li>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/chat" className={styles.link}>
            Chat
          </Link>
        </li>
      </ul>
    </div>
  );
}
