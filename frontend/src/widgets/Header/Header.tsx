import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export function Header() {
  return (
    <div className={styles.container}>
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

      <ul className={styles.menu}>
        <li>
          <Link to="/signup" className={styles.link}>
            SignUp
          </Link>
        </li>
        <li>
          <Link to="/signin" className={styles.link}>
            SignIn
          </Link>
        </li>
      </ul>
    </div>
  );
}
