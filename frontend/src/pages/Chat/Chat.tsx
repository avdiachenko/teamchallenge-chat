import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import styles from "./Chat.module.css";
import { ChatWindow } from "./ChatWindow/ChatWindow";
import { Groups } from "./Groups/Groups";
import { PrivateMessages } from "./PrivateMessages/PrivateMessages";

export function Chat() {
  return (
    <div className={styles.container}>
      <Header title="Chat" />
      <AsideMenu />
      <div className={styles.content}>
        <div className={styles.panel}>
          <div className={styles.searchBox}>
            <input className={styles.search} type="text" placeholder="Search" />
          </div>
          <Groups />
          <PrivateMessages />
        </div>
        <ChatWindow />
      </div>
    </div>
  );
}
