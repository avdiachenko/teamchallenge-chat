import { Navigate } from "react-router-dom";
import { useUserStore } from "../../entities/user/user.store";
import { Header } from "../../widgets/Header/Header";
import styles from "./Chat.module.css";
import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";

export function Chat() {
  const { name } = useUserStore();

  if (!name) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className={styles.container}>
      <AsideMenu />
      <Header title="Chat" />
      <div className={styles.content}>Hello from Chat</div>
    </div>
  );
}
