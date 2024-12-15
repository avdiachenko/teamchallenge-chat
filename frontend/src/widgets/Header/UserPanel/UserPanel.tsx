import { Link } from "@tanstack/react-router";

import { useUserStore } from "@/entities/user/user.store";

import nofiticationIcon from "./nofiticationIcon.svg";
import avatar from "./userAvatar.png";
import styles from "./UserPanel.module.css";

export function UserPanel() {
  const { user } = useUserStore();

  return (
    <div className={styles.container}>
      {user?.name ? (
        <div className={styles.user}>
          <img className={styles.nofitication} src={nofiticationIcon} alt="" />
          <img src={avatar} className={styles.avatar} alt="user avatar" />
          <div className={styles.user_name_status}>
            <span className={styles.name}>{user.name}</span>
            <span className={styles.user_status}>Registered</span>
          </div>
        </div>
      ) : (
        <div className={styles.auth}>
          <Link to="/auth/signin" className={styles.link}>
            Sign in
          </Link>

          <Link to="/auth/signup" className={styles.link}>
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
