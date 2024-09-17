import { Header } from "../../widgets/Header/Header";
import styles from "./Chat.module.css";
import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";

export function Chat() {
  return (
    <div className={styles.container}>
      <AsideMenu />
      <Header title="Chat" />
      <div className={styles.content}>Hello from Chat</div>
    </div>
  );
}
