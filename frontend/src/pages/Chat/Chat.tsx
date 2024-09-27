/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "../../entities/user/user.store";
import { AsideMenu } from "../../widgets/AsideMenu/AsideMenu";
import { Header } from "../../widgets/Header/Header";
import styles from "./Chat.module.css";
import { ChatWindow } from "./ChatWindow/ChatWindow";
import { Groups } from "./Groups/Groups";
import { PrivateMessages } from "./PrivateMessages/PrivateMessages";

export function Chat() {
  const { token } = useUserStore();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const newSocket = io("https://teamchallenge-chat-jmsz.onrender.com", {
      auth: {
        token,
      },
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    newSocket.on("chat message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [token]);

  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && socket) {
      const message = e.currentTarget.value;
      socket.emit("chat message", message, () =>
        setMessages((prevMessages) => [...prevMessages, message])
      );
      e.currentTarget.value = "";
    }
  };

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
            <Groups />
            <PrivateMessages />
          </div>
          <ChatWindow messages={messages} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
