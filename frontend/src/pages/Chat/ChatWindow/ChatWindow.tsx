import { useEffect, useRef } from "react";
import { useChatStore } from "../../../entities/chat/chat.store";
import { useUserStore } from "../../../entities/user/user.store";
import { Spinner } from "../../../shared/components/Spinner/Spinner";
import { Message } from "../Message/Message";
import { UserMessage } from "../UserMessage/UserMessage";
import styles from "./ChatWindow.module.css";

export function ChatWindow() {
  const { messages, sendMessage, selectedChat, getLastMessages, isLoading } = useChatStore();
  const { user } = useUserStore();

  const messageListContainerRef = useRef<HTMLDivElement>(null);
  const previousHeightRef = useRef<number>(0);

  const scrollToBottom = () => {
    const containerCurrent = messageListContainerRef.current;
    if (containerCurrent) containerCurrent.scrollTop = containerCurrent.scrollHeight;
  };

  const handleSendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const message = e.currentTarget.value;
      if (!message || !user) return;
      sendMessage(message, user);
      e.currentTarget.value = "";
      setTimeout(() => scrollToBottom(), 100);
    }
  };

  // load messages on scrollTop
  useEffect(() => {
    const containerCurrent = messageListContainerRef.current;

    const onScrollToTopReqest = async () => {
      if (containerCurrent && containerCurrent.scrollTop === 0) {
        // save previous height
        const previousHeight = containerCurrent.scrollHeight;
        previousHeightRef.current = previousHeight;

        // load new messages
        await getLastMessages();

        // calculate new height
        const newHeight = containerCurrent.scrollHeight;
        const heightDifference = newHeight - previousHeight;

        // scroll to top
        containerCurrent.scrollTop = heightDifference;
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

  // initial load messages
  useEffect(() => {
    (async () => {
      await getLastMessages();
      scrollToBottom();
    })();
  }, [getLastMessages, selectedChat]);

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
            {isLoading && (
              <div className={styles.spinnerContainer}>
                <Spinner />
              </div>
            )}
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
