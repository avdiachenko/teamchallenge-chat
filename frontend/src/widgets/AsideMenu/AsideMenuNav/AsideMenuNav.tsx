import { Link } from "@tanstack/react-router";
import cs from "classnames";

import { useUserStore } from "@/entities/user/user.store.ts";

import styles from "../AsideMenu.module.scss";
import {
  IconChat,
  IconContacts,
  IconLogout,
  IconNeighbours,
  IconNews,
  IconPayments,
  IconSettings,
} from "../icons/index.ts";

type AsideMenuNavProps = {
  isLoggedIn: boolean;
};

export const AsideMenuNav: React.FC<AsideMenuNavProps> = ({ isLoggedIn }) => {
  const { logout } = useUserStore();

  return (
    <nav className={styles.nav_menu}>
      <div className={styles.main_links}>
        <Link
          className={cs(styles.nav_links, { [styles.disabled]: !isLoggedIn })}
          activeProps={{ className: styles.active }}
          to="/chat"
        >
          <IconChat color={isLoggedIn ? "primary" : "disabled"} />
        </Link>
        <Link
          className={cs(styles.nav_links, { [styles.disabled]: !isLoggedIn })}
          activeProps={{ className: styles.active }}
          to="/activities"
        >
          <IconNews color={isLoggedIn ? "primary" : "disabled"} />
        </Link>
        <Link
          className={cs(styles.nav_links, { [styles.disabled]: !isLoggedIn })}
          activeProps={{ className: styles.active }}
          to="/contacts"
        >
          <IconContacts color={isLoggedIn ? "primary" : "disabled"} />
        </Link>
        <Link
          className={cs(styles.nav_links, { [styles.disabled]: !isLoggedIn })}
          activeProps={{ className: styles.active }}
          to="/payments"
        >
          <IconPayments color={isLoggedIn ? "primary" : "disabled"} />
        </Link>
        <Link
          className={cs(styles.nav_links, { [styles.disabled]: !isLoggedIn })}
          activeProps={{ className: styles.active }}
          to="/neighbours"
        >
          <IconNeighbours color={isLoggedIn ? "primary" : "disabled"} />
        </Link>
        <Link
          className={cs(styles.nav_links, { [styles.disabled]: !isLoggedIn })}
          activeProps={{ className: styles.active }}
          to="/settings"
        >
          <IconSettings color={isLoggedIn ? "primary" : "disabled"} />
        </Link>
        {isLoggedIn && (
          <button onClick={logout} className={cs(styles.nav_links, styles.logout)}>
            <IconLogout />
          </button>
        )}
      </div>
    </nav>
  );
};
