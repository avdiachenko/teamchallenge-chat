import { Link } from "react-router-dom";
import { useUserStore } from "../../../entities/user/user.store";
import avatar from './userAvatar.png'
import nofiticationIcon from './nofiticationIcon.svg'
import styles from "./UserPanel.module.css";

export function UserPanel() {
  const { name } = useUserStore();
  // const { name, logout } = useUserStore();

  return (
    <div className={styles.container}>
      {name ? (
        <div className={styles.user}>
          <img className={styles.nofitication} src={nofiticationIcon} alt="" />
          <img src={avatar} className={styles.avatar} alt="user avatar" />
          <div className={styles.user_name_status}>
            <span className={styles.name}>{name}</span>
            <span className={styles.user_status}>Registered</span>
          </div>

          {/* <button onClick={logout} className={styles.logout}>
            Log Out
          </button> */}
        </div>
      ) : (
        <div className={styles.auth}>
          <Link to="/signin" className={styles.link}>
            Sign in
          </Link>

          <Link to="/signup" className={styles.link}>
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
