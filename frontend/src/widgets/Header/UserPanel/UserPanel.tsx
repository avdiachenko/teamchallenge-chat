import { Link } from "react-router-dom";
import { useUserStore } from "../../../entities/user/user.store";
import styles from "./UserPanel.module.css";

export function UserPanel() {
  const { name, logout } = useUserStore();

  return (
    <div className={styles.container}>
      {name ? (
        <div className={styles.user}>
          <span className={styles.name}>{name}</span>

          <button onClick={logout} className={styles.link}>
            Log Out
          </button>
        </div>
      ) : (
        <div className={styles.auth}>
          <Link to="/signup" className={styles.link}>
            Sign Up
          </Link>

          <Link to="/signin" className={styles.link}>
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
}