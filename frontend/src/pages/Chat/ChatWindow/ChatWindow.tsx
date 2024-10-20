import { useEffect, useRef } from "react";
import { useChatStore } from "../../../entities/chat/chat.store";
import { useUserStore } from "../../../entities/user/user.store";
import { Message } from "../Message/Message";
import { UserMessage } from "../UserMessage/UserMessage";
import styles from "./ChatWindow.module.css";

export function ChatWindow() {
  const { messages, sendMessage, selectedChat, getLastMessages } = useChatStore();
  const { user } = useUserStore();

  console.log(messages);

  useEffect(() => {
    if (selectedChat) {
      getLastMessages();
    }
  }, [getLastMessages, selectedChat]);

  const messageListContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const containerCurrent = messageListContainerRef.current;
    if (containerCurrent) containerCurrent.scrollTop = containerCurrent.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const containerCurrent = messageListContainerRef.current;
    const onScrollToTopReqest = () => {
      if (containerCurrent && containerCurrent.scrollTop === 0) {
        getLastMessages();
      }
    };

    if (containerCurrent) {
      containerCurrent.addEventListener("scroll", onScrollToTopReqest);
    }

    return () => {
      if (containerCurrent) {
        containerCurrent.removeEventListener("scroll", onScrollToTopReqest);
      }
    };
  }, [getLastMessages]);

  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const message = e.currentTarget.value;
      if (!message || !user) return;
      sendMessage(message, user);
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
              </div>
            </div>
            <div className={styles.points}>{"..."}</div>
          </div>
        )}

        <div className={styles.messageListContainer} ref={messageListContainerRef}>
          <div className={styles.messageList}>
            {messages.map((message, index) => (
              <div key={index} className={styles.messageWrapper}>
                {message.user_id === user?._id ? (
                  <UserMessage message={message} />
                ) : (
                  <Message message={message} />
                )}
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
