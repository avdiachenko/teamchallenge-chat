import { useEffect, useRef } from "react";
import { useChatStore } from "../../../entities/chat/chat.store";
import { Message } from "../Message/Message";
import { UserMessage } from "../UserMessage/UserMessage";
import styles from "./ChatWindow.module.css";

export function ChatWindow() {
  const { messages, sendMessage, selectedChat } = useChatStore();

  const messageListContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const containerCurrent = messageListContainerRef.current;
    if (containerCurrent) containerCurrent.scrollTop = containerCurrent.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const message = e.currentTarget.value;
      sendMessage(message);
      e.currentTarget.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {selectedChat && (
          <div className={styles.chatHeader}>
            <div className={styles.card}>
              <img
                src={selectedChat?.picture}
                alt={selectedChat?.name}
                className={styles.cardImg}
              />
              <div className={styles.cardInfo}>
                <span className={styles.cardName}>{selectedChat?.name}</span>
                <span className={styles.cardStatus}>{"Online"}</span>
              </div>
            </div>
            <div className={styles.points}>{"..."}</div>
          </div>
        )}

        <div className={styles.messageListContainer} ref={messageListContainerRef}>
          <div className={styles.messageList}>
            {messages.map((message, index) => (
              <div key={index} className={styles.messageWrapper}>
                {message.name ? <Message message={message} /> : <UserMessage message={message} />}
              </div>
            ))}
          </div>
        </div>

        {selectedChat && (
          <div className={styles.chatInput}>
            <input
              className={styles.input}
              type="text"
              placeholder={"Type your message here"}
              onKeyDown={handleSendMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
