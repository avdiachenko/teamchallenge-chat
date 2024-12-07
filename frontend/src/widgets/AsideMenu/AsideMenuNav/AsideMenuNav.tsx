import { NavLink } from "react-router-dom";
import cs from "classnames";

import { useUserStore } from "../../../entities/user/user.store.ts";
import styles from "../AsideMenu.module.scss";
import {
  IconChat,
  IconContacts,
  IconLogout,
  IconNews,
  IconPayments,
  IconNeighbours,
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
        <NavLink
          className={({ isActive }) =>
            cs(styles.nav_links, { [styles.disabled]: !isLoggedIn, [styles.active]: isActive })
          }
          to="/chat"
        >
          <IconChat color={isLoggedIn ? "primary" : "disabled"} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cs(styles.nav_links, {
              [styles.disabled]: !isLoggedIn,
              [styles.active]: isActive,
            })
          }
          to="/notifications"
        >
          <IconNews color={isLoggedIn ? "primary" : "disabled"} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cs(styles.nav_links, {
              [styles.disabled]: !isLoggedIn,
              [styles.active]: isActive,
            })
          }
          to="/contacts"
        >
          <IconContacts color={isLoggedIn ? "primary" : "disabled"} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cs(styles.nav_links, {
              [styles.disabled]: !isLoggedIn,
              [styles.active]: isActive,
            })
          }
          to="/payments"
        >
          <IconPayments color={isLoggedIn ? "primary" : "disabled"} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cs(styles.nav_links, {
              [styles.disabled]: !isLoggedIn,
              [styles.active]: isActive,
            })
          }
          to="/neighbours"
        >
          <IconNeighbours color={isLoggedIn ? "primary" : "disabled"} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cs(styles.nav_links, {
              [styles.disabled]: !isLoggedIn,
              [styles.active]: isActive,
            })
          }
          to="/settings"
        >
          <IconSettings color={isLoggedIn ? "primary" : "disabled"} />
        </NavLink>
        {isLoggedIn && (
          <button onClick={logout} className={cs(styles.nav_links, styles.logout)}>
            <IconLogout />
          </button>
        )}
      </div>
    </nav>
  );
};
