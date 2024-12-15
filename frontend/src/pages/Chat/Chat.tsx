import { useEffect } from "react";

import { useChatStore } from "@/entities/chat/chat.store";
import { useUserStore } from "@/entities/user/user.store";
import { AsideMenu } from "@/widgets/AsideMenu/AsideMenu";
import { Header } from "@/widgets/Header/Header";

import styles from "./Chat.module.css";
import { ChatList } from "./ChatList/ChatList";
import { ChatWindow } from "./ChatWindow/ChatWindow";

export function Chat() {
  const { token } = useUserStore();
  const { connectSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    if (token) connectSocket(token);

    return () => {
      disconnectSocket();
    };
  }, [token, connectSocket, disconnectSocket]);

  return (
    <div>
      <AsideMenu />
      <Header title="Chat" />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.panel}>
            <div className={styles.searchBox}>
              <input className={styles.search} type="text" placeholder="Search" />
            </div>
            <ChatList />
          </div>
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}
