import { Link } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import styles from "./Header.module.css";
import { UserPanel } from "./UserPanel/UserPanel";

export function Header() {
  const { name } = useUserStore();

  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        <li>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
        {name && (
          <li>
            <Link to="/chat" className={styles.link}>
              Chat
            </Link>
          </li>
        )}
      </ul>

      <UserPanel />
    </div>
  );
}
