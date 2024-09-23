/* eslint-disable no-console */
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import styles from "./ChatWindow.module.css";

export function ChatWindow() {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("https://teamchallenge-chat-jmsz.onrender.com");

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
  }, []);

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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.chatHeader}>
          <div className={styles.card}>
            <img src={"img.png"} alt={"John Doe"} className={styles.cardImg} />
            <div className={styles.cardInfo}>
              <span className={styles.cardName}>{"John Doe"}</span>
              <span className={styles.cardStatus}>{"Online"}</span>
            </div>
          </div>
          <div className={styles.points}>{"..."}</div>
        </div>

        <div className={styles.messageList}>
          {messages.map((message, index) => (
            <div className={styles.message} key={index}>
              {message}
            </div>
          ))}
        </div>

        <div className={styles.chatInput}>
          <input
            className={styles.input}
            type="text"
            placeholder={"Type your message here"}
            onKeyDown={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
