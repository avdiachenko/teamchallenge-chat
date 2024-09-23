import React from "react";
import { Link } from "react-router-dom";
// import { useUserStore } from "../../entities/user/user.store";
import styles from "./Header.module.css";
import { UserPanel } from "./UserPanel/UserPanel";
import * as images from '../AsideMenu/icons/index'
// import { UserPanel } from "./UserPanel/UserPanel";

type HeaderProps = {
  title: string;
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  // const { name } = useUserStore();

  return (
    <header className={styles.container}>
      <div className={styles.header_title_logo}>
        <Link className={styles.header_logo} to="/">
          <img src={images.Logo} alt="" />
        </Link>
        <span className={styles.header_title}>{title}</span>
      </div>
      <div className={styles.links}>
        <select name="language">
          <option value="">Eng</option>
          <option value="">Ukr</option>
        </select>
        <UserPanel />
      </div>
    </header>
  );
};

/* <ul className={styles.menu}>
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

<UserPanel /> */
