import { Header } from "../../widgets/Header/Header";
import styles from "./Chat.module.css";

export function Chat() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>Hello from Chat</div>
    </div>
  );
}
