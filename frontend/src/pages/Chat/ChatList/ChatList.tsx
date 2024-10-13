import { useChatStore } from "../../../entities/chat/chat.store";
import { ChatType } from "../../../entities/chat/chat.types";
import { useUserStore } from "../../../entities/user/user.store";
import useApi from "../../../shared/api/useApi";
import { Spinner } from "../../../shared/components/Spinner/Spinner";
import styles from "./ChatList.module.css";

const messagesArray = [
  { name: "Jacob Jones", img: "img.png", status: "Good afternoon. Please kindly kee..." },
  { name: "Robert Fox", img: "img.png", status: "hello how are you" },
  { name: "Kathryn Murphy", img: "img.png", status: "Good afternoon." },
  { name: "Hello Mary", img: "img.png", status: "Good afternoon." },
  { name: "David Jones", img: "img.png", status: "Good afternoon." },
  { name: "Elizabeth Murphy", img: "img.png", status: "Good afternoon." },
];
export function ChatList() {
  const { token } = useUserStore();
  const { selectedChat, setSelectedChat } = useChatStore();

  const { data: chatList, isLoading } = useApi<ChatType[]>(token ? `/chat` : null);

  if (isLoading) return <Spinner />;
  if (!chatList || !chatList.length) return null;

  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Groups</span>

        <div className={styles.wrapper}>
          {chatList.map((chat: ChatType) => (
            <div
              className={`${styles.card} ${selectedChat?.name === chat.name && ` ${styles.selected}`}`}
              key={chat.name}
              onClick={() => setSelectedChat(chat)}
            >
              <img src={chat.picture} alt={chat.name} className={styles.cardImg} />
              <div className={styles.cardInfo}>
                <span className={styles.cardTitle}>{chat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <span className={styles.title}>Private Messages</span>

        <div className={styles.wrapper}>
          {messagesArray.map((message) => (
            <div className={styles.card} key={message.name}>
              <img src={message.img} alt={message.name} className={styles.cardImg} />
              <div className={styles.cardInfo}>
                <span className={styles.cardName}>{message.name}</span>
                <span className={styles.cardStatus}>{message.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
